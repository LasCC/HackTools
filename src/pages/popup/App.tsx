import { Router } from 'react-chrome-extension-router';
import { FloatButton } from 'antd';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import LayoutApp from './components/LayoutApp';
import ReverseShell from './components/system/linux/ReverseShell';
import './assets/css/style.css';



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