import React, { useState } from 'react';
import { Button, Input, Typography, message, Divider } from 'antd';
import { CopyOutlined, createFromIconfontCN, ClearOutlined } from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );

function toHex ( str: string ): string {
    let result = "";
    for ( const ch of str ) {
        let hex = ch.charCodeAt( 0 ).toString( 16 ).toUpperCase();
        if ( hex.length < 2 ) {
            hex = "0" + hex;
        }
        result += hex;
    }
    return result;
}

function hex2a ( hex: string ): string {
    let str = "";
    for ( let i = 0; i < hex.length; i += 2 ) {
        const hexChar = hex.substr( i, 2 );
        if ( hexChar.length < 2 ) {
            throw new Error( "invalid hexadecimal" );
        }
        const num = parseInt( hexChar, 16 );
        if ( num < 0 || num > 255 ) {
            throw new Error( "invalid hexadecimal" );
        }
        str += String.fromCharCode( num );
    }
    return str;
}

const HexEncode = () => {
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
        if ( type === 'encode' ) {
            setOutput( toHex( input ) );
        } else if ( type === 'decode' ) {
            try {
                setOutput( hex2a( input ) );
            } catch ( ex ) {
                setOutput( 'Unable to decode properly : incorrect Hex' );
                message.error( 'Incorrect Base64 please try something else' );
            }
        }
        return;
    };
    return (
        <div>
            <div style={{ margin: 15 }}>
                <Title level={2} style={{ fontWeight: 'bold' }}>
                    Hexadecimal Encoder / Decoder
                </Title>
                <Paragraph>
                    The hexadecimal numeral system, often shortened to "hex", is a numeral system made up of 16 symbols
                    (base 16). The standard numeral system is called decimal (base 10) and uses ten symbols:
                    0,1,2,3,4,5,6,7,8,9. Hexadecimal uses the decimal numbers and six extra symbols.
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
                    placeholder='ASCII or Hexadecimal value to Encode / Decode...'
                />
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

export default HexEncode;
