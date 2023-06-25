import type { TabsProps } from 'antd';
import { Tabs } from 'antd';


const SQLMainPage = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `SSRF Payloads`,
            children: <div>SSRF Payloads</div>,
        },
        {
            key: '2',
            label: `Juicy cloud files`,
            children: <div>SSRF Payloads</div>,
        },
        {
            key: '3',
            label: `SSRF Bypass`,
            children: <div>SSRF Bypass</div>,
        },
    ];

    
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )

}

export default SQLMainPage