import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { goTo } from "react-chrome-extension-router";
import PersistedState from 'use-persisted-state';
import Tabs from "./SideItemMenuRouting";
import systemBG from "../../../assets/img/systemBG.jpg";
import mobileBG from "../../../assets/img/mobileBG.jpg";
import miscBG from "../../../assets/img/miscBG.jpg";
import webBG from "../../../assets/img/webBG.jpg";
import Meta from "antd/es/card/Meta";


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


  const modes
    : Array<{
      name: HackToolsMode; backgroundImage: string; title: string; description?: string; shortcut: string;

    }> = [
      {
        name: HackToolsMode.web,
        backgroundImage: webBG,
        title: "Web security mode",
        description: "Various payloads and tools related to web security assessment.",
        shortcut: "(Ctrl + ALT + 1)"


      },
      {
        name: HackToolsMode.system,
        backgroundImage: systemBG,
        title: "System security mode",
        description: "Reconnaissance, exploitation and post-exploitation, OS related tools.",
        shortcut: "(Ctrl + ALT + 2)"
      },
      {
        name: HackToolsMode.mobile,
        backgroundImage: mobileBG,
        title: "Mobile security mode",
        description: "Android and iOS related payloads for debugging and app instrumentation.",
        shortcut: "(Ctrl + ALT + 3)"
      },
      {
        name: HackToolsMode.misc,
        backgroundImage: miscBG,
        title: "General purpose tools",
        description: "Various tools such as a private cheatsheets, advanced methodology, notes taking, etc.",
        shortcut: "(Ctrl + ALT + 4)"
      }
    ];


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
    <Col key={mode.name}
    md={24} xxl={6}
    >
      <Card
        style={{
          width: "100%", marginTop: 16,
          height: "350px",
        }}
        hoverable
        onClick={() => handleClickOnMode(mode.name)}
        cover={
          <img
            src={mode.backgroundImage}
            alt={mode.name}
            style={{
              width: "100%",
              height: "210px",
              objectFit: "cover",
            }}
          />
        }
      >
        <Meta title={mode.title}
          description={mode.description}
        />
        <Meta
          description={mode.shortcut}
        />
      </Card>
    </Col>

  ));

  return (
    <>
      <Row gutter={[8, 8]} style={{ padding: 15 }}>
        {mappedModules}
      </Row>
    </>
  );
};

export default LayoutChoice;
