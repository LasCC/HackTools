import { Router } from 'react-chrome-extension-router';
import { BackTop } from 'antd';
import React from 'react';
import LayoutApp from './components/LayoutApp.js';
import ReactDOM from 'react-dom';
import ReverseShell from './components/Linux_Shell/ReverseShell.js';
import './assets/css/style.css';

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
