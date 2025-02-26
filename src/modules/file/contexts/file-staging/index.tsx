'use client';

import { useToast } from '@/deps/shadcn/ui/use-toast';
import { api } from '@/deps/trpc/react';
import {
	type FC,
	type ReactNode,
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
	setFiles: (files: File[]) => void;
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

	const [stagedFiles, setStagedFiles] = useState<StagedFile[]>(
		defaultData.files
	);
	const { mutateAsync: makeUploadUrl } = api.file.makeUploadUrl.useMutation();
	const { mutateAsync: makeDownloadUrl } =
		api.file.makeDownloadUrl.useMutation();

	const addFiles = (newFiles: File[]) => {
		const sanitizedFiles = newFiles.map((file) => {
			try {
				const sanitizedFile = fileToStagedFile(file);

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

		setStagedFiles([...stagedFiles, ...filteredSanitizedFiles]);
	};

	const updateFile = (updateIndex: number, update: Partial<StagedFile>) => {
		setStagedFiles(
			stagedFiles.map((file, index) =>
				index === updateIndex ? { ...file, ...update } : file
			)
		);
	};

	const removeFile = (removeIndex: number) => {
		setStagedFiles(stagedFiles.filter((_, i) => i !== removeIndex));
	};

	const uploadFiles = async () => {
		// Make sure all files are uploaded by uploading files without a key
		const uploadedFiles = await Promise.all(
			stagedFiles.map(async (file, index) => {
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
		const existingKeys = stagedFiles.map((file) => file.key);

		for (const key of keys) {
			if (existingKeys.includes(key)) {
				continue;
			}

			const { url } = await makeDownloadUrl({ key });

			newFiles.push({ key, name: key, file: new File([], '_tmp'), url });
		}

		setStagedFiles((files) => newFiles);
	};

	const setFiles = (newFiles: File[]) => {
		const sanitizedFiles = newFiles.map((file) => {
			try {
				const sanitizedFile = fileToStagedFile(file);

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

		setStagedFiles([...filteredSanitizedFiles]);
	};

	useImperativeHandle(ref, () => ({
		files: stagedFiles,
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
				files: stagedFiles,
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
