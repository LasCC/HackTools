import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Objection from "./Objection";
import General from "./GeneralPurposeFrida";
import Setup from "./Setup";

const index = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Setup`,
      children: <Setup />,
    },
    {
      key: "2",
      label: `Frida`,
      children: <General />,
    },
    {
      key: "3",
      label: `Objection`,
      children: <Objection />,
    },
  ];

  return (
    <>
      <Tabs items={items} />
    </>
  );
};

export default index;
