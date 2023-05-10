import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography, theme, Button, Select, ConfigProvider, Switch } from 'antd';
import { CopyrightCircleOutlined, FullscreenOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';
import { goTo } from 'react-chrome-extension-router';
import ReverseShell from './linux/ReverseShell';
import PhpReverseShell from './web/PhpReverseShell';
import TtySpawnShell from './linux/TtySpawnShell';
import Base64Encode from './encoding/DataEncoding';
import Hashing from './encoding/Hashing';
import LinuxCommands from './linux/LinuxCommands';
import PowershellCommands from './linux/PowershellCommands';
import LFI from './web/LFI';
import XSS from './web/XSS';
import SQLi from './web/SqlInjection';
import AboutUs from './AboutUs';
import FeedRSS from './rss/FeedRSS';
import FileTransfer from './file_transfer/File_transfer';
import PersistedState from 'use-persisted-state';
import MSFBuilder from './linux/MSFBuilder';
import EchoBase64 from './file_transfer/ObfuscatedFiles';
import Notepad from './notepad/Notepad';

const { Paragraph } = Typography;
const { Sider, Content, Footer } = Layout;
const IconFont = createFromIconfontCN({
    scriptUrl: ['./iconfont.js']
});



export interface IRouterComponent {
    key: string;
    icon: JSX.Element;
    name: string;
    componentRoute: React.FunctionComponent;
    type: string;
}


export const Tabs: Array<IRouterComponent> = [
    {
        key: '1',
        icon: <IconFont type='icon-gnubash' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'Reverse Shell',
        componentRoute: ReverseShell,
        type: "system"
    },
    {
        key: '2',
        icon: <IconFont type='icon-php' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'PHP Reverse Shell',
        componentRoute: PhpReverseShell,
        type: "web"
    },
    {
        key: '3',
        icon: <IconFont type='icon-lvzhou_yuanchengTelnet' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'TTY Spawn Shell',
        componentRoute: TtySpawnShell,
        type: "system"
    },
    {
        key: '4',
        icon: <IconFont type='icon-linux' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'Useful Linux commands',
        componentRoute: LinuxCommands,
        type: "system"
    },
    {
        key: '5',
        icon: <IconFont type='icon-powershell' style={{ fontSize: '1.5em', marginTop: 3 }} />, name: 'PowerShell Commands',
        componentRoute: PowershellCommands,
        type: "system"
    },
    {
        key: '6',
        icon: <IconFont type='icon-transfer' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'Transfer Methods',
        componentRoute: FileTransfer,
        type: "web"
    },
    {
        key: '7',
        icon: <IconFont type='icon-l-file' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'LFI',
        componentRoute: LFI,
        type: "web"
    },
    {
        key: '8',
        icon: <IconFont type='icon-js' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'XSS',
        componentRoute: XSS,
        type: "web"
    },
    {
        key: '9',
        icon: <IconFont type='icon-sql' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'SQL Injection',
        componentRoute: SQLi,
        type: "web"
    },
    {
        key: '10',
        icon: <IconFont type='icon-jiemaleixing' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'Data Encoding',
        componentRoute: Base64Encode,
        type: "web"
    },
    {
        key: '11',
        icon: <IconFont type='icon-Encode-File' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'Obfuscated Files or Information',
        componentRoute: EchoBase64,
        type: "web"
    },
    {
        key: '12',
        icon: <IconFont type='icon-hash' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'Hashing',
        componentRoute: Hashing,
        type: "web"
    },
    {
        key: '13',
        icon: <IconFont type='icon-Cloud' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'Feed RSS',
        componentRoute: FeedRSS,
        type: "web"
    },
    {
        key: '14',
        icon: <IconFont type='icon-shield' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'MSF Builder',
        componentRoute: MSFBuilder,
        type: "system"
    },
    {
        key: '15',
        icon: <IconFont type='icon-about' style={{ fontSize: '1.5em', marginTop: 3 }} />,
        name: 'About us',
        componentRoute: AboutUs,
        type: "system"
    },

];