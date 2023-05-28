import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import CUSTOM from './Custom';
import OWSTG from './OWSTG';


const CheckListMainComponent = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'OWSTG',
            children: OWSTG(),
        },
        {
            key: '2',
            label: 'CUSTOM',
            children: CUSTOM()
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    );
}

export default CheckListMainComponent;