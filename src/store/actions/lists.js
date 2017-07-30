import APIService from '../../services/API';

export const LOAD_TODO_LISTS = 'LOAD_TODO_LISTS';


export const loadToDoLists = (lists) => {
	return {
		type: LOAD_TODO_LISTS,
		lists
	}
};

export function fetchToDoLists () {

	return async (dispatch) => {
		try {
			const response = await APIService.getToDoLists();
			const data = await response.json();
			dispatch(loadToDoLists(data.docs));
		}
		catch (ex) {
			console.error('parsing failed', ex)
		}
	}
}

