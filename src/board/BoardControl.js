import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import ToDoList from "./list/ToDoList";
import {
	changeViewToWeekdays,
	changeViewToThreeDays,
	changeViewToPreviousWeekdays,
	VIEW_TYPES
} from "../store/actions/board";

import './BoardControl.css';


class BoardControl extends React.Component {

	render () {
		const { view } = this.props;

		return (
			<div className={`BoardControl BoardControl--${view}`}>

				<div>

					<span onClick={() => this.props.dispatch(changeViewToThreeDays())}
						  className={`BoardControl__btn
						  	${view === VIEW_TYPES.THREE_DAYS ? 'BoardControl__btn--active' : ''}`
						  }>Three days</span>

					⌇

					<span onClick={() => this.props.dispatch(changeViewToWeekdays())}
						  className={`BoardControl__btn
						  	${view === VIEW_TYPES.WEEKDAYS ? 'BoardControl__btn--active' : ''}`
						  }>Work week</span>
					⌇

					<span onClick={() => this.props.dispatch(changeViewToPreviousWeekdays())}
						  className={`BoardControl__btn
						  	${view === VIEW_TYPES.PREVIOUS_WEEKDAYS ? 'BoardControl__btn--active' : ''}`
						  }>Previous week</span>

				</div>

			</div>
		)
	}
}

ToDoList.propTypes = {
	view: PropTypes.string
};

const mapStateToProps = (state) => {
	return {
		view: state.board.view || ''
	}
};

export default connect(mapStateToProps)(BoardControl)
