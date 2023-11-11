import type { TabsProps } from "antd";
import { Tabs } from "antd";
import GraphComponent from "./GraphComponent";
import Dashboard from "./DashBoard";
import Tabler from "./Tabler";
import QueryManagement from "./QueryManagement";

const index = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Dashboard`,
      children: <Dashboard />,
    },
    {
      key: "2",
      label: `Nmap Graph`,
      children: <GraphComponent />,
    },
    {
      key: "3",
      label: `Table`,
      children: <Tabler />,
    },
    {
      key: "4",
      label: `Query management`,
      children: <QueryManagement />,
    },
  ];
  return <Tabs defaultActiveKey="3" items={items} />;
};

export default index;
