import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SSLPinning from './SSLPinning';
import General from './General';

const index = () => {

    const items: TabsProps[ 'items' ] = [
        {
            key: '1',
            label: `General`,
            children: General()
        },
        {
            key: '2',
            label: `SSL Pinning Bypass`,
            children: SSLPinning()
        },
    ];


    return (
        <>
            <Tabs items={items} />
        </>
    )
}

export default index