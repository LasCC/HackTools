import React from "react";
import { Col, Row, Typography } from "antd";
import generalCommands from "@assets/data/Mobile/Hooking/GENERAL.json";
import useADBStore from "../Android/ADB/store/ADBStore";
const { Title, Paragraph, Text } = Typography;

const General = () => {
  // const { adb_ip, adb_port } = useADBStore()
  const handleCommand = (command) => {
    if (command.command.includes("${device}")) {
      return command.command.replace(/\${device}/g, "your_device_name");
    } else {
      return command.command;
    }
  };

  return (
    <div style={{ padding: 15 }}>
      {generalCommands.map((command, index) => (
        <Row key={index} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={24}>
            <Title level={4}>{command.name}</Title>
            <Paragraph>{command.description}</Paragraph>
            <Paragraph>
              <pre>
                <Text copyable>{handleCommand(command)}</Text>
              </pre>
            </Paragraph>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default General;
