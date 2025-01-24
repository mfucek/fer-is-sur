import { Icon } from '@/global/components/icon';
import { Button } from '@/lib/shadcn/ui/button';
import { AddFileButton } from '@/modules/file/components/add-file-button';
import { useFileStagingContext } from '@/modules/file/contexts/file-staging';
import { useMemo } from 'react';

export const CoverPreview = () => {
	const { files, setFiles } = useFileStagingContext();

	const coverFile = files[0] ?? null;

	const coverUrl = useMemo(() => {
		// No file case
		if (!coverFile) {
			return null;
		}

		// Remote file case
		if (coverFile.url) {
			return coverFile.url;
		}

		// Local file case
		return URL.createObjectURL(coverFile.file);
	}, [coverFile]);

	const handleRemoveFile = () => {
		setFiles([]);
	};

	const handleAddFile = (files: File[]) => {
		const file = files[0];

		if (!file) return;

		setFiles([file]);
	};

	if (!coverUrl)
		return (
			<AddFileButton
				addFiles={handleAddFile}
				className="w-[160px] aspect-[3/4] shrink-0"
			/>
		);

	return (
		<div className="w-[160px] aspect-[3/4] shrink-0 rounded-lg bg-neutral-weak flex items-center justify-center overflow-hidden relative">
			<img
				src={coverUrl}
				className="object-cover w-full h-full"
				alt={'New Image'}
			/>

			{/* Remove button */}
			<div className="absolute top-0 right-0 p-2 transition-opacity duration-300 bg-gradient-to-bl from-black/50 to-black/0 to-50%">
				<Button
					variant="solid-weak"
					theme="danger"
					iconOnly
					onClick={handleRemoveFile}
				>
					<Icon icon="trash" />
				</Button>
			</div>
		</div>
	);
};
