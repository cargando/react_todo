import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class TaskList extends Component {
	static propTypes = {

	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			data: {},
			errState: false,
		}
	}

	render() {
		return (
			<div className='col-md-6'>
				<div className='card' style={ { width: '100%' } }>
					some data
				</div>
			</div>
		);
	}
}