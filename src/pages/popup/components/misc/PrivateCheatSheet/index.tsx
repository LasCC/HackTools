import React, { useState } from 'react';
import { Button, Divider, Input, Modal, Table, Tag, Typography, message, Dropdown, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { ColumnType, FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface';

const index = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = React.useState<string>('');
  const [searchedColumn, setSearchedColumn] = React.useState<string>('');

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  interface DataType {
    id: string;
    name: string;
    payload: string;
    description: string;
    tags: string[];
  }

  const exampleData: DataType[] = [
    {
      id: '1',
      name: 'AMSI / ETW Bypass',
      payload: 'test1',
      description: 'Bypass AMSI and ETW powershell payload',
      tags: ['Windows', 'Bypass', 'PowerShell'],
    },
    {
      id: '2',
      name: 'Amazing custom Payload',
      payload: 'xss',
      description: 'WAF bypass XSS payload',
      tags: ['Web', 'XSS', 'WAF'],
    },
  ];

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


  const info = () => {
    messageApi.success('Your payload has been copied to the clipboard!');
  };


  const searchInput = React.useRef<any>(null);
  type DataIndex = string | string[];

  const handleSearch = (selectedKeys: any, confirm: () => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };



  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search Tag / Description / Payload / Name`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, Array.isArray(dataIndex) ? dataIndex.join(',') : dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, Array.isArray(dataIndex) ? dataIndex.join(',') : dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex as keyof DataType].toString().toLowerCase().includes(value.toString().toLowerCase())
      || record.tags.toString().toLowerCase().includes(value.toString().toLowerCase()) || record.description.toString().toLowerCase().includes(value.toString().toLowerCase()) || record.payload.toString().toLowerCase().includes(value.toString().toLowerCase())
    ,
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });




  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags', 
      filters: Array.from(new Set(exampleData.flatMap(item => item.tags))).map(tag => ({ text: tag, value: tag })),
      onFilter: (value, record) => 
        record.tags.toString().toLowerCase().includes(value.toString().toLowerCase()),
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )
    },
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

  const { Title, Paragraph } = Typography;

  return (
    <div>
      <Title level={3}>Private cheatsheet</Title>
      <Paragraph>
        Your Private Cheat Sheet with all the payloads you have saved.
      </Paragraph>
      <Divider />

      <Table columns={columns} dataSource={exampleData} rowKey="id"
        expandable={{
          expandedRowRender: (record: DataType) =>
            <>
              <Paragraph>{record.description}</Paragraph>
              <Paragraph code copyable editable>{record.payload}</Paragraph>
            </>
        }}
      />
    </div>
  );
};

export default index;