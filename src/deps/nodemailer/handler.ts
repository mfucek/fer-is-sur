import { env } from '@/env';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

export const postHandler = async (request: Request) => {
	const { subject, toEmail, rawHtml } = await request.json();

	console.log('\n\nSEND MAIL\n\n');

	console.log('subject: ', subject);
	console.log('toEmail: ', toEmail);

	await transporter.sendMail({
		from: `Crni Mag 🎨 <${fromAddress}>`,
		to: toEmail,
		subject: subject,
		html: rawHtml
	});

	return NextResponse.json({ success: true }, { status: 200 });
};
