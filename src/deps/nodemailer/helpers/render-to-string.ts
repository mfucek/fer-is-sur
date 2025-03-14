import { extractSrcFromImgTags } from './extract-src-from-img-tags';
import { formatHTML } from './format-html';
import { inlineTailwindColors } from './inline-tailwind-colors';
import { inlineTailwindStyles } from './inline-tailwind-into-styles';

export const renderToString = async (content: JSX.Element) => {
	const ReactDOMServer = (await import('react-dom/server')).default;

	let html =
		'<!doctype html>' + ReactDOMServer.renderToStaticMarkup(content as any);

	html = await inlineTailwindColors(html);
	console.log('inlined colors');

	html = await inlineTailwindStyles(html);
	console.log('inlined styles');

	html = formatHTML(html);
	console.log('formatted html');
	// await writeFile('/tmp/formatted-html.html', html);

	const { html: htmlWithCids, cidSrcMap } = extractSrcFromImgTags(html);
	html = htmlWithCids;
	console.log('extracted srcs');
	// await writeFile('/tmp/extracted-srcs.html', html);

	const attachments = Object.entries(cidSrcMap).map(([cid, src]) => {
		console.log({
			cid,
			path: src,
			filename: cid + '.png'
		});

		return {
			cid,
			path: src,
			filename: cid + '.png'
		};
	});

	return {
		html,
		attachments
	};
};
