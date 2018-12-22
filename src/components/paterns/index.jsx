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


/* 10й - Reaching into a Component - доступ через REF */
class Input extends Component {
	focus() {
		this.el.focus();
	}

	render() {
		return (
			<input
				ref={ (el) => { this.el = el; } }
			/>
		);
	}
}

class SignInModal extends Component {
	componentDidMount() {
		// Note that when you use ref on a component, it’s a reference to
		// the component (not the underlying element), so you have access to its methods.
		this.InputComponent.focus();
	}

	render() {
		return (
			<div>
				<label>User name:</label>
				<Input
					ref={ (comp) => { this.InputComponent = comp; }}
				/>
			</div>
		)
	}
}


/* 11й -  Lists Components */

const SearchSuggestions = (props) => {
	// renderSearchSuggestion() behaves as a pseudo SearchSuggestion component
	// keep it self contained and it should be easy to extract later if needed
	const renderSearchSuggestion = listItem => (
		<li key={ listItem.id }> { listItem.name } ({ listItem.age }) </li>
	);

	return (
		<ul>
			{ props.listItems.map(renderSearchSuggestion) }
		</ul>
	);
};

/*
*  ANTIPATERNS
*
* */

/* 1 - Props in Initial State */
// Bad
class SampleComponent extends Component {
	// constructor function (or getInitialState)
	constructor(props) {
		super(props);
		this.state = {
			flag: false,
			inputVal: props.inputValue
		};
	}
	render() {
		return <div>{ this.state.inputVal && <AnotherComponent/>}</div>
	}
}
// Good
class SampleComponent extends Component {
	// constructor function (or getInitialState)
	constructor(props) {
		super(props);
		this.state = {
			flag: false
		};
	}

	render() {
		return <div>{ this.props.inputValue && <AnotherComponent/>}</div>
	}
}

/* 2й Refs over findDOMNode() */
// Before:
	class MyComponent extends Component {
		componentDidMount() {
			findDOMNode(this).scrollIntoView();
		}

		render() {
			return <div />
		}
	}
// After
class MyComponent extends Component {
	componentDidMount() {
		this.node.scrollIntoView();
	}

	render() {
		return <div ref={ node => this.node = node }/>
	}
}

/* 3й - Use Higher order components over Mixins */

// With Mixin
var WithLink = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function () {
		return {message: 'Hello!'};
	},
	render: function () {
		return <input type="text" valueLink={this.linkState('message')}/>;
	}
});

// Move logic to a HOC
var WithLink = React.createClass({
	getInitialState: function () {
		return {message: 'Hello!'};
	},
	render: function () {
		return <input type="text" valueLink={LinkState(this,'message')}/>;
	}
});

/* 4й setState() in componentWillMount() */
// BAD
function componentWillMount() {
	axios.get(`api/messages`)
		.then((result) => {
			const messages = result.data
			console.log("COMPONENT WILL Mount messages : ", messages);
			this.setState({
				messages: [...messages.content]
			})
		})
}
// GOOD
function componentDidMount() {
	axios.get(`api/messages`)
		.then((result) => {
			const messages = result.data
			console.log("COMPONENT WILL Mount messages : ", messages);
			this.setState({
				messages: [...messages.content]
			})
		})
}

// 5й Mutating State without setState()

this.state.items.push('lorem'); // - НЕЛЬЗЯ

this.setState((prevState) => ({
	items: prevState.items.push('lorem') // можно
}));

// 6й - Using indexes as keys
// BAD
todos.map((todo, index) =>
	<Todo
		{...todo}
		key={index}
	/>
)

// GOOD
todos.map((todo) =>
	<Todo {...todo}
	      key={todo.id} />
)

// 6й - Spreading props on DOM elements
// BAD
const Sample = () => (<Spread flag={true} className="content"/>);
const Spread = (props) => (<div {...props}>Test</div>);

// GOOD
const Sample = () => (<Spread flag={true} domProps={{className: "content"}}/>);
const Spread = (props) => (<div {...props.domProps}>Test</div>);


/*
*
*  ПРИНЦИПЫ хорошей архитектуры
*
*
* */

// 1й - Single responsibility - принцип единно-ответственности
// 2й - Encapsulated - инкапсуляция данных
// 3й - Composable - композиция/декомпозиция
// 4й - Reusable - повторное использование компонентов
// 5й - "Pure" or "Almost-pure"
// 6й - Meaningful - понятность описания компонента/кода