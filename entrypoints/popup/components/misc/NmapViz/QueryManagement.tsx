import {
	Button,
	Col,
	Input,
	List,
	Popconfirm,
	Row,
	Typography,
	message,
} from "antd";
import { useState } from "react";
import useStore from "./store";

const { Title } = Typography;

const QueryManagement = () => {
	const { aliases, setAliases } = useStore();
	const [alias, setAlias] = useState("");
	const [query, setQuery] = useState("");
	const [editingAlias, setEditingAlias] = useState(null);

	const handleAliasSubmit = () => {
		if (!alias.startsWith("@")) {
			// Show a friendly error message
			message.error("Alias must start with @");
			return;
		}

		setAliases({ ...aliases, [alias]: query });
		setAlias("");
		setQuery("");
		setEditingAlias(null);
	};

	const handleAliasEdit = (alias) => {
		setAlias(alias);
		setQuery(aliases[alias]);
		setEditingAlias(alias);
	};

	const handleAliasDelete = (alias) => {
		const { [alias]: value, ...remainingAliases } = aliases;
		setAliases(remainingAliases);
	};

	return (
		<div>
			<Title level={2}>Query Management</Title>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Input
						placeholder="Alias"
						value={alias}
						onChange={(e) =>
							setAlias(
								e.target.value.startsWith("@")
									? e.target.value
									: "@" + e.target.value
							)
						}
					/>
				</Col>
				<Col span={24}>
					<Input
						placeholder="SQL Query"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</Col>
				<Col span={24}>
					<Button onClick={handleAliasSubmit}>
						{editingAlias ? "Update Alias" : "Add Alias"}
					</Button>
				</Col>
				<Col span={24}>
					<List
						dataSource={Object.keys(aliases)}
						renderItem={(alias) => (
							<List.Item>
								<div>
									{alias}: {aliases[alias]}
									<Button onClick={() => handleAliasEdit(alias)}>Edit</Button>
									<Popconfirm
										title="Are you sure to delete this alias?"
										onConfirm={() => handleAliasDelete(alias)}
										okText="Yes"
										cancelText="No"
									>
										<Button>Delete</Button>
									</Popconfirm>
								</div>
							</List.Item>
						)}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default QueryManagement;
