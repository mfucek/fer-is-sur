import { SWAY_FREQUENCY, SWAY_STRENGTH } from '../constants';
import { scaleCurve } from '../curves';
import { Particle } from '../types';
import { computeBezier } from '../utils/compute-bezier';
import { lerp } from '../utils/lerp';
import { offsetPoint } from '../utils/offset-point';
import { createParticle } from './create-particle';

export const updateParticles = (
	canvas: HTMLCanvasElement,
	particles: Particle[],
	mouse: { x: number; y: number } | null
) => {
	const time = Date.now();

	for (let i = 0; i < particles.length; i++) {
		const particle = particles[i]!;

		const age = time - particle.startTime;
		const maxAge = particle.endTime - particle.startTime;

		const t = age / maxAge;
		// console.log(`[${i}]: ${t.toFixed(2)} ${age} ${maxAge}`);
		if (time >= particle.endTime) {
			// reset particle
			particles[i] = createParticle(canvas);
			continue;
		}

		particle.y = lerp(particle.yStart, particle.yEnd, t ** 8);
		particle.x =
			particle.xStart +
			Math.sin(t * Math.PI * 2 * SWAY_FREQUENCY + particle.swayOffset) *
				SWAY_STRENGTH;

		if (mouse) {
			const newPoint = offsetPoint({
				point: { x: particle.x, y: particle.y },
				offsetOrigin: mouse
			});

			particle.x = newPoint.x;
			particle.y = newPoint.y;
		}

		particle.opacity = 0.2;
		particle.size = particle.maxSize * computeBezier(t, scaleCurve).y;

		// const random0To1 = (Math.random() + 1) / 2;
		// const flickerTrigger = random0To1 > 0.999 ? 1 : 0;
		// particle.color = mixHex(particle.baseColor, '#3c00ff', flickerTrigger);
		particle.color = particle.baseColor;
	}
};
