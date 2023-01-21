import React, { useState } from 'react';
import { Button, Input, Typography, message, Divider, Menu, Dropdown } from 'antd';
import { CopyOutlined, createFromIconfontCN, ClearOutlined, DownOutlined } from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';
import escape_quotes from 'escape-quotes';
import MDEditor from '@uiw/react-md-editor';
const { Title, Paragraph } = Typography;
import PersistedState from 'use-persisted-state';
import mermaid from "mermaid";
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );


const NOTEPAD = () => {
    const [value, setValue] = PersistedState<string|string>('notepad')('');
  return (
      <>
      <Paragraph>
      
      </Paragraph>
      <div className="container">
        <MDEditor
        textareaProps={{
          placeholder: 'This is an offline markdown editor to help you take some small notes (data is kept in your browser localstorage)'
          }}
          value={value || ''}
          onChange={setValue}
          height={520}
          />
        {/* <MDEditor.Markdown source={value} /> */}
      </div>
      </>
    );
  
};

export default NOTEPAD;
