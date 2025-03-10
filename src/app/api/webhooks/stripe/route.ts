import { postHandler } from '@/deps/stripe/api/webhook';

export const POST = postHandler;
export const dynamic = 'force-dynamic';
export const runtime = 'edge';
