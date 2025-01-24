'use client';

import { Icon } from '@/global/components/icon';
import { useFileStagingContext } from '../contexts/file-staging';
import { UploadArea } from '../hooks/use-upload-area';
import { useUploadDialog } from '../hooks/use-upload-dialog';
import { FilePreview } from './file-preview';

export const FilesPreview = () => {
	const { files, addFiles } = useFileStagingContext();
	const { openUploadDialog } = useUploadDialog(addFiles);

	return (
		<UploadArea
			className="border border-neutral-medium rounded-xl max-h-[400px] overflow-y-auto"
			addFiles={addFiles}
		>
			<div className="grid grid-cols-4 gap-2 p-4">
				{files.map((file, i) => (
					<FilePreview key={file.name + i} file={file} index={i} />
				))}

				<div
					className="aspect-square flex items-center justify-center bg-neutral-weak md:hover:bg-neutral-medium duration-300 hover:duration-100 transition-all rounded-lg cursor-pointer clickable"
					onClick={openUploadDialog}
				>
					<Icon icon="add-circle" size={32} className="bg-neutral-strong" />
				</div>
			</div>
		</UploadArea>
	);
};
