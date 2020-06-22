import React from "react";
import { Button, message, Typography, Divider } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import Clipboard from "react-clipboard.js";

const { Title, Paragraph } = Typography;

export default (props) => {
  const successInfoTtyShell = () => {
    message.success("Your reverse shell has been copied");
  };

  return (
    <QueueAnim delay={300} duration={1500}>
      <Title
        variant='Title level={3}'
        style={{ fontWeight: "bold", margin: 15 }}
      >
        TTY Spawn Shell
      </Title>
      <Paragraph style={{ margin: 15 }}>
        Often during pen tests you may obtain a shell without having tty, yet
        wish to interact further with the system. Here are some commands which
        will allow you to spawn a tty shell. Obviously some of this will depend
        on the system environment and installed packages.
      </Paragraph>
      <Divider dashed />
      <div
        key='a'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>Python spawn shell </Title>
        <Paragraph copyable>
          python -c 'import pty; pty.spawn("/bin/sh")'
        </Paragraph>
        <Clipboard
          component='a'
          data-clipboard-text={"python -c 'import pty; pty.spawn('/bin/sh')'"}
        >
          <Button
            type='primary'
            onClick={successInfoTtyShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the TTY
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />

      <div
        key='a'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>OS system spawn shell</Title>
        <Paragraph copyable>echo os.system('/bin/bash')</Paragraph>
        <Clipboard
          component='a'
          data-clipboard-text={"echo os.system('/bin/bash')"}
        >
          <Button
            type='primary'
            onClick={successInfoTtyShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the TTY
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
        <Title level={3}>Bash spawn shell </Title>
        <Paragraph copyable>/bin/sh -i</Paragraph>
        <Clipboard component='a' data-clipboard-text={"/bin/sh -i"}>
          <Button
            type='primary'
            onClick={successInfoTtyShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the TTY
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
        <Title level={3}>Perl spawn shell </Title>
        <Paragraph copyable>perl —e 'exec "/bin/sh";'</Paragraph>
        <Clipboard
          component='a'
          data-clipboard-text={"perl —e 'exec '/bin/sh';'"}
        >
          <Button
            type='primary'
            onClick={successInfoTtyShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the TTY
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
        <Title level={3}>Python spawn shell </Title>
        <Paragraph copyable>ruby: exec "/bin/sh"</Paragraph>
        <Clipboard component='a' data-clipboard-text={"ruby: exec '/bin/sh'"}>
          <Button
            type='primary'
            onClick={successInfoTtyShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the TTY
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
        <Title level={3}>Lua spawn shell </Title>
        <Paragraph copyable>lua: os.execute('/bin/sh')</Paragraph>
        <Clipboard
          component='a'
          data-clipboard-text={"lua: os.execute('/bin/sh')"}
        >
          <Button
            type='primary'
            onClick={successInfoTtyShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the TTY
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />

      <div
        key='f'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>IRB spawn shell </Title>
        <Paragraph copyable>exec "/bin/sh"</Paragraph>
        <Clipboard component='a' data-clipboard-text={"exec '/bin/sh'"}>
          <Button
            type='primary'
            onClick={successInfoTtyShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the TTY
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />

      <div
        key='g'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>VI spawn shell </Title>
        <Paragraph copyable>:!bash</Paragraph>
        <Clipboard component='a' data-clipboard-text={":!bash"}>
          <Button
            type='primary'
            onClick={successInfoTtyShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the TTY
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />

      <div
        key='h'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>VI(2) spawn shell </Title>
        <Paragraph copyable>:set shell=/bin/bash:shell</Paragraph>
        <Clipboard
          component='a'
          data-clipboard-text={":set shell=/bin/bash:shell"}
        >
          <Button
            type='primary'
            onClick={successInfoTtyShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the TTY
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />

      <div
        key='i'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>Nmap spawn shell </Title>
        <Paragraph copyable>!sh</Paragraph>
        <Clipboard component='a' data-clipboard-text={"!sh"}>
          <Button
            type='primary'
            onClick={successInfoTtyShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the TTY
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />
    </QueueAnim>
  );
};
