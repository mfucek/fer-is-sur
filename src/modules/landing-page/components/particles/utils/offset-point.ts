import { MOUSE_RADIUS, MOUSE_STRENGTH } from '../constants';
import { Point } from '../types';
import { lerp } from './lerp';

export const offsetPoint = ({
	point,
	offsetOrigin
}: {
	point: Point;
	offsetOrigin: Point;
}) => {
	const dx = point.x - offsetOrigin.x;
	const dy = point.y - offsetOrigin.y;

	const distance = Math.sqrt(dx * dx + dy * dy);

	// if (distance > MOUSE_RADIUS) {
	// 	return point;
	// }

	// const offsetAmount = ((offsetRadius - distance) / distance) ** strength;

	// const offsetX = -dx * offsetAmount;
	// const offsetY = -dy * offsetAmount;

	// return {
	// 	x: point.x + offsetX,
	// 	y: point.y + offsetY
	// };

	const t = 1 - distance / MOUSE_RADIUS;
	const strength = lerp(0, t, MOUSE_STRENGTH);

	const newX = lerp(point.x, offsetOrigin.x, strength);
	const newY = lerp(point.y, offsetOrigin.y, strength);

	return {
		x: newX,
		y: newY
	};
};
