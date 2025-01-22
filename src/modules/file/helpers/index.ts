import {
	DeleteObjectCommand,
	GetObjectCommand,
	ListObjectsCommand,
	PutObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { env } from '@/env';
import { r2Client } from './client';

const bucket = env.CLOUDFLARE_R2_BUCKET_NAME;

export const listFiles = async (prefix: string) => {
	const command = new ListObjectsCommand({
		Bucket: bucket,
		Prefix: prefix
	});

	const response = await r2Client.send(command);

	return response.Contents;
};

export const uploadFiles = async (files: File[]) => {
	const response = files.map(async (file) => {
		const body = (await file.arrayBuffer()) as Buffer;

		const command = new PutObjectCommand({
			Bucket: bucket,
			Key: file.name,
			Body: body
		});

		return await r2Client.send(command);
	});

	return Promise.all(response);
};

export const getFileUrl = async (key: string) => {
	const command = new GetObjectCommand({
		Bucket: bucket,
		Key: key
	});

	return await getSignedUrl(r2Client, command, { expiresIn: 60 * 60 * 24 });
};

export const getS3UploadPresignedUrl = async (key: string) => {
	const command = new PutObjectCommand({
		Bucket: bucket,
		Key: key
	});

	return await getSignedUrl(r2Client, command, { expiresIn: 60 * 60 * 24 });
};

export const deleteFile = async (key: string) => {
	const command = new DeleteObjectCommand({
		Bucket: bucket,
		Key: key
	});

	return await r2Client.send(command);
};

export const deleteFiles = async (keys: string[]) => {
	const response = keys.map(async (key) => {
		return await deleteFile(key);
	});

	return Promise.all(response);
};
