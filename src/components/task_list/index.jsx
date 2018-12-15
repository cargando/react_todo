import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListItem from './list_item';

export class TaskList extends Component {
	static propTypes = {
		dataList: PropTypes.array, // список задач
		handleDelete: PropTypes.func, // метод удаления напоминания из списка
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			data: {},
			errState: false,
		}
	}

	handleDelete = (id) => {
		this.props.handleDelete(id);
	};

	renderItem = (item) => {
		return (<ListItem
			key={ item.id  }
			id={ item.id }
			title={ item.title }
			date={ item.date }
			urgent={ item.urgent }
			onclick={ this.handleDelete }
	/>);
	};

	render() {
		const list = this.props.dataList.map(this.renderItem);
		const emptyItem = this.renderItem({ title: 'Список пуст' });

		return (
			<div className='col-md-6'>
				<div className='card' style={ { width: '100%' } }>
					<ul className='list-group'>
						{ list.length ? list : emptyItem }
					</ul>
				</div>
			</div>
		);
	}
}