import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import SQL from './SQL/SQLInjection';
import SQLSyntaxParser from './SQL/SQLParser';
import NOSQL from './NOSQL';

const SQLMainPage = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `SQL`,
            children: SQL()
        },
        {
            key: '2',
            label: `SQL Syntax validator`,
            children: SQLSyntaxParser()
        },
        {
            key: '3',
            label: `NoSQL`,
            children: NOSQL()
        }
    ];

    
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )

}

export default SQLMainPage