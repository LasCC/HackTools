import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import WebShell from './WebShell';


const PHPMainComponent = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Webshell',
            children: WebShell()
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    );
}

export default PHPMainComponent;