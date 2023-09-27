import { FileSyncOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Button, Col, Divider, FloatButton, Input, Modal, Row, Space, Tabs, Typography } from 'antd';
import { useState } from 'react';
import LSASS from './LSASS';
import SAM from './SAM';
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

    const { setIsServerConnectModalVisible, isServerConnectModalVisible, serverAPIKey, serverURL, setServerURL, serverAuthTest, setServerAPIKey, serverPingTest } = useSecretsStore();

    const showServerConnectModal = () => {
        setIsServerConnectModalVisible(true);
    };

    const HacktoolServerModal = () => (
        <Modal title="Hacktools server"
            open={isServerConnectModalVisible}
            width={window.innerWidth > 800 ? 800 : window.innerWidth - 75}
            onCancel={() => setIsServerConnectModalVisible(false)}
            onOk={() => setIsServerConnectModalVisible(false)}
        >
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Typography.Paragraph>
                        In order to parse credentials from Windows, you need to run local server on your machine since most of the offensive utilities are in python.
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        We strongly advise you to use this tools only locally and not on the internet for obvious reasons...
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        To reach the server you need to provide an API key which is generated randomly each time you start the server.
                    </Typography.Paragraph>
                </Col>
                <Col span={24}>
                    <Typography.Title level={3}>Server URL</Typography.Title>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input placeholder="Enter remote URL" value={serverURL}/>
                    </Space.Compact>
                </Col>
                <Divider />
                <Col span={24}>
                    <Typography.Title level={5}>API Key </Typography.Title>
                    <Input placeholder="API Key"
                        value={serverAPIKey}
                    />
                    <Button type="primary"
                        onClick={
                            () => serverPingTest() && serverAuthTest()}
                    >Connect</Button>
                </Col>

            </Row>

        </Modal>
    )


    return (
        <>
            <Tabs defaultActiveKey="1" items={items} />
            <FloatButton
                icon={<FileSyncOutlined />}
                onClick={showServerConnectModal}
            />
            {isServerConnectModalVisible && <HacktoolServerModal />}
        </>
    );
}




export default WindowSecretDumper;