
import { SyncOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Divider, Input, Modal, Row, Space, Tag, Typography, Upload, message } from 'antd';
import axios from 'axios';
import { useState, useEffect} from 'react';
import { BLANK_LM_HASH, useSecretsStore } from './useSecret';


const SAM = () => {

    useEffect(() => {
        // Clean up when unmount
        return () => {
            setSamFileList([]);
            setSystemFileList([]);
            setData(null);
        };
    }, []);

    const { setIsServerConnectModalVisible, isServerConnectModalVisible, serverAPIKey, serverURL, setServerURL, serverAuthTest, setServerAPIKey, serverPingTest, isServerReady } = useSecretsStore();
    const { data, samFileList, systemFileList, setData, setSamFileList, setSystemFileList } = useSecretsStore();

    const [isLoading, setIsLoading] = useState(false);
    const isLMHashBlank = (lm_hash: string) => lm_hash === BLANK_LM_HASH;

    const checkServerConfigStatus = async () => {
        if (!serverAPIKey || !serverURL) {
            message.error('Config is not set');
            setIsServerConnectModalVisible(true);
            return false;
        }
        const pingTestResult = await serverPingTest();
        if (!pingTestResult) {
            message.error('Server is unreachable');
            setIsServerConnectModalVisible(true);
            return false;
        }
        const authTestResult = await serverAuthTest();
        if (!authTestResult) {
            message.error('API Key is invalid');
            setIsServerConnectModalVisible(true);
            return false;
        }
        return true;
    };


    const handleSAMUpload = async () => {
        if(await checkServerConfigStatus() === false) return;
        if (samFileList.length === 0 || systemFileList.length === 0) {
            message.error('Please upload SAM and SYSTEM hive files');
            return;
        }
        
        const samFile = samFileList[0].originFileObj;
        const systemFile = systemFileList[0].originFileObj;
        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data", "x-api-key": serverAPIKey },
            onUploadProgress: (event: any) => {
                const percent = (event.loaded / event.total) * 100;
                console.log(`Current progress: ${percent}%`);
            },
        };
        fmData.append("sam", samFile);
        fmData.append("system", systemFile);
        setIsLoading(true);
        try {
            const res = await axios.post(serverURL + "/decrypt/sam", fmData, {
                ...config,
                timeout: 5000, // Timeout of 5 seconds
            });
            setData(res.data);
        } catch (err) {
            if (err.code === 'ECONNABORTED') {
                message.error('Request timed out.');
            } else if (err.response) {
                message.error(`Error: ${err.response.status}`);
            } else if (err.request) {
                message.error('No response received.');
            } else {
                message.error('Error', err.message);
            }
            console.log("Error: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const renderSAMData = () => (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Card title="SAM" bordered={false}>
                    <Typography.Paragraph copyable={{ text: data?.SAM.HBoot_key }}>
                        Bootkey :  {data?.SAM.HBoot_key}
                    </Typography.Paragraph>
                </Card>
            </Col>
            <Divider />
            {data?.SAM.local_users.map((user, index) => (
                <Col span={12} key={index}>
                    <Badge.Ribbon
                        text="LM Hash is not Blank !"
                        style={{
                            display: isLMHashBlank(user.lm_hash)
                                ? "none"
                                : "block",
                            backgroundColor: "#ff4d4f",
                        }}
                    >
                        <Card
                            style={{ width: "100%" }}
                            title={user.username}

                            actions={[<UserOutlined key="user" />]}
                        >
                            {user.rid === 500 && <Tag color="red">Administrator</Tag>}
                            <Typography.Paragraph code copyable={{ text: user.lm_hash }}>
                                LM Hash{" "}
                                {isLMHashBlank(user.lm_hash)
                                    ? "(blank)"
                                    : "(LM hash is set !)"}{" "}
                                : {user.lm_hash}
                            </Typography.Paragraph>
                            <Typography.Paragraph code copyable={{ text: user.nt_hash }}>
                                NT Hash: {user.nt_hash}
                            </Typography.Paragraph>
                        </Card>
                    </Badge.Ribbon>
                </Col>
            ))
            }
            <Divider />
        </Row >
    )


    const HacktoolServerModal = (
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
                        <Input placeholder="Enter server URL"
                            value={serverURL}
                            onChange={(e) => setServerURL(e.target.value.trim())}
                        />
                    </Space.Compact>
                </Col>
                <Col span={24}>

                    <Typography.Title level={5}>API Key </Typography.Title>
                </Col>
                <Col span={24}>
                    <Input placeholder="API Key"
                        onChange={(e) => setServerAPIKey(e.target.value.trim())}
                        value={serverAPIKey}
                    />
                </Col>
                <Col span={24}>
                    <Button type="primary"
                        icon={<SyncOutlined />}
                        onClick={
                            checkServerConfigStatus
                        }
                    >Connect</Button>
                </Col>

            </Row>

        </Modal >
    )


    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Upload
                    fileList={samFileList}
                    onChange={(info) => {
                        setSamFileList([info.fileList[info.fileList.length - 1]]);
                    }}
                    // FIXME: UI crash when removing file
                    onRemove={(file) => {
                        const newList = samFileList.filter(item => item && item.uid !== file.uid);
                        setSamFileList(newList);
                    }}
                >
                    <Button icon={<UploadOutlined />}>Add SAM Hive</Button>
                </Upload>
            </Col>
            <Col span={12}>
                <Upload
                    fileList={systemFileList}
                    onChange={(info) => {
                        setSystemFileList([info.fileList[info.fileList.length - 1]]);
                    }}
                >
                    <Button icon={<UploadOutlined />}>Add SYSTEM Hive File</Button>
                </Upload>
            </Col>
            <Col span={24} >
                <Badge status={isServerReady ? "success" : "error"} text={!isServerReady && "Service is unreachable"}>
                    <Button
                        type="primary"
                        loading={isLoading}
                        onClick={handleSAMUpload}>Decrypt SAM</Button>
                </Badge>
            </ Col>
            <Col span={24} >
                {data && <Divider />}
                {data ? renderSAMData() : <Card><p> Server must be up and running to do this operation. </p></Card>}
            </ Col>

            {HacktoolServerModal}
        </Row>
    );
};

export default SAM;