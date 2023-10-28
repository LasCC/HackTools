import React, { useState } from 'react';
import { Input, Button, List, Popconfirm } from 'antd';
import useStore from './store';

const QueryManagement = () => {
    const { aliases, setAliases } = useStore();
    const [alias, setAlias] = useState('');
    const [query, setQuery] = useState('');
    const [editingAlias, setEditingAlias] = useState(null);

    const handleAliasSubmit = () => {
        setAliases({ ...aliases, [alias]: query });
        setAlias('');
        setQuery('');
        setEditingAlias(null);
    };

    const handleAliasEdit = (alias) => {
        setAlias(alias);
        setQuery(aliases[alias]);
        setEditingAlias(alias);
    };

    const handleAliasDelete = (alias) => {
        const { [alias]: value, ...remainingAliases } = aliases;
        setAliases(remainingAliases);
    };

    return (
        <div>
            <h2>Query Management</h2>
            <Input placeholder="Alias" value={alias} onChange={e => setAlias(e.target.value)} />
            <Input placeholder="SQL Query" value={query} onChange={e => setQuery(e.target.value)} />
            <Button onClick={handleAliasSubmit}>{editingAlias ? 'Update Alias' : 'Add Alias'}</Button>
            <List
                dataSource={Object.keys(aliases)}
                renderItem={alias => (
                    <List.Item>
                        <div>
                            {alias}: {aliases[alias]}
                            <Button onClick={() => handleAliasEdit(alias)}>Edit</Button>
                            <Popconfirm title="Are you sure to delete this alias?" onConfirm={() => handleAliasDelete(alias)} okText="Yes" cancelText="No">
                                <Button>Delete</Button>
                            </Popconfirm>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default QueryManagement;