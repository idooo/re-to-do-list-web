import * as moment from 'moment';

export const TODO_DATE_CODE_FORMAT = 'YYYYMMDD';

export class DateCode {

	/**
	 * Returns a range of three date codes for specified date [-1 day, today, +1 day]
	 *
	 * @example
	 * for 2017-09-23 12:10 .... date input
	 * output will be ['22092017', '23092017', '24092017']
	 *
	 * @param {Date} [date]
	 * @returns {[string, string, string]}
	 */
	static getThreeDayCodes (date = undefined) {
		return [
			moment(date).subtract(1, 'day').format(TODO_DATE_CODE_FORMAT),
			moment(date).format(TODO_DATE_CODE_FORMAT),
			moment(date).add(1, 'day').format(TODO_DATE_CODE_FORMAT)
		];
	}

	/**
	 * Returns array of date codes for the current work week
	 * @param {Date} [date]
	 * @param {Number} [weekAdjustment] - subtract week from the date
	 * @returns {[string, string, string]}
	 */
	static getWeekdaysCodes (date = undefined, weekAdjustment = 0) {
		const startOfWeek = moment(date).startOf('isoweek').subtract(weekAdjustment, 'week');
		return Array.from(Array(5).keys()).map(i => moment(startOfWeek).add(i, 'day').format(TODO_DATE_CODE_FORMAT));
	}

	/**
	 * Returns array of date codes for a previous work week
	 * @param {Date} [date]
	 * @returns {[string, string, string]}
	 */
	static getPreviousWeekdaysCodes (date) {
		return DateCode.getWeekdaysCodes(date, 1)
	}

	/**
	 * Returns a next date code for the current one
	 *
	 * @example
	 * for getNextDateCode('12092017', 1) will return '13092017'
	 *
	 * @param dateCode
	 * @param days
	 * @returns {string}
	 */
	static getNextDateCode (dateCode, days = 1) {
		return moment(dateCode, TODO_DATE_CODE_FORMAT).add(Math.abs(days), 'days').format(TODO_DATE_CODE_FORMAT)
	}

	/**
	 * Returns a previous date code for the current one
	 *
	 * @example
	 * for getNextDateCode('12092017', -1) will return '11092017'
	 *
	 * @param dateCode
	 * @param days
	 * @returns {string}
	 */
	static getPrevDateCode (dateCode, days = -1) {
		return moment(dateCode, TODO_DATE_CODE_FORMAT).add(Math.abs(days) * -1, 'days').format(TODO_DATE_CODE_FORMAT)
	}

	/**
	 * Return human readable date code
	 * @param {string} dateCode
	 * @returns {string}
	 */
	static formattedDateCode (dateCode) {
		return moment(dateCode, TODO_DATE_CODE_FORMAT).calendar(null, {
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			nextWeek: 'dddd',
			lastDay: '[Yesterday]',
			lastWeek: '[Last] dddd',
			sameElse: 'DD/MM/YYYY'
		});
	}
}
