import React from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from 'react-dd-menu';
import { connect } from "react-redux";
import { copyToDo, modifyToDo, TODO_STATUS_TYPES } from "../../store/actions/items";
import { DateCode } from "../../services/datecode";

import './ToDoItemControl.css';


class ToDoItem extends React.Component {

	constructor() {
		super();
		this.state = {
			isMenuOpen: false
		};
		this.toggle = this.toggle.bind(this);
		this.close = this.close.bind(this);
	}

	render () {
		const menuOptions = {
			isOpen: this.state.isMenuOpen,
			close: this.close,
			leaveTimeout: 1,
			toggle: <i className="fa fa-cog" onClick={this.toggle}> </i>,
			align: 'right'
		};
		const { item } = this.props;

		return (
			<div className="ToDoItemControl">

				<DropdownMenu {...menuOptions}>

					<li hidden={item.priority === 2}>
						<span href="#" onClick={() => this.increasePriority()}>
							<i className="fa fa-angle-double-up" /> Increase priority
						</span>

					</li>

					<li hidden={item.priority !== 2}>
						<span href="#" onClick={() => this.increasePriority()}>
							<i className="fa fa-angle-double-down" /> Decrease priority
						</span>
					</li>

					<li>
						<span href="#" onClick={() => this.move(1)}>
							<i className="fa fa-clone" /> Move next day
						</span>
					</li>

					<li role="separator" className="separator" />

					<li>
						<span href="#" onClick={() => this.delete()}>
							<i className="fa fa-trash-o" /> Delete
						</span>
					</li>

				</DropdownMenu>
			</div>
		)
	}

	setPriority (priority = 0) {
		const { listId, item } = this.props;
		this.props.dispatch(modifyToDo(listId, item._id, {priority}));
	}

	increasePriority () {
		const { item } = this.props;
		const priority = item.priority >= 2 ? 0 : item.priority + 1;

		this.setPriority(priority)
	}

	move (days) {
		const { listId, item } = this.props;
		this.props.dispatch(copyToDo(listId, {...item, dateCode: DateCode.getNextDateCode(item.dateCode, days)}));
		this.props.dispatch(modifyToDo(listId, item._id, {status: TODO_STATUS_TYPES.MOVED}));
	}

	delete () {
		const { listId, item } = this.props;
		this.props.dispatch(modifyToDo(listId, item._id, {status: TODO_STATUS_TYPES.DELETED}));
	}

	toggle() {
		this.setState({ isMenuOpen: !this.state.isMenuOpen });
	}

	close() {
		this.setState({ isMenuOpen: false });
	}
}

ToDoItem.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		uuid: PropTypes.string
	}).isRequired,
	listId: PropTypes.string.isRequired
};


export default connect()(ToDoItem)
