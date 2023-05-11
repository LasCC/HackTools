import { useState } from "react";
import { Card, Col, Row, Skeleton, Switch } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import PersistedState from 'use-persisted-state';

enum HackToolsMode {
  web = "web",
  system = "system",
  forensic = "forensic",
  misc = "misc"
}

const LayoutChoice = () => {
  
  const useMenuIndex = PersistedState<string>('tab_index_cache'); // Disabled for now
  
  const hackToolsState = PersistedState<string>("hack_tools_mode");
  const [hackTools, setHackTools] = hackToolsState("web");
  const modes = ["web", "system", "forensic", "misc"];
  // setting to 1 to prevent array index overflow inter-mode routing 
  const [index, setIndex] = useMenuIndex('1')

  const navigateAndSetMode = (mode: string) => {
    // navigate to the page and set its mode in persisted 
    setHackTools(mode);
  }

  const handleClickOnMode = (mode: string) => {
    // setting to 1 to prevent array index overflow inter-mode routing 
    // TODO: set index to 1 when switching mode properly
    setIndex('1');
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
