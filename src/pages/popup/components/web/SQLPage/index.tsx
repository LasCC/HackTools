import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SQLParser from './SQLParser'
import SQLinjection from './SQLInjection'

const SQLMainPage = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `SQLI Payloads`,
            children: SQLinjection()
        },
        {
            key: '2',
            label: `SQL Syntax linter`,
            children: SQLParser()
        },
    ];

    
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )

}

export default SQLMainPage