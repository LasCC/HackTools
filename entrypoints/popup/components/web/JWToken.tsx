import { useState, useEffect } from "react";
import {
	Input,
	Space,
	Select,
	Typography,
	Divider,
	Badge,
	Row,
	Col,
} from "antd";
const { TextArea } = Input;
const { Option } = Select;
import { decodeProtectedHeader, jwtVerify } from "jose";
import jwtdecode from "jwt-decode";

const { Title, Paragraph } = Typography;

const JWToken = () => {
	const [rawToken, setRawToken] = useState("");
	const [header, setHeader] = useState("");
	const [payload, setPayload] = useState("");
	const [secretKey, setSecretKey] = useState("");
	const [signatureValid, setSignatureValid] = useState(false);
	const [alg, setAlg] = useState("HS256");
	const [noneAlgToken, setNoneAlgToken] = useState("");

	useEffect(() => {
		if (alg === "None") {
			const splitToken = rawToken.split(".");
			if (splitToken.length === 3) {
				const noneToken = `${splitToken[0]}.${splitToken[1]}.`;
				setNoneAlgToken(noneToken);
				const decodedHeader = JSON.parse(
					Buffer.from(splitToken[0], "base64").toString()
				);
				decodedHeader.alg = "none";
				setHeader(JSON.stringify(decodedHeader, null, 2));
			}
		}
	}, [alg, rawToken]);

	const handleAlgChange = (value) => {
		setAlg(value);
	};

	const handleRawTokenChange = async (e) => {
		const { value } = e.target;
		setRawToken(value);

		try {
			const decodedHeader = decodeProtectedHeader(value);
			setHeader(JSON.stringify(decodedHeader, null, 2));

			const decodedPayload = jwtdecode(value);
			setPayload(JSON.stringify(decodedPayload, null, 2));
		} catch (err) {
			setHeader("Invalid JWT");
		}

		if (alg === "HS256") {
			try {
				const key = new TextEncoder().encode(secretKey);
				const result = await jwtVerify(value, key);
				setPayload(JSON.stringify(result.payload, null, 2));
				setSignatureValid(true);
			} catch (err) {
				setSignatureValid(false);
			}
		} else {
			setSignatureValid(true);
		}
	};

	const handleSecretKeyChange = (e) => {
		setSecretKey(e.target.value);
	};

	return (
		<Space direction="vertical" style={{ padding: 5 }}>
			<Title level={2} style={{ fontWeight: "bold" }}>
				JSON Web Token
			</Title>
			<Paragraph>
				JSON Web Token (JWT) is a compact URL-safe means of representing claims
				to be transferred between two parties. The claims in a JWT are encoded
				as a JSON object that is used as the payload of a JSON Web Signature
				(JWS) structure or as the plaintext of a JSON Web Encryption (JWE)
				structure, enabling the claims to be digitally signed or integrity
				protected with a Message Authentication Code (MAC) and/or encrypted.
			</Paragraph>
			<Divider />

			<Paragraph>
				JWT <small>Place your token here</small>
			</Paragraph>
			<TextArea
				rows={10}
				onChange={handleRawTokenChange}
				value={rawToken}
				style={{ height: "40vh", marginBottom: 14 }}
				placeholder="eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.jYW04zLDHfR1v7xdrW3lCGZrMIsVe0vWCfVkN2DRns2c3MN-mcp_-RE6TN9umSBYoNV-mnb31wFf8iun3fB6aDS6m_OXAiURVEKrPFNGlR38JSHUtsFzqTOj-wFrJZN4RwvZnNGSMvK3wzzUriZqmiNLsG8lktlEn6KA4kYVaM61_NpmPHWAjGExWv7cjHYupcjMSmR8uMTwN5UuAwgW6FRstCJEfoxwb0WKiyoaSlDuIiHZJ0cyGhhEmmAPiCwtPAwGeaL1yZMcp0p82cpTQ5Qb-7CtRov3N4DcOHgWYk6LomPR5j5cCkePAz87duqyzSMpCB0mCOuE3CU2VMtGeQ"
			/>

			<Row gutter={16}>
				<Col span={12}>
					<Paragraph>Secret Key</Paragraph>
					<TextArea
						rows={1}
						onChange={handleSecretKeyChange}
						value={secretKey}
						placeholder="your-secret-key-here"
					/>
				</Col>
				<Col span={12}>
					<Paragraph>Algorithm</Paragraph>
					<Select
						defaultValue="HS256"
						style={{ width: "100%" }}
						onChange={handleAlgChange}
					>
						<Option value="HS256">HS256</Option>
						<Option value="None">None</Option>
					</Select>
				</Col>
			</Row>

			<Paragraph style={{ marginBottom: 14 }}>
				Signature Valid: <Badge status={signatureValid ? "success" : "error"} />
			</Paragraph>
			{alg === "None" && (
				<>
					<Divider />
					<Paragraph>JWT without signature</Paragraph>
					<TextArea rows={3} value={noneAlgToken} />
				</>
			)}

			<Paragraph>
				Header <small>Algorithm & Token Type</small>
			</Paragraph>
			<TextArea
				rows={4}
				value={header}
				style={{ marginBottom: 14 }}
				placeholder={`{\n\t"alg": "HS256",\n\t"typ": "JWT"\n}`}
			/>

			<Paragraph>
				Payload <small>JWT Claims</small>
			</Paragraph>
			<TextArea
				rows={4}
				value={payload}
				style={{ height: "40vh" }}
				placeholder={`{\n\t"sub": "001923344",\n\t"name": "HackTools - Extension",\n\t"iat": 1696166331\n}`}
			/>
		</Space>
	);
};

export default JWToken;
