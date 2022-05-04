import React, { useState } from 'react';
import PersistedState from 'use-persisted-state';
import { Button, Input, Typography, message, Divider, Menu, Dropdown, Space } from 'antd';
import { CopyOutlined, createFromIconfontCN, ClearOutlined, DownOutlined, FileTextOutlined } from '@ant-design/icons';
import { ObfuscatedFile } from 'components/types/ObfuscatedFile';
import Clipboard from 'react-clipboard.js';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );

const EchoBase64 = () => {
    const [ output, setOutput ] = useState( '' );
    const echoFileName = PersistedState<ObfuscatedFile>( 'echo_file_name' );
    const { TextArea } = Input;

    const [ values, setValues ] = echoFileName( {
        name: '',
        input: ''
    } );

    const successBase64Copy = () => {
        message.success( 'Your payload has been copied successfully !' );
    };

    const handleChange = ( name: string ) => ( event: { target: { value: string } } ) => {
        setValues( { ...values, [ name ]: event.target.value } );
    };

    const randomString = () => {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for ( let i = 0; i < 10; i++ ) {
            result += chars[ Math.floor( Math.random() * chars.length ) ];
        }
        return result;
    };

    const handleClick = () => {
        try {
            if ( values.input.length === 0 ) {
                message.error( 'Please enter some text to encode' );
                return;
            }
            if ( encMode === 'Base64 - Bash' ) {
                const bash_b64 = btoa( values.input );
                setOutput( `echo -n '${ bash_b64 }' | base64 -d >  ${ values.name }` );
            }
            if ( encMode === 'Base64 - CMD' ) {
                const cmd_b64 = btoa( values.input );
                const cmd_random = randomString();
                setOutput( `echo|set /p="${ cmd_b64 }" >> ${ cmd_random } 
certutil -decode ${ cmd_random } ${ values.name }
del /Q ${ cmd_random }` );
            }
            if ( encMode === 'Base64 - Powershell' ) {
                const pwsh_b64 = btoa( values.input );
                const pwsh_random = randomString();
                setOutput( `${ "$" + pwsh_random } = @()
${ "$" + pwsh_random } +=
[System.Convert]::FromBase64String("${ pwsh_b64 }")
[Environment]::CurrentDirectory = (Get-Location -PSProvider FileSystem).ProviderPath
[System.IO.File]::WriteAllBytes("${ values.name }",  ${ "$" + pwsh_random })
Remove-Variable ${ pwsh_random }` );
            }
        }
        catch ( ex ) {
            message.error( 'Unable to encode properly please try again' );
        }
        return;

    }

    const [ encMode, setEncmode ] = useState( 'Base64 - Bash' );

    const handleEncModeList = ( type: { key: React.SetStateAction<string | any> } ) => {
        setEncmode( type.key.toString() );
    };

    const menu = (
        <Menu onClick={handleEncModeList}>
            <Menu.Item key='Base64 - Bash'>Base64 - Bash</Menu.Item>
            <Menu.Divider />
            <Menu.Item key='Base64 - CMD'>Base64 - CMD</Menu.Item>
            <Menu.Divider />
            <Menu.Item key='Base64 - Powershell'>Base64 - Powershell</Menu.Item>
        </Menu>
    );

    return (
        <QueueAnim delay={300} duration={1500}>
            <div style={{ margin: 15 }}>
                <Title level={2} style={{ fontWeight: 'bold' }}>
                    Obfuscated Files or Information
                </Title>
                <Paragraph>
                    Adversaries may attempt to make an executable or file difficult to discover or analyze by encrypting, encoding, or otherwise obfuscating its contents on the system or in transit. This is common behavior that can be used across different platforms and the network to evade defenses.
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
                    rows={6}
                    value={values.input}
                    onChange={handleChange( 'input' )}
                    placeholder='$wvlgi = @"
using System;
using System.Runtime.InteropServices;
public class wvlgi {
    [DllImport("kernel32")]
    public static extern IntPtr GetProcAddress(IntPtr hModule, string procName);
    [DllImport("kernel32")]
    public static extern IntPtr LoadLibrary(string name);
    [DllImport("kernel32")]
    public static extern bool VirtualProtect(IntPtr lpAddress, UIntPtr tsarvf, uint flNewProtect, out uint lpflOldProtect);
}
"@
'
                />

                <Dropdown overlay={menu}>
                    <a className='ant-dropdown-link'>
                        {encMode} <DownOutlined style={{ padding: 10 }} />
                    </a>
                </Dropdown>
                <Space>
                    <Button
                        type='primary'
                        style={{ marginBottom: 10, marginTop: 15 }}
                        onClick={() => handleClick()}
                    >
                        <IconFont type='icon-lock' />
                        Encode
                    </Button>

                    <Input
                        prefix={<FileTextOutlined />}
                        onChange={handleChange( 'name' )}
                        placeholder="Output File Name"
                        bordered={false}
                        value={values.name}
                        style={{ marginTop: 6 }}
                    />
                </Space>
            </div>
            <div
                key='b'
                style={{
                    marginTop: 15,
                    marginLeft: 15
                }}
            >
                <TextArea
                    rows={6}
                    value={output}
                    disabled={true}
                    onChange={handleChange( 'output' )}
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

export default EchoBase64;
