import React, { useState, useEffect } from 'react';
import { Input, Alert } from 'antd';
import { useStore } from './store';

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
    } else {
      setError('Invalid HTTP request format.');
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

    // For other content types like XML or multipart form data, you can add additional parsing logic here

    return {};
  };
  return (
    <>
      {error && <Alert message={error} type="error" />}
      <Input.TextArea
        value={request}
        onChange={(e) => setRequest(e.target.value)}
        placeholder="Paste your POST HTTP request here"
        style={{ minHeight: '200px' }} // min height added
      />
    </>
  );
}

export default RequestInput;