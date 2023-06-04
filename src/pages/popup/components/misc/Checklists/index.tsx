import React, { useState } from 'react';
import { Tabs, Modal, Input } from "antd";
import useStore from './stores/TabStateStore';
import OWSTG from './OWSTG';
const { TabPane } = Tabs;

const Index = () => {
  const { activeKey, items, add, remove, rename } = useStore();
  const onChange = useStore(state => state.setActiveKey);
  const [isModelOpen, setIsModalVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const onEdit = (
    targetKey: string | React.MouseEvent | React.KeyboardEvent,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      add();
    } else if (action === "remove") {
      remove(targetKey as string);
    }
  };

  const handleOk = () => {
    rename(currentTab, newLabel);
    setIsModalVisible(false);
    setNewLabel("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewLabel("");
  };

  return (
    <div>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
      >
        {items.map(item => (
          <TabPane
            tab={
              <div onDoubleClick={() => {
                setCurrentTab(item.key);
                setIsModalVisible(true);
              }}>
                {item.label}
              </div>
            }
            key={item.key}
            closable={item.closable ?? true}
          >
            <OWSTG id={item.id} />
          </TabPane>
        ))}
      </Tabs>
      <Modal title="Edit Tab Name" visible={isModelOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Enter new name" onChange={(e) => setNewLabel(e.target.value)} />
      </Modal>
    </div>
  );
};

export default Index;
