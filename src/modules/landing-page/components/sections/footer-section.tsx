import Link from 'next/link';

export const FooterSection = () => {
	return (
		<div className="container-fluid py-20 px-6 bg-section flex-page">
			<div className="text-neutral container-xl flex flex-col lg:flex-row gap-4 lg:gap-0 justify-normal lg:justify-between items-center">
				<p className="body-3 text-neutral-strong">
					© {new Date().getFullYear()} Crni Mag Studio - Sva prava pridržana.
				</p>

				<p className="body-3 text-neutral-strong">
					Stranica napravljena u suradnji s{' '}
					<a
						href="https://www.wireframe.hr"
						className="text-neutral button-sm hover:underline"
					>
						Wireframe Studio
					</a>
				</p>

				<div className="flex flex-row gap-6">
					<Link
						href="/legal/impressum"
						className="body-3 text-neutral button-sm hover:underline"
					>
						Impressum
					</Link>
					<Link
						href="/legal/terms-of-use"
						className="body-3 text-neutral button-sm hover:underline"
					>
						Uvjeti korištenja
					</Link>
					<Link
						href="/legal/privacy-policy"
						className="body-3 text-neutral button-sm hover:underline"
					>
						Privatnost
					</Link>
				</div>
			</div>
		</div>
	);
};
