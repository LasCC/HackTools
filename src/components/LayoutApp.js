import React from "react";
import { Layout, Menu } from "antd";
import { CopyrightCircleOutlined } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { goTo } from "react-chrome-extension-router";
import ReverseShell from "./ReverseShell";
import PhpReverseShell from "./PhpReverseShell";
import TtySpawnShell from "./TtySpawnShell";

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
const IconFont = createFromIconfontCN({
  scriptUrl: ["./iconfont.js"],
});

export default (props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={true} onCollapse={false}>
        <div className='logo' />
        <Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
          <Menu.Item
            key='1'
            icon={<IconFont type='icon-gnubash' />}
            onClick={() => goTo(ReverseShell)}
          >
            Reverse Shell
          </Menu.Item>
          <Menu.Item
            key='2'
            icon={<IconFont type='icon-php' />}
            onClick={() => goTo(PhpReverseShell)}
          >
            PHP Reverse Shell
          </Menu.Item>
          <Menu.Item
            key='9'
            icon={<IconFont type='icon-lvzhou_yuanchengTelnet' />}
            onClick={() => goTo(TtySpawnShell)}
          >
            TTY Spawn Shell
          </Menu.Item>
          <SubMenu
            key='sub2'
            icon={<IconFont type='icon-sort_others' />}
            title='Team'
          >
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='8'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item
            key='9'
            icon={<IconFont type='icon-about' />}
            onClick={() => goTo(TtySpawnShell)}
          >
            About us
          </Menu.Item>
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
