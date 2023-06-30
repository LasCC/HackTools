import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import PayloadBuilder from './PayloadBuilder';


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
            key: '4',
            label: `XXE`,
            children: <div>XXE based</div>,
        },
        {
            key: '5',
            label: `Payload Builder`,
            children: PayloadBuilder()
        }
    ];

    
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )

}

export default SQLMainPage