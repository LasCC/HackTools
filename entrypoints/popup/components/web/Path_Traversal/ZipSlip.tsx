import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Button,
  Input,
  Form,
  List,
  Divider,
  Row,
  Col,
  Typography,
  Space,
} from "antd";
import Title from "antd/es/typography/Title";

const ZipSlip = () => {
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]);
  const [archiveName, setArchiveName] = useState("");

  const handleAddFile = () => {
    form.validateFields().then((values) => {
      const { filename, content } = values;
      setFiles([...files, { name: filename, content }]);
      form.resetFields();
    });
  };

  const handleDeleteFile = (name) => {
    const updatedFiles = files.filter((file) => file.name !== name);
    setFiles(updatedFiles);
  };

  const handleGenerateZip = () => {
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.name, file.content);
    });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, `${archiveName}`);
    });
  };

  const handleArchiveNameChange = (e) => {
    setArchiveName(e.target.value);
  };

  const handleDeleteAllFiles = () => {
    setFiles([]);
  };

  const handleDownloadFile = (file) => {
    const blob = new Blob([file.content]);
    saveAs(blob, file.name);
  };

  return (
    <div style={{ margin: 15 }}>
      <Title level={2} style={{ fontWeight: "bold" }}>
        Zipslip
      </Title>
      <Typography>
        Zipslip exploit is a form of directory traversal that can be exploited
        by specially naming files with characters that could be used to traverse
        directories. This can be used to overwrite files or create new files in
        arbitrary locations on the server during extraction of an archive to
        achieve potentilly remote code execution.
      </Typography>
      <Divider />
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24}>
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="filename"
                  label="Filename"
                  rules={[
                    { required: true, message: "Please enter a filename" },
                  ]}
                >
                  <Input placeholder="Enter a filename(../../ are interpreted as directories to traverse)" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="content"
                  label="Content"
                  rules={[{ required: true, message: "Please enter content" }]}
                >
                  <Input.TextArea
                    placeholder="Enter content (eg. webshell)"
                    rows={4}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={handleAddFile}>
                  Add File
                </Button>
                <Button type="dashed" danger onClick={handleDeleteAllFiles}>
                  Delete All Files
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <Divider />
          <List
            dataSource={files}
            renderItem={(file) => (
              <List.Item>
                <span style={{ marginRight: 16 }}>{file.name}</span>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteFile(file.name)}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col xs={24}>
          <Form layout="vertical" style={{ marginBottom: 16 }}>
            <Form.Item label="Archive Name">
              <Input
                value={archiveName}
                onChange={handleArchiveNameChange}
                placeholder="archive.zip"
              />
            </Form.Item>
          </Form>
          <Button
            type="primary"
            onClick={handleGenerateZip}
            disabled={files.length === 0 || archiveName.trim() === ""}
            style={{ marginTop: 16 }}
            block
          >
            Generate Zip
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ZipSlip;
