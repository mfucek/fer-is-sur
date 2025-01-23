import { useMemo } from 'react';

import { Icon } from '@/global/components/icon';
import { StagedFile } from '@/modules/file/contexts/file-staging';

export const FilePreview = ({ file }: { file: StagedFile }) => {
	const { key, url } = file;

	const fileUrl = useMemo(() => {
		if (url) {
			return url;
		}

		return URL.createObjectURL(file.file);
	}, [file]);

	return (
		<div className="aspect-square relative overflow-hidden rounded-lg">
			<img
				src={fileUrl}
				className="object-cover absolute top-1/2 -translate-y-1/2"
				alt={key ?? 'New Image'}
			/>
			<div className="absolute bottom-0 right-0 p-2 pt-6 pl-6 bg-gradient-to-tl from-black/50 to-black/0 to-50%">
				{file.key ? (
					<Icon icon="cloud" className="bg-white" />
				) : (
					<Icon icon="cloud-slash" className="bg-white" />
				)}
			</div>
		</div>
	);
};
