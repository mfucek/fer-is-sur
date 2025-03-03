export const lerp = (min: number, max: number, t: number) => {
	const _t = Math.max(0, Math.min(t, 1));
	return _t * (max - min) + min;
};
