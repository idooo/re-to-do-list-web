import { ApiHelper } from '../../helpers/Api.helper';

export const MODIFY_TODO = 'MODIFY_TODO';
export const MODIFY_TODO_FAILED = 'MODIFY_TODO_FAILED';
export const COPY_TODO = 'COPY_TODO';
export const COPY_TODO_FAILED = 'COPY_TODO_FAILED';
export const ADD_TODO_STARTED = 'ADD_TODO_STARTED';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILED = 'ADD_TODO_FAILED';
export const LOAD_TODO_LIST = 'LOAD_TODO_LIST';


export const addToDo = (dateDelta, text) => {

	return async (dispatch) => {
		const temporaryId = `${Date.now()}${Math.random()}`;
		dispatch(addToDoStarted(temporaryId, {dateDelta, text}));
		try {
			const response = await ApiHelper.addToDoItem({dateDelta, text});
			const data = await response.json();
			dispatch(addToDoSuccess(temporaryId, data.item));
		}
		catch (ex) {
			dispatch(addToDoFailed(temporaryId, 'Unknown error'));
		}
	}
};

export const addToDoStarted = (temporaryId, item) => {
	return {
		type: ADD_TODO_STARTED,
		temporaryId,
		...item
	}
};

export const addToDoSuccess = (temporaryId, item) => {
	return {
		type: ADD_TODO_SUCCESS,
		temporaryId,
		item
	}
};

export const addToDoFailed = (temporaryId, error) => {
	return {
		type: ADD_TODO_FAILED,
		temporaryId,
		error
	}
};

export const modifyToDo = (_id, item) => {
	return {
		type: MODIFY_TODO,
		_id,
		item
	}
};

export const completeToDo = (_id) => {
	let item = {status: 'CLOSED'};

	return async (dispatch) => {
		dispatch(modifyToDo(_id, item));
		try {
			const response = await ApiHelper.updateToDo(_id, item);
			const data = await response.json();
		}
		catch (ex) {
			dispatch(modifyToDoFailed(_id, 'Unknown error'));
		}
	};
};


export const copyToDo = (_id, targetDateDelta) => {
	//
};

export const modifyToDoFailed = (_id, error) => {
	return {
		type: MODIFY_TODO_FAILED,
		_id,
		error
	}
};

export const loadToDoList = (toDoList) => {
	return {
		type: LOAD_TODO_LIST,
		toDoList
	}
};


export function fetchToDoList () {

	return async (dispatch) => {
		try {
			const response = await ApiHelper.getItems();
			const data = await response.json();
			dispatch(loadToDoList(data.items));
		}
		catch (ex) {
			console.error('parsing failed', ex)
		}
	}
}
