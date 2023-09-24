import { ExportOutlined, FileSyncOutlined, ImportOutlined, QuestionCircleOutlined, ToolOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Dropdown, FloatButton, Input, Modal, Row, Table, Tag, Typography, message, Space } from 'antd';
import Fuse from 'fuse.js';
import { useState , useEffect } from 'react';
import usePayloadStore, { DataType } from './store';
const { Title, Paragraph, Text } = Typography;


const index = () => {

    const { exportPayloadsAsJSON, importPayloadFromURL, importPayloadsFromLocalFile, payloads, setPayloads, remotePayloadURL, setRemotePayloadURL } = usePayloadStore();

    const [ messageApi, contextHolder ] = message.useMessage();
    const [ searchResults, setSearchResults ] = useState<DataType[]>( payloads );
    const [ isHelpModalOpen, setIsHelpModalOpen ] = useState( false );
    const [ isSyncModalOpen, setIsSyncModalOpen ] = useState( false );

    const handleFileImport = () => {
        // Create a hidden file input
        const fileInput = document.createElement( 'input' );
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        fileInput.onchange = ( event ) => {
            const target = event.target as HTMLInputElement;
            if ( target.files && target.files.length > 0 ) {
                const file = target.files[ 0 ];
                importPayloadsFromLocalFile( file );
            } else {
                console.log( 'No file selected' );
            }
            document.body.removeChild( fileInput );
        };
        document.body.appendChild( fileInput );
        fileInput.click();
    };
    const showHelpModal = () => {
        setIsHelpModalOpen( true );
    };

    const handleHelpModalOk = () => {
        setIsHelpModalOpen( false );
    };

    const handleHelpModalCancel = () => {
        setIsHelpModalOpen( false );
    };

    const showSyncModal = () => {
        setIsSyncModalOpen( true );
    };
    const handleSyncModalOk = () => {
        setIsSyncModalOpen( false );
    };
    const handleSyncModalCancel = () => {
        setIsSyncModalOpen( false );
    };


    const structureForHelpModal = `[
    {
      "id": "UNIQUE-PAYLOAD-ID-001",
      "name": "Payload Name",
      "tags": ["Tag1", "Tag2"],
      "description": "Payload description",
      "substeps": [
        {
          "description": "payload  title 1",
          "payload": "copyable payload 1"
        }
      ]
    }
  ]`;

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


    const fuse = new Fuse( payloads, fuseOptions );

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
        messageApi.success( 'Your payload has been copied to the clipboard!' );
    };

    const handleSearch = ( value: string ) => {
        if ( value ) {
            const results = fuse.search( value );
            setSearchResults( results.map( result => result.item ) );
        } else {
            setSearchResults( payloads );
        }
    };

    useEffect(() => {
        setSearchResults(payloads);
    }, [payloads]);

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
            filters: Array.from( new Set( payloads.flatMap( item => item.tags ) ) ).map( tag => ( { text: tag, value: tag } ) ),
            onFilter: ( value, record ) =>
                record.tags.toString().toLowerCase().includes( value.toString().toLowerCase() ),
            render: ( tags: string[] ) => (
                <>
                    {tags.map( tag => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ) )}
                </>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: ( _, { payload } ) => (
                <>
                    <Dropdown.Button
                        menu={{
                            items, onClick: ( e ) => {
                                switch ( e.key ) {
                                    case '1':
                                        // base64 encoded
                                        info()
                                        navigator.clipboard.writeText( btoa( payload ) );
                                        break;
                                    case '2':
                                        // url encoded
                                        info()
                                        navigator.clipboard.writeText( encodeURIComponent( payload ) );
                                        break;
                                    case '3':
                                        // double url encoded
                                        info()
                                        navigator.clipboard.writeText( encodeURIComponent( encodeURIComponent( payload ) ) );
                                        break;
                                    default:
                                        info()
                                        break;
                                }
                            },
                        }}
                        onClick={() => { info(); navigator.clipboard.writeText( payload ); }}
                    >
                        Copy
                    </Dropdown.Button>
                </>
            ),
        }
    ];

    const helpModal = (
        <Modal title="How it works ?" open={isHelpModalOpen} onOk={handleHelpModalOk} onCancel={handleHelpModalCancel}
            width={window.innerWidth > 800 ? 800 : window.innerWidth - 75}>
            <Typography style={{ textAlign: "justify" }}>
                Here you can create your own set of payloads and save them to find them quickly later, you can fill it by importing a JSON file having the following structure for each payload.
            </Typography>
            <Paragraph>
                <pre>
                    <Text copyable>
                        {structureForHelpModal}
                    </Text>
                </pre>
            </Paragraph>
            <Divider />
            <p>
                You can export the current state of the checklist as a JSON file. This can be useful for saving progress or sharing methodologies or results with others.
                Or even a CSV file that can be used in a spreadsheet software.
            </p>
        </Modal>
    )

    const syncModal = (
        <Modal title="Payload Management" open={isSyncModalOpen}
            onOk={handleSyncModalOk} onCancel={handleSyncModalCancel}
            width={window.innerWidth > 800 ? 800 : window.innerWidth - 75}
        >
            <Row gutter={[ 16, 16 ]}>
                <Col span={24}>
                    <Title level={3}>Export</Title>
                    <Button icon={<ExportOutlined />} onClick={exportPayloadsAsJSON} type='primary' >
                        Export Payloads
                    </Button>
                </Col>
                <Col span={24}>
                    <Title level={3}>Local Import</Title>
                    <Button icon={<ImportOutlined />} onClick={handleFileImport}>
                        Import Payloads from Local File
                    </Button>
                </Col>
                <Col span={24}>
                    <Title level={3}>Remote Import</Title>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input placeholder="Enter remote URL" value={remotePayloadURL} onChange={e => setRemotePayloadURL( e.target.value )} />
                        <Button type="primary" onClick={importPayloadFromURL}>Submit</Button>
                    </Space.Compact>
                </Col>
            </Row>
        </Modal>
    )

    return (
        <div>
            <Title level={3}>Private cheatsheet</Title>
            <Paragraph>
                Your Private Cheat Sheet with all the payloads you have saved.
            </Paragraph>

            <Input.Search
                placeholder="Search for a payload or description "
                onChange={e => handleSearch( e.target.value )}
            />
            <Divider />
            <Table columns={columns} dataSource={searchResults} rowKey="id"
                expandable={{
                    expandedRowRender: ( record: DataType ) =>
                        <>
                            <Paragraph>{record.description}</Paragraph>
                            <>
                                {record.substeps.map( ( substep, index ) => (
                                    <>
                                        <Paragraph>
                                            {substep.description}
                                        </Paragraph>
                                        <Paragraph code copyable editable>
                                            {substep.payload}
                                        </Paragraph>
                                    </>
                                ) )}
                            </>
                        </>
                }}
            />

            <FloatButton.Group
                trigger="click"
                type="primary"
                icon={<ToolOutlined />}
                tooltip={<div>Settings</div>}
            >
                <FloatButton icon={<QuestionCircleOutlined />} onClick={showHelpModal} tooltip={<div>Help</div>} />
                <FloatButton icon={<FileSyncOutlined />} onClick={showSyncModal} tooltip={<div>Payload Managment</div>} />
            </FloatButton.Group>
            {helpModal}
            {syncModal}
        </div>
    );
};

export default index;