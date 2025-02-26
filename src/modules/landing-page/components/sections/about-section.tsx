import { LandingHeading } from '../landing-heading';

const TestemonialCard = () => {
	return (
		<div className="flex flex-col p-3 gap-3 rounded-2xl bg-section text-center items-center justify-center min-h-[160px] w-[320px] sm:w-auto shrink-0">
			<p className="body-3 text-neutral">
				❤️ zakon je bilo! Definitivno preporucam svima da se iskusaju!
			</p>
			<p className="caption text-neutral-strong">@guchi.jogobela</p>
		</div>
	);
};

export const AboutSection = () => {
	return (
		<div className="flex-page py-20" id="about">
			<LandingHeading
				title="O nama"
				description="Studio postoji vec 53 godine i namjenjen je pocetnicima koje interesira nauciti slikati. Ovo je neki tekst o povijesti studija bla bla. Poanta je da u par natuknica posjetitelj dobije confidence da se rezervira."
			/>
			<div className="w-full pad-lg md:container-lg flex flex-row overflow-x-scroll sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2">
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
