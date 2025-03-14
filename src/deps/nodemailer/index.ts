import { env } from '@/env';
import nodemailer from 'nodemailer';
import { renderToString } from './helpers/render-to-string';

const transporter = nodemailer.createTransport({
	host: env.NODEMAILER_HOST,
	port: 465,
	auth: {
		user: env.NODEMAILER_USER,
		pass: env.NODEMAILER_PASSWORD
	},
	secure: true,
	tls: {
		rejectUnauthorized: false
	},
	requireTLS: true,
	debug: true
});

const fromAddress = env.NODEMAILER_USER;

export const sendMail = async (
	subject: string,
	toEmail: string,
	otpText: string
) => {
	await transporter.sendMail({
		from: fromAddress,
		to: toEmail,
		subject: subject,
		text: otpText
	});
};

export const sendMailWithHTML = async ({
	subject,
	toEmail,
	content
}: {
	subject: string;
	toEmail: string;
	content: JSX.Element;
}) => {
	const { html, attachments } = await renderToString(content);

	await transporter.sendMail({
		from: fromAddress,
		to: toEmail,
		subject: subject,
		html: html,
		attachments: attachments
	});
};
