const isMocked = !!(process.env.REACT_APP_MOCKS);
const POST = 'POST';
const GET = 'GET';
const PUT = 'PUT';
const MOCKED_CHANCE_TO_FAIL = 0.1;

let HOST = '';
if (process.env.NODE_ENV !== 'production') {
	HOST = 'http://localhost:8080';
}

class APIService {

	static headers = {'Content-Type': 'application/json'};

	static getAPIHost () {
		return HOST;
	}

	static addAuthorisationHeader (token) {
		if (token) APIService.headers['Authorization'] = `Bearer ${token}`;
	}

	static removeAuthorisationHeader () {
		delete APIService.headers['Authorization'];
	}

	static getToDoLists () {
		const endpoint = isMocked
			? '/mocks/lists.json'
			: `${HOST}/api/1.0/lists`;

		return fetch(endpoint, {headers: APIService.headers});
	}

	static getItems (listId) {
		const endpoint = isMocked
			? '/mocks/items.json'
			: `${HOST}/api/1.0/list/${listId}`;

		return fetch(endpoint, {headers: APIService.headers});
	}

	static addToDoItem (listId, item) {
		const endpoint = isMocked
			? '/mocks/add-todo.json' + APIService.canFail()
			: `${HOST}/api/1.0/list/${listId}/item`;

		return fetch(endpoint, {
			method: isMocked ? GET : POST,
			body: JSON.stringify(item),
			headers: APIService.headers
		});
	}

	static updateToDo (listId, itemId, updateObject) {
		const endpoint = isMocked
			? '/mocks/update-todo.json' + APIService.canFail()
			: `${HOST}/api/1.0/list/${listId}/item/${itemId}`;

		return fetch(endpoint, {
			method: isMocked ? GET : PUT,
			body: JSON.stringify(updateObject),
			headers: APIService.headers
		});
	}

	static canFail () {
		if (Math.random() < MOCKED_CHANCE_TO_FAIL) return 'FAIL';
		return '';
	}
}

export default APIService;
