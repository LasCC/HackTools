import React from 'react';
import { Input, Button, Row, Col, Form, Space, Typography, Select } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useIntentInjectionStore } from './store/useIntentInjection';

const { Option } = Select;

const IntentInjection = () => {

    const { className, setClassName, extras, setExtras, adbCommand, javaPOC, generatePOC, addExtra, deleteExtra, clearAllExtra } = useIntentInjectionStore();

    return (
        <Row gutter={16}>
            <Col span={24}>
                <Form onFinish={generatePOC}>
                    <Form.Item label="Activity">
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
                            icon={<DeleteOutlined />} danger onClick={clearAllExtra}>
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