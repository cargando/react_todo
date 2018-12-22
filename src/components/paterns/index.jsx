import React, {Component} from 'react';
import PropTypes from 'prop-types';

// 1й патерн - condition render
const sampleComponent = (isTrue) => {

	return isTrue ? <p>True!</p> : null // <p>False</p>

};

const sampleComponent = (isTrue) => {
	return (isTrue && <p>True!</p>) // (isTrue || <p>True!</p>)
};

// 2й патерн - ассинхронность setState
this.setState()
this.setState()
this.setState()

// в конце выполняет некую сумму "всех изменений" за 1 прием, а не в 3 приема, как в коде

// 3й патерн - Dependency Injection - внедрение свойств
var title = 'React Dependency Injection';
// предположим и в с state и в props есть 3 поля:
// state = {age, sex, name}
// props = {name, title}
export default function inject(Component) {
	return class Injector extends React.Component {
		render() {
			return (
				<Component
					{...this.state}
					{...this.props}
					title={ title }
				/>
			)
		}
	};
}

// 4й - Event Handlers - как правильно работать с методами для обработчиков событий
this.handleClearList = this.handleClearList.bind(this); // - делать бинд, для привязки контекста через бинд
// либо второй вариант - объявлять методы через arrow functions
_handleClearList = () => {
	console.log(' handleClearList')
	this.setState({ list: [] });
};

// 5й - One way data flow - данные всегда идут от родителя к детям через пропсы

// 6й - Presentational and Container components - "разделение труда" - т.е. есть тупые компоненты
// и "умные" компоненты

// 7й - Passing a function to setState
this.setState({ expanded: !this.state.expanded });

this.setState(prevState => ({ expanded: !prevState.expanded }));
this.setState(prevState => {
	// что-то делаем ...
	return { expanded: !prevState.expanded };
});

// 8й - Decorators
// Non-decorators approach
class ProfileContainer extends Component {
	// Component code
}
export default inject(ProfileContainer)
const newProfileContainer = inject(ProfileContainer);
export default newProfileContainer;

// -> DECORATOR approach
@inject
export default class ProfileContainer extends Component {
	// Component code
}


// 9й - The switching component - аналог ФАБРИКИ

import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import UserPage from './UserPage.jsx';
import FourOhFourPage from './FourOhFourPage.jsx';

const PAGES = {
	home: HomePage,
	about: AboutPage,
	user: UserPage
};

const Page = (props) => {
	const Handler = PAGES[props.page] || FourOhFourPage;

	return <Handler {...props} />
};

// The keys of the PAGES object can be used in the prop types to catch dev-time errors.
Page.propTypes = {
	page: PropTypes.oneOf(Object.keys(PAGES)).isRequired
};

<Page page='home' otherProp={ 5555 } />