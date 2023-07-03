import React, { useState, useEffect } from 'react';
import { Parser } from 'node-sql-parser';
import { Row, Col, Alert, Collapse } from 'antd';
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { dracula, draculaInit } from '@uiw/codemirror-theme-dracula';
import './SQLSyntaxParser.css';

const SQLSyntaxParser = () => {
    // TODO: store it in zustand
    const [sqlcode, setSqlcode] = useState("select id, name from students where age < 1;"); 
    const [sqlast, setSQLast] = useState("");
    const [error, setError] = useState("");

    
    const parser = new Parser();

    useEffect(() => {
        try {
            const ast = parser.astify(sqlcode);
            setSQLast(JSON.stringify(ast, null, 2));
            setError("");  // clear previous error if any
        } catch (err) {
            setError(err.message);  // set the error message
        }
    }, [sqlcode]);

    return (
        <Row gutter={16}>
            <Col span={24} style={{ margin: "1rem 0" }}>
                <CodeMirror
                    theme={dracula} 
                    value={sqlcode}
                    extensions={[sql()]}
                    onChange={(value) => setSqlcode(value)}
                    height="auto"  // adjusts height based on content
                    minHeight="200px"  // minimum height of 10 lines approximately
                />
            </Col>
            <Col span={24}>
                {!error && (
                    <Alert
                        message="SQL query is syntactically correct"
                        type="success"
                        showIcon
                        icon={
                            <CheckCircleOutlined style={{ color: '#52c41a' }} />
                        }
                    />
                )}
                {error && (
                    <Alert
                        message="Query seems invalid"
                        description={error}
                        type="error"
                        showIcon
                        icon={<WarningOutlined />}
                    />
                )}
                {!error &&
                    <div className="my-4">
                        <Collapse>
                            <Collapse.Panel header="View AST" key="1">
                                <pre>{sqlast}</pre>
                            </Collapse.Panel>
                        </Collapse>
                    </div>
                }
            </Col>
        </Row>
    )
}

export default SQLSyntaxParser;
