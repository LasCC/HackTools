import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import LFI from "./LFR";
import PHPfilerBuilder from "./phpFilterBuilder";
import ZipSlip from "./ZipSlip";

const SQLMainPage = () => {
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: `File read`,
			children: <LFI />,
		},
		{
			key: "2",
			label: `PHP Filter Generator`,
			children: <PHPfilerBuilder />,
		},
		{
			key: "3",
			label: `ZipSlip builder`,
			children: <ZipSlip />,
		},
	];

	return (
		<>
			<Tabs defaultActiveKey="1" items={items} />
		</>
	);
};

export default SQLMainPage;
