import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ADB from './ADB';
import APKPatching from './APKPatching';
import IntentInjection from './IntentInjection';
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
            label: `Intent Injection`,
            children: IntentInjection()
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