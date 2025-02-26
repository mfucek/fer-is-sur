import { HeadingSection } from '../heading-section';

const TestemonialCard = () => {
	return (
		<div className="flex flex-col p-3 gap-3 rounded-2xl bg-section text-center items-center justify-center min-h-[160px]">
			<p className="body-3 text-neutral">
				❤️ zakon je bilo! Definitivno preporucam svima da se iskusaju!
			</p>
			<p className="caption text-neutral-strong">@guchi.jogobela</p>
		</div>
	);
};

export const AboutSection = () => {
	return (
		<div className="flex-page pad-lg py-20" id="about">
			<HeadingSection
				title="O nama"
				description="Studio postoji vec 53 godine i namjenjen je pocetnicima koje interesira nauciti slikati. Ovo je neki tekst o povijesti studija bla bla. Poanta je da u par natuknica posjetitelj dobije confidence da se rezervira."
			/>
			<div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
				<TestemonialCard />
				<TestemonialCard />
				<TestemonialCard />
				<TestemonialCard />
				<TestemonialCard />
				<TestemonialCard />
			</div>
		</div>
	);
};
