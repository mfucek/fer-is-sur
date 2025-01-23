import { PutObjectCommand } from '@aws-sdk/client-s3';

import { env } from '@/env';
import { r2Client } from './client';

import { nanoid } from 'nanoid';

const bucket = env.CLOUDFLARE_R2_BUCKET_NAME;

export const uploadFile = async (file: File) => {
	const body = (await file.arrayBuffer()) as Buffer;

	const key = nanoid();

	const command = new PutObjectCommand({
		Bucket: bucket,
		Key: key,
		Body: body
	});

	try {
		await r2Client.send(command);
		return { key };
	} catch (error) {
		console.error(error);
		return null;
	}
};
