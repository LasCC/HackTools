import { useEffect } from "react";
import { useStore } from "@components/GlobalStore";
import { Table, Input, Row, Col, Collapse, Empty, message, Button } from "antd";
import ReactJson from "react-json-view";
import useNmapVizStore from "./store";

const Tabler = () => {
	const { darkMode } = useStore();
	const {
		data,
		queryData,
		queryTableResult,
		searchQuery,
		setSearchQuery,
		activeScanResult,
	} = useNmapVizStore();
	const displayData = queryTableResult.length > 0 ? queryTableResult : data;

	if (!activeScanResult && data.length === 0)
		return (
			<Empty description="No data loaded. Please add and load a scan result." />
		);

	const copyHostsToClipboard = () => {
		const hosts = [...new Set(displayData.map((item) => item.address))].join(
			"\n"
		);
		navigator.clipboard.writeText(hosts);
		message.success("Hosts copied to clipboard");
	};

	const columns = [
		{
			title: (
				<div>
					Address
					<Button type="link" onClick={copyHostsToClipboard}>
						Copy
					</Button>
				</div>
			),
			dataIndex: "address",
			key: "address",
		},
		{
			title: "Port",
			dataIndex: "port",
			key: "port",
		},
		{
			title: "State",
			dataIndex: "state",
			key: "state",
		},
		{
			title: "Service",
			dataIndex: "service",
			key: "service",
		},
		// Add more columns as needed
	];

	const handleQuerySubmit = (query) => {
		if (!data || data.length === 0) {
			console.log("No data available.");
			return;
		}
		console.trace({ query });
		queryData(query);
		if (data.length === 0) {
			message.error("No results found for your query.");
			return;
		}
	};
	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<Input.Search
					placeholder="Enter SQL query"
					value={searchQuery}
					onChange={(evt) => setSearchQuery(evt.target.value)}
					enterButton="Submit"
					size="large"
					onSearch={handleQuerySubmit}
				/>
			</Col>
			<Col span={24}>
				<Collapse
					ghost
					items={[
						{
							key: "1",
							label: `Raw results`,
							children: (
								<ReactJson
									src={queryTableResult}
									style={{
										wordBreak: "break-all",
									}}
									theme={darkMode ? "monokai" : "rjv-default"}
								/>
							),
						},
					]}
				/>
			</Col>
			<Col span={24}>
				<Table columns={columns} dataSource={queryTableResult} rowKey="id" />
			</Col>
		</Row>
	);
};

export default Tabler;
