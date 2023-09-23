import React from 'react'
import { Button, Col, Divider, Input, Row, Select, Space, Table, Tag, Typography, message, Dropdown } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AiOutlineFile } from 'react-icons/ai';
import type { ColumnsType } from 'antd/es/table';
import { ColumnType } from 'antd/es/table/interface';
import { useStore, XXETypes } from '../store'
import payloadsData from '../../../../assets/data/Web/XXE/XXE.json';
const index = () => {

    const { setXXEfileName, XXEfilename, XXEtype, setXXEtype, XXEDTDPATH, setXXEDTDPath, REMOTEXXEServer, setREMOTEXXEServer } = useStore()
    const { Title, Paragraph, Text } = Typography;
    const [ messageApi, contextHolder ] = message.useMessage();
    const info = () => {
        messageApi.success( 'Your reverse shell has been copied to the clipboard!' );
    };

    interface DataType {
        id: string;
        name: string;
        description: string;
        document_type: string[];
        oracle: string;
        primitive: string[];
        payload: { main: string; description?: string }[];
    }

    const data: DataType[] = payloadsData.map( ( payload, _ ) => {
        return {
            id: payload.id,
            name: payload.name,
            description: payload.description,
            document_type: payload.document_type,
            oracle: payload.oracle,
            primitive: payload.primitive,
            payload: payload.payload,
        };
    } )

    React.useEffect( () => { }, [ XXEfilename, XXEtype ] );

    const [ searchText, setSearchText ] = React.useState<string>( '' );
    const [ searchedColumn, setSearchedColumn ] = React.useState<string>( '' );
    const searchInput = React.useRef<any>( null );

    const renderTag = ( data ) => {
        switch ( data ) {
            case 'READ':
                return <Tag color="cyan">{data}</Tag>
            case 'WRITE':
                return <Tag color="volcano">{data}</Tag>
            case 'EXECUTE':
                return <Tag color="magenta">{data}</Tag>
            case 'DOS':
                return <Tag color="red">{data}</Tag>
            case 'INBAND':
                return <Tag color="green">{data}</Tag>
            case 'ERROR':
                return <Tag color="orange">{data}</Tag>
            case 'OOB':
                return <Tag color="geekblue">{data}</Tag>
            case 'plain_XML':
                return <Tag color="yellow">{data}</Tag>
            default:
                return <Tag color="blue">{data}</Tag>
        }
    }

    const handleSearch = ( selectedKeys: any, confirm: () => void, dataIndex: string ) => {
        confirm();
        setSearchText( selectedKeys[ 0 ] );
        setSearchedColumn( dataIndex );
    };

    const handleReset = ( clearFilters: () => void ) => {
        clearFilters();
        setSearchText( '' );
    };

    type DataIndex = string | string[];

    const getColumnSearchProps = ( dataIndex: DataIndex ): ColumnType<DataType> => ( {
        filterDropdown: ( { setSelectedKeys, selectedKeys, confirm, clearFilters } ) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${ dataIndex }`}
                    value={selectedKeys[ 0 ]}
                    onChange={e => setSelectedKeys( e.target.value ? [ e.target.value ] : [] )}
                    onPressEnter={() => handleSearch( selectedKeys, confirm, Array.isArray( dataIndex ) ? dataIndex.join( ',' ) : dataIndex )}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch( selectedKeys, confirm, Array.isArray( dataIndex ) ? dataIndex.join( ',' ) : dataIndex )}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset( clearFilters )} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: ( value, record ) => record[ dataIndex as keyof DataType ].toString().toLowerCase().includes( value.toString().toLowerCase() ),
        onFilterDropdownVisibleChange: visible => {
            if ( visible ) {
                setTimeout( () => searchInput.current?.select(), 100 );
            }
        },
    } );

    const items = [
        {
            key: '1',
            label: 'Full Base64 Encoded',
        },
        {
            key: '2',
            label: 'B64 Encoded Ressource Name',
        },
        {
            key: '3',
            label: 'URL Encoded',
        },
        {
            key: '4',
            label: 'Double URL Encoded',
        },
    ];

    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps( 'name' ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'XML Type',
            dataIndex: 'document_type',
            key: 'document_type',
            filters: Array.from( new Set( payloadsData.map( item => item.document_type.join( ', ' ) ) ) ).map( document_type => ( { text: document_type, value: document_type } ) ),
            onFilter: ( value, record ) => record.document_type.indexOf( String( value ) ) === 0,
            render: ( text, doc ) => (
                renderTag( text )
            ),
        },
        {
            title: 'Transmission',
            dataIndex: 'oracle',
            key: 'oracle',
            render: ( text, primitive ) => (
                <>
                    {renderTag( primitive.oracle )}
                </>
            ),
        },
        {
            title: 'Primitive',
            dataIndex: 'primitive',
            key: 'primitive',
            filters: Array.from( new Set( payloadsData.map( item => item.primitive.join( ', ' ) ) ) ).map( primitive => ( { text: primitive, value: primitive } ) ),
            onFilter: ( value, record ) => record.primitive.indexOf( String( value ) ) === 0,
            render: ( text, primitive ) => (
                <>
                    {renderTag( primitive.primitive )}
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
                                        // Full base64 encoded
                                        info()
                                        navigator.clipboard.writeText( btoa( payload[ 0 ].main ) );
                                        break;
                                    case '2':
                                        // Ressource b64 encoded
                                        info()
                                        const encodedRessourceName = "data://text/plain;base64," + btoa( XXEfilename )
                                        navigator.clipboard.writeText( payload[ 0 ].main.replace( /\{RESSOURCE\}/g, encodedRessourceName ) );
                                        break;
                                    case '3':
                                        // url encoded
                                        info()
                                        navigator.clipboard.writeText( encodeURIComponent( encodeURIComponent( payload[ 0 ].main ) ) );
                                        break;
                                    case '4':
                                        // double url encoded
                                        info()
                                        navigator.clipboard.writeText( encodeURIComponent( encodeURIComponent( encodeURIComponent( payload[ 0 ].main ) ) ) );
                                        break;
                                    default:
                                        info()
                                        break;
                                }
                            },
                        }}
                        onClick={() => { info(); navigator.clipboard.writeText( payload[ 0 ].main ) }}
                    >
                        Copy
                    </Dropdown.Button>
                </>
            ),
        }
    ];

    const renderXXEForms = () => {
        if ( XXEtype === XXETypes.INBAND ) {
            return (
                <Col span={8}>
                    <Input
                        maxLength={100}
                        prefix={<AiOutlineFile />}
                        name='Ressource'
                        placeholder="Ressource to fetch eg. file:///etc/hostname or http://..."
                        onChange={setXXEfileName}
                        value={XXEfilename}
                    />
                </Col>

            )
        } else if ( XXEtype === XXETypes.OOB ) {
            return (
                <>

                    <Col span={8}>
                        <Input
                            maxLength={100}
                            prefix={<AiOutlineFile />}
                            name='Ressource'
                            placeholder="Ressource to fetch eg. file:///etc/hostname or http://..."
                            onChange={setXXEfileName}
                            value={XXEfilename}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            maxLength={100}
                            prefix={<AiOutlineFile />}
                            name='DTD Path'
                            placeholder="DTD URI | http://attacker.com/evil.dtd"
                            onChange={setXXEDTDPath}
                            value={XXEDTDPATH}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            maxLength={100}
                            prefix={<AiOutlineFile />}
                            name='Remote URL'
                            placeholder="server to receive the data from | attacker.com"
                            onChange={setREMOTEXXEServer}
                            value={REMOTEXXEServer}
                        />
                    </Col>
                </>
            )
        }
    }

    const filteredDatabyCurrentXXEType = data.filter( item =>
        XXEtype === XXETypes.INBAND ? item.oracle.includes( 'INBAND' ) : item.oracle.includes( 'OOB' )
    );

    const formatPayload = payload => payload.replace( /\{RESSOURCE\}/g, XXEfilename ).replace( /\{DTD_PATH\}/g, XXEDTDPATH ).replace( /\{REMOTE_SERVER\}/g, REMOTEXXEServer )

    return (
        <>
            <Row gutter={[ 16, 16 ]}>
                {renderXXEForms()}
                <Col span={8}>
                    <Select
                        defaultValue={XXEtype}
                        style={{ width: "100%" }}
                        onChange={setXXEtype}
                        options={[
                            { value: XXETypes.INBAND, label: 'In Band Exfiltration' },
                            { value: XXETypes.OOB, label: 'Out of Band Exfiltration' },
                        ]}
                    />
                </Col>
            </Row>
            <Divider />
            <Row gutter={[ 16, 16 ]}>
                <Col span={24}>
                    <Table columns={columns}
                        locale={{ emptyText: `No payloads found for "${ XXEtype }" XXE type. Try adjusting your search criteria or select a different type.` }}
                        expandable={{
                            expandedRowRender: record =>
                            ( <>
                                {record.payload.map( ( pld, id ) =>
                                (
                                    <>
                                        <Paragraph key={id}>{formatPayload( pld.description )}</Paragraph>
                                        <Text code copyable editable key={id}>{formatPayload( pld.main )}</Text>
                                        <Divider />
                                    </>
                                )
                                )}
                            </> ),
                            rowExpandable: record => record.name !== 'Not Expandable',
                        }}
                        rowKey={( record, id ) => record.id || id}
                        dataSource={filteredDatabyCurrentXXEType}
                    />
                </Col>
            </Row>
        </>
    )
}

export default index