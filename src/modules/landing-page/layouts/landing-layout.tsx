export const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen overflow-x-hidden bg-background flex flex-col dark">
			{children}
		</div>
	);
};
