import React, { useRef, useState } from "react";
import { Tabs } from "antd";
import OWSTG from "./OWSTG";
import createOWSTGStore from "./store";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  { label: "OWSTG", children: <OWSTG id={"0"} />, key: "0" , closable: false},
];

const index = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `${++newTabIndex.current}`;
    const newPanes = [...items];
    // @ts-ignore
    newPanes.push({
      label: "New Tab",
      children: <OWSTG id={newActiveKey} />,
      key: newActiveKey
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    const useStore = createOWSTGStore(targetKey);
    const reset = useStore((state) => state.reset);
    
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      } 
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
    // reset();
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
};

export default index 