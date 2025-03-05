import { publicProcedure } from '@/deps/trpc/procedures';
import { PrismaClient } from '@prisma/client';
import { couponCreateSchema } from '../../schemas/coupon-create-schema';

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

const generateLegalVoucherCode = async (db: PrismaClient): Promise<string> => {
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
export const createCouponProcedure = publicProcedure
	.input(couponCreateSchema)
	.mutation(async ({ ctx, input }) => {
		const { code, discountPercent, discountAmount, expiresAt, maxUses } = input;

		let finalCode = code ?? '';

		if (!code) {
			console.log('no code was provided, generating legal voucher code');

			finalCode = await generateLegalVoucherCode(ctx.db);
		}

		const coupon = await ctx.db.coupon.create({
			data: {
				code: finalCode.toUpperCase(),
				discountPercent,
				discountAmount,
				maxUses: maxUses ?? 0,
				expiresAt
			}
		});

		return coupon;
	});
