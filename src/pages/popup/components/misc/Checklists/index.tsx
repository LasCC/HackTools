import React from 'react';
import { Tabs } from "antd";
import useStore from './stores/TabStateStore';
const { TabPane } = Tabs;

const Index = () => {
    const { activeKey, items, add, remove } = useStore();
    const onChange = useStore(state => state.setActiveKey);

    const onEdit = (
        targetKey: string | React.MouseEvent | React.KeyboardEvent,
        action: "add" | "remove"
    ) => {
        if (action === "add") {
            add();
        } else {
            remove(targetKey as string);
        }
    };

    return (
        <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
        >
            {items.map(item => (
                <TabPane
                    tab={item.label}
                    key={item.key}
                    closable={item.closable ?? true}
                >
                    {item.children}
                </TabPane>
            ))}
        </Tabs>
    );
};

export default Index;
