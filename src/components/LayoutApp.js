import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  CopyrightCircleOutlined,
} from "@ant-design/icons";
import { goTo } from "react-chrome-extension-router";
import ReverseShell from "./ReverseShell";
import PhpReverseShell from "./PhpReverseShell";
import TtySpawnShell from "./TtySpawnShell";

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default (props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={true} onCollapse={false}>
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
          <Menu.Item
            key='1'
            icon={<PieChartOutlined />}
            onClick={() => goTo(ReverseShell)}
          >
            Reverse Shell
          </Menu.Item>
          <Menu.Item
            key='2'
            icon={<DesktopOutlined />}
            onClick={() => goTo(PhpReverseShell)}
          >
            PHP Reverse Shell
          </Menu.Item>
          <Menu.Item
            key='9'
            icon={<FileOutlined />}
            onClick={() => goTo(TtySpawnShell)}
          >
            TTY Spawn Shell
          </Menu.Item>
          <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='8'>Team 2</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: "0 16px" }}>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <CopyrightCircleOutlined /> Hack Tools - The all in one Red team
          browser extension for web pentesters
        </Footer>
      </Layout>
    </Layout>
  );
};
