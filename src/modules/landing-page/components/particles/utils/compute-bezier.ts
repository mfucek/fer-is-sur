import { Point } from '../types';

export const computeBezier = (
	_t: number,
	points: [Point, Point, Point, Point]
) => {
	const [p0, p1, p2, p3] = points;

	const t = Math.max(0, Math.min(_t, 1));
	const t2 = t * t;
	const t3 = t * t * t;

	const ti = 1 - t;
	const ti2 = ti * ti;
	const ti3 = ti * ti * ti;

	const x = ti3 * p0.x + 3 * ti2 * t * p1.x + 3 * ti * t2 * p2.x + t3 * p3.x;
	const y = ti3 * p0.y + 3 * ti2 * t * p1.y + 3 * ti * t2 * p2.y + t3 * p3.y;

	return { x, y };
};
