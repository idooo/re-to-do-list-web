import { ADD_TODO, LOAD_TODO_LIST } from "../actions/index";


const todo = (state = {}, action) => {
	switch (action.type) {
		case ADD_TODO:
			return {
				_id: action._id,
				text: action.text,
				status: action.status
			};
		default:
			return state
	}
};

const todos = (state = [], action) => {
	switch (action.type) {
		case LOAD_TODO_LIST:
			return action.toDoList || [];
		case ADD_TODO:
			return [
				...state,
				todo(undefined, action)
			];
		default:
			return state
	}
};

export default todos
