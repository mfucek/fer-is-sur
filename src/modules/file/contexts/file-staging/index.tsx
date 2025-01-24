'use client';

import { useToast } from '@/lib/shadcn/ui/use-toast';
import { api } from '@/lib/trpc/react';
import {
	type Dispatch,
	type FC,
	type ReactNode,
	type SetStateAction,
	createContext,
	useContext,
	useImperativeHandle,
	useState
} from 'react';

const fileToStagedFile = (file: File): StagedFile => {
	return {
		file,
		name: file.name,
		key: null,
		url: null
	};
};

export type StagedFile = {
	file: File;
	name: string;
	key: string | null;
	url: string | null;
};

const defaultData = {
	files: [],
	fileDetailsIndex: null
};

export type FileStagingContextType = {
	files: StagedFile[];
	setFiles: Dispatch<SetStateAction<StagedFile[]>>;
	addFiles: (files: File[]) => void;
	removeFile: (index: number) => void;
	updateFile: (index: number, update: Partial<StagedFile>) => void;
	uploadFiles: () => Promise<StagedFile[]>;
	setFilesFromKeys: (keys: string[]) => Promise<void>;
};

const FileStagingContext = createContext<FileStagingContextType>({
	...defaultData,
	setFiles: () => [],
	addFiles: () => {},
	removeFile: () => {},
	updateFile: () => {},
	uploadFiles: async () => [],
	setFilesFromKeys: async () => {}
});

export const useFileStagingContext = () => {
	const context = useContext(FileStagingContext);

	if (!context) {
		throw new Error(
			'useFileStagingContext must be used within a FileStagingProvider'
		);
	}

	return context;
};

export const FileStagingProvider: FC<{
	children: ReactNode;
	ref?: React.RefObject<FileStagingContextType>;
}> = ({ children, ref }) => {
	const { toast } = useToast();

	const [files, setFiles] = useState<StagedFile[]>(defaultData.files);
	const { mutateAsync: makeUploadUrl } = api.file.makeUploadUrl.useMutation();
	const { mutateAsync: getDownloadUrl } = api.file.getDownloadUrl.useMutation();

	const addFiles = (
		newFiles: File[],
		opts?: { openFileDetailsDialog?: boolean }
	) => {
		let firstDocumentIndex: number | null = null;

		const sanitizedFiles = newFiles.map((file, i) => {
			try {
				const sanitizedFile = fileToStagedFile(file);

				firstDocumentIndex = firstDocumentIndex
					? firstDocumentIndex
					: files.length + i;

				return sanitizedFile;
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				toast({
					title: 'Nedopušteni tip datoteke',
					description: 'Dopušteni tipovi datoteka su: png, jpeg, pdf, zip',
					variant: 'danger'
				});
				return null;
			}
		});

		const filteredSanitizedFiles = sanitizedFiles.filter(
			(file): file is StagedFile => file !== null
		);

		setFiles([...files, ...filteredSanitizedFiles]);
	};

	const updateFile = (updateIndex: number, update: Partial<StagedFile>) => {
		setFiles(
			files.map((file, index) =>
				index === updateIndex ? { ...file, ...update } : file
			)
		);
	};

	const removeFile = (removeIndex: number) => {
		setFiles(files.filter((_, i) => i !== removeIndex));
	};

	const uploadFiles = async () => {
		// Make sure all files are uploaded by uploading files without a key
		const uploadedFiles = await Promise.all(
			files.map(async (file, index) => {
				if (file.key) {
					return file;
				}

				const { url, key } = await makeUploadUrl();

				// upload file to s3
				await fetch(url, {
					method: 'PUT',
					body: file.file,
					headers: { 'Content-Type': file.file.type }
				});

				updateFile(index, { ...file, key });

				return { ...file, key };
			})
		);

		return uploadedFiles;
	};

	const setFilesFromKeys = async (keys: string[]) => {
		const newFiles: StagedFile[] = [];
		const existingKeys = files.map((file) => file.key);

		for (const key of keys) {
			if (existingKeys.includes(key)) {
				continue;
			}

			const { url } = await getDownloadUrl({ key });

			newFiles.push({ key, name: key, file: new File([], '_tmp'), url });
		}

		setFiles((files) => newFiles);
	};

	useImperativeHandle(ref, () => ({
		files,
		setFiles,
		addFiles,
		removeFile,
		updateFile,
		uploadFiles,
		setFilesFromKeys
	}));

	return (
		<FileStagingContext.Provider
			value={{
				files,
				setFiles,
				addFiles,
				removeFile,
				updateFile,
				uploadFiles,
				setFilesFromKeys
			}}
		>
			{children}
		</FileStagingContext.Provider>
	);
};
