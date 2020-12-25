import { Router } from 'react-chrome-extension-router';
import { BackTop } from 'antd';
import React from 'react';
import LayoutApp from './components/LayoutApp.js';
import ReactDOM from 'react-dom';
import ReverseShell from './components/ReverseShell.js';
/* import './assets/css/style.css'; */
import './assets/css/dark.css';

const App = () => {
	return (
		<div>
			<ReverseShell />
		</div>
	);
};

ReactDOM.render(
	<LayoutApp>
		<Router>
			<App />
		</Router>
		<BackTop />
	</LayoutApp>,
	document.getElementById('app')
);
