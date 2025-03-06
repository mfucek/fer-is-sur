import { deleteFile } from '@/modules/file/helpers/delete-file';
import { PrismaClient } from '@prisma/client';

export const cleanUpOrphanedFiles = async (db: PrismaClient) => {
	const files = await db.file.findMany({
		where: {
			NOT: [
				{
					EventCover: {
						some: {}
					}
				},
				{ EventGallery: { some: {} } }
			]
		}
	});

	const fileIds = files.map((file) => file.id);

	await db.file.deleteMany({
		where: {
			id: {
				in: fileIds
			}
		}
	});

	await Promise.all(files.map((file) => deleteFile(file.key)));

	return files;
};
