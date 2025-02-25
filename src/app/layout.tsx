import '@/styles/index.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { AnalyticsProvider } from '@/lib/posthog';
import { cn } from '@/lib/shadcn/utils';
import { TRPCReactProvider } from '@/lib/trpc/react';
import { ThemeProvider } from '@/modules/theme/providers/theme-provider';
import { ViewportSizeProvider } from '@/utils/use-viewport';

export const metadata: Metadata = {
	title: 'Crni Mag | Likovne radionice',
	description: 'Malo drugačije likovne radionice 🎨',
	icons: [{ rel: 'icon', url: '/favicon.png' }],
	openGraph: {
		title: 'Crni Mag',
		description: 'Malo drugačije likovne radionice 🎨',
		url: 'https://www.crnimag.hr',
		type: 'website',
		siteName: 'crnimag.hr',
		images: [
			{
				url: 'https://www.crnimag.hr/cover.png',
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
							<body className="min-h-screen">{children}</body>
						</AnalyticsProvider>
					</TRPCReactProvider>
				</ViewportSizeProvider>
			</html>
		</ThemeProvider>
	);
}
