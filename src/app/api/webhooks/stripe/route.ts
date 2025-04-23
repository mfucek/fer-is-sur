import { postHandler } from '@/deps/stripe/api/webhook';

export const POST = postHandler;
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// Ensure we don't buffer the request
export const preferredRegion = 'auto';
export const maxDuration = 60;
