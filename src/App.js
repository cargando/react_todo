import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as appActions from './store/actions';
import NavBar from './components/navbar';
import TheRoutes from './router/router'
import * as URL from "./router/url";
import ViewListPage from "./pages/view_list";
import HomePage from "./pages/home";
import Page404 from "./pages/404";
import AddItemPage from "./pages/add_item";


class App extends Component {
	static propTypes = {
		appData: PropTypes.object, // объект со списоком заявок из ридакса
		actUpdateTaskList: PropTypes.func, // функция - action creator по обновлению списка
		children: PropTypes.object, // children
	};

	constructor(props, context) {
		super(props, context);
	}



  render() {
    return (
	    <BrowserRouter>
		    <div>
			    <NavBar />
			    <TheRoutes />
		    </div>
	    </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = dispatch => ({
	actUpdateTaskList: (payload) => dispatch(appActions.actUpdateTaskList(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);