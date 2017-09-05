
export const DATE_CODES_UPDATE = 'DATE_CODES_UPDATE';

export const VIEW_TYPES = {
	WEEKDAYS: 'WEEKDAYS',
	PREVIOUS_WEEKDAYS: 'PREVIOUS_WEEKDAYS',
	THREE_DAYS: 'THREE_DAYS'
};

export const changeViewToWeekdays = () => {
	return {
		type: DATE_CODES_UPDATE,
		view: VIEW_TYPES.WEEKDAYS
	}
};

export const changeViewToPreviousWeekdays = () => {
	return {
		type: DATE_CODES_UPDATE,
		view: VIEW_TYPES.PREVIOUS_WEEKDAYS
	}
};

export const changeViewToThreeDays = () => {
	return {
		type: DATE_CODES_UPDATE,
		view: VIEW_TYPES.THREE_DAYS
	}
};

