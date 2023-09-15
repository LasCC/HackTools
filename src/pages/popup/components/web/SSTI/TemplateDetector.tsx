import React, { useState } from 'react';
// import { Table, Input, Button, Space, Typography, Tag } from 'antd';
import { message, Typography, Row, Col, Input, Table, Tag, Select, Form, InputRef, Button, Space, Dropdown } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTemplateStore } from './store'
import { Modal, Checkbox, Divider } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import payloadsData from '../../../assets/data/Web/SSTI/SSTI.json';
import { DataType, Language } from './store'

const TemplateDetector = () => {

  const { detectTemplate, setGuessing: setTemplateGuessing, potentialTemplateEngine } = useTemplateStore();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [payload, setPayload] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onCheckboxChange = checkedValues => {
    setSelectedLanguages(checkedValues);
  };

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

  const handleOk = () => {
    detectTemplate(payload, selectedLanguages);
    console.log(potentialTemplateEngine);
    // setIsModalVisible(false);
  };

  return (
    <div>

      <Title level={3}>Server Side Template Injection</Title>
      <Paragraph>
        Server-side template injection (SSTI) is a vulnerability that occurs when an application allows user input, such as a template file or parameter, to be evaluated by the server. This can result in remote code execution on the server.
      </Paragraph>
      <Divider />
      <Button type="primary" onClick={showModal}>Template Detector <SearchOutlined /></Button>
      <Divider />
      <Modal title="Template Detector" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>This analyze a given payload and suggest possible template engines used. It allows you to input your payload and select suspected languages. Note that this tool is not 100% accurate and may produce false positives.</p>
        <Divider />
        <p>Paste your template payload to detect:</p>
        <Input.TextArea value={payload} onChange={e => setPayload(e.target.value)} />
        <Divider />
        <p>Select languages:</p>
        <Checkbox.Group options={Object.values(Language)} onChange={onCheckboxChange} />
        {potentialTemplateEngine && Object.entries(potentialTemplateEngine).map
          // @ts-ignore
          (([engine, { confidence, languages }]) => (
            <p key={engine}><Tag>{`${engine} - ${(languages.join(', '))}`}</Tag> Confidence: {confidence}%</p>
          ))}
        {payload.length > 0 && potentialTemplateEngine && Object.entries(potentialTemplateEngine).length === 0 && (
          <p>No template engine detected.</p>
        )}
      </Modal>

      <Table columns={columns}
        expandable={{
          expandedRowRender: record =>
          (<Paragraph copyable={{ text: record.payload }}>
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