import { readFile } from 'fs/promises';
import path from 'path';

export const inlineTailwindColors = async (html: string) => {
	const colorsStylesheet = await readFile(
		path.join(process.cwd(), 'src', 'styles', 'colors.css'),
		'utf-8'
	);

	const colors: Record<string, string> = {};

	const lightThemeStyles = colorsStylesheet
		.split('@theme {')[1]!
		.split('}')[0]!;

	lightThemeStyles.split(';').forEach((pair) => {
		const [colorVariable, colorValue] = pair.split(': ');

		if (pair.includes(': ')) {
			const key = colorVariable!.split('--color-')[1]!.trim();
			const value = colorValue!.trim();

			colors[key] = value;
		}
	});

	// sort the keys by the number of dashes in the key in descending order
	const colorKeys = Object.keys(colors).sort(
		(a, b) => b.split('-').length - a.split('-').length
	);

	// replace all occurences of a key from colors with the assigned value in the colors object surrounded by []
	// e.g. "test bg-accent" -> "test bg-[#ff0000]"
	const htmlWithColors = html.replace(
		new RegExp(`(${colorKeys.join('|')})`, 'g'),
		(match) => `[${colors[match]}]`
	);

	return htmlWithColors;
};
