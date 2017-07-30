import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addToDo } from "../../store/actions/items";

class AddToDoItem extends React.Component {

	render () {
		let input;

		return (
			<div>
				<form onSubmit={e => this.submitToDoForm(e, input)}>
					<input ref={node => {
						input = node
					}} />

					<button type="submit">Add Todo</button>
				</form>
			</div>
		)
	}

	submitToDoForm (e, input) {
		const { dateCode, listId, dispatch } = this.props;

		e.preventDefault();
		if (!input.value.trim()) return;

		dispatch(addToDo(listId, {
			dateCode,
			text: input.value
		}));
		input.value = ''
	}
}

AddToDoItem.propTypes = {
	dateCode: PropTypes.string.isRequired,
	listId: PropTypes.string.isRequired
};

export default connect()(AddToDoItem)
