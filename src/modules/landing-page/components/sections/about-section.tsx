import { FC } from 'react';
import { LandingHeading } from '../landing-heading';

const TestemonialCard: FC<{
	name: string;
	comment: string;
}> = ({ name, comment }) => {
	return (
		<div className="flex flex-col p-3 gap-3 rounded-2xl bg-section text-center items-center justify-center min-h-[160px] w-[320px] sm:w-auto shrink-0">
			<p className="body-2 text-neutral">{comment}</p>
			<p className="caption text-neutral-strong">{name}</p>
		</div>
	);
};

export const AboutSection = () => {
	return (
		<div className="flex-page gap-20 py-20" id="about">
			<LandingHeading
				title="O nama"
				description={`Bok, mi smo Filip i Vjeran, akademski slikari. Volimo slikati i vrlo smo strastveni kada su u pitanju likovi iz stripova, crtića, filmova, video igara...\nSve to želimo podijeliti s Vama i usput Vam dokazati da slikanje i nije tako teško, pogotovo uz naše stručno vodstvo. Kakvu god ideju imate, zajedno ju možemo naslikati u sklopu naših radionica ili privatnih eventova.`}
			/>

			<div className="w-full pad-lg md:container-lg flex flex-row overflow-x-scroll sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2 scrollbar-hidden">
				<TestemonialCard
					name="@magicomenstcg"
					comment="We went on an adventure 💚"
				/>
				<TestemonialCard
					name="@creative_soul"
					comment="Super atmosfera i odlično vodstvo. Jedva čekam sljedeću radionicu! 🔥"
				/>
				<TestemonialCard name="@slaninica_" comment="❤️ zakon je bilo!" />
				<TestemonialCard
					name="@artlover22"
					comment="Najbolja radionica ikad! Nisam znala da mogu naslikati tako dobru sliku 🎨✨"
				/>
				<TestemonialCard
					name="@ida.jakov"
					comment="Odlična radionica u super društvu!!!❤️🔥❤️"
				/>
				<TestemonialCard
					name="@paint_with_me"
					comment="Nevjerojatno iskustvo! Filip i Vjeran su stvarno talentirani i strpljivi učitelji 💯"
				/>
			</div>
		</div>
	);
};
