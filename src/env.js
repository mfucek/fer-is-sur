import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// import packageJson from '../package.json';

// const version = packageJson.version;

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(['development', 'test', 'production'])
			.default('development'),
		// Prisma
		DATABASE_URL: z.string().url(),
		PULSE_API_KEY: z.string(),
		// Cloudflare
		CLOUDFLARE_ACCESS_ID: z.string(),
		CLOUDFLARE_ACCESS_KEY: z.string(),
		CLOUDFLARE_ACCOUNT_ID: z.string(),
		CLOUDFLARE_R2_BUCKET_NAME: z.string(),
		// Stripe
		URL: z.string(),
		STRIPE_SECRET_KEY: z.string(),
		STRIPE_WEBHOOK_SECRET: z.string(),
		STRIPE_PRODUCT_ID_MONTHLY_CHEAP: z.string(),
		STRIPE_PRODUCT_ID_MONTHLY_PRO: z.string(),
		STRIPE_PRODUCT_ID_LIFETIME: z.string(),
		STRIPE_PRICE_ID_MONTHLY_CHEAP: z.string(),
		STRIPE_PRICE_ID_MONTHLY_PRO: z.string(),
		STRIPE_PRICE_ID_LIFETIME: z.string()
	},

	client: {
		NEXT_PUBLIC_DEPLOYMENT: z.enum(['staging', 'production'])
		// NEXT_PUBLIC_VERSION: z.string()
	},

	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		// Prisma
		DATABASE_URL: process.env.DATABASE_URL,
		PULSE_API_KEY: process.env.PULSE_API_KEY,
		// Cloudflare
		CLOUDFLARE_ACCESS_ID: process.env.CLOUDFLARE_ACCESS_ID,
		CLOUDFLARE_ACCESS_KEY: process.env.CLOUDFLARE_ACCESS_KEY,
		CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
		CLOUDFLARE_R2_BUCKET_NAME: process.env.CLOUDFLARE_R2_BUCKET_NAME,
		// Stripe
		URL: process.env.URL,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		STRIPE_PRODUCT_ID_MONTHLY_CHEAP:
			process.env.STRIPE_PRODUCT_ID_MONTHLY_CHEAP,
		STRIPE_PRODUCT_ID_MONTHLY_PRO: process.env.STRIPE_PRODUCT_ID_MONTHLY_PRO,
		STRIPE_PRODUCT_ID_LIFETIME: process.env.STRIPE_PRODUCT_ID_LIFETIME,
		STRIPE_PRICE_ID_MONTHLY_CHEAP: process.env.STRIPE_PRICE_ID_MONTHLY_CHEAP,
		STRIPE_PRICE_ID_MONTHLY_PRO: process.env.STRIPE_PRICE_ID_MONTHLY_PRO,
		STRIPE_PRICE_ID_LIFETIME: process.env.STRIPE_PRICE_ID_LIFETIME,
		NEXT_PUBLIC_DEPLOYMENT: process.env.NEXT_PUBLIC_DEPLOYMENT
		// NEXT_PUBLIC_VERSION: version
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true
});
