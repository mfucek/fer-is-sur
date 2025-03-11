import { isDevelopment, isStaging } from '@/constants';

export const environmentPrefix = () => {
	if (isDevelopment) return '[DEV] ';
	if (isStaging) return '[STG] ';
	return '';
};
