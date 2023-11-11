import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import XSSObfuscationComponent from "./XSSObfuscation";
import XSSPayloadComponent from "./XSSPayload";

const XSSMain = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "XSS Payloads",
      children: <XSSPayloadComponent />,
    },
    {
      key: "2",
      label: "XSS Obfuscator",
      children: <XSSObfuscationComponent />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default XSSMain;
