import React, { useState } from 'react';
import { Button, Input, Typography, message, Divider, Menu, Dropdown } from 'antd';
import { CopyOutlined, createFromIconfontCN, ClearOutlined, DownOutlined } from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';
import QueueAnim from 'rc-queue-anim';
import escape_quotes from 'escape-quotes';

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );

function toHex ( str: string ) {
    var result = '';
    for ( var i = 0; i < str.length; i++ ) {
        result += str.charCodeAt( i ).toString( 16 ).toUpperCase();
    }
    return result;
}
function hex2a ( hex: string ) {
    var str = '';
    for ( var i = 0; i < hex.length; i += 2 ) str += String.fromCharCode( parseInt( hex.substr( i, 2 ), 16 ) );
    return str;
}

const Base64Encode = () => {
    const [ input, setInput ] = useState( '' );
    const [ output, setOutput ] = useState( '' );
    const { TextArea } = Input;
    const successBase64Copy = () => {
        message.success( 'Your payload has been copied successfully !' );
    };
    const handleChange = ( _name: string ) => ( event: { target: { value: React.SetStateAction<string> } } ) => {
        setInput( event.target.value );
    };
    const handleClick = ( type: string ) => {
        if ( type === 'encode' && encMode === 'base64' ) {
            setOutput( btoa( input ) );
        } else if ( type === 'decode' && encMode === 'base64' ) {
            try {
                setOutput( atob( input ) );
            } catch ( ex ) {
                setOutput( 'Unable to decode properly : Incorrect base64 ' );
                message.error( 'Incorrect Base64 please try something else' );
            }
        } else if ( type === 'decode' && encMode === 'uri' ) {
            try {
                setOutput( decodeURI( input ) );
            } catch ( ex ) {
                setOutput( 'Unable to decode properly : Incorrect base64 ' );
                message.error( 'Incorrect Base64 please try something else' );
            }
        } else if ( type === 'encode' && encMode === 'uri' ) {
            try {
                setOutput( encodeURI( input ) );
            } catch ( error ) {
                setOutput( 'Unable to decode properly : Incorrect URI ' );
                message.error( 'Incorrect format please try something else' );
            }
        } else if ( type === 'decode' && encMode === 'hex' ) {
            try {
                setOutput( hex2a( input ) );
            } catch ( ex ) {
                setOutput( 'Unable to decode properly : Incorrect hexadecimal ' );
                message.error( 'Incorrect Hex please try something else' );
            }
        } else if ( type === 'encode' && encMode === 'hex' ) {
            try {
                setOutput( toHex( input ) );
            } catch ( error ) {
                setOutput( 'Unable to decode properly : Incorrect hexadecimal ' );
                message.error( 'Incorrect Hex please try something else' );
            }
        }
        return;
    };
    const [ encMode, setEncmode ] = useState( 'base64' );
    const handleQuoteEscaper = () => {
        setOutput( escape_quotes( input ) );
    };

    const handleEncModeList = ( type: { key: React.SetStateAction<string | any> } ) => {
        setEncmode( type.key.toString() );
    };

    const menu = (
        <Menu onClick={handleEncModeList}>
            <Menu.Item key='base64'>Base64</Menu.Item>
            <Menu.Divider />
            <Menu.Item key='uri'>URI</Menu.Item>
            <Menu.Divider />
            <Menu.Item key='hex'>Hexadecimal</Menu.Item>
        </Menu>
    );

    return (
        <QueueAnim delay={300} duration={1500}>
            <div style={{ margin: 15 }}>
                <Title level={2} style={{ fontWeight: 'bold' }}>
                    Data Encoding
                </Title>
                <Paragraph>
                    Adversaries may encode data to make the content of command and control traffic more difficult to detect. Command and control (C2) information can be encoded using a standard data encoding system. Use of data encoding may adhere to existing protocol specifications and includes use of ASCII, Unicode, Base64, MIME, or other binary-to-text and character encoding systems.Some data encoding systems may also result in data compression, such as gzip.
                </Paragraph>
            </div>
            <Divider dashed />
            <div
                key='a'
                style={{
                    marginTop: 15,
                    marginLeft: 15
                }}
            >
                <TextArea
                    rows={4}
                    value={input}
                    onChange={handleChange( 'input' )}
                    placeholder='Some Base64 or ASCII Text to Encode / Decode / Quote escape...'
                />

                <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link'>
                        {encMode} <DownOutlined style={{ padding: 10 }} />
                    </a>
                </Dropdown>

                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => handleClick( 'encode' )}
                >
                    <IconFont type='icon-lock' />
                    Encode
                </Button>
                <Button
                    type='dashed'
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    onClick={() => handleClick( 'decode' )}
                >
                    <IconFont type='icon-lock-open' />
                    Decode
                </Button>
                <Button
                    type='text'
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 8 }}
                    onClick={() => handleQuoteEscaper()}
                >
                    <IconFont type='icon-lock-open' />
                    Quote escape
                </Button>
            </div>
            <div
                key='b'
                style={{
                    marginTop: 15,
                    marginLeft: 15
                }}
            >
                <TextArea
                    rows={4}
                    value={output}
                    style={{ cursor: 'auto', marginTop: 15, color: '#777' }}
                    placeholder='The results will appear here'
                />
                <Clipboard component='a' data-clipboard-text={output}>
                    <Button type='primary' style={{ marginBottom: 10, marginTop: 15 }} onClick={successBase64Copy}>
                        <CopyOutlined /> Copy
                    </Button>
                </Clipboard>
                <Button
                    type='link'
                    danger
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    onClick={() => setOutput( '' )}
                >
                    <ClearOutlined /> Clear
                </Button>
            </div>
        </QueueAnim>
    );
};

export default Base64Encode;
