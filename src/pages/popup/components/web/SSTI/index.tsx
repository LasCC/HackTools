import type { TabsProps } from 'antd';
import { Tabs } from 'antd';


const SQLMainPage = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Template detector`,
            children: <div>Template detection</div>,
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )

}

export default SQLMainPage