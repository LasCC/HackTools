import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Select, Typography, Divider, Badge } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select;
import { decodeProtectedHeader, jwtVerify } from 'jose'
import jwtdecode from 'jwt-decode'

const { Title, Paragraph } = Typography;

const JWToken = () => {
    const [rawToken, setRawToken] = useState("");
    const [header, setHeader] = useState("");
    const [payload, setPayload] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [signatureValid, setSignatureValid] = useState(false);
    const [alg, setAlg] = useState('HS256');
    const [noneAlgToken, setNoneAlgToken] = useState("");

    useEffect(() => {
        if (alg === 'None') {
            const splitToken = rawToken.split('.');
            if (splitToken.length === 3) {
                const noneToken = `${splitToken[0]}.${splitToken[1]}.`;
                setNoneAlgToken(noneToken);
                const decodedHeader = JSON.parse(Buffer.from(splitToken[0], 'base64').toString());
                decodedHeader.alg = 'none';
                setHeader(JSON.stringify(decodedHeader, null, 2));
            }
        }
    }, [alg, rawToken]);

    const handleAlgChange = value => {
        setAlg(value);
    };

    const handleRawTokenChange = async e => {
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

        if (alg === 'HS256') {
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

    const handleSecretKeyChange = e => {
        setSecretKey(e.target.value);
    };

    return (
        <Row gutter={16}>
            <Col xs={24} md={12}>
                <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}> JWT </Title>
                <TextArea rows={10} onChange={handleRawTokenChange} value={rawToken} />
                <Paragraph>Secret Key</Paragraph>
                <TextArea rows={1} onChange={handleSecretKeyChange} value={secretKey} />
                <Paragraph>Algorithm</Paragraph>
                <Select defaultValue="HS256" style={{ width: 120 }} onChange={handleAlgChange}>
                    <Option value="HS256">HS256</Option>
                    <Option value="None">None</Option>
                </Select>
                <Paragraph>
                    Signature Valid: <Badge status={signatureValid ? "success" : "error"} text={signatureValid ? <CheckCircleOutlined /> : <CloseCircleOutlined />} />
                </Paragraph>
                {alg === 'None' &&
                    <>
                        <Divider />
                        <Paragraph>JWT without signature</Paragraph>
                        <TextArea rows={3} value={noneAlgToken} />
                    </>
                }
            </Col>
            <Col xs={24} md={12}>
                <Title level={3}>Header</Title>
                <TextArea rows={4} value={header} />
                <Title level={3}>Payload</Title>
                <TextArea rows={4} value={payload} style={{ height: '40vh' }} />
            </Col>
        </Row>
    )
}

export default JWToken;
