export type Particle = {
	x: number;
	y: number;

	xStart: number;
	yStart: number;
	yEnd: number;

	startTime: number;
	endTime: number;

	maxSize: number;
	size: number;

	baseColor: string;
	opacity: number;
	color: string;

	swayOffset: number;
};
export type Point = {
	x: number;
	y: number;
};
