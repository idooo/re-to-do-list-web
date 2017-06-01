const isMocked = !!(process.env.REACT_APP_MOCKS);

class ApiHelper {

	static getItems () {
		return isMocked ? '/mocks/items.json' : '/api/items';
	}
}

export {
	ApiHelper
};
