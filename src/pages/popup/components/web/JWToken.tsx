import React, { useState } from 'react'
import { Input, Row, Col } from 'antd';
const { TextArea } = Input;
import * as jose from 'jose'
import jwtdecode from 'jwt-decode'

const JWToken = () => {

    const [rawToken, setRawToken] = useState("");
    const [header, setHeader] = useState("");
    const [payload, setPayload] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [signatureValid, setSignatureValid] = useState(false);

    const handleRawTokenChange = async e => {
        const { value } = e.target;
        setRawToken(value);
    
        // Try to decode the header and payload without throwing errors
        try {
            const decodedHeader = jose.decodeProtectedHeader(value);
            setHeader(JSON.stringify(decodedHeader, null, 2));
            // decode the payload
            const decodedPayload = jwtdecode(value);
            console.log(decodedPayload);

            setPayload(JSON.stringify(decodedPayload, null, 2));

        } catch (err) {
            setHeader("Invalid JWT");
        }
    
        try {
            const result = await jose.jwtVerify(value, parseJwk({ kty: 'oct', k: secretKey, alg: 'HS256' }));
            setPayload(JSON.stringify(result.payload, null, 2));
            setSignatureValid(true);
        } catch (err) {
            setSignatureValid(false);
            // setPayload("Invalid JWT or secret key");
        }
    };

    const handleSecretKeyChange = e => {
        setSecretKey(e.target.value);
    };

    return (
        <Row gutter={16}>
            <Col span={12}>
                <h3>JWT</h3>
                <TextArea rows={10} onChange={handleRawTokenChange} value={rawToken}/>
                <h3>Secret Key</h3>
                <TextArea rows={1} onChange={handleSecretKeyChange} value={secretKey}/>
                <h3>Signature Valid</h3>
                <p>{signatureValid ? 'Yes' : 'No'}</p>
            </Col>
            <Col span={12}>
                <h3>Header</h3>
                <TextArea rows={4} value={header}/>
                <h3>Payload</h3>
                <TextArea rows={4} value={payload} style={{ height: '40vh' }}/>
            </Col>
        </Row>
    )
}

export default JWToken;
function parseJwk(arg0: { kty: string; k: string; alg: string; }): jose.KeyLike | Uint8Array {
    throw new Error('Function not implemented.');
}

