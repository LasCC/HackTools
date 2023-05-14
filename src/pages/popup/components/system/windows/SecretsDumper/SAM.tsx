import React, { useState } from 'react';
import { Badge, Card, Col, Divider, Row, Upload, Button, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

interface UserData {
  lm_hash: string;
  nt_hash: string;
  rid: number;
  username: string;
}

interface SAMData {
  HBoot_key: string;
  local_users: UserData[];
}

interface SAMProps {
  data: {
    SAM: SAMData;
    SYSTEM: {
      BootKey: string;
      CurrentControlSet: string;
    };
  };
}

const SAMComponent = () => {
  const [data, setData] = useState<SAMProps['data'] | null>(null);
  const [samFileList, setSamFileList] = useState([]);
  const [systemFileList, setSystemFileList] = useState([]);

  const isLMHashActive = (lm_hash: string) => lm_hash !== "aad3b435b51404eeaad3b435b51404ee";

  const handleSAMUpload = async () => {
    if (samFileList.length === 0 || systemFileList.length === 0) {
      message.error('Please select both SAM and SYSTEM hive');
      return;
    }

    const samFile = samFileList[0].originFileObj;
    const systemFile = systemFileList[0].originFileObj;
    const fmData = new FormData();
    const config = {
      // TODO: add api key window popup
      headers: { "content-type": "multipart/form-data",  "x-api-key": "test" },
      onUploadProgress: (event: any) => {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Current progress: ${percent}%`);
      },
    };
    fmData.append("sam", samFile);
    fmData.append("system", systemFile);
    try {
      const res = await axios.post("http://localhost:8001/decrypt/sam", fmData, config);
      console.log("server res: ", res);
      setData(res.data);
    } catch (err) {
      console.log("Error: ", err);
      message.error('Upload failed.');
    }
  };

  const renderSAMData = () => (
    (
      <div>
        <h2>SAM</h2>
        <p>HBoot_key: {data.SAM.HBoot_key}</p>
        <Divider />
        <Row gutter={[16, 16]}>
          {data.SAM.local_users.map((user, index) => (
            <Col span={12}>
              <Badge.Ribbon
                text="LM Hash is not Blank !"
                style={{
                  display: isLMHashActive(user.lm_hash)
                    ? "block"
                    : "none",
                  backgroundColor: "#ff4d4f",
                }}
              >
                <Card
                  key={index}
                  style={{ width: "100%" }}
                  title={`User: ${user.username}`}
                  actions={[<UserOutlined key="user" />]}
                >
                  <p>RID: {user.rid}</p>
                  <p>
                    LM Hash{" "}
                    {user.lm_hash === "aad3b435b51404eeaad3b435b51404ee"
                      ? "(blank)"
                      : "(LM hash active !)"}{" "}
                    : {user.lm_hash}
                  </p>
                  <p>NT Hash: {user.nt_hash}</p>
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
        <Divider />
        <h2>SYSTEM</h2>
        <p>BootKey: {data.SYSTEM.BootKey}</p>
        <p>CurrentControlSet: {data.SYSTEM.CurrentControlSet}</p>
      </div>
    )
  )

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload
            fileList={samFileList}
            onChange={(info) => {
              setSamFileList([info.fileList[info.fileList.length - 1]]);
            }}
            // TODO: onRemove must be fixed it crashes the app, UID must be added to the file 
            onRemove={(file) => {
              setSamFileList((prevList) => prevList.filter(item => item.uid !== file.uid));
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
            // TODO: onRemove must be fixed it crashes the app, UID must be added to the file 
            
          >
            <Button icon={<UploadOutlined />}>Add SYSTEM Hive File</Button>
          </Upload>
        </Col>
      </Row>
      <Button onClick={handleSAMUpload}>Decode SAM</Button>

      {data && <Divider />}
      {data ? renderSAMData() : <>
        <Card>
          <p> Server must be up and running to do this operation. </p>
        </Card>
      </>}
    </div>
  );
};

export default SAMComponent;



