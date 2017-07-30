import { LOAD_TODO_LISTS } from "../actions/lists";

const lists = (state = [], action) => {
	switch (action.type) {
		case LOAD_TODO_LISTS:
			return action.lists || [];

		default:
			return state
	}
};

export default lists
