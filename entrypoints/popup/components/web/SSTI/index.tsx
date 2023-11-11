import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import TemplateDetector from './SSTITable';


const SQLMainPage = () => {

    const items: TabsProps[ 'items' ] = [
        {
            key: '1',
            label: `Template detector`,
            children: <TemplateDetector />
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )

}

export default SQLMainPage