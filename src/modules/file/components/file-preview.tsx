import { useMemo } from 'react';

import { Icon } from '@/global/components/icon';
import { Button } from '@/lib/shadcn/ui/button';
import {
	StagedFile,
	useFileStagingContext
} from '@/modules/file/contexts/file-staging';

export const FilePreview = ({
	file,
	index
}: {
	file: StagedFile;
	index: number;
}) => {
	const { removeFile } = useFileStagingContext();

	const fileUrl = useMemo(() => {
		// Remote file case
		if (file.url) {
			return file.url;
		}

		// Local file case
		return URL.createObjectURL(file.file);
	}, [file]);

	const handleRemoveFile = () => {
		removeFile(index);
	};

	return (
		<div className="aspect-square relative overflow-hidden rounded-lg group bg-neutral-medium">
			<img
				src={fileUrl}
				className="object-cover w-full h-full"
				alt={file.key ?? 'New Image'}
			/>

			{/* Upload status */}
			<div className="absolute bottom-0 right-0 p-4 pt-6 pl-6 bg-gradient-to-tl from-black/50 to-black/0 to-50%">
				{file.key ? (
					<Icon icon="cloud" className="bg-white" />
				) : (
					<Icon icon="cloud-slash" className="bg-white" />
				)}
			</div>

			{/* Remove button */}
			<div className="absolute top-0 right-0 p-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300 bg-gradient-to-bl from-black/50 to-black/0 to-50%">
				<Button
					variant="solid-weak"
					theme="danger"
					singleIcon="trash"
					onClick={handleRemoveFile}
				/>
			</div>
		</div>
	);
};
