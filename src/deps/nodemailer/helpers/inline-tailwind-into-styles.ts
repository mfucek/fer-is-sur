import { writeFile } from 'fs/promises';
import { makeStylesInline } from 'tailwind-to-inline';
import { formatHTML } from './format-html';

export const inlineTailwindStyles = async (html: string) => {
	await writeFile('/tmp/tw-to-inline.html', formatHTML(html));

	return await makeStylesInline('/tmp/tw-to-inline.html');
};
