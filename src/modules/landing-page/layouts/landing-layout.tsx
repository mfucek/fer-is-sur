import { Header } from '../components/header';

export const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen overflow-x-hidden flex-page">
			<Header />
			{children}
		</div>
	);
};
