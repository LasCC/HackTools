import apkPatchingCommands from "@assets/data/Mobile/ADB/APK_PATCHING.json";
import { Divider, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const APKPatching = () => {
	const handleCommand = (command) => {
		return command.command;
	};

	return (
		<div style={{ padding: 15 }}>
			{apkPatchingCommands.map((command, index) => (
				<div key={index}>
					<Title level={4}>{command.name}</Title>
					<Paragraph>{command.description}</Paragraph>
					<Paragraph>
						<pre>
							<Text copyable>{handleCommand(command)}</Text>
						</pre>
					</Paragraph>
				</div>
			))}
			<Divider />
		</div>
	);
};

export default APKPatching;
