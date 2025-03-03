import { BOTTOM_PADDING, SIDE_PADDING, TOP_PADDING } from '../constants';

export const getSpawnArea = (canvas: HTMLCanvasElement) => {
	return {
		fromX: SIDE_PADDING,
		toX: canvas.width - SIDE_PADDING,
		fromY: TOP_PADDING,
		toY: canvas.height - BOTTOM_PADDING
	};
};
