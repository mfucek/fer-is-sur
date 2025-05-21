import Link from 'next/link';

export const FooterSection = () => {
	return (
		<div className="container-fluid py-20 px-6 bg-section flex-page">
			<div className="text-neutral container-xl flex flex-col lg:flex-row gap-4 lg:gap-0 justify-normal lg:justify-between items-center">
				<p className="body-3 text-neutral-strong">
					Sustav za upravljanje radionica
				</p>

				<p className="body-3 text-neutral-strong">
					Stranica napravljena u suradnji s{' '}
					<a
						href="https://www.fer.unizg.hr"
						className="text-neutral button-sm hover:underline"
					>
						FER
					</a>
				</p>

				<div className="flex flex-row gap-6">
					<Link
						href="https://www.fer.unizg.hr"
						className="body-3 text-neutral button-sm hover:underline"
					>
						FER
					</Link>
				</div>
			</div>
		</div>
	);
};
