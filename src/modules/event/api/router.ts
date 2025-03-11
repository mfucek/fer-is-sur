import { createTRPCRouter } from '@/deps/trpc/trpc';
import { createProcedure } from './procedures/create';
import { deleteProcedure } from './procedures/delete';
import { getProcedure } from './procedures/get';
import { getCoverProcedure } from './procedures/get-cover';
import { getDaysUntilNextEventProcedure } from './procedures/get-days-until-next-event';
import { getEventDatesProcedure } from './procedures/get-event-dates';
import { getGalleryProcedure } from './procedures/get-gallery';
import { listProcedure } from './procedures/list';
import { listShowcaseProcedure } from './procedures/list-showcase';
import { updateProcedure } from './procedures/update';
import { updateCoverProcedure } from './procedures/update-cover';
import { updateGalleryProcedure } from './procedures/update-gallery';

export const eventRouter = createTRPCRouter({
	list: listProcedure,
	get: getProcedure,
	create: createProcedure,
	update: updateProcedure,
	delete: deleteProcedure,
	gallery: createTRPCRouter({
		update: updateGalleryProcedure,
		get: getGalleryProcedure
	}),
	cover: createTRPCRouter({
		get: getCoverProcedure,
		update: updateCoverProcedure
	}),
	showcase: createTRPCRouter({
		list: listShowcaseProcedure
	}),
	getEventDates: getEventDatesProcedure,
	getDaysUntilNextEvent: getDaysUntilNextEventProcedure
});
