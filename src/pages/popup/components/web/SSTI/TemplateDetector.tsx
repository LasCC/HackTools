import React, { useState } from 'react';
// import { Table, Input, Button, Space, Typography, Tag } from 'antd';
import { message, Typography, Row, Col, Input, Table, Tag, Select, Form, InputRef, Button, Space, Dropdown } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useTemplateStore } from './store'
import type { ColumnsType, TableProps } from 'antd/es/table';
import payloadsData from '../../../assets/data/Web/SSTI/SSTI.json';
import { DataType } from './store'

const TemplateDetector = () => {

  const { templateType, detectTemplate, setTemplateType, setGuessing: setTemplateGuessing } = useTemplateStore();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.success('Your reverse shell has been copied to the clipboard!');
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };


  const data: DataType[] = payloadsData.map((payload, _) => {
    return {
      id: payload.id,
      name: payload.name,
      engine: payload.engine,
      payload: payload.payload,
      language: payload.language,
      primitive: payload.primitive,
      description: payload.description,
      required_charsets: payload.required_charsets,
    };
  });


  const renderTag = (primitive) => {
    switch (primitive) {
      case 'READ':
        return <Tag color="cyan">{primitive}</Tag>
      case 'WRITE':
        return <Tag color="volcano">{primitive}</Tag>
      case 'EXECUTE':
        return <Tag color="magenta">{primitive}</Tag>
      default:
        return <Tag color="blue">{primitive}</Tag>
    }
  }

  const renderLanguageTag = (lang) => {
    switch (lang) {
      case 'python':
        return <Tag color="yellow">{lang}</Tag>
      case 'ruby':
        return <Tag color="red">{lang}</Tag>
      case 'php':
        return <Tag color="blue">{lang}</Tag>
      case 'java':
        return <Tag color="green">{lang}</Tag>
      case 'javascript':
        return <Tag color="orange">{lang}</Tag>
      case 'csharp':
        return <Tag color="purple">{lang}</Tag>
      case 'go':
        return <Tag color="cyan">{lang}</Tag>
      default:
        return <Tag color="black">{lang}</Tag>
    }
  }

  const items = [
    {
      key: '1',
      label: 'Base64 Encoded',
    },
    {
      key: '2',
      label: 'URL Encoded',
    },
    {
      key: '3',
      label: 'Double URL Encoded',
    },
  ];


  const columns: ColumnsType<DataType> = [
    {
      title: 'Template Engine',
      dataIndex: 'engine',
      key: 'engine',
      filters: Array.from(new Set(payloadsData.map(item => item.engine))).map(engine => ({ text: engine, value: engine })),
      onFilter: (value, record) => record.engine.indexOf(String(value)) === 0,
      sorter: (a, b) => a.engine.length - b.engine.length,
      sortDirections: ['descend', 'ascend'],

    },
    {
      title: 'Language / Framework',

      dataIndex: 'language',
      key: 'language',
      filters: Array.from(new Set(payloadsData.flatMap(item => item.language))).map(language => ({ text: language, value: language })),
      onFilter: (value, record) => record.language.indexOf(String(value)) === 0,
      render: (text, { language }) => (
        <>
          {language.map(renderLanguageTag)}
        </>
      )

    },
    {
      title: 'Primitive',
      dataIndex: 'primitive',
      key: 'primitive',
      filters: Array.from(new Set(payloadsData.map(item => item.primitive))).map(primitive => ({ text: primitive, value: primitive })),
      onFilter: (value, record) => record.primitive.indexOf(String(value)) === 0,
      render: (text, primitive) => (
        <>
          {renderTag(primitive.primitive)}
        </>
      )
    },
    {
      title: 'Character Set',
      dataIndex: 'required_charsets',
      key: 'required_charsets',
      filters: Array.from(new Set(payloadsData.flatMap(item => item.required_charsets))).map(charset => ({ text: charset, value: charset })),
      sorter: (a, b) => a.required_charsets.length - b.required_charsets.length,
      sortDirections: ['ascend', 'descend'],
      onFilter: (value, record) => record.required_charsets.indexOf(String(value)) === 0,
      render: (required_charsets) => (
        <>
          {required_charsets.map((charset, _) => renderTag(charset))}
        </>
      )
    }
    ,
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, { payload }) => (
        <>
          <Dropdown.Button
            menu={{
              items, onClick: (e) => {
                switch (e.key) {
                  case '1':
                    // base64 encoded
                    info()
                    navigator.clipboard.writeText(btoa(payload));
                    break;
                  case '2':
                    // url encoded
                    info()
                    navigator.clipboard.writeText(encodeURIComponent(payload));
                    break;
                  case '3':
                    // double url encoded
                    info()
                    navigator.clipboard.writeText(encodeURIComponent(encodeURIComponent(payload)));
                    break;
                  default:
                    info()
                    break;
                }
              },
            }}
            onClick={() => { info(); navigator.clipboard.writeText(payload); }}
          >
            Copy
          </Dropdown.Button>
        </>
      ),
    }
  ];
  const { Title, Paragraph, Text } = Typography;

  return (
    <div>
      <Table columns={columns}
        expandable={{
          expandedRowRender: record =>
          (<Paragraph>
            <pre>
              <Text code>{record.payload}</Text>
            </pre>
          </Paragraph>),
          rowExpandable: record => record.engine !== 'Not Expandable',
        }}

        dataSource={data} />
    </div>
  );
};

export default TemplateDetector;