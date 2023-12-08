import type { TabsProps } from "antd";
import { Tabs } from "antd";
import ADB from "./ADB";
import ActivityManager from "./ActivityManager";
import IntentInjection from "./IntentInjection";

const index = () => {
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: `ADB`,
			children: <ADB />,
		},
		{
			key: "2",
			label: `Intent Injection`,
			children: <IntentInjection />,
		},
		{
			key: "3",
			label: `Activity Manager`,
			children: <ActivityManager />,
		},
	];

	return (
		<>
			<Tabs defaultActiveKey="1" items={items} />
		</>
	);
};

export default index;
