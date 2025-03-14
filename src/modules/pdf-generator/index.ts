// import { t } from '@/lib/trpc/server';
// import { renderToBuffer } from '@joshuajaco/react-pdf-renderer-bundled';
// import { ManualDocument } from '../components/organisms/ManualDocument';
// import { manualDocumentSchema } from '../types/ManualData';

// export const documentRouter = t.router({
// 	generate: t.procedure
// 		.input(manualDocumentSchema)
// 		.mutation(async ({ input: data }) => {
// 			const buffer = await renderToBuffer(<ManualDocument data={data} />);

// 			const base64 = buffer.toString('base64');

// 			const mediaType = 'data:application/pdf;base64,';

// 			const fileName =
// 				data.order.date
// 					.toISOString()
// 					.replace(/T.*/, '')
// 					.split('-')
// 					.reverse()
// 					.join('-') +
// 				'-' +
// 				data.order.orderId +
// 				'.pdf';

// 			return {
// 				fileName,
// 				base64: mediaType + base64
// 			};
// 		})
// });
