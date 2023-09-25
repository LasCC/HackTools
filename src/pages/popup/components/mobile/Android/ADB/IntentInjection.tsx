import React, { useState } from 'react';
import { Input, Button, Row, Col, Form, Space, Typography, Select } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';

const { Option } = Select;

interface Extra {
    key: string;
    value: string;
    type: 'string' | 'boolean' | 'integer'; // // TODO: Add more cases here for other intent types
}

const IntentInjection = () => {
    const [className, setClassName] = useState<string>('');
    const [extras, setExtras] = useState<Extra[]>([{ key: '', value: '', type: 'string' }]);
    const [adbCommand, setAdbCommand] = useState<string>('');
    const [javaPOC, setJavaPOC] = useState<string>('');

    const addExtra = () => {
        setExtras([...extras, { key: '', value: '', type: 'string' }]);
    };

    const clearAll = () => {
        setExtras([]);
    };

    const deleteExtra = (index: number) => {
        const newExtras = [...extras];
        newExtras.splice(index, 1);
        setExtras(newExtras);
    };


    const generatePOC = () => {
        let trimmedClassName = className.trim();
        let packageName = '';
        let activityName = '';

        if (trimmedClassName.startsWith('<')) {
            const match = trimmedClassName.match(/<activity[^>]*android:name="([^"]+)"/i);
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


        const extrasString = extras.map(extra => {
            switch (extra.type) {
                case 'string':
                    return `--es "${extra.key}" "${extra.value}"`;
                case 'boolean':
                    return `--ez "${extra.key}" ${extra.value}`;
                case 'integer':
                    return `--ei "${extra.key}" ${extra.value}`;
                // TODO: Add more cases here for other types
                default:
                    return '';
            }
        }).join(' ');
        const command = `adb shell am start -n ${packageName}/.${activityName} ${extrasString}`;
        setAdbCommand(command);

        const extrasJavaString = extras.map(extra => {
            switch (extra.type) {
                case 'string':
                    return `intent.putExtra("${extra.key}", "${extra.value}");`;
                case 'boolean':
                    return `intent.putExtra("${extra.key}", ${extra.value});`;
                case 'integer':
                    return `intent.putExtra("${extra.key}", ${extra.value});`;
                // TODO: Add more cases here for other types
                default:
                    return '';
            }
        }).join('\n');
        const javaPOCCode = `
// Java POC
Intent intent = new Intent();
intent.setClassName("${packageName}", "${packageName}.${activityName}");
${extrasJavaString}
startActivity(intent);
`.split('\n').map(line => line.trim()).join('\n');

        setJavaPOC(javaPOCCode);
    };

    return (
        <Row gutter={16}>
            <Col span={24}>
                <Form onFinish={generatePOC}>
                    <Form.Item label="Class">
                        <Input placeholder={`Provide com.app.RenderWebViewActivity or the whole xml tag : <activity android:name='com.app.RenderWebViewActivity' .../>`}
                            value={className} onChange={e => setClassName(e.target.value)} />
                    </Form.Item>
                    {extras.map((extra, index) => (
                        <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item label={`Extra ${index + 1} Type`}>
                                <Select value={extra.type} onChange={value => {
                                    const newExtras = [...extras];
                                    newExtras[index].type = value as 'string' | 'boolean' | 'integer'; 
                                    setExtras(newExtras);
                                }}>
                                    <Option value="string">String</Option>
                                    <Option value="boolean">Boolean</Option>
                                    <Option value="integer">Integer</Option>
                                    {/* Add more options here for other types */}
                                </Select>
                            </Form.Item>
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
                            <Form.Item>
                                <Button type="primary"
                                    icon={<MinusOutlined />}
                                    danger onClick={() => deleteExtra(index)}>
                                    Delete
                                </Button>
                            </Form.Item>
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="primary" icon={<PlusOutlined />} onClick={addExtra}>
                            Add Extra
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                            icon={<DeleteOutlined />} danger onClick={clearAll}>
                            Clear All
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Generate POCs</Button>
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