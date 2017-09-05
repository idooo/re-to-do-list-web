import {combineReducers} from 'redux';
import items from './items';
import board from './board';
import lists from './lists';

const rootReducer = combineReducers({
	lists,
	items,
	board
});

export {
	rootReducer
};
