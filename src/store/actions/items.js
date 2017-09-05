import APIService from '../../services/API';

export const MODIFY_TODO = 'MODIFY_TODO';
export const MODIFY_TODO_FAILED = 'MODIFY_TODO_FAILED';
export const MODIFY_TODO_SUCCEED = 'MODIFY_TODO_SUCCEED';
export const ADD_TODO_STARTED = 'ADD_TODO_STARTED';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILED = 'ADD_TODO_FAILED';
export const LOAD_TODO_LIST = 'LOAD_TODO_LIST';

export const TODO_STATUS_TYPES = {
	DONE: 'DONE',
	OPEN: 'OPEN',
	MOVED: 'MOVED',
	DELETED: 'DELETED'
};

export const addToDo = (listId, item) => {

	return async (dispatch) => {
		const temporaryId = `${Date.now()}${Math.random()}`;
		dispatch(addToDoStarted(temporaryId, item));
		try {
			const response = await APIService.addToDoItem(listId, item);
			const data = await response.json();

			// @todo error handling
			if (response.status !== 200) throw new Error(data);
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

export const modifyToDo = (listId, itemId, item) => {
	return async (dispatch) => {
		dispatch({
			type: MODIFY_TODO,
			_id: itemId,
			item
		});
		try {
			const response = await APIService.updateToDo(listId, itemId, item);
			const data = await response.json();
			if (response.status !== 200) {
				return dispatch(modifyToDoFailed(itemId, data));
			}
			dispatch(modifyToDoSucceed(itemId, data));
		}
		catch (ex) {
			dispatch(modifyToDoFailed(itemId, {error: 'unknown'}));
		}
	};
};

export const copyToDo = (listId, item) => {
	delete item._id;
	return (dispatch) => {
		dispatch(addToDo(listId, item));
	};
};

export const modifyToDoFailed = (_id, error) => {
	return {
		type: MODIFY_TODO_FAILED,
		_id,
		error
	}
};

export const modifyToDoSucceed = (_id, item) => {
	return {
		type: MODIFY_TODO_SUCCEED,
		_id,
		item
	}
};

export const loadToDoList = (toDoList) => {
	return {
		type: LOAD_TODO_LIST,
		toDoList
	}
};


export function fetchToDoItems (listId) {

	return async (dispatch) => {
		try {
			const response = await APIService.getItems(listId);
			const data = await response.json();
			dispatch(loadToDoList(data.docs));
		}
		catch (ex) {
			console.error('parsing failed', ex)
		}
	}
}
