// Extract all src attributes from img tags in the html
// and replace them with cid:${cidCounter++}
export const extractSrcFromImgTags = (html: string) => {
	let cidCounter = 0;
	const cidSrcMap: Record<string, string> = {};
	const srcInImgTagRegex = /<img[^>]*src="([^"]+)"[^>]*>/g;

	const replaced = html.replace(srcInImgTagRegex, (match, src) => {
		console.log(match);

		const cidKey = 'img-' + cidCounter++;

		const cid = `cid:${cidKey}`;
		cidSrcMap[cidKey] = src;

		return match.replace(src, cid);
	});

	return { html: replaced, cidSrcMap };
};
