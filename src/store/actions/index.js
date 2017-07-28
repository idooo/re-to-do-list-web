import APIService from '../../services/API';

export const MODIFY_TODO = 'MODIFY_TODO';
export const MODIFY_TODO_FAILED = 'MODIFY_TODO_FAILED';
export const MODIFY_TODO_SUCCEED = 'MODIFY_TODO_SUCCEED';
export const ADD_TODO_STARTED = 'ADD_TODO_STARTED';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILED = 'ADD_TODO_FAILED';
export const LOAD_TODO_LIST = 'LOAD_TODO_LIST';


export const addToDo = (item) => {

	return async (dispatch) => {
		const temporaryId = `${Date.now()}${Math.random()}`;
		dispatch(addToDoStarted(temporaryId, item));
		try {
			const response = await APIService.addToDoItem(item);
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

export const modifyToDo = (_id, item) => {
	return async (dispatch) => {
		dispatch({
			type: MODIFY_TODO,
			_id,
			item
		});
		try {
			const response = await APIService.updateToDo(_id, item);
			const data = await response.json();
			if (response.status !== 200) {
				return dispatch(modifyToDoFailed(_id, data));
			}
			dispatch(modifyToDoSucceed(_id, data));
		}
		catch (ex) {
			dispatch(modifyToDoFailed(_id, {error: 'unknown'}));
		}
	};
};

export const copyToDo = (item) => {
	delete item._id;
	return (dispatch) => {
		dispatch(addToDo(item));
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


export function fetchToDoList () {

	return async (dispatch) => {
		try {
			const response = await APIService.getItems();
			const data = await response.json();
			dispatch(loadToDoList(data.items));
		}
		catch (ex) {
			console.error('parsing failed', ex)
		}
	}
}
