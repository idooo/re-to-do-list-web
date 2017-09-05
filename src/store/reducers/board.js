import { DATE_CODES_UPDATE, VIEW_TYPES } from "../actions/board";
import { DateCode } from "../../services/datecode";

export default function updateDateCodes (state = {}, action) {
	switch (action.type) {
		case DATE_CODES_UPDATE:
			const newState = {
				view: action.view
			};

			if (action.view === VIEW_TYPES.WEEKDAYS) newState.dateCodes = DateCode.getWeekdaysCodes();
			if (action.view === VIEW_TYPES.PREVIOUS_WEEKDAYS) newState.dateCodes = DateCode.getPreviousWeekdaysCodes();
			if (action.view === VIEW_TYPES.THREE_DAYS) newState.dateCodes = DateCode.getThreeDayCodes();

			return newState;

		default:
			return state;
	}
}




