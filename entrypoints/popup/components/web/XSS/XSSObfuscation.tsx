import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Select, Input } from "antd";

const { TextArea } = Input;

const { Title } = Typography;
const { Option } = Select;

const XSSObfuscation = () => {
  const [js, setJS] = useState("");
  const [obfuscated, setObfuscated] = useState("");
  const [obfuscationMethod, setObfuscationMethod] = useState("base64");

  useEffect(() => {
    switch (obfuscationMethod) {
      case "base64":
        try {
          if (js) {
            const obf = btoa(js);
            setObfuscated(`eval(atob('${obf}'))`);
          } else {
            setObfuscated("");
          }
        } catch (e) {
          console.error(e);
        }
        break;
      case "charcode":
        try {
          if (js) {
            const charObf = js
              .split("")
              .map((c) => c.charCodeAt(0))
              .join(",");
            setObfuscated(`eval(String.fromCharCode(${charObf}))`);
          } else {
            setObfuscated("");
          }
        } catch (e) {
          console.error(e);
        }
        break;
      default:
        break;
    }
  }, [js, obfuscationMethod]);

  const handleOnChange = (e) => {
    setJS(e.target.value);
  };

  const handleObfuscatedChange = (e) => {
    setObfuscated(e.target.value);
  };

  const handleObfuscationMethodChange = (value) => {
    setObfuscationMethod(value);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Title level={2} style={{ fontWeight: "bold", margin: 15 }}>
          JS Obfuscation
        </Title>
      </Col>
      <Col xs={12}>
        <TextArea
          rows={10}
          onChange={handleOnChange}
          value={js}
          placeholder="Enter some JS to obfuscate..."
        />
      </Col>
      <Col xs={12}>
        <TextArea
          rows={10}
          onChange={handleObfuscatedChange}
          value={obfuscated}
          placeholder="Obfuscated JS..."
        />
      </Col>
      <Col xs={12} offset={12}>
        <Select
          defaultValue="base64"
          style={{
            width: "100%",
          }}
          onChange={handleObfuscationMethodChange}
        >
          <Option value="base64">Base64</Option>
          <Option value="charcode">Char Code | No Quotes</Option>
        </Select>
      </Col>
    </Row>
  );
};

export default XSSObfuscation;
