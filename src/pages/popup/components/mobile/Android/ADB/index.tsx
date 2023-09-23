import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ADB from './ADB';
import APKPatching from './APKPatching';
import ContentProvider from './ContentProvider';
import ActivityManager from './ActivityManager';

const index = () => {

    const items: TabsProps[ 'items' ] = [
        {
            key: '1',
            label: `ADB`,
            children: ADB()
        },
        {
            key: '2',
            label: `APK patching`,
            children: APKPatching()
        },
        {
            key: '3',
            label: `Content Provider`,
            children: ContentProvider()
        },
        {
            key: '4',
            label: `Activity Manager`,
            children: ActivityManager()
        }
    ];


    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )

}

export default index