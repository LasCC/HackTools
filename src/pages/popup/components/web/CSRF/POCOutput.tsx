import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { useStore } from './store';

const POCOutput: React.FC = () => {
  const [csrfPayload, setCsrfPayload] = useState<string>('');
  const request = useStore(state => state.request);
  const parsedPostBody = useStore(state => state.parsedPostBody);

  useEffect(() => {
    const generateCSRFPayload = () => {
      const headers = request.split("\n\n")[0].split("\n");
      const method = headers[0].split(" ")[0];
      const url = headers.find((header) => header.startsWith("Host:")).split(" ")[1];
      const actionUrl = `${url}${headers[0].split(" ")[1]}`;

      const inputs = Object.entries(parsedPostBody).map(([key, value]) => 
      // @ts-ignore
        `\t\t\t<input type="hidden" name="${key}" value="${value.trim() || ""}"/>\n`
      ).join('');

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

    
    if (request && parsedPostBody) generateCSRFPayload();
  }, [request, parsedPostBody]);

  return (
    <Input.TextArea
      value={csrfPayload}
      readOnly
      style={{ minHeight: '200px' }}
    />
  );
}

export default POCOutput;
