import React, { useState } from 'react';
import { Divider, FloatButton, Space, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SAM from './SAM';
import LSASS from './LSASS';
import { Modal, Row, Col, Input, Button, message, Typography } from 'antd';
import { FileSyncOutlined } from '@ant-design/icons';
import { useSecretsStore } from './useSecret';


const WindowSecretDumper = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'SAM',
            children: SAM()
        },
        {
            key: '2',
            label: 'LSASS',
            children: LSASS()
        },
    ];
 


    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
           
        </>
    );
}




export default WindowSecretDumper;