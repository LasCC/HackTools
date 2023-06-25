import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import LFI from './LFR';
import RCE from './RCE';

const SQLMainPage = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `File read`,
            children: LFI()
        },
        {
            key: '2',
            label: `RCE`,
            children: RCE()
        },
    ];

    
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )

}

export default SQLMainPage