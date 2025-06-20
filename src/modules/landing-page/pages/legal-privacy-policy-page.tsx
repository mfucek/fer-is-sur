import { companyInfo } from '@/modules/mailer/constants/company-info';

export const LegalPrivacyPolicyPage = () => {
	return (
		<div className="container-sm pad-lg py-40 text-neutral">
			<h1 className="display-3 mb-12">Politika privatnosti</h1>

			<p className="body-1 mb-6">
				{companyInfo.companyName} se obvezuje da će štititi privatnost svih
				svojih kupaca u skladu s Općom uredbom o zaštiti osobnih podataka (GDPR)
				Europskog parlamenta i Vijeća, Zakonom o zaštiti osobnih podatka,
				Zakonom o elektroničkoj trgovini i drugim zakonima Republike Hrvatske.
			</p>

			<p className="body-1 mb-6">
				{companyInfo.companyName} će prikupljati, obrađivati i čuvati osobne i
				identifikacijske podatke o svojim kupcima. {companyInfo.companyName} u
				internet trgovini prikuplja i obrađuje sljedeće osobne podatke: adresu
				e-pošte.
				{companyInfo.companyName} će čuvati ove podatke u tajnosti te će ih
				upotrebljavati samo za vlastite potrebe, kao i za zakonski dopuštene
				potrebe. Navedeni osobni podaci prikupljaju se i obrađuju u svrhu obrade
				i dostave narudžbi, rješavanja mogućih problema prilikom i nakon
				kupovine, analize i proučavanja kupovnih navika, provođenja ciljnog
				marketinga i anketiranja.
			</p>

			<p className="body-1 mb-6">
				Prikupljamo samo nužne, osnovne podatke o kupcima/korisnicima i
				obavještavamo kupce o načinu njihova korištenja. Redovito dajemo kupcima
				mogućnost izbora načina upotrebe njihovih podataka, uključujući
				mogućnost odluke žele li ili ne da se njihovo ime ukloni s popisa koji
				se koriste za marketinške kampanje. Kupac internet trgovine
				paintandwine.hr može u bilo kojem trenutku zatražiti da{' '}
				{companyInfo.companyName}, Vl. Stevo Došen prekine obradu gore navedenih
				osobnih podataka.
			</p>

			<p className="body-1 mb-6">
				Svi se podaci o korisnicima strogo čuvaju i dostupni su samo
				djelatnicima kojima su ti podaci nužni za obavljanje posla. Svi
				djelatnici poduzeća {companyInfo.companyName} , a posebno djelatnici
				internet trgovine, te poslovni partneri odgovorni su za poštivanje
				načela zaštite privatnosti.
			</p>

			<p className="body-1 mb-6">
				Web stranice poduzeća {companyInfo.companyName} sadrže određene
				poveznice na druge web stranice koje nisu u vezi sa poduzećem{' '}
				{companyInfo.companyName} , SUR ne preuzima nikakvu odgovornost za
				zaštitu osobnih i drugih podataka na tim web stranicama.
			</p>

			<p className="body-1 mb-6">
				Ovlaštena osoba za zaštitu osobnih podataka za {companyInfo.companyName}{' '}
				je (Filip Smrekar), e-mail: {companyInfo.contactEmail} Valjanost Općih
				uvjeta: od 22.04.2025. do promjene ili otkazivanja.
			</p>
		</div>
	);
};
