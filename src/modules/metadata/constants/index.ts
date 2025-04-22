import { isDevelopment, isProduction, isStaging } from '@/constants';

export const environmentPrefix = () => {
	if (isDevelopment) return '[DEV] ';
	if (isStaging) return '[STG] ';
	if (isProduction) return '';
	return '';
};
