import { useState } from "react";
import {
	BugOutlined,
	HourglassOutlined,
	QuestionCircleOutlined,
	SearchOutlined,
	UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
	Button,
	Card,
	Col,
	Divider,
	Dropdown,
	FloatButton,
	Input,
	Layout,
	Progress,
	Row,
	Select,
	Space,
	Statistic,
	Table,
	Typography,
	message,
	Modal,
} from "antd";
import { BsFiletypeJson } from "react-icons/bs";
import { MdHttp } from "react-icons/md";
import quotes from "@assets/data/Quotes/Quotes.json";
import { AtomicTest, Quote, TestCaseStatus } from "./ChecklistInterfaces";
import createOWSTGStore from "./stores/MethodologyStore";
const { Paragraph } = Typography;
const { TextArea } = Input;
const { Header, Content } = Layout;

const structureForHelpModal = `[
  {
    "id": "UNIQUE-TEST-ID-001",
    "description": "Test description",
    "objectives": ["Objective 1", "Objective 2"], 
    "substeps": [
      {
        "step": "Step 1", 
        "description": "Step 1 description" 
      }
    ],
    "reference": "https://example.com/ref",
    "status": "(NOT_TESTED|NOT_TESTED|IN_PROGRESS|PASSED|FAILED)",
    "observations": "Observations..."
  }
]`;

