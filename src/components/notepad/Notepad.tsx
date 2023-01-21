import React, { useState } from 'react';
import { Button, Input, Typography, message, Divider, Menu, Dropdown } from 'antd';
import { CopyOutlined, createFromIconfontCN, ClearOutlined, DownOutlined } from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';
import escape_quotes from 'escape-quotes';

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );


const NOTEPAD = () => {

    return (
        <div>
            NOTEPAD
        </div>
    );
};

export default NOTEPAD;
