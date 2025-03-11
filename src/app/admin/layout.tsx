import { Metadata } from 'next';

import { DashboardLayout } from '@/modules/dashboard/layouts/dashboard-layout';
import { environmentPrefix } from '@/modules/metadata/constants';

export const metadata: Metadata = {
	title: environmentPrefix() + 'Dashboard - Crni Mag',
	description: 'Admin dashboard for Crni Mag Likovne Radionice'
};

export default DashboardLayout;
