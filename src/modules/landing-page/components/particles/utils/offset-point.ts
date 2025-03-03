import { Point } from '../types';

export const offsetPoint = ({
	point,
	offsetOrigin,
	strength,
	offsetRadius
}: {
	point: Point;
	offsetOrigin: Point;
	strength: number;
	offsetRadius: number;
}) => {
	const dx = point.x - offsetOrigin.x;
	const dy = point.y - offsetOrigin.y;

	const distance = Math.sqrt(dx * dx + dy * dy);

	if (distance > offsetRadius) {
		return point;
	}

	const offsetAmount = ((offsetRadius - distance) / distance) ** strength;

	const offsetX = dx * offsetAmount;
	const offsetY = dy * offsetAmount;

	return {
		x: point.x + offsetX,
		y: point.y + offsetY
	};
};
