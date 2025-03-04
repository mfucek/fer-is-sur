import { Particle } from '../types';

export const drawParticles = (
	canvas: HTMLCanvasElement,
	particles: Particle[],
	mouse: { x: number; y: number; hovering: boolean }
) => {
	const ctx = canvas.getContext('2d');

	if (!ctx) return;

	// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// draw particles
	for (const particle of particles) {
		const opacityHex = (particle.opacity * 255)
			.toString(16)
			.padStart(2, '0')
			.split('.')[0];

		ctx.fillStyle = `${particle.color}${opacityHex}`;

		ctx.beginPath();
		ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}

	// // draw mouse
	// if (mouse) {
	// 	console.log(mouse.x, mouse.y);

	// 	ctx.strokeStyle = '#ff0000';
	// 	ctx.beginPath();
	// 	ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2);
	// 	ctx.closePath();
	// 	ctx.stroke();
	// }

	// draw spawn area
	// const spawnArea = getSpawnArea();
	// ctx.fillStyle = '#0f04';
	// ctx.fillRect(
	// 	spawnArea.fromX,
	// 	spawnArea.fromY,
	// 	spawnArea.toX - spawnArea.fromX,
	// 	spawnArea.toY - spawnArea.fromY
	// );
};
