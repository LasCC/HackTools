import { useEffect } from 'react';
import { Table, Input, Row, Col, Collapse, Typography, Empty } from 'antd';
import useStore from './store';

const Tabler = () => {
    const { data, queryData, tableData, searchQuery, setSearchQuery, activeScanResult } = useStore();

    if (data.length === 0 || !activeScanResult) return <Empty description="No data loaded. Please add and load a scan result." />

    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Port',
            dataIndex: 'port',
            key: 'port',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
        },
        // Add more columns as needed
    ];

    const handleQuerySubmit = (query) => {
        queryData(query);
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Input.Search
                    placeholder="Enter SQL query"
                    value={searchQuery}
                    onChange={evt => setSearchQuery(evt.target.value)}
                    enterButton="Submit"
                    size="large"
                    onSearch={handleQuerySubmit}
                />
            </Col>
            <Col span={24}>
                <Collapse
                    ghost
                    items={[
                        {
                            key: '1',
                            label: `Query result ~ (${data[0] && Object.keys(data[0]).length > 0 ? data.length : 0}) services`,
                            children: <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                {JSON.stringify(data, null, 2)}
                            </pre>
                        }
                    ]}
                />
            </Col>
            <Col span={24}>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    rowKey="id"
                />
            </Col>

        </Row>
    );
};

export default Tabler;