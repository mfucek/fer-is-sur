import { Metadata } from 'next';

import { isStaging } from '@/constants';
import { DashboardLayout } from '@/modules/dashboard/layouts/dashboard-layout';

const stagingPrefix = isStaging ? '[STG] ' : '';

export const metadata: Metadata = {
	title: stagingPrefix + 'Dashboard - Crni Mag',
	description: 'Admin dashboard for Crni Mag Likovne Radionice'
};

export default DashboardLayout;
