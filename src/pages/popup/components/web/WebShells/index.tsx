import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PHPWebshell from './PHP';
import Java from './Java';


const index = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'PHP',
            children: PHPWebshell()
        },
        {
            key: '2',
            label: 'Java',
            children: Java()
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    );
}

export default index;