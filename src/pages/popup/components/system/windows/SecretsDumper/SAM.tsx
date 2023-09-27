import { FileSyncOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Divider, FloatButton, Row, Tag, Typography, Upload, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { BLANK_LM_HASH, useSecretsStore } from './useSecret';


const SAM = () => {


    const { data, samFileList, systemFileList, setData, setSamFileList, setSystemFileList, serverAPIKey, serverURL, setServerURL } = useSecretsStore();
    const [isLoading, setIsLoading] = useState(false);
    const isLMHashBlank = (lm_hash: string) => lm_hash === BLANK_LM_HASH;


    const handleSAMUpload = async () => {
        setIsLoading(true);
        if (samFileList.length === 0 || systemFileList.length === 0) {
            message.error('Please select both SAM and SYSTEM hive');
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
        try {
            const res = await axios.post(serverURL + "/decrypt/sam", fmData, config);
            console.log("server res: ", res);
            setData(res.data);
        } catch (err) {
            console.log("Error: ", err);
            message.error('Upload failed.');
        } finally {
            setIsLoading(false); // End loading
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
                            <Typography.Paragraph copyable={{ text: user.lm_hash }}>
                                LM Hash{" "}
                                {isLMHashBlank(user.lm_hash)
                                    ? "(blank)"
                                    : "(LM hash is set !)"}{" "}
                                : {user.lm_hash}
                            </Typography.Paragraph>
                            <Typography.Paragraph copyable={{ text: user.nt_hash }}>
                                <p>NT Hash: {user.nt_hash}</p>
                            </Typography.Paragraph>
                        </Card>
                    </Badge.Ribbon>
                </Col>
            ))
            }
            <Divider />
        </Row >
    )

    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Upload
                    fileList={samFileList}
                    onChange={(info) => {
                        setSamFileList([info.fileList[info.fileList.length - 1]]);
                    }}
                    onRemove={(file) => {
                        const newList = samFileList.filter(item => item.uid !== file.uid);
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
                <Button
                    loading={isLoading}
                    onClick={handleSAMUpload}>Decode SAM</Button>
            </ Col>
            <Col span={24} >
                {data && <Divider />}
                {data ? renderSAMData() : <Card><p> Server must be up and running to do this operation. </p></Card>}
            </ Col>
        </Row>
    );
};

export default SAM;