import React from "react";
import { Layout, Menu } from "antd";
import { CopyrightCircleOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
import { goTo } from "react-chrome-extension-router";
import ReverseShell from "./ReverseShell";
import Bop from "./Bop";
export default (props) => {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={() => goTo(ReverseShell)}>
            Reverse Shell
          </Menu.Item>

          <Menu.Item key="2" onClick={() => goTo(Bop)}>
            Bopage
          </Menu.Item>

          <Menu.Item key="3">TTY Shell</Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <CopyrightCircleOutlined /> Hack tools - The all in one Red team
        extension for web pentester
      </Footer>
    </Layout>
  );
};
