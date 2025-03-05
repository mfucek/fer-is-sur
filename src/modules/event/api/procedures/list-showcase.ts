import { publicProcedure } from '@/deps/trpc/procedures';
import { getFileDownloadUrl } from '@/modules/file/helpers/get-download-url';
import { type Prisma } from '@prisma/client';
import { makeEventDTO } from '../dto/event-dto';

export const listShowcaseProcedure = publicProcedure.query(async ({ ctx }) => {
	const { db } = ctx;

	const where = {
		date: {
			lt: new Date()
		}
	} satisfies Prisma.EventWhereInput;

	const eventsRaw = await db.event.findMany({
		where,
		orderBy: {
			date: 'desc'
		},
		include: {
			CoverImage: {
				include: {
					Image: {
						select: {
							key: true
						}
					}
				}
			},
			Gallery: {
				include: {
					Images: {
						select: {
							key: true
						}
					}
				}
			}
		},
		take: 3
	});

	// find all keys for all events
	const keyToUrlMap = new Map<string, string | null>();
	for (const event of eventsRaw) {
		if (event.CoverImage?.Image?.key) {
			keyToUrlMap.set(event.CoverImage.Image.key, null);
		}
		if (event.Gallery) {
			for (const image of event.Gallery.Images) {
				keyToUrlMap.set(image.key, null);
			}
		}
	}

	// make download urls for all keys
	for await (const key of keyToUrlMap.keys()) {
		const url = await getFileDownloadUrl(key);
		keyToUrlMap.set(key, url);
	}

	const keyToUrl = (key: string | undefined | null) => {
		if (!key) return null;
		return keyToUrlMap.get(key) || null;
	};

	const keysToUrls = (keys?: (string | undefined | null)[]) => {
		if (!keys) return [];

		const urls: string[] = [];

		for (const key of keys) {
			if (!key) continue;

			const url = keyToUrl(key);
			if (!url) continue;

			urls.push(url);
		}

		return urls;
	};

	const events = eventsRaw.map((eventRaw) => ({
		...makeEventDTO(eventRaw),
		cover: keyToUrl(eventRaw.CoverImage?.Image?.key),
		gallery: keysToUrls(eventRaw.Gallery?.Images.map((image) => image.key))
	}));

	return events;
});

export type ListShowcaseItem = Awaited<
	ReturnType<typeof listShowcaseProcedure>
>[number];
