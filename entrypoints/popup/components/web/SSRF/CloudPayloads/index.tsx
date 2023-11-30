import React from "react";
import { Divider, Typography } from "antd";
import payloadsData from "@assets/data/Web/SSRF/SSRF.json";

const { Title, Paragraph } = Typography;
const index = () => {
	return (
		<>
			{payloadsData.map((payload) => (
				<>
					<Title level={5}>{payload.name}</Title>
					<Paragraph>{payload.description}</Paragraph>
					<>
						{payload.steps.map((line) => (
							<Paragraph>
								<pre>{line}</pre>
							</Paragraph>
						))}
					</>
					<Divider dashed />
				</>
			))}
		</>
	);
};
export default index;
