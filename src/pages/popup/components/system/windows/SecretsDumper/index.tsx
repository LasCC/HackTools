import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SAMComponent from './SAM';
import LSASS from './LSASS';

const WindowSecretDumper = () => {

    const items: TabsProps[ 'items' ] = [
        {
            key: '1',
            label: 'SAM',
            children: SAMComponent()
        },
        {
            key: '2',
            label: 'LSASS',
            children: LSASS()

        }
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    );
}

export default WindowSecretDumper;