import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FloatButton } from 'antd';
import { Router } from 'react-chrome-extension-router';
import './assets/css/style.css';
import LayoutApp from './components/LayoutApp';
import ReverseShell from './components/system/linux/ReverseShell';

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