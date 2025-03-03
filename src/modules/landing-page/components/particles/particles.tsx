import { cn } from '@/deps/shadcn/utils';
import {
	FC,
	HTMLAttributes,
	PropsWithChildren,
	useEffect,
	useRef
} from 'react';
import {
	BOTTOM_PADDING,
	NUM_PARTICLES,
	SIDE_PADDING,
	TOP_PADDING
} from './constants';
import { createParticle } from './helpers/create-particle';
import { drawParticles } from './helpers/draw-particles';
import { updateParticles } from './helpers/update-particles';
import { Particle } from './types';

let mouse: { x: number; y: number } | null = null;

export const Particles: FC<
	HTMLAttributes<HTMLDivElement> & PropsWithChildren
> = ({ children, className }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const particles: Particle[] = [];

	const handleResize = () => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		if (!ctx) return;

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
	};

	useEffect(() => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		if (!ctx) return;

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		for (let i = 0; i < NUM_PARTICLES; i++) {
			particles.push(createParticle(canvas, true));
		}

		const update = () => {
			updateParticles(canvas, particles, mouse);
			drawParticles(canvas, particles, mouse);

			requestAnimationFrame(update);
		};

		requestAnimationFrame(update);

		const controller = new AbortController();
		window.addEventListener('resize', handleResize, {
			signal: controller.signal
		});

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<div
			className={cn('relative', className)}
			onPointerLeave={() => (mouse = null)}
			onPointerMove={(e) => {
				if (!canvasRef.current) return;

				const rect = canvasRef.current.getBoundingClientRect();

				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				mouse = { x, y };
			}}
		>
			<canvas
				className={cn('absolute')}
				style={{
					top: `-${TOP_PADDING}px`,
					left: `-${SIDE_PADDING}px`,
					width: `calc(100% + ${SIDE_PADDING * 2}px)`,
					height: `calc(100% + ${TOP_PADDING + BOTTOM_PADDING}px)`,
					filter: 'blur(2px)'
				}}
				ref={canvasRef}
				onPointerMove={(e) => {
					if (!canvasRef.current) return;

					const rect = canvasRef.current.getBoundingClientRect();

					const x = e.clientX - rect.left;
					const y = e.clientY - rect.top;

					mouse = { x, y };
					e.stopPropagation();
				}}
			/>
			{children}
		</div>
	);
};
