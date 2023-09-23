import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import DataEncoding from './DataEncoding';
import Hashing from './Hashing';



const DataManipulationMain = () => {

    const items: TabsProps[ 'items' ] = [
        {
            key: '1',
            label: 'Encoding',
            children: DataEncoding()
        },
        {
            key: '2',
            label: 'Hashing',
            children: Hashing()
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
        </>
    );
}

export default DataManipulationMain;