import '@/styles/index.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { Toaster } from 'sonner';

import { isProduction } from '@/constants';
import { AnalyticsProvider } from '@/deps/posthog';
import { cn } from '@/deps/shadcn/utils';
import { TRPCReactProvider } from '@/deps/trpc/react';
import { environmentPrefix } from '@/modules/metadata/constants';
import { ThemeProvider } from '@/modules/theme/providers/theme-provider';
import { ViewportSizeProvider } from '@/utils/use-viewport';
import Script from 'next/script';

export const metadata: Metadata = {
	title: environmentPrefix() + 'Crni Mag - likovne radionice',
	description: 'Malo drugačije likovne radionice 🎨',
	icons: [{ rel: 'icon', url: '/favicon.png' }],
	openGraph: {
		title: environmentPrefix() + 'Crni Mag Likovne Radionice',
		description: 'Malo drugačije likovne radionice 🎨',
		url: 'https://www.crni-mag.studio',
		type: 'website',
		siteName: 'crni-mag.studio',
		images: [
			{
				url: 'https://www.crni-mag.studio/cover.png',
				width: 1200,
				height: 630
			}
		],
		locale: 'hr-HR'
	}
};

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ThemeProvider>
			<html lang="en" className={cn(GeistSans.variable, 'bg-background')}>
				<ViewportSizeProvider>
					<TRPCReactProvider>
						<AnalyticsProvider>
							<body className="min-h-screen">
								{children}
								<Toaster />
							</body>
							{isProduction && (
								<Script
									async
									src="https://umami.crni-mag.studio/script.js"
									data-website-id="bd299dcd-4d96-4247-a562-a597ecc85f9d"
								/>
							)}
						</AnalyticsProvider>
					</TRPCReactProvider>
				</ViewportSizeProvider>
			</html>
		</ThemeProvider>
	);
}
