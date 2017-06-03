import { ApiHelper } from '../../helpers/Api.helper';

export const MODIFY_TODO = 'MODIFY_TODO';
export const MODIFY_TODO_FAILED = 'MODIFY_TODO_FAILED';
export const ADD_TODO_STARTED = 'ADD_TODO_STARTED';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILED = 'ADD_TODO_FAILED';
export const LOAD_TODO_LIST = 'LOAD_TODO_LIST';


export const addToDo = (text) => {

	return async (dispatch) => {
		const temporaryId = `${Date.now()}${Math.random()}`;
		dispatch(addToDoStarted(temporaryId, text));
		try {
			const response = await ApiHelper.addToDoItem(text);
			const data = await response.json();
			dispatch(addToDoSuccess(temporaryId, data.item));
		}
		catch (ex) {
			dispatch(addToDoFailed(temporaryId, 'Unknown error'));
		}
	}
};

export const addToDoStarted = (temporaryId, text) => {
	return {
		type: ADD_TODO_STARTED,
		temporaryId,
		text
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

export const modifyToDo = (item) => {
	return {
		type: MODIFY_TODO,
		item
	}
};

export const completeToDo = (item) => {
	return async (dispatch) => {
		dispatch(modifyToDo(item));
		try {
			const response = await ApiHelper.updateToDo(item);
			const data = await response.json();
		}
		catch (ex) {
			dispatch(modifyToDoFailed(item._id, 'Unknown error'));
		}
	};
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
