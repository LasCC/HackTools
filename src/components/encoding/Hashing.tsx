import React, { useState } from 'react';
import { Button, Input, Typography, Menu, Dropdown, Divider, message } from 'antd';
import { CopyOutlined, DownOutlined, ArrowsAltOutlined, createFromIconfontCN } from '@ant-design/icons';
import MD5 from 'crypto-js/md5';
import SHA1 from 'crypto-js/sha1';
import SHA256 from 'crypto-js/sha256';
import SHA512 from 'crypto-js/sha512';
//@ts-ignore
import Sm3 from 'sm3';
import Clipboard from 'react-clipboard.js';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );

const HashEncode = () => {
    const [ input, setInput ] = useState<string>( '' );
    const [ _, setHashType ] = useState( '0' );
    const [ hashname, setHashname ] = useState( 'MD5' );
    const [ output, setOutput ] = useState( '' );
    const handleClick = ( type: { key: React.SetStateAction<string | any> } ) => {
        setHashType( type.key );
        resolvehashname( type.key );
    };
    const handleEncode = ( hashtype: string ) => {
        if ( hashtype === 'MD5' ) {
            setOutput( MD5( input, undefined ).toString() );
        } else if ( hashtype === 'SHA1' ) {
            setOutput( SHA1( input, undefined ).toString() );
        } else if ( hashtype === 'SHA256' ) {
            setOutput( SHA256( input, undefined ).toString() );
        } else if ( hashtype === 'SHA512' ) {
            setOutput( SHA512( input, undefined ).toString() );
        } else if ( hashtype === 'SM3' ) {
            setOutput( Sm3( input ) );
        }
    };
    const successInfoHashing = () => {
        message.success( 'Your hash has been copied successfully !' );
    };
    const resolvehashname = ( hashindex: string ): 'Choose the Hash type' => {
        switch ( hashindex ) {
            case '0':
                setHashname( 'MD5' );
                break;
            case '1':
                setHashname( 'SHA1' );
                break;
            case '2':
                setHashname( 'SHA256' );
                break;
            case '3':
                setHashname( 'SHA512' );
                break;
            case '4':
                setHashname( 'SM3' );
                break;
        }
        return 'Choose the Hash type';
    };

    const menu = (
        <Menu onClick={handleClick}>
            <Menu.Item key='0' onClick={() => handleEncode( 'MD5' )}>
                MD5
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='1' onClick={() => handleEncode( 'SHA1' )}>
                SHA1
            </Menu.Item>
            <Menu.Item key='2' onClick={() => handleEncode( 'SHA256' )}>
                SHA256
            </Menu.Item>
            <Menu.Item key='3' onClick={() => handleEncode( 'SHA512' )}>
                SHA512
            </Menu.Item>
            <Menu.Item key='4' onClick={() => handleEncode( 'SM3' )}>
                SM3
            </Menu.Item>
        </Menu>
    );

    const handleChange = ( _name: string ) => ( event: { target: { value: React.SetStateAction<string> } } ) => {
        setInput( event.target.value );
    };

    return (
        <QueueAnim delay={300} duration={1500}>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                Hash generator
            </Title>
            <Paragraph style={{ margin: 15 }}>
                A hash function is any function that can be used to map data of arbitrary size to fixed-size values. The
                values returned by a hash function are called hash values, hash codes, digests, or simply hashes.
            </Paragraph>
            <Divider dashed />
            <div key='a' style={{ margin: 15 }}>
                <TextArea
                    rows={4}
                    value={input}
                    onChange={handleChange( 'input' )}
                    placeholder='Type something to hash (ex: mysecretpassword)'
                />
                <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link'>
                        {hashname} <DownOutlined style={{ padding: 10 }} />
                    </a>
                </Dropdown>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => handleEncode( hashname )}
                >
                    <IconFont type='icon-hash' /> Get Hash
                </Button>
            </div>
            <div key='b' style={{ margin: 15 }}>
                <TextArea
                    rows={4}
                    value={output}
                    style={{ cursor: 'auto', marginTop: 15, color: '#777' }}
                    placeholder='The results will appear here'
                />
                <pre>Cryptographic Hash Algorithm : {hashname}</pre>
                <Clipboard component='a' data-clipboard-text={output}>
                    <Button type='primary' style={{ marginBottom: 10, marginTop: 15 }} onClick={successInfoHashing}>
                        <CopyOutlined /> Copy
                    </Button>
                </Clipboard>
                <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 10 }}>
                    <a href='https://crackstation.net/' target='_blank' rel='noopener noreferrer'>
                        <ArrowsAltOutlined /> Crack Station
                    </a>
                </Button>
            </div>
        </QueueAnim>
    );
};

export default HashEncode;
