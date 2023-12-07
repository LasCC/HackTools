import { Button, Col, Input, Row, Typography, message } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { useStore } from "../store";

const index = () => {
	const { obfuscatedIPv4, setIPv4forObfuscation, ipv4forObfuscation } =
		useStore();

	useEffect(() => {
		setIPv4forObfuscation(ipv4forObfuscation);
	}, [ipv4forObfuscation]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(obfuscatedIPv4.join("\n"));
			message.success("Address copied !");
		} catch (err) {
			message.error("Failed to copy text");
		}
	};

	return (
		<Row gutter={[16, 16]}>
			<Col xs={24}>
				<Title level={2}>SSRF IP Filter Bypass</Title>
				<Typography.Text type="secondary">
					This tool help generate mutation based on a provided IPv4 address for
					obfuscation or filter bypass purposes.
				</Typography.Text>
			</Col>
			<Col xs={24}>
				<Input
					value={ipv4forObfuscation}
					onChange={(e) => setIPv4forObfuscation(e.target.value)}
					placeholder="127.0.0.1"
				/>
			</Col>
			<Col xs={24}>
				<Button type="primary" onClick={handleCopy}>
					Copy All
				</Button>
			</Col>
			<Col xs={24}></Col>
			<Col xs={24}>
				<Paragraph>
					<pre>{obfuscatedIPv4.join("\n")}</pre>
				</Paragraph>
			</Col>
		</Row>
	);
};

export default index;
