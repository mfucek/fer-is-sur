import { cn } from '@/deps/shadcn/utils';
import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useEffect,
	useRef,
	useState
} from 'react';

/* Context */

const actionsSizeContext = createContext<{
	size: number;
	setSize: (size: number) => void;
}>({
	size: 0,
	setSize: () => {}
});
const ActionsSizeProvider: FC<PropsWithChildren> = ({ children }) => {
	const [size, setSize] = useState(0);

	return (
		<actionsSizeContext.Provider value={{ size, setSize }}>
			{children}
		</actionsSizeContext.Provider>
	);
};
const useActionsSizeContext = () => useContext(actionsSizeContext);

/* Components */

export const List: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ActionsSizeProvider>
			<div className="flex flex-col gap-2">{children}</div>
		</ActionsSizeProvider>
	);
};
export const Labels: FC<PropsWithChildren> = ({ children }) => {
	return <div className="flex flex-row gap-2 px-4">{children}</div>;
};
export const Label: FC<PropsWithChildren> = ({ children }) => {
	return <div className="caption text-neutral-strong w-full">{children}</div>;
};
export const ActionsLabel = () => {
	const { size } = useActionsSizeContext();
	return (
		<div
			className="caption text-neutral-strong text-right shrink-0"
			style={{
				...(size ? { width: size } : {})
			}}
		>
			Actions
		</div>
	);
};

export const Items: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col gap-2 bg-section rounded-xl">{children}</div>
	);
};
export const Item: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-row items-center gap-2 px-4 py-4">{children}</div>
	);
};
export const Content: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-row items-center gap-2 flex-1">{children}</div>
	);
};
export const Data: FC<
	PropsWithChildren & { strong?: boolean; className?: string }
> = ({ children, strong, className }) => {
	return (
		<div
			className={cn(
				'body-2 text-neutral flex-1',
				strong && 'text-neutral font-bold',
				className
			)}
		>
			{children}
		</div>
	);
};
export const Actions: FC<PropsWithChildren> = ({ children }) => {
	const { setSize } = useActionsSizeContext();

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateWidth = () => {
			if (ref.current) {
				setSize(ref.current.offsetWidth);
			}
		};

		updateWidth();
		window.addEventListener('resize', updateWidth);
		return () => window.removeEventListener('resize', updateWidth);
	}, []);

	return (
		<div
			ref={ref}
			className="flex flex-row items-center gap-2 shrink-0"
			onClick={(e) => e.stopPropagation()}
		>
			{children}
		</div>
	);
};
