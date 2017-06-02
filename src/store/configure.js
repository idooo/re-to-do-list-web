import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from './reducers';

let configureStore;

if (process.env.NODE_ENV === 'production') {
	configureStore = function (initialState) {
		return createStore(rootReducer, initialState);
	}
}
else {
	configureStore = function (initialState) {
		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		return createStore(rootReducer, initialState, composeEnhancers(
			applyMiddleware(
				thunkMiddleware
			)
		));
	}
}

export default configureStore;
