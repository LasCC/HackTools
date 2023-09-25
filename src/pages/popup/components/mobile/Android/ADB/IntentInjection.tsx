import React, { useState } from 'react';
import { Input, Button, Row, Col, Form, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';

const IntentInjection = () => {
    const [className, setClassName] = useState('');
    const [extras, setExtras] = useState([{ key: '', value: '' }]);
    const [adbCommand, setAdbCommand] = useState('');
    const [javaPOC, setJavaPOC] = useState('');



    const generatePOC = () => {
        let trimmedClassName = className.trim();
        let packageName = '';
        let activityName = '';

        if (trimmedClassName.startsWith('<')) {
            const match = trimmedClassName.match(/<activity[^>]*android:name="([^"]+)"/);
            if (match) {
                const fullClassName = match[1];
                const splitName = fullClassName.split('.');
                packageName = splitName.slice(0, -1).join('.');
                activityName = splitName[splitName.length - 1];
            }
        } else {
            const splitName = trimmedClassName.split('.');
            packageName = splitName.slice(0, -1).join('.');
            activityName = splitName[splitName.length - 1];
        }

        const extrasString = extras.map(extra => `--es "${extra.key}" "${extra.value}"`).join(' ');
        const command = `adb shell am start -n ${packageName}/.${activityName} ${extrasString}`;
        setAdbCommand(command);

        const extrasJavaString = extras.map(extra => `intent.putExtra("${extra.key}", "${extra.value}");`).join('\n');
        const javaPOCCode = `
    Intent intent = new Intent();
    intent.setClassName("${packageName}", "${packageName}.${activityName}");
    ${extrasJavaString}
    startActivity(intent);
    `.split('\n').map(line => line.trim()).join('\n');

        setJavaPOC(javaPOCCode);
    };

    const addExtra = () => {
        setExtras([...extras, { key: '', value: '' }]);
    };

    return (
        <Row gutter={16}>
            <Col span={24}>
                <Form onFinish={generatePOC}>
                    <Form.Item label="Class">
                        <Input placeholder="Enter class" value={className} onChange={e => setClassName(e.target.value)} />
                    </Form.Item>
                    {extras.map((extra, index) => (
                        <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item label={`Extra ${index + 1} Key`}>
                                <Input placeholder="Enter key" value={extra.key} onChange={e => {
                                    const newExtras = [...extras];
                                    newExtras[index].key = e.target.value;
                                    setExtras(newExtras);
                                }} />
                            </Form.Item>
                            <Form.Item label={`Extra ${index + 1} Value`}>
                                <Input placeholder="Enter value" value={extra.value} onChange={e => {
                                    const newExtras = [...extras];
                                    newExtras[index].value = e.target.value;
                                    setExtras(newExtras);
                                }} />
                            </Form.Item>
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="primary" icon={<PlusOutlined />} onClick={addExtra}>
                            Add Extra
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Generate ADB POC</Button>
                    </Form.Item>
                </Form>
                <Typography.Paragraph copyable code>
                    {adbCommand}
                </Typography.Paragraph>
                <SyntaxHighlighter language="java" style={vs2015}>
                    {javaPOC}
                </SyntaxHighlighter>
            </Col>
        </Row>
    );
};

export default IntentInjection;