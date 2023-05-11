import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import OWSTG from './OWSTG';


const CheckListMainComponent = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'OWSTG',
            children: OWSTG()
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    );
}

export default CheckListMainComponent;