import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { goTo } from "react-chrome-extension-router";
import PersistedState from 'use-persisted-state';
import Tabs from "./SideItemMenuRouting";

enum HackToolsMode {
  web = "web",
  system = "system",
  mobile = "mobile",
  misc = "misc"
}

const LayoutChoice = () => {
  
  const useMenuIndex = PersistedState<string>('tab_index_cache'); // Disabled for now
  
  const hackToolsState = PersistedState<string>("hack_tools_mode");
  const [hackTools, setHackTools] = hackToolsState("web");
  const modes = ["web", "system", "mobile", "misc"];
  const [index, setIndex] = useMenuIndex('1')


  const navigateAndSetMode = (mode: string) => {
    // Navigate to the page and set its mode with persisted state
    // Fixing to the first element to 1 to prevent array index overflow when switching between modes that have different lengths of tabs
    // TODO: Implement a caching system ?
    setIndex('1');
    setHackTools(mode);
    // Not pretty but it works ...
    goTo(Tabs.filter((tab) => tab.type === mode)[0].componentRoute);
  }

  const handleClickOnMode = (mode: string) => {
    navigateAndSetMode(mode);
  }

  const mappedModules = modes.map((mode) => (
    <Col span={12} key={mode}>
      <Card
        style={{ width: "100%", marginTop: 16 }}
        onClick={() => handleClickOnMode(mode)}
        actions={[<SettingOutlined key="setting" />]}
      >
        <p>{mode}</p>
      </Card>
    </Col>
  ));

  return (
    <>
      <Row gutter={[32, 24]} style={{ padding: 15 }}>
        {mappedModules}
      </Row>
    </>
  );
};

export default LayoutChoice;
