import React, { useState } from 'react';
import { Button, Input, Typography, message, Divider, Menu, Dropdown } from 'antd';
import { CopyOutlined, createFromIconfontCN, ClearOutlined, DownOutlined } from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';
import escape_quotes from 'escape-quotes';

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );

function toHex ( str: string ) {
    var result: string = '';
    for ( var i: number = 0; i < str.length; i++ ) {
        var hex: string = str.charCodeAt( i ).toString( 16 ).toUpperCase();
        if ( hex.length === 1 ) {
            hex = '0' + hex;
        }
        result += hex;
    }
    return result;
}
function hex2a ( hex: string ) {
    var str: string = '';
    for ( var i: number = 0; i < hex.length; i += 2 ) {
        var code: number = parseInt( hex.substr( i, 2 ), 16 );
        if ( !isNaN( code ) ) {
            str += String.fromCharCode( code );
        }
    }
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
        let output;
        let errorMessage;
        switch ( type ) {
            case "encode":
                switch ( encMode ) {
                    case "base64":
                        output = btoa( input );
                        break;
                    case "uri":
                        try {
                            output = encodeURI( input );
                        } catch ( error ) {
                            errorMessage = "Incorrect format, please try something else.";
                        }
                        break;
                    case "hex":
                        try {
                            output = toHex( input );
                        } catch ( error ) {
                            errorMessage = "Incorrect Hex, please try something else.";
                        }
                        break;
                }
                break;
            case "decode":
                switch ( encMode ) {
                    case "base64":
                        try {
                            output = atob( input );
                        } catch ( ex ) {
                            errorMessage = "Incorrect Base64, please try something else.";
                        }
                        break;
                    case "uri":
                        try {
                            output = decodeURI( input );
                        } catch ( ex ) {
                            errorMessage = "Incorrect URI, please try something else.";
                        }
                        break;
                    case "hex":
                        try {
                            output = hex2a( input );
                        } catch ( ex ) {
                            errorMessage = "Incorrect hexadecimal, please try something else.";
                        }
                        break;
                }
                break;
        }
        setOutput( errorMessage ? "Unable to decode properly: " + errorMessage : output );
        if ( errorMessage ) {
            message.error( errorMessage );
        }
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
        <div>
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
        </div>
    );
};

export default Base64Encode;
