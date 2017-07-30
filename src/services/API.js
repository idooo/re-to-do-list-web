const isMocked = !!(process.env.REACT_APP_MOCKS);
const POST = 'POST';
const GET = 'GET';
const PUT = 'PUT';
const MOCKED_CHANCE_TO_FAIL = 0.1;
const DEV_HOST = 'http://localhost:8080';


class APIService {

	static headers = {'Content-Type': 'application/json'};

	static addAuthorisationHeader (token) {
		if (token) APIService.headers['Authorization'] = `Bearer ${token}`;
	}

	static removeAuthorisationHeader () {
		delete APIService.headers['Authorization'];
	}

	static getItems () {
		const endpoint = isMocked ? '/mocks/items.json' : `${DEV_HOST}/api/1.0/items`;
		return fetch(endpoint, { headers: APIService.headers });
	}

	static addToDoItem (item) {
		const endpoint = isMocked ? '/mocks/add-todo.json' + APIService.canFail() : `${DEV_HOST}/api/1.0/item`;
		return fetch(endpoint, {
			method: isMocked ? GET : POST,
			body: JSON.stringify(item),
			headers: APIService.headers
		});
	}

	static updateToDo (_id, item) {
		const endpoint = isMocked ? '/mocks/update-todo.json' + APIService.canFail() : `${DEV_HOST}/api/1.0/item/${_id}`;

		return fetch(endpoint, {
			method: isMocked ? GET : PUT,
			body: JSON.stringify(item),
			headers: APIService.headers
		});
	}

	static canFail () {
		if (Math.random() < MOCKED_CHANCE_TO_FAIL) return 'FAIL';
		return '';
	}
}

export default APIService;
