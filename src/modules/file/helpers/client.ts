import { env } from '@/env';
import { S3Client } from '@aws-sdk/client-s3';

export const r2Client = new S3Client({
	region: 'auto',
	endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.eu.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: env.CLOUDFLARE_ACCESS_ID,
		secretAccessKey: env.CLOUDFLARE_ACCESS_KEY
	}
});
