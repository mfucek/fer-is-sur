import { Icon } from '@/global/components/icon';
import { cn } from '@/lib/shadcn/utils';
import { FC } from 'react';
import { useUploadDialog } from '../hooks/use-upload-dialog';

export const AddFileButton: FC<{
	addFiles: (files: File[]) => void;
	className?: string;
}> = ({ addFiles, className }) => {
	const { openUploadDialog } = useUploadDialog(addFiles);

	return (
		<div
			className={cn(
				'flex items-center justify-center bg-neutral-weak md:hover:bg-neutral-medium duration-300 hover:duration-100 transition-all rounded-lg cursor-pointer clickable',
				className
			)}
			onClick={openUploadDialog}
		>
			<Icon icon="add-circle" className="size-8 bg-neutral-strong" />
		</div>
	);
};
