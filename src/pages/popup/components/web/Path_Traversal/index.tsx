import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import LFI from './LFR';
import RCE from './RCE';
import ZipSlip from './ZipSlip';

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
        {
            key: '3',
            label: `Zip Slip`,
            children: ZipSlip()
        }
    ];

    
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    )

}

export default SQLMainPage