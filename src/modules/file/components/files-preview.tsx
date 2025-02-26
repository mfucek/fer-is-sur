'use client';

import { useFileStagingContext } from '../contexts/file-staging';
import { UploadArea } from '../hooks/use-upload-area';
import { AddFileButton } from './add-file-button';
import { FilePreview } from './file-preview';

export const FilesPreview = () => {
	const { files, addFiles } = useFileStagingContext();

	return (
		<UploadArea
			className="border border-neutral-medium rounded-xl max-h-[400px] overflow-y-auto"
			addFiles={addFiles}
		>
			<div className="grid grid-cols-2 xs:grid-cols-4 gap-2 p-4">
				{files.map((file, i) => (
					<FilePreview key={file.name + i} file={file} index={i} />
				))}

				<AddFileButton addFiles={addFiles} className="aspect-square" />
			</div>
		</UploadArea>
	);
};
