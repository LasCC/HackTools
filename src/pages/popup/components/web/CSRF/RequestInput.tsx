import React, { useState, useEffect} from 'react';
import { Input, Alert, Row, Col , Typography} from 'antd';
import { useStore } from './store';
import Title from 'antd/es/typography/Title';

const RequestInput: React.FC = () => {
  const error = useStore(state => state.error);
  const setError = useStore(state => state.setError);
  const request = useStore(state => state.request);
  const setRequest = useStore(state => state.setRequest);
  const setParsedPostBody = useStore(state => state.setParsedPostBody);

  const isValidRequest = (request: string): boolean => {
    return request.startsWith('POST') && request.includes('\n\n') && request.includes('Content-Type: ');
  };

  useEffect(() => {
    // FIXME: it crashes when i type a random string in the request input
    if (isValidRequest(request)) {
      try {
        const requestBody = request.split('\n\n')[1];
        const contentType = request.split('\n').find(line => line.startsWith('Content-Type: '));
        const postBody = contentType ? parsePostBody(contentType.split(': ')[1], requestBody) : {};

        setParsedPostBody(postBody);
        setError(''); // clear error
      } catch (err) {
        setError('Invalid HTTP request format.');
      }
    }
  }, [request]);

  const parsePostBody = (contentType: string, body: string) => {
    if (contentType.includes('application/x-www-form-urlencoded')) {
      return body.split('&').reduce((obj, pair) => {
        const [key, value] = pair.split('=');
        obj[key] = decodeURIComponent(value);
        return obj;
      }, {});
    }

    if (contentType.includes('application/json')) {
      return JSON.parse(body);
    }

    // TODO: add support for other content types

    return {};
  };
  return (
    
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Title level={2}>Cross Site Request Forgery (CSRF)</Title>
        <Typography.Text type="secondary">Cross Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated.</Typography.Text>
        <Typography.Text type="secondary">This tool will generate a CSRF HTML POC for you, based on the HTTP request you provide.</Typography.Text>
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
    </Row>
    
  );
}

export default RequestInput;