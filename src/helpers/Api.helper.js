const isMocked = !!(process.env.REACT_APP_MOCKS);
const POST = 'POST';
const GET = 'GET';
const PUT = 'PUT';
const MOCKED_CHANCE_TO_FAIL = 0.1;

class ApiHelper {

	static getItems () {
		const endpoint = isMocked ? '/mocks/items.json' : '/api/items';
		return fetch(endpoint);
	}

	static addToDoItem (item) {
		const endpoint = isMocked ? '/mocks/add-todo.json' + ApiHelper.canFail() : '/api/items';

		return fetch(endpoint, {
			method: isMocked ? GET : POST,
			body: item
		});
	}

	static updateToDo (_id, item) {
		const endpoint = isMocked ? '/mocks/update-todo.json' + ApiHelper.canFail() : `/api/1.0/items/${_id}`;

		return fetch(endpoint, {
			method: isMocked ? GET : PUT,
			body: item
		});
	}

	static canFail () {
		if (Math.random() < MOCKED_CHANCE_TO_FAIL) return 'FAIL';
		return '';
	}
}

export {
	ApiHelper
};
