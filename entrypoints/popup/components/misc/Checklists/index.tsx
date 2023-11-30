import { Input, Modal, Popconfirm, Tabs } from "antd";
import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import OWSTG from "./OWSTG";
import tabStateStore from "./stores/TabStateStore";

const Index = () => {
	const { activeKey, items, add, remove, rename } = tabStateStore();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [currentTab, setCurrentTab] = useState("");
	const [newLabel, setNewLabel] = useState("");
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);
	const [targetKey, setTargetKey] = useState("");

	const onEdit = (targetKey: string, action: "add" | "remove") => {
		if (action === "add") {
			add();
		} else {
			setIsConfirmVisible(true);
			setTargetKey(targetKey);
		}
	};

	const handleConfirm = () => {
		remove(targetKey);
		setIsConfirmVisible(false);
	};

	useHotkeys("N", () => {
		add();
	});

	const handleRename = () => {
		rename(currentTab, newLabel);
		setIsModalVisible(false);
		setNewLabel("");
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setNewLabel("");
	};

	const newItems = items.map((item) => ({
		...item,
		tab: (
			<div
				onDoubleClick={() => {
					setCurrentTab(item.key);
					setIsModalVisible(true);
				}}
				onMouseUp={(e) => {
					// middle click
					if (e.button === 1) {
						setCurrentTab(item.key);
						setIsModalVisible(true);
					}
				}}
			>
				{item.label}
			</div>
		),
		closeIcon: <div onClick={() => onEdit(item.key, "remove")}>×</div>,
		children: <OWSTG id={item.id} />,
	}));

	return (
		<>
			<Tabs
				type="editable-card"
				onChange={tabStateStore((state) => state.setActiveKey)}
				activeKey={activeKey}
				onEdit={onEdit}
				items={newItems}
			/>
			<Modal
				title="Edit Tab Name"
				open={isModalVisible}
				onOk={handleRename}
				onCancel={handleCancel}
			>
				<Input
					placeholder="Enter new name"
					onChange={(e) => setNewLabel(e.target.value)}
					onPressEnter={handleRename}
				/>
			</Modal>
			<Popconfirm
				title="Are you sure you want to close this tab? all progress will be lost (Think about exporting your data first)"
				open={isConfirmVisible}
				onConfirm={handleConfirm}
				onCancel={() => setIsConfirmVisible(false)}
				okText="Close and delete tab"
				cancelText="Cancel"
			></Popconfirm>
		</>
	);
};

export default Index;
