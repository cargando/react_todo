export const rnd  = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

/* добавить ошибку в бокс */
export const insertErrInBox = (box, message) => {
	const errBox = {};
	if (Array.isArray(box)) {
		box.forEach((index, item) => {
			errBox[index] = message;
		});
	} else {
		errBox[box] = message;
	}
	return errBox;
};

/* обнулить конкретную ошибку в стеке в state */
export const clearErrBox = (thisObj, box = false) => {
	if (box === false) { // clear all boxes
		thisObj.setState({ errBox: {} });
	} else {
		const errBox = Object.assign({}, thisObj.state.errBox);
		delete errBox[box];
		thisObj.setState({ errBox });
	}
};

/* очистить стек ошибок в state */
export const clearErr = (thisObj, box = false) => {
	thisObj.setState({ errState: false });
	clearErrBox(thisObj, box);
};

/* добавить ошибку в стек ошибок в state */
export const fireErr = (thisObj, newBox) => {
	//console.log('FIREERROR: ', message, box, thisObj);
	const errBox = Object.assign({}, thisObj.state.errBox, newBox);

	thisObj.setState({
		errBox,
		errState: true,
	});
};