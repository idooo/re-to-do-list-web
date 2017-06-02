import { connect } from 'react-redux'
import ToDoList from './ToDoList'

const mapStateToProps = (state) => {
	return {
		todos: state.todos || []
	}
};

const mapDispatchToProps = (dispatch) => {
	return {dispatch}
};

const ToDoListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ToDoList);

export default ToDoListContainer
