import '@/styles/colors.css';
import '@/styles/globals.css';
import '@/styles/typography.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { AnalyticsProvider } from '@/lib/posthog';
import { TRPCReactProvider } from '@/lib/trpc/react';
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
		<html lang="en" className={GeistSans.variable}>
			<ViewportSizeProvider>
				<body className="bg-background min-h-screen">
					<TRPCReactProvider>
						<AnalyticsProvider>
							<div className="min-h-screen overflow-x-hidden">{children}</div>
						</AnalyticsProvider>
					</TRPCReactProvider>
				</body>
			</ViewportSizeProvider>
		</html>
	);
}
