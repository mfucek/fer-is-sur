import {
	PARTICLE_COLOR,
	PARTICLE_HUE_VARIANCE,
	PARTICLE_LIFETIME,
	PARTICLE_LIFETIME_VARIANCE,
	PARTICLE_SIZE,
	PARTICLE_SIZE_VARIANCE,
	Y_LENGTH
} from '../constants';
import { Particle } from '../types';
import { hexRotateHue } from '../utils/hex-rotate-hue';
import { randomInRange } from '../utils/random-in-range';
import { getSpawnArea } from './get-spawn-area';

export const createParticle = (
	canvas: HTMLCanvasElement,
	randomAge?: boolean
): Particle => {
	// console.log('create');
	const spawnArea = getSpawnArea(canvas);

	const xStart = randomInRange(spawnArea.fromX + 5, spawnArea.toX - 5);
	const yStart = randomInRange(spawnArea.fromY + 5, spawnArea.toY - 5);

	const yEnd = yStart - Y_LENGTH; //randomInRange(canvas.height / 4, canvas.height / 2);

	const time = Date.now();

	let startTime = time;
	let endTime =
		startTime + PARTICLE_LIFETIME + Math.random() * PARTICLE_LIFETIME_VARIANCE;
	const lifeTime = endTime - startTime;

	if (randomAge) {
		const timeOffset = PARTICLE_LIFETIME * Math.random();

		startTime += timeOffset;
		endTime += timeOffset;
	}

	return {
		x: 0, // computed
		y: 0, // computed

		xStart: xStart,
		yStart: yStart,
		yEnd: yEnd,

		startTime,
		endTime,

		maxSize: PARTICLE_SIZE + Math.random() * PARTICLE_SIZE_VARIANCE,
		size: 0, // computed

		baseColor: hexRotateHue(
			PARTICLE_COLOR,
			Math.random() * PARTICLE_HUE_VARIANCE
		),
		opacity: 0, // computed
		color: '', // computed

		swayOffset: Math.random() * 2 * Math.PI
	};
};
