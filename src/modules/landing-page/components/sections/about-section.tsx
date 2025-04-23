import { LandingHeading } from '../landing-heading';

const TestemonialCard = () => {
	return (
		<div className="flex flex-col p-3 gap-3 rounded-2xl bg-section text-center items-center justify-center min-h-[160px] w-[320px] sm:w-auto shrink-0">
			<p className="body-2 text-neutral">
				❤️ zakon je bilo! Definitivno preporucam svima da se iskusaju!
			</p>
			<p className="caption text-neutral-strong">@guchi.jogobela</p>
		</div>
	);
};

export const AboutSection = () => {
	return (
		<div className="flex-page gap-20 py-20" id="about">
			<LandingHeading
				title="O nama"
				description={`Bok, mi smo Filip i Vjeran, akademski slikari. Volimo slikati i vrlo smo strastveni kada su u pitanju likovi iz stripova, crtića, filmova, video igara...\n\nSve to želimo podijeliti s Vama i usput Vam dokazati da slikanje i nije tako teško, pogotovo uz naše stručno vodstvo. Kakvu god ideju imate, zajedno ju možemo naslikati u sklopu naših radionica ili privatnih eventova.`}
			/>

			<div className="w-full pad-lg md:container-lg flex flex-row overflow-x-scroll sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2 scrollbar-hidden">
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
