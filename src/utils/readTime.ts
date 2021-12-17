export const readTime = (text: string) => {
	const wpm = 200; //Words per minute
	const words = text.trim().split(/\s+/).length;

	return Math.ceil(words / wpm);
};
