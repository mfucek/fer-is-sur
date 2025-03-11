import '@/styles/index.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { Toaster } from 'sonner';

import { isStaging } from '@/constants';
import { AnalyticsProvider } from '@/deps/posthog';
import { cn } from '@/deps/shadcn/utils';
import { TRPCReactProvider } from '@/deps/trpc/react';
import { ThemeProvider } from '@/modules/theme/providers/theme-provider';
import { ViewportSizeProvider } from '@/utils/use-viewport';

const stagingPrefix = isStaging ? '[STG] ' : '';

export const metadata: Metadata = {
	title: stagingPrefix + 'Crni Mag - likovne radionice',
	description: 'Malo drugačije likovne radionice 🎨',
	icons: [{ rel: 'icon', url: '/favicon.png' }],
	openGraph: {
		title: stagingPrefix + 'Crni Mag Likovne Radionice',
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
						</AnalyticsProvider>
					</TRPCReactProvider>
				</ViewportSizeProvider>
			</html>
		</ThemeProvider>
	);
}
