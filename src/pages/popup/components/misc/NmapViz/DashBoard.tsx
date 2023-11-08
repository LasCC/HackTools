import React, { useState } from 'react';
import { Button, Modal, Input, List, Popconfirm, Row, Col, message, Typography, Divider } from 'antd';
import useStore from './store';

const DashboardPanel = () => {
    const { scanResults, setScanResults, setData, setActiveScanResult, initializeDatabase } = useStore();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newResultName, setNewResultName] = useState('');
    const [newResultData, setNewResultData] = useState('');

    const handleAddClick = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        try {
            const data = JSON.parse(newResultData);
            setScanResults({ ...scanResults, [newResultName]: data });
            setIsModalVisible(false);
        } catch (error) {
            console.error('Invalid JSON:', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDelete = (name) => {
        const { [name]: value, ...remainingResults } = scanResults;
        setScanResults(remainingResults);
    };

    const handleLoad = (name) => {
        console.trace(name)
        const resultData = scanResults[name];
        setData(resultData);
        setActiveScanResult(name);  // Mark this scan result as active
        initializeDatabase(resultData);  // Initialize database with result data
        message.success(`Loaded scan result: ${name}`);
    };
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={24}> <Button onClick={handleAddClick}>Add Scan Result</Button>
                    <Modal title="Add Scan Result" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input placeholder="Result Name" value={newResultName} onChange={e => setNewResultName(e.target.value)} />
                        <Input.TextArea placeholder="Result Data" value={newResultData} onChange={e => setNewResultData(e.target.value)} />
                    </Modal>
                </Col>
                <Col span={12}>
                    <List
                        dataSource={Object.keys(scanResults)}
                        renderItem={name => (

                            <Row gutter={[16, 16]}>
                                <Col span={18}>
                                    <Typography.Text>{name}</Typography.Text>
                                </Col>
                                <Col span={3}>
                                    <Button onClick={() => handleLoad(name)}>Load</Button>
                                </Col>
                                <Col span={3}>
                                    <Button danger onClick={() => handleDelete(name)}>Delete</Button>
                                </Col>
                            </Row>

                        )}
                    />
                </Col>
                <Col>
                    TODO.
                </Col>
            </Row>
        </div>
    );
};

export default DashboardPanel;