import {
	ADD_TODO_FAILED,
	ADD_TODO_STARTED,
	ADD_TODO_SUCCESS,
	LOAD_TODO_LIST,
	MODIFY_TODO,
	MODIFY_TODO_FAILED
} from "../actions/index";


const todo = (state = {}, action) => {
	switch (action.type) {
		case ADD_TODO_STARTED:
			return {
				_id: action.temporaryId,
				text: action.text,
				status: 'OPEN'
			};
		default:
			return state
	}
};

const todos = (state = [], action) => {
	switch (action.type) {
		case LOAD_TODO_LIST:
			return action.toDoList || [];

		case MODIFY_TODO:
			return [
				...state.map(item => {
					if (item._id === action.item._id) {
						item = {
							...action.item,
							prevState: {...item}
						};
					}
					return item;
				})
			];

		case MODIFY_TODO_FAILED:
			return [
				...state.map(item => {
					if (item._id === action._id) {
						item = item.prevState;
					}
					return item;
				})
			];

		case ADD_TODO_STARTED:
			return [
				...state,
				todo(undefined, action)
			];

		case ADD_TODO_SUCCESS:
			return [
				...state.map(item => {
					if (item._id === action.temporaryId) item._id = action.item._id;
					return item;
				})
			];

		case ADD_TODO_FAILED:
			return [
				...state.filter(item => item._id !== action.temporaryId)
			];

		default:
			return state
	}
};

export default todos
