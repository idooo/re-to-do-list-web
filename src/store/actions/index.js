export const ADD_TODO = 'ADD_TODO';
export const LOAD_TODO_LIST = 'LOAD_TODO_LIST';


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

