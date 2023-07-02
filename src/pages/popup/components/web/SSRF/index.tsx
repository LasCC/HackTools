import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import Gopherizer from './Gopherizer';
import XXE from './XXE';

const SQLMainPage = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `SSRF Payloads`,
            children: <div>SSRF Payloads</div>,
        },
        {
            key: '3',
            label: `Filter Bypass`,
            children: <div>SSRF Bypass</div>,
        },
        {
            key: '2',
            label: `XXE`,
            children: XXE(),
        },
        {
            key: '5',
            label: `Gopherizer`,
            children: Gopherizer()
        }
    ];

    
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )

}

export default SQLMainPage