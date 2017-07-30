import {combineReducers} from 'redux';
import items from './items';
import auth from './auth';
import lists from './lists';

const rootReducer = combineReducers({
	lists,
	items,
	auth
});

export {
	rootReducer
};
