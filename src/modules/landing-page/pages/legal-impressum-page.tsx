import { companyInfo } from '@/modules/mailer/constants/company-info';

export const LegalImpressumPage = () => {
	return (
		<div className="container-sm pad-xl py-40 text-neutral">
			<h1 className="display-3 mb-12">Impressum</h1>

			<div className="grid grid-cols-2 gap-4 gap-y-6">
				<p className="title-2 w-full break-words">Obrt</p>
				<p className="body-1 w-full break-words">{companyInfo.fullLegalName}</p>

				<p className="title-2 w-full break-words">Adresa</p>
				<p className="body-1 w-full break-words">{companyInfo.address}</p>

				<p className="title-2 w-full break-words">OIB</p>
				<p className="body-1 w-full break-words">{companyInfo.companyOIB}</p>

				<p className="title-2 w-full break-words">IBAN</p>
				<p className="body-1 w-full break-words">{companyInfo.companyIBAN}</p>

				<p className="title-2 w-full break-words">SWIFT</p>
				<p className="body-1 w-full break-words">{companyInfo.companySWIFT}</p>

				<p className="title-2 w-full break-words">Banka</p>
				<p className="body-1 w-full break-words">{companyInfo.companyBank}</p>
			</div>
		</div>
	);
};
