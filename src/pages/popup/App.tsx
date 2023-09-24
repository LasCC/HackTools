import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FloatButton } from 'antd';
import { Router } from 'react-chrome-extension-router';
import './assets/css/style.css';
import LayoutApp from './components/LayoutApp';
import ReverseShell from './components/system/linux/ReverseShell';

/* Prevent app from crashing since those attributes are mandatory for the routing */
// ( !localStorage.getItem( 'hack_tools_mode' ) ) && localStorage.setItem( 'hack_tools_mode', '"web"' );
// ( !localStorage.getItem( 'tab_index_cache' ) ) && localStorage.setItem( 'tab_index_cache', '"1"' );


const queryClient = new QueryClient();

const App = () => {
    return (
        <div>
            <ReverseShell />
        </div>
    );
};


const AppRender = (
    <QueryClientProvider client={queryClient}>
        <LayoutApp>
            <Router>
                <App />
            </Router>
            <FloatButton.BackTop />
        </LayoutApp>
    </QueryClientProvider>
);


export default AppRender;