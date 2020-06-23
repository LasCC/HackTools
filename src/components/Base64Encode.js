import React, { useState } from "react";
import { Button, Input, Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";
const { Title, Paragraph } = Typography;
import Clipboard from "react-clipboard.js";

const Base64Encode = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { TextArea } = Input;
  const handleChange = (name) => (event) => {
    setInput(event.target.value);
  };
  const handleClick = (type) => {
    if (type === "encode") {
      setOutput(btoa(input));
    } else if (type === "decode") {
      try {
        setOutput(atob(input));
      } catch (ex) {
        setOutput("Unable to decode properly : Incorrect base64 :-( ");
      }
    }
    return;
  };
  return (
    <>
      <Title
        variant="Title level={3}"
        style={{ fontWeight: "bold", margin: 15 }}
      >
        Base 64 Encode / Decode
      </Title>
      <Paragraph style={{ margin: 15 }}>Base 64 Encode / Decode</Paragraph>
      <TextArea
        rows={4}
        value={input}
        onChange={handleChange("input")}
        placeholder="Some Base64 or ASCII Text to encode / decode ..."
      />
      <Button
        type="primary"
        style={{ marginBottom: 10, marginTop: 15 }}
        onClick={() => handleClick("encode")}
      >
        Encode
      </Button>
      <Button
        type="primary"
        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
        onClick={() => handleClick("decode")}
      >
        Decode
      </Button>
      <TextArea
        rows={4}
        value={output}
        style={{ cursor: "auto", marginTop: 15, color: "#777" }}
        placeholder="output"
      />
      <Clipboard component="a" data-clipboard-text={output}>
        <Button type="primary" style={{ marginBottom: 10, marginTop: 15 }}>
          <CopyOutlined /> Copy
        </Button>
      </Clipboard>
    </>
  );
};

export default Base64Encode;
