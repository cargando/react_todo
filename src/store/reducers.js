import { combineReducers } from 'redux';
import * as ACT from './action_constants';

const defaultState = {
	tasks: [],
};


const mainReducer = (state = defaultState, action) => {
	console.log('IN mainReducer', action)
	switch (action.type) {
		case ACT.ACT_UPDATE_TASK_LIST:
			return {
				tasks: action.payload,
			};
		case ACT.ACT_CLEAR_TASK_LIST:
			return {
				tasks: [],
			};
		default:
			return state
	}
};

export default combineReducers({
	appData: mainReducer,
});