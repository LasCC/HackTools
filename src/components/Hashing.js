import React, { useState } from "react";
import { Button, Input, Typography, Menu, Dropdown } from "antd";
import { CopyOutlined, DownOutlined } from "@ant-design/icons";
import MD5 from "crypto-js/md5";
import SHA1 from "crypto-js/sha1";
import SHA256 from "crypto-js/sha256";
import SHA512 from "crypto-js/sha512";
import Clipboard from "react-clipboard.js";
const { Title, Paragraph } = Typography;

const HashEncode = () => {
  const [input, setInput] = useState("");
  const [hashtype, setHashType] = useState("0");
  const [hashname, setHashname] = useState("MD5");
  const [output, setOutput] = useState("");

  const { TextArea } = Input;

  const handleClick = (type) => {
    setHashType(type.key);
    resolvehashname(type.key);
  };
  const handleEncode = (hashtype) => {
    if (hashtype === "MD5") {
      setOutput(MD5(input));
    } else if (hashtype === "SHA1") {
      setOutput(SHA1(input));
    } else if (hashtype === "SHA256") {
      setOutput(SHA256(input));
    } else if (hashtype === "SHA512") {
      setOutput(SHA512(input));
    }
    console.log({ hashtype });
  };
  const resolvehashname = (hashindex) => {
    switch (hashindex) {
      case "0":
        setHashname("MD5");
        console.log("md5");
        break;
      case "1":
        setHashname("SHA1");
        console.log("sha1");
        break;
      case "2":
        setHashname("SHA512");
        break;

      default:
        return "Choose the Hash type";
    }
  };

  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="0" onClick={() => handleEncode("MD5")}>
        MD5
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => handleEncode("SHA1")}>
        SHA1
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleEncode("SHA256")}>
        SHA256
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleEncode("SHA512")}>
        SHA512
      </Menu.Item>
    </Menu>
  );

  const handleChange = (name) => (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <Title
        variant="Title level={3}"
        style={{ fontWeight: "bold", margin: 15 }}
      >
        Hash generator
      </Title>
      <Paragraph style={{ margin: 15 }}>
        Generate a Hash from the input
      </Paragraph>
      <TextArea
        rows={4}
        value={input}
        onChange={handleChange("input")}
        placeholder="Text to hash  ..."
      />
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link">
          {hashname} <DownOutlined style={{ padding: 10 }} />
        </a>
      </Dropdown>
      <Button
        type="primary"
        style={{ marginBottom: 10, marginTop: 15 }}
        onClick={handleEncode}
      >
        Encode
      </Button>

      <TextArea
        rows={4}
        value={output}
        style={{ cursor: "auto", marginTop: 15, color: "#777" }}
        placeholder="output"
      />
      <pre>{hashname}</pre>
      <Clipboard component="a" data-clipboard-text={output}>
        <Button type="primary" style={{ marginBottom: 10, marginTop: 15 }}>
          <CopyOutlined /> Copy
        </Button>
      </Clipboard>
    </>
  );
};

export default HashEncode;
