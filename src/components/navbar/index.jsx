import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as URL from '../../router/url';


class NavBar extends Component {
	static propTypes = {
		dataList: PropTypes.array, // redux - список задач
		actUpdateTaskList: PropTypes.func, // redux - обновить весь список с напоминаниями
	};

	render() {

		return (
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<Link className='navbar-brand' style={ { marginRight: '50px'} } to={ URL.URL_HOME }><strong>MyToDo</strong></Link>
				<button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent'
				        aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item'>
							<Link className='navbar-brand' to={ URL.URL_ADD_ITEM }>Create</Link>
							<Link className='navbar-brand' to={ URL.URL_VIEW_LIST }>Todo</Link>
							<Link className='navbar-brand' to={ URL.URL_ARCHIVE }>Archive List</Link>

						</li>
					</ul>
				</div>
			</nav>);

	}
}

export default NavBar;
