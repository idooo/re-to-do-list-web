import { ApiHelper } from '../../helpers/Api.helper';

export const ADD_TODO = 'ADD_TODO';
export const LOAD_TODO_LIST = 'LOAD_TODO_LIST';
export const REQUEST_TODO_LIST = 'REQUEST_TODO_LIST';


export const addTodo = (_id, text) => {
	return {
		type: ADD_TODO,
		_id,
		text
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
			const response = await fetch(ApiHelper.getItems(), {accept: 'application/json'});
			const data = await response.json();
			dispatch(loadToDoList(data.items));
		}
		catch (ex) {
			console.error('parsing failed', ex)
		}
	}
}
