import React from 'react';
import { Link } from 'react-router-dom';
import * as URL from '../../router/url';

class Page404 extends React.PureComponent {
	render() {
		console.log('window.location: ', window.location);
		return (
			<div className='container btm-buffer'>
				<div className='row'>
					<div className='col-md-6 col-md-offset-3' style={ { paddingTop: '12vl' } }>
						<h1 className='txt-shadow' style={ { fontSize: '200pt' } }>404</h1>
						<h4 className='txt-shadow'>Страница с таким адресом не найдена.</h4>
						<h5 className='txt-shadow'>{ window.location.href }</h5>
					</div>
					<div className='col-md-6 col-md-offset-3' style={ { paddingTop: '20px' } }>
						<p>
							Вы можете вернуться на страницу <Link to={ URL.URL_HOME }>Рабочий стол</Link>, или воспользоваться навигационным меню.
						</p>
					</div>
				</div>
			</div>);
	}
};

export default Page404;
