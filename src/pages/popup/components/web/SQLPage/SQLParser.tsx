import React, { useState } from 'react';
import NodeSQLParser from 'node-sql-parser'
import TextArea from 'antd/lib/input/TextArea';



const SQLSyntaxParser = () => {
    const [sql, setSql] = useState("select id, name from students where age < 1");
    const [sqlast, setSQLast] = useState("");
    const [error, setError] = useState("");

    const parser = new NodeSQLParser.Parser()

    const handleOnChange = (e) => {
        const value = e.target.value;
        setSql(value);
        try {
            const ast = parser.astify(value);
            setSQLast(JSON.stringify(ast, null, 2));
            setError("");  // clear previous error if any
        } catch (err) {
            setError(err.message);  // set the error message
        }
    }

    return (
        <>
            <TextArea rows={4} onChange={handleOnChange} value={sql} />
            <h3>AST</h3>
            <TextArea rows={4} value={sqlast} />
            {error && (
                <>
                    <h3>Error</h3>
                    <TextArea rows={4} value={error} />
                </>
            )}
        </>
    )
}

export default SQLSyntaxParser;