
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import AddItemPage from '../pages/add_item';
import ViewListPage from '../pages/view_list';
import ViewArchiveListPage from '../pages/view_archive';
import Page404 from '../pages/404';
import * as URL from './url';

export default () => { // localhost/view
	return (
		<Switch>
			<Route exact path={ URL.URL_HOME } component={ HomePage } />
			<Route exact path={ URL.URL_ADD_ITEM } component={ AddItemPage } />
			<Route exact path={ URL.URL_VIEW_LIST } component={ ViewListPage } />
			<Route exact path={ URL.URL_ARCHIVE } component={ ViewArchiveListPage } />
			<Route component={ Page404 } />
		</Switch>);
};
