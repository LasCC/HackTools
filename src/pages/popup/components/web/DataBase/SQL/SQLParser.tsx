import React, { useState, useCallback } from 'react';
import { Parser } from 'node-sql-parser';
import { Input, Row, Col, Alert, Collapse } from 'antd';
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';

const SQLSyntaxParser = () => {
    const [sql, setSql] = useState("select id, name from students where age < 1");
    const [sqlast, setSQLast] = useState("");
    const [error, setError] = useState("");

    const parser = new Parser();

    const handleOnChange = useCallback((e) => {
        const value = e.target.value;
        setSql(value);
        try {
            const ast = parser.astify(value);
            setSQLast(JSON.stringify(ast, null, 2));
            setError("");  // clear previous error if any
        } catch (err) {
            setError(err.message);  // set the error message
        }
    }, []);

    return (
        <Row gutter={16}>
            <Col span={12}>
                <Input.TextArea rows={4} onChange={handleOnChange} value={sql} />
            </Col>
            <Col span={12}>
                {!error && (
                    <Alert
                        message="SQL is valid"
                        description="SQL syntax is correct."
                        type="success"
                        showIcon
                        icon={<CheckCircleOutlined />}
                    />
                )}
                {error && (
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                        icon={<WarningOutlined />}
                    />
                )}
                { !error && <Collapse>
                    <Collapse.Panel header="See AST Result" key="1">
                        <Input.TextArea rows={4} value={sqlast} readOnly />
                    </Collapse.Panel>
                </Collapse>}
            </Col>
        </Row>
    )
}

export default SQLSyntaxParser;
