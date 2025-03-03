export const mixHex = (hex1: string, hex2: string, amount: number) => {
	const _hex1 = hex1.replace('#', '');
	const _hex2 = hex2.replace('#', '');

	const r1 = parseInt(_hex1.substring(0, 2), 16);
	const g1 = parseInt(_hex1.substring(2, 4), 16);
	const b1 = parseInt(_hex1.substring(4, 6), 16);

	const r2 = parseInt(_hex2.substring(0, 2), 16);
	const g2 = parseInt(_hex2.substring(2, 4), 16);
	const b2 = parseInt(_hex2.substring(4, 6), 16);

	const r = Math.round(r1 * (1 - amount) + r2 * amount);
	const g = Math.round(g1 * (1 - amount) + g2 * amount);
	const b = Math.round(b1 * (1 - amount) + b2 * amount);

	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};
