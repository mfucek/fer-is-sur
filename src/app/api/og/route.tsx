import { IconName, iconNames } from '@/global/components/icon';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { z } from 'zod';

async function getSvgWithCustomFill(
	icon: IconName,
	fillColor: string
): Promise<string> {
	const iconPath = join(
		process.cwd(),
		'public',
		'assets',
		'icons',
		`${icon}.svg`
	);
	let iconData = await readFile(iconPath, 'utf-8');

	iconData = iconData.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);

	return `data:image/svg+xml;base64,${Buffer.from(iconData).toString('base64')}`;
}

const paramsSchema = z.object({
	size: z.number().min(1).max(1000),
	color: z.string(),
	bg: z.string(),
	icon: z.enum(iconNames as [string, ...string[]])
});

export const GET = async (req: NextRequest) => {
	try {
		const params = paramsSchema.parse({
			size: parseInt(req.nextUrl.searchParams.get('size') ?? '24'),
			color: req.nextUrl.searchParams.get('color') ?? '#000000',
			bg: req.nextUrl.searchParams.get('bg') ?? '#ffffff',
			icon: req.nextUrl.searchParams.get('icon')
		});

		const iconSrc = await getSvgWithCustomFill(
			params.icon as IconName,
			params.color
		);

		return new ImageResponse(
			(
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						backgroundColor: params.bg,
						justifyContent: 'center',
						width: '100%',
						height: '100%'
					}}
				>
					<img src={iconSrc} height={params.size} />
				</div>
			),
			{
				width: params.size,
				height: params.size
			}
		);
	} catch (error) {
		console.error(error);
		return new Response(error as string, { status: 400 });
	}
};

export const dynamic = 'force-dynamic';
