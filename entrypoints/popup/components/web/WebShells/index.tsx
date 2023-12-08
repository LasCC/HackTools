import type { TabsProps } from "antd";
import { Tabs } from "antd";
import ASP from "./ASP";
import Java from "./Java";
import PHP from "./PHP";

const index = () => {
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "PHP",
			children: <PHP />,
		},
		{
			key: "2",
			label: "Java",
			children: <Java />,
		},
		{
			key: "3",
			label: "ASP",
			children: <ASP />,
		},
	];

	return (
		<>
			<Tabs defaultActiveKey="1" items={items} />
		</>
	);
};

export default index;
