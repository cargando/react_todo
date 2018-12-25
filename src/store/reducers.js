import { combineReducers } from 'redux';

const defaultState = {
	tasks: [],
}


const mainReducer = (state = defaultState, action) => {
	console.log('IN mainReducer', action)
	switch (action.type) {
		case 'SIMPLE_ACTION':
			return {
				tasks: action.payload,
			};
		default:
			return state
	}
};

export default combineReducers({
	appData: mainReducer,
});