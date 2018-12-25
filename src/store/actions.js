import * as ACT from './action_constants';
export const actUpdateTaskList = (payload) => dispatch => {
	console.log('action creator UPDATE LIST ', payload)
	dispatch({
		type: ACT.ACT_UPDATE_TASK_LIST,
		payload: payload,
	})
}

export const actClearTaskList = (payload) => dispatch => {
	console.log('action creator UPDATE LIST ', payload)
	dispatch({
		type: ACT.ACT_CLEAR_TASK_LIST,
		payload: payload,
	})
}

/*
function actUpdateTaskList(payload) {
	return function (dispatch) {
		dispatch({
			type: 'SIMPLE_ACTION',
			payload: payload,
		});
		dispatch({
			type: 'OTHER_ACTION',
			payload: payload,
		});
	}
}
*/