const OWSTG = ({ id }: { id: string }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// Handler for this Tab's state
	const useStore = createOWSTGStore(id);
	const [remoteURLMethodology, setRemoteURLMethodology] = useState("");
	const {
		stateFlattenedChecklists,
		handleStatusChange,
		handleObservationsChange,
		handleFileUpload,
		handleCSVExport,
		handleRemoteMethodologyImportFromURL,
	} = useStore();

	const currentTabStateExportAsJSON = () => {
		const dataStr = JSON.stringify(stateFlattenedChecklists, null, 2);
		const dataURL =
			"data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

		let exportFileDefaultName = `htool_state_methodology_${new Date().getTime()}_${new Date().toLocaleDateString()}.json`;

		let linkElement = document.createElement("a");
		linkElement.setAttribute("href", dataURL);
		linkElement.setAttribute("download", exportFileDefaultName);
		linkElement.click();
		linkElement.remove();
	};

	enum Actions {
		ImportLocalFile = "1",
		ExportJSON = "2",
		ImportURL = "3",
	}

	const handleMenuClick: MenuProps["onClick"] = (e) => {
		switch (e.key) {
			case Actions.ImportLocalFile:
				handleFileUpload();
				break;
			case Actions.ExportJSON:
				currentTabStateExportAsJSON();
				break;
			case Actions.ImportURL:
				let inputURL = remoteURLMethodology;
				Modal.confirm({
					width: 600,
					title: "Enter the URL of the methodology",
					content: (
						<Input
							placeholder="Enter URL"
							onChange={(e) => (inputURL = e.target.value)}
							onPressEnter={async () => {
								await handleRemoteMethodologyImportFromURL(inputURL);
								setRemoteURLMethodology(inputURL);
							}}
						/>
					),
					onOk: async () => {
						await handleRemoteMethodologyImportFromURL(inputURL);
						setRemoteURLMethodology(inputURL);
					},
				});
				break;
				break;
			default:
				break;
		}
	};

	const items: MenuProps["items"] = [
		{
			label: "Import methodology from local file",
			key: "1",
			icon: <BsFiletypeJson />,
		},
		{
			label: "Export current state as JSON",
			key: "2",
			icon: <UserOutlined />,
		},
		{
			label: "Import methodology from URL",
			key: "3",
			icon: <MdHttp />,
		},
	];

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters = () => {},
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					placeholder={`Search ${dataIndex.join("")}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => confirm()}
					style={{ width: 188, marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => confirm()}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters()}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
		),
		onFilter: (value, record) => {
			return dataIndex.some((index) =>
				String(record[index]).toLowerCase().includes(value.toLowerCase())
			);
		},
	});

	// Preventing inline scripts from being executed
	const validateURLScheme = (url: string) =>
		url.match(/^(http|https):\/\//) ? url : `http://${url}`;

	const columns = [
		{
			title: "Test ID",
			dataIndex: "id",
			key: "id",
			...getColumnSearchProps(["id"]),
			render: (text, record) => (
				<a
					href={`${validateURLScheme(record.reference)}`}
					target="_blank"
					rel="noreferrer"
				>
					{text}
				</a>
			),
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			...getColumnSearchProps(["description", "observations"]),
		},
		{
			title: "State",
			dataIndex: "testCaseStatus",
			key: "testCaseStatus",
			filters: Object.values(TestCaseStatus).map((status) => ({
				text: status,
				value: status,
			})),
			onFilter: (value, record) => record.testCaseStatus.indexOf(value) === 0,
			render: (testCaseStatus, record) => {
				return (
					<Select
						defaultValue={record.testCaseStatus || TestCaseStatus.NOT_TESTED}
						style={{ width: "100%" }}
						onChange={(value) => handleStatusChange(record.id, value)}
						options={Object.values(TestCaseStatus).map((status) => ({
							label: status,
							value: status,
						}))}
					/>
				);
			},
		},
	];

	const { Text, Link } = Typography;
	const menuProps = {
		items,
		onClick: handleMenuClick,
	};

	return (
		<>
			<Card>
				<Row gutter={[8, 8]}>
					<Col span={6}>
						<Progress
							size={75}
							type="circle"
							percent={Math.round(
								(stateFlattenedChecklists.filter(
									(test) =>
										test.testCaseStatus !== TestCaseStatus.NOT_TESTED &&
										test.testCaseStatus !== TestCaseStatus.IN_PROGRESS
								).length /
									stateFlattenedChecklists.length) *
									100
							)}
							strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
						/>
					</Col>
					<Col span={6}>
						<Statistic
							title="Issues found"
							value={
								stateFlattenedChecklists.filter(
									(test) => test.testCaseStatus === TestCaseStatus.FAILED
								).length
							}
							valueStyle={{ color: "#B22222" }}
							prefix={<BugOutlined />}
						/>
					</Col>
					<Col span={6}>
						<Statistic
							title="Pending tests"
							value={
								stateFlattenedChecklists.filter(
									(test) => test.testCaseStatus === TestCaseStatus.NOT_TESTED
								).length
							}
							valueStyle={{ color: "#FFA500" }}
							prefix={<HourglassOutlined />}
						/>
					</Col>
					<Col
						span={6}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Dropdown.Button menu={menuProps} onClick={handleCSVExport}>
							Export as CSV
						</Dropdown.Button>
					</Col>
				</Row>
			</Card>

			<Divider />

			<Table
				columns={columns}
				dataSource={stateFlattenedChecklists}
				rowKey="id"
				expandable={{
					expandedRowRender: (record: AtomicTest) => (
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<Text strong>Objectives :</Text>
								<ul>
									{record.objectives.map((objective, index) => (
										<li key={index}>{objective}</li>
									))}
								</ul>
							</Col>
							<Col span={24}>
								<Text strong>Observations :</Text>
							</Col>
							<Col span={24}>
								<TextArea
									value={record.observations}
									rows={5}
									placeholder="Any observations ?"
									onChange={(e) =>
										handleObservationsChange(record.id, e.target.value)
									}
								/>
							</Col>
							<Divider />
							<Col span={24}>
								<Text strong>Custom testing methodology :</Text>
							</Col>
							<Col span={24}>
								{record.substeps.map((substep, index) => (
									<>
										<Card style={{ margin: "10px 0" }}>
											<Text key={index}>{substep.step}</Text>

											<Paragraph copyable editable>
												{substep.description}
											</Paragraph>
										</Card>
										<Divider />
									</>
								))}
							</Col>
						</Row>
					),
				}}
			/>
			<FloatButton icon={<QuestionCircleOutlined />} onClick={showModal} />

			<Modal
				title="How it works ?"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				width={window.innerWidth > 800 ? 800 : window.innerWidth - 75}
			>
				<Typography style={{ textAlign: "justify" }}>
					Methodology checklist is a tool that allows you to import a
					methodology and use it as a checklist. The checklist is then used to
					track progress and take notes.
				</Typography>
				<Divider />
				<Paragraph>
					You can define your own methodology by extending either the default
					OWASP Testing Guide in assets/ or by creating a JSON file having the
					following structure that represents a single test case :
				</Paragraph>
				<Paragraph>
					<pre>
						<Text copyable>{structureForHelpModal}</Text>
					</pre>
				</Paragraph>
				<Divider />
				<p>
					You can export the current state of the checklist as a JSON file. This
					can be useful for saving progress or sharing methodologies or results
					with others. Or even a CSV file that can be used in a spreadsheet
					software.
				</p>
			</Modal>
		</>
	);
};

export default OWSTG;
