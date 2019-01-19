import { combineReducers } from 'redux';
import * as ACT from './action_constants';

const defaultState = {
	tasks: [
		{
			id: 23,
			title: 'First UNO DOS FirstItem',
			date: '15.12.2018',
			archive: true,
		},
		{
			id: 11,
			title: 'Seccond  Item',
			date: '25.12.2018',
		},
		{
			id: 16,
			title: 'One more Item',
			date: '31.12.2018',
			urgent: true,
		},
	],
};


const mainReducer = (state = defaultState, action) => {
	console.log('IN mainReducer', action);
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
