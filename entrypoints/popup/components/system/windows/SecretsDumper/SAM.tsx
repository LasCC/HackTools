import axios from "axios";
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	UploadOutlined,
	UserOutlined,
	EyeInvisibleOutlined,
	EyeTwoTone,
	GithubOutlined,
} from "@ant-design/icons";
import {
	Badge,
	Button,
	Card,
	Col,
	Divider,
	Form,
	Input,
	Result,
	Row,
	Space,
	Tag,
	Typography,
	Upload,
	message,
} from "antd";
import { useState, useEffect } from "react";
import { BLANK_LM_HASH, useSecretsStore } from "./useSecret";

const { Paragraph, Text } = Typography;

const SAM = () => {
	useEffect(() => {
		return () => {
			setSamFileList([]);
			setSystemFileList([]);
			setData(null);
		};
	}, []);

	const {
		setIsServerConnectModalVisible,
		isServerConnectModalVisible,
		serverAPIKey,
		serverURL,
		setServerURL,
		serverAuthTest,
		setServerAPIKey,
		serverPingTest,
		isServerReady,
	} = useSecretsStore();
	const {
		data,
		samFileList,
		systemFileList,
		setData,
		setSamFileList,
		setSystemFileList,
	} = useSecretsStore();

	const [isLoading, setIsLoading] = useState(false);
	const isLMHashBlank = (lm_hash: string) => lm_hash === BLANK_LM_HASH;

	const checkServerConfigStatus = async () => {
		if (!serverAPIKey || !serverURL) {
			message.error("Config is not set");
			setIsServerConnectModalVisible(true);
			return false;
		}
		const pingTestResult = await serverPingTest();
		if (!pingTestResult) {
			message.error("Server is unreachable");
			setIsServerConnectModalVisible(true);
			return false;
		}
		const authTestResult = await serverAuthTest();
		if (!authTestResult) {
			message.error("API Key is invalid");
			setIsServerConnectModalVisible(true);
			return false;
		}
		return true;
	};

	const handleSAMUpload = async () => {
		if ((await checkServerConfigStatus()) === false) return;
		if (samFileList.length === 0 || systemFileList.length === 0) {
			message.error("Please upload SAM and SYSTEM hive files");
			return;
		}

		const samFile = samFileList[0].originFileObj;
		const systemFile = systemFileList[0].originFileObj;
		const fmData = new FormData();
		const config = {
			headers: {
				"content-type": "multipart/form-data",
				"x-api-key": serverAPIKey,
			},
			onUploadProgress: (event: any) => {
				const percent = (event.loaded / event.total) * 100;
				console.log(`Current progress: ${percent}%`);
			},
		};
		fmData.append("sam", samFile);
		fmData.append("system", systemFile);
		setIsLoading(true);
		try {
			const res = await axios.post(serverURL + "/decrypt/sam", fmData, {
				...config,
				timeout: 5000,
			});
			setData(res.data);
		} catch (err) {
			if (err.code === "ECONNABORTED") {
				message.error("Request timed out.");
			} else if (err.response) {
				message.error(`Error: ${err.response.status}`);
			} else if (err.request) {
				message.error("No response received.");
			} else {
				message.error("Error", err.message);
			}
			console.log("Error: ", err);
		} finally {
			setIsLoading(false);
		}
	};

	const renderSAMData = () => (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<Card title="SAM" bordered={false}>
					<Typography.Paragraph copyable={{ text: data?.SAM.HBoot_key }}>
						Bootkey : {data?.SAM.HBoot_key}
					</Typography.Paragraph>
				</Card>
			</Col>
			<Divider />
			{data?.SAM.local_users.map((user, index) => (
				<Col span={12} key={index}>
					<Badge.Ribbon
						text="LM Hash is not Blank !"
						style={{
							display: isLMHashBlank(user.lm_hash) ? "none" : "block",
							backgroundColor: "#ff4d4f",
						}}
					>
						<Card
							style={{ width: "100%" }}
							title={user.username}
							actions={[<UserOutlined key="user" />]}
						>
							{user.rid === 500 && <Tag color="red">Administrator</Tag>}
							<Typography.Paragraph code copyable={{ text: user.lm_hash }}>
								LM Hash{" "}
								{isLMHashBlank(user.lm_hash) ? "(blank)" : "(LM hash is set !)"}{" "}
								: {user.lm_hash}
							</Typography.Paragraph>
							<Typography.Paragraph code copyable={{ text: user.nt_hash }}>
								NT Hash: {user.nt_hash}
							</Typography.Paragraph>
						</Card>
					</Badge.Ribbon>
				</Col>
			))}
			<Divider />
		</Row>
	);
	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<Space direction="horizontal">
				{isServerReady && (
					<>
						<Upload
							fileList={samFileList}
							onChange={(info) => {
								setSamFileList([info.fileList[info.fileList.length - 1]]);
							}}
							onRemove={(file) => {
								const newList = samFileList.filter(
									(item) => item && item.uid !== file.uid
								);
								setSamFileList(newList);
							}}
						>
							<Button icon={<UploadOutlined />}>Add SAM Hive</Button>
						</Upload>
						<Upload
							fileList={systemFileList}
							onChange={(info) => {
								setSystemFileList([info.fileList[info.fileList.length - 1]]);
							}}
						>
							<Button icon={<UploadOutlined />}>Add SYSTEM Hive File</Button>
						</Upload>
					</>
				)}
			</Space>
			{isServerReady && (
				<Button type="primary" loading={isLoading} onClick={handleSAMUpload}>
					Decrypt SAM
				</Button>
			)}
			{data && <Divider />}
			{data ? (
				renderSAMData()
			) : (
				<Result
					status="error"
					title="No data to display"
					subTitle="Server must be up and running to do this operation !"
					extra={[
						<Button
							type="primary"
							key="connect"
							href="https://github.com/rb-x/hacktools-server"
							target="_blank"
							icon={<GithubOutlined />}
						>
							GitHub Repository
						</Button>,
						<Button key="refresh" onClick={() => window.location.reload()}>
							Refresh
						</Button>,
					]}
				>
					<div className="desc">
						<Paragraph>
							<Text
								strong
								style={{
									fontSize: 16,
								}}
							>
								Why are you seeing this error?
							</Text>
						</Paragraph>
						<Paragraph>
							<CloseCircleOutlined style={{ color: "red" }} /> In order to parse
							credentials from Windows, you need to run local server on your
							machine since most of the offensive utilities are in python.
						</Paragraph>
						<Paragraph>
							<CloseCircleOutlined style={{ color: "red" }} /> We strongly
							advise you to use this tools only locally and not on the internet
							for obvious reasons.
						</Paragraph>
						<Paragraph>
							<CloseCircleOutlined style={{ color: "red" }} /> To reach the
							server you need to provide an API key which is generated randomly
							each time you start the server.
						</Paragraph>
						<Divider />
						<Typography.Title level={3}>Server Configuration</Typography.Title>
						<Form
							name="serverConfig"
							labelCol={{ span: 4 }}
							wrapperCol={{ span: 16 }}
							style={{ maxWidth: 600 }}
							initialValues={{ remember: true }}
							onFinish={checkServerConfigStatus}
							autoComplete="off"
						>
							<Form.Item
								label="Server URL"
								name="serverURL"
								rules={[
									{ required: true, message: "Please input the server URL!" },
								]}
							>
								<Input
									placeholder="Enter server URL"
									defaultValue={serverURL}
									value={serverURL}
									onChange={(e) => setServerURL(e.target.value.trim())}
								/>
							</Form.Item>
							<Form.Item
								label="API Key"
								name="apiKey"
								rules={[
									{ required: true, message: "Please input the API Key!" },
								]}
							>
								<Input.Password
									placeholder="API Key"
									onChange={(e) => setServerAPIKey(e.target.value.trim())}
									value={serverAPIKey}
									iconRender={(visible) =>
										visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
									}
								/>
							</Form.Item>
							<Form.Item wrapperCol={{ offset: 4, span: 16 }}>
								<Button
									type="primary"
									htmlType="submit"
									icon={<CheckCircleOutlined />}
								>
									Connect
								</Button>
							</Form.Item>
						</Form>
					</div>
				</Result>
			)}
		</Space>
	);
};

export default SAM;
