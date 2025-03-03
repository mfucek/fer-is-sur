export const hexRotateHue = (
	hex: string, // #ff0000
	value: number
) => {
	// Ensure hex is a valid format
	if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
		throw new Error('Invalid hex color format');
	}

	// Remove the '#' if present
	hex = hex.replace('#', '');

	// Convert hex to RGB
	const r = parseInt(hex.substring(0, 2), 16) / 255;
	const g = parseInt(hex.substring(2, 4), 16) / 255;
	const b = parseInt(hex.substring(4, 6), 16) / 255;

	// Convert RGB to HSL
	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h = 0,
		s = 0,
		l = (max + min) / 2;

	if (max !== min) {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	// Rotate the hue
	h = (h * 360 + (value * 360) / 255) % 360;
	if (h < 0) h += 360;
	h /= 360;

	// Convert HSL back to RGB
	function hueToRgb(p: number, q: number, t: number): number {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	}

	let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	let p = 2 * l - q;

	const rNew = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
	const gNew = Math.round(hueToRgb(p, q, h) * 255);
	const bNew = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);

	// Convert RGB back to hex
	return `#${rNew.toString(16).padStart(2, '0')}${gNew.toString(16).padStart(2, '0')}${bNew.toString(16).padStart(2, '0')}`;
};
