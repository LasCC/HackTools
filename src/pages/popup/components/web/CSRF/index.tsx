import React, { useState, useEffect } from 'react';
import { Input, Alert, Row, Col, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { useStore } from './store';

const CSRFComponent: React.FC = () => {
    const {
        error,
        setError,
        request,
        setRequest,
        parsedPostBody,
        setParsedPostBody
    } = useStore();

    const [csrfPayload, setCsrfPayload] = useState<string>('');

    useEffect(() => {
        const generateCSRFPayload = () => {
            const requestParts = request.split("\n\n");
            if (requestParts.length < 2) {
                setError('Invalid HTTP request format.');
                return;
            }

            const headers = requestParts[0].split("\n");
            const methodParts = headers[0]?.split(" ");
            if (methodParts.length < 2 || methodParts[0].toUpperCase() !== 'POST') {
                setError('Invalid HTTP request format. Only POST method is supported.');
                return;
            }

            const hostHeader = headers.find((header) => header.startsWith("Host:"));
            if (!hostHeader) {
                setError('Host header is missing in the request.');
                return;
            }

            const url = hostHeader.split(" ")[1];
            const actionUrl = `${url}${methodParts[1]}`;

            const inputs = Object.entries(parsedPostBody).map(([key, value]) =>
                `\t\t\t<input type="hidden" name="${key}" value="${(value as string).trim() || ""}"/>\n`
            ).join('');
            const method = methodParts[0].toUpperCase();
            const form = `<html>
    \t<body>
    \t\t<form method="${method}" action="${actionUrl}">
    \t\t\t${inputs.trim()}
    \t\t\t<input type="submit" value="Submit">
    \t\t</form>
    \t</body>
    <html>`;

            setCsrfPayload(form);
        };

        const contentTypeHeader = request.split('\n').find(line => line.startsWith('Content-Type: '));
        if (contentTypeHeader) {
            const contentType = contentTypeHeader.split(': ')[1];
            const requestBody = request.split('\n\n')[1];
            if (requestBody) {
                const postBody = parsePostBody(contentType, requestBody);
                setParsedPostBody(postBody);
                setError(''); // clear error
                generateCSRFPayload();
            } else {
                setError('Request body is missing in the request.');
            }
        } else {
            setError('Content-Type header is missing in the request.');
        }
    }, [request]);


    const parsePostBody = (contentType: string, body: string) => {
        try {
            if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
                return body.split('&').reduce((obj, pair) => {
                    const [key, value] = pair.split('=');
                    obj[key] = decodeURIComponent(value);
                    return obj;
                }, {});
            }

            if (contentType && contentType.includes('application/json')) {
                return JSON.parse(body);
            }

            // TODO: add support for other content types

            return {};
        } catch (err) {
            setError('Failed to parse the request body. Please check your input.');
            return {};
        }
    };


    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <Title level={2}>Cross Site Request Forgery (CSRF)</Title>
                <Typography.Text type="secondary">
                    Cross-Site Request Forgery (CSRF) is a security threat where an attacker manipulates a victim into performing actions on a web application they're authenticated on. This tool creates a CSRF HTML Proof of Concept (POC) based on your provided HTTP request. (Ensure to add a new line to denote the end of parameters).
                </Typography.Text>
            </Col>
            <Col xs={24}>
                {error && <Alert message={error} type="error" />}
            </Col>
            <Col xs={24}>
                <Input.TextArea
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    placeholder="Paste your raw POST HTTP request here"
                    style={{ minHeight: '250px' }}
                />
            </Col>
            <Col xs={24}>
                <Input.TextArea
                    value={csrfPayload}
                    readOnly
                    style={{ minHeight: '250px' }}
                />
            </Col>
        </Row>
    );
}

export default CSRFComponent;