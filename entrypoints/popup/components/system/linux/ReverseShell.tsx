import { SearchOutlined, WifiOutlined } from "@ant-design/icons";
import payloads from "@assets/data/RevShell.json";
import {
	Button,
	Col,
	Dropdown,
	Form,
	Input,
	InputRef,
	Row,
	Select,
	Space,
	Table,
	Tag,
	Typography,
	message,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
	ColumnType,
	FilterConfirmProps,
	FilterValue,
	SorterResult,
} from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { BsEthernet } from "react-icons/bs";
import PersistedState from "use-persisted-state";
import { Ipv4TcpCacheState } from "../../../components/types/Ipv4TcpCacheState";
const { Title, Paragraph, Text } = Typography;

interface DataType {
	key: React.Key;
	name: string;
	tags: string[];
	command: string;
}

type DataIndex = keyof DataType;

export default function ReverseShell() {
	const useIPv4State = PersistedState<Ipv4TcpCacheState>("ipv4_tcp_cache");
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const searchInput = useRef<InputRef>(null);

	const [values, setValues] = useIPv4State({
		ip: "",
		port: "",
		shell: "/bin/sh",
	});

	const [messageApi, contextHolder] = message.useMessage();
	const info = () => {
		messageApi.success("Your reverse shell has been copied to the clipboard!");
	};

	const items = [
		{
			key: "1",
			label: "Base64 Encoded",
		},
		{
			key: "2",
			label: "URL Encoded",
		},
		{
			key: "3",
			label: "Double URL Encoded",
		},
	];

	const handleChange =
		(name: string) => (event: { target: { value: string } }) => {
			setValues({ ...values, [name]: event.target.value });
		};

	const handleChangeSelect = (prop: string) => (data: any) => {
		setValues({ ...values, [prop]: data });
	};

	const [filteredInfo, setFilteredInfo] = useState<
		Record<string, FilterValue | null>
	>({});
	const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
	const handleChangeFilter: TableProps<DataType>["onChange"] = (
		_,
		filters,
		sorter
	) => {
		setFilteredInfo(filters);
		setSortedInfo(sorter as SorterResult<DataType>);
	};

	function toUTF16LE(str: string): string {
		let out = "";
		let char2: number, char3: number;
	  
		for (let i = 0; i < str.length; i++) {
		  const c = str.charCodeAt(i);
		  switch (c >> 4) {
			case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
			  out += str.charAt(i);
			  break;
			case 12: case 13:
			  char2 = str.charCodeAt(++i);
			  out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
			  break;
			case 14:
			  char2 = str.charCodeAt(++i);
			  char3 = str.charCodeAt(++i);
			  out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | (char3 & 0x3F));
			  break;
		  }
		}
	  
		const byteArray = new Uint8Array(out.length * 2);
		for (let i = 0; i < out.length; i++) {
		  byteArray[i * 2] = out.charCodeAt(i) & 0xff;
		  byteArray[i * 2 + 1] = out.charCodeAt(i) >> 8;
		}
	  
		return String.fromCharCode.apply(null, Array.from(byteArray));
	  }

	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: DataIndex
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText("");
		setSearchedColumn("");
	};

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): ColumnType<DataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					// @ts-ignore
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys as string[], confirm, dataIndex)
					}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText((selectedKeys as string[])[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						Close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownVisibleChange: (visible: any) => {
			if (visible) {
				setTimeout(() => {
					searchInput.current?.select();
				}, 100);
			} else {
				setSearchedColumn("");
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				`${text}`
			),
	});

	const columns: ColumnsType<DataType> = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			filteredValue: filteredInfo.name || null,
			onFilter: (value: string, record) => record.name.includes(value),
			sorter: (a, b) => a.name.length - b.name.length,
			...getColumnSearchProps("name"),
			sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
			ellipsis: true,
		},
		{
			title: "Tags",
			dataIndex: "tags",
			key: "tags",
			render: (_, { tags }) => (
				<>
					{tags.map((tag) => {
						switch (tag) {
							case "linux":
								return (
									<Tag color="volcano" key={tag}>
										{tag.toUpperCase()}
									</Tag>
								);
							case "mac":
								return (
									<Tag color="green" key={tag}>
										{tag.toUpperCase()}
									</Tag>
								);
							case "windows":
								return (
									<Tag color="blue" key={tag}>
										{tag.toUpperCase()}
									</Tag>
								);
							default:
								return (
									<Tag color="black" key={tag}>
										{tag.toUpperCase()}
									</Tag>
								);
						}
					})}
				</>
			),
			filters: [
				{ text: "Linux", value: "linux" },
				{ text: "macOS", value: "mac" },
				{ text: "Windows", value: "windows" },
			],
			filteredValue: filteredInfo.tags || null,
			onFilter: (value: string, record) => record.tags.includes(value),
			sortOrder: sortedInfo.columnKey === "tags" ? sortedInfo.order : null,
			ellipsis: true,
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (_, { command, name }) => (
				<>
					<Dropdown.Button
						menu={{
							items,
							onClick: (e) => {
								switch (e.key) {
									case "1":
										info();
										if (name.toLocaleLowerCase().includes("powershell")) {
											// UTF-16LE+b64
											navigator.clipboard.writeText("powershell -encodedcommand " + btoa(toUTF16LE(command)));
										} else {
											navigator.clipboard.writeText(btoa(command));
										}
										break;
									case "2":
										// url encoded
										info();
										navigator.clipboard.writeText(encodeURIComponent(command));
										break;
									case "3":
										// double url encoded
										info();
										navigator.clipboard.writeText(
											encodeURIComponent(encodeURIComponent(command))
										);
										break;
									default:
										info();
										break;
								}
							},
						}}
						onClick={() => {
							info();
							navigator.clipboard.writeText(command);
						}}
					>
						Copy
					</Dropdown.Button>
				</>
			),
		},
	];

	const data: DataType[] = payloads.map((payload: any) => ({
		key: payload.id,
		name: payload.name,
		tags: payload.tags,
		command: payload.command,
	}));

	data.forEach((payload) => {
		if (payload.command) {
			payload.command = payload.command.replace(
				/\${values.ip}/g,
				String(values.ip)
			);
			payload.command = payload.command.replace(
				/\${values.port}/g,
				String(values.port)
			);
			payload.command = payload.command.replace(
				/\{shell}/g,
				String(values.shell)
			);
		}
	});

	return (
		<div>
			{contextHolder}
			<div>
				<Title level={2} style={{ fontWeight: "bold", margin: 15 }}>
					Reverse shell
				</Title>
				<Paragraph style={{ margin: 15 }}>
					A reverse shell is a type of network communication in which a
					connection is established from a remote host (the "attacker") to a
					target host (the "victim") and the attacker is able to execute
					commands on the victim's machine as if they were running on the
					attacker's machine. This is typically done by exploiting a
					vulnerability in the victim's system or by tricking the victim into
					running a malicious program that establishes the reverse shell.
				</Paragraph>
				<div style={{ padding: 15 }}>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col span={8}>
							<Input
								maxLength={15}
								prefix={<WifiOutlined />}
								name="Ip adress"
								placeholder="IP Address or domain (ex: 212.212.111.222)"
								onChange={handleChange("ip")}
								value={values.ip}
							/>
						</Col>
						<Col span={8}>
							<Input
								maxLength={5}
								prefix={<BsEthernet />}
								name="Port"
								placeholder="Port (ex: 1337)"
								onChange={handleChange("port")}
								value={values.port}
							/>
						</Col>
						<Col span={8}>
							<Form.Item
								name="shell"
								valuePropName={String(values.shell)}
								label="Shell"
							>
								<Select
									onChange={handleChangeSelect("shell")}
									placeholder="/bin/sh"
									value={String(values.shell)}
									allowClear
									options={[
										{
											label: "Linux / macOS",
											options: [
												{ label: "sh", value: "sh" },
												{ label: "/bin/sh", value: "/bin/sh" },
												{ label: "bash", value: "bash" },
												{ label: "/bin/bash", value: "/bin/bash" },
											],
										},
										{
											label: "Windows",
											options: [
												{ label: "cmd", value: "cmd" },
												{ label: "powershell", value: "powershell" },
												{ label: "pwsh", value: "pwsh" },
											],
										},
									]}
								></Select>
							</Form.Item>
						</Col>
					</Row>
				</div>
			</div>
			<div>
				<Table
					columns={columns}
					expandable={{
						expandedRowRender: (record) => (
							<Paragraph>
								<pre>
									<Text copyable>{record.command}</Text>
								</pre>
							</Paragraph>
						),
						rowExpandable: (record) => record.name !== "Not Expandable",
					}}
					dataSource={data}
					rowKey={(record, id) => id}
					onChange={
						values.ip && values.port && values.shell
							? handleChangeFilter
							: undefined
					}
				/>
			</div>
		</div>
	);
}
