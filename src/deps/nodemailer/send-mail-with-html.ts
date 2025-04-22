import { env } from '@/env';

export const sendMailWithHTML = async ({
	subject,
	toEmail,
	rawHtml
}: {
	subject: string;
	toEmail: string;
	rawHtml: string;
}) => {
	const prefix =
		env.NODE_ENV === 'development'
			? '[DEV] '
			: env.NEXT_PUBLIC_DEPLOYMENT === 'staging'
				? '[STG] '
				: '';

	await fetch('http://localhost:3000/api/nodemailer/send', {
		method: 'POST',
		body: JSON.stringify({
			subject: prefix + subject,
			toEmail: toEmail,
			rawHtml: rawHtml
		})
	});
};
