export const rnd  = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};