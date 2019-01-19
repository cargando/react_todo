import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListItem from './list_item';
import {Button} from "../form/button";
import * as appActions from "../../store/actions";
import {connect} from "react-redux";

class TaskList extends Component {
	static propTypes = {
		dataList: PropTypes.array, // redux - список задач
		actUpdateTaskList: PropTypes.func, // redux - обновить весь список с напоминаниями
		actClearTaskList: PropTypes.func, // redux - очистить весь список
		archive: PropTypes.bool, // вывести элементы из архива
	};

	static defaultProps = {
		dataList: [],
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			data: {},
			errState: false,
			//
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log('nextProps  = ', nextProps);
	}

	handleDelete = (id) => {
		this.props.actUpdateTaskList(
			this.props.dataList.filter((item) => item.id !== id)
		);
	};

	handleArchiveItem = (id) => {
		this.props.actUpdateTaskList(
			this.props.dataList.map((item) => {
				if (item.id === id) {
					const copy = Object.assign({}, item);
					copy.archive = !copy.archive;
					return copy;
				}
				return item;
			}) // end of MAP
		); // end of actUpdateTaskList
	};

	renderItem = (item) => (<ListItem
			key={ item.id  }
			id={ item.id }
			archive={ item.archive }
			title={ item.title }
			date={ item.date }
			urgent={ item.urgent }
			deleteClick={ this.handleDelete }
			archiveClick={ this.handleArchiveItem }
	/>);

	clearList = () => {
		this.props.actClearTaskList();
	};
	countItems = () => {
			const cnt = 0;
			this.props.dataList.map((item) => {
				if (!!item.archive === !!this.props.archive) {
;
				}
			});
	};

	render() {
		const list = this.props.dataList
			.filter((item) => (!!item.archive === !!this.props.archive))
			.map(this.renderItem);

		console.log("list.len = ", list.length);
		const emptyItem = this.renderItem({ title: 'Список пуст' });

		return (
			<div className='col-md-6'>
				<div className='card' style={ { width: '100%' } }>
					<ul className='list-group'>
						{ list.length ? list : emptyItem }
					</ul>
				</div>
				{ !!(this.props.dataList && this.props.dataList.length) ?
					(<div style={ {marginTop: '15px' } }>
						<Button
							label='Clear List'
							className='dark'
							onclick={ this.clearList }
						/>
					</div>) : null
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	dataList: state.appData.tasks,
});

const mapDispatchToProps = dispatch => ({
	actUpdateTaskList: (payload) => dispatch(appActions.actUpdateTaskList(payload)),
	actClearTaskList: (payload) => dispatch(appActions.actClearTaskList(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
