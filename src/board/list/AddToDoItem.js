import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addToDo } from "../../store/actions/index";

class AddToDoItem extends React.Component {

	render () {
		const {dateCode} = this.props;
		let input;

		return (
			<div>
				<form onSubmit={e => {
					e.preventDefault();
					if (!input.value.trim()) return;
					this.props.dispatch(addToDo({
						dateCode,
						text: input.value
					}));
					input.value = ''
				}}>
					<input ref={node => {
						input = node
					}} />

					<button type="submit">Add Todo</button>
				</form>
			</div>
		)
	}
}

AddToDoItem.propTypes = {
	dateCode: PropTypes.string.isRequired
};

export default connect()(AddToDoItem)
