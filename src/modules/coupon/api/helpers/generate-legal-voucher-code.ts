import { PrismaClient } from '@prisma/client';

const generateVowel = () =>
	['a', 'e', 'i', 'o', 'u'][Math.floor(Math.random() * 5)]!;

const generateConsonant = () =>
	[
		'b',
		'c',
		'd',
		'f',
		'g',
		'h',
		'j',
		'k',
		'l',
		'm',
		'n',
		'p',
		'q',
		'r',
		's',
		't',
		'v'
	][Math.floor(Math.random() * 17)]!;

const generateTwoDigits = () =>
	new Array(2)
		.fill(0)
		.map(() => Math.floor(Math.random() * 10))
		.join('');

const generateCouponCode = () =>
	new Array(3)
		.fill(0)
		.map((_, i) => generateConsonant() + generateVowel())
		.join('')
		.toUpperCase() + generateTwoDigits();

export const generateLegalVoucherCode = async (
	db: PrismaClient
): Promise<string> => {
	console.log('generateLegalVoucherCode');

	let code: string;
	let codeExistsInDb = true;

	do {
		code = generateCouponCode();
		codeExistsInDb = (await db.coupon.count({ where: { code } })) != 0;
		console.log('try: ', code);
	} while (codeExistsInDb);

	console.log('code: ', code);

	return code;
};
