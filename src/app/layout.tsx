import '@/styles/index.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';
import { Toaster } from 'sonner';

import { cn } from '@/deps/shadcn/utils';
import { TRPCReactProvider } from '@/deps/trpc/react';
import { ThemeProvider } from '@/modules/theme/providers/theme-provider';
import { ViewportSizeProvider } from '@/utils/use-viewport';

export const metadata: Metadata = {
	title: 'Sustav za upravljanje radionica',
	description: 'Sustav za upravljanje radionica',
	icons: [{ rel: 'icon', url: '/favicon.png' }]
};

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ThemeProvider>
			<html lang="en" className={cn(GeistSans.variable, 'bg-background')}>
				<ViewportSizeProvider>
					<TRPCReactProvider>
						<body className="min-h-screen">
							{children}
							<Toaster />
						</body>
					</TRPCReactProvider>
				</ViewportSizeProvider>
			</html>
		</ThemeProvider>
	);
}
