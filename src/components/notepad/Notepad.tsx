import React, { useState } from 'react';
import { Button, Input, Typography, message, Divider, Menu, Dropdown } from 'antd';
import { CopyOutlined, createFromIconfontCN, ClearOutlined, DownOutlined } from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';
import escape_quotes from 'escape-quotes';
import MDEditor from '@uiw/react-md-editor';
const { Title, Paragraph } = Typography;
import PersistedState from 'use-persisted-state';
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );


const NOTEPAD = () => {
    const [value, setValue] = PersistedState('ht_notepad_content')('');
    return (
      <div className="container">
        <MDEditor
          value={value}
          onChange={setValue}
        />
        {/* <MDEditor.Markdown source={value} /> */}
      </div>
    );
  
};

export default NOTEPAD;
