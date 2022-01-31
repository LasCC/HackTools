import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-chrome-extension-router';
import { BackTop } from 'antd';
import { QueryClientProvider, QueryClient } from 'react-query';
import LayoutApp from './components/LayoutApp';
import ReverseShell from './components/linux/ReverseShell';
import './assets/css/style.css';

const queryClient = new QueryClient();

const App = () => {
    return (
        <div>
            <ReverseShell />
        </div>
    );
};

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <LayoutApp>
            <Router>
                <App />
            </Router>
            <BackTop />
        </LayoutApp>
    </QueryClientProvider>,
    document.getElementById( 'app' )
);
