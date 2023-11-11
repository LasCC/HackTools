import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import PHP from "./PHP";
import Java from "./Java";
import ASP from "./ASP";

const index = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "PHP",
      children: <PHP />,
    },
    {
      key: "2",
      label: "Java",
      children: <Java />,
    },
    {
      key: "3",
      label: "ASP",
      children: <ASP />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default index;
