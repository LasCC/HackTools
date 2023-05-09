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

export default function LayoutApp(props: {
    children: boolean | React.ReactFragment | React.ReactPortal | null | undefined;
}) {


    const Tabs: Array<IRouterComponent> = [
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
        {
            key: '16',
            icon: <IconFont type='icon-about' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'About us',
            componentRoute: AboutUs,
            type: "system"
        },
        {
            key: '17',
            icon: <IconFont type='icon-about' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'About us',
            componentRoute: AboutUs,
            type: "system"
        }


    ];

    const { defaultAlgorithm, darkAlgorithm } = theme;
    const setDarkMode = PersistedState<boolean>('dark_mode');
    const [darkMode, setDarkModeState] = setDarkMode(false);
    const [menuItems, setMenuItems] = useState<Array<IRouterComponent>>(Tabs);
    const hackToolsState = PersistedState<string>("web");
    const [hackTools, setHackToolsState] = hackToolsState("web");

    const handleSwtichTheme = (value: string) => {
        // Set the dark mode state based on the selected value
        // We can use the '===' operator because we know the value can only be 'dark' or 'light'.
        const isDarkMode = value === 'dark';
        setDarkModeState(isDarkMode);
    }

    interface IRouterComponent {
        key: string;
        icon: JSX.Element;
        name: string;
        componentRoute: React.FunctionComponent;
        type: string;
    }



    const MenuItemsLists = menuItems.filter(item => item.type === hackTools).map((item: IRouterComponent) => {
        return (
            <Menu.Item key={item.key} icon={item.icon} onClick={() => navigate(item)}>
                {item.name}
            </Menu.Item>
        );
    });

    const useMenuIndex = PersistedState<string>('tab_index_cache'); // Disabled for now
    const [index, setIndex] = useMenuIndex('1');

    const navigate = ({ componentRoute, key }: { componentRoute: React.FunctionComponent; key: string }) => {
        goTo(componentRoute);
        setIndex(key);
    };

    const windowMode = () => {
        const width = 1100;
        const height = 800;

        chrome.windows.create({
            url: chrome.runtime.getURL('/src/pages/popup/index.html'),
            width: width,
            height: height,
            type: 'popup'
        });
    };

    useEffect(() => {
        const currentComponent = Tabs.filter((obj) => obj.key === index)[0].componentRoute;
        goTo(currentComponent);
    }, []);

    const target = window.location.href;

    const handleHatClick = () => {
        const notepad_route_ctx = {
            key: '1',
            name: 'Hat Clicked',
            componentRoute: Notepad
        }
        // change web to system and vice versa
        setHackToolsState(hackTools === "web" ? "system" : "web");


        // navigate( notepad_route_ctx );
    };

    return (
        <ConfigProvider
            theme={{
                "token": {
                    "wireframe": true,
                },
                algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
            }}

        >
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsed={true}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0
                    }}
                >
                    <div className='logo' onClick={handleHatClick}>
                        {/* <svg xmlns='http://www.w3.org/2000/svg' width='45' height='35' viewBox='0 0 134.624 80.584'>
                            <g transform='translate(-6.457 -23.8)'>
                                <path
                                    d='M138.715,62.377c-9.043-1.871-15.592.78-21.673,4.989l-5.616-26.958-2.18-10.463a1.432,1.432,0,0,0-.624-.936c-.312-.156-6.86-4.21-32.431-4.21s-34.458,4.678-34.77,4.834c-.468.312-.78.624-.78,1.091L36.9,57.543c-4.678,0-19.022.624-26.039,9.2C7.119,71.264,6.651,78.125,9.3,84.829c4.054,9.979,14.033,16.839,26.506,18.087a80.594,80.594,0,0,0,8.42.468c21.985,0,40.071-8.887,52.389-16.06,1.559-.468,11.538-3.274,24.635-8.42,14.812-5.769,18.554-14.033,18.71-14.5a2.163,2.163,0,0,0,0-1.4C139.495,62.689,139.183,62.377,138.715,62.377ZM43.448,32.128c2.495-1.091,11.694-4.21,32.743-4.21,20.581,0,28.377,2.651,30.248,3.43L111.585,56.3a165.118,165.118,0,0,1-40.851,8.887C51.088,66.9,41.733,63,39.238,61.6ZM95.058,84.517c-13.409,7.8-33.991,17.931-59.094,15.436-11.382-1.247-20.27-7.328-24.012-16.216-2.183-5.613-1.871-11.382,1.091-14.968,5.925-7.328,18.554-8.108,23.232-8.108L34.249,74.694a1.367,1.367,0,0,0,.78,1.559c9.979,6.081,21.049,8.264,31.5,8.264,16.216,0,31.34-5.145,40.7-9.043A85,85,0,0,1,95.058,84.517ZM120,75.942C114.236,78.125,109.091,80,104.881,81.4c2.183-1.715,4.054-3.43,6.081-5.145,7.172-6.237,13.1-11.382,21.829-11.382a19.881,19.881,0,0,1,2.962.156C134.038,67.522,129.516,72.356,120,75.942Z'
                                    transform='translate(0 0)'
                                    fill='#F0F2F5'
                                    stroke='#F0F2F5'
                                    strokeWidth='2'
                                />
                            </g>
                        </svg> */}
    
    <svg width="45" height="35" viewBox="0 0 353 262" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M86.4667 1.46666C75.4 2.66666 67.5334 5.46666 58.2 11.4667C51.4 15.7333 48.8667 18.2667 50.0667 19.4667C50.3334 19.7333 56.8667 17.0667 64.6 13.3333C76.4667 7.46666 80.0667 6.39999 88.7334 5.73332C95.5334 5.19999 99 5.46666 99 6.39999C99 7.19999 102.333 12.1333 106.467 17.6C110.467 22.9333 115.933 31.0667 118.467 35.6C121 40 123.933 44.5333 125.133 45.4667C126.467 46.5333 126.867 48.2667 126.333 50.8C125.8 53.3333 127.8 60.8 133.667 76.8C140.467 95.6 141.533 99.8667 140.333 102.4C139.667 104.133 138.467 105.333 137.8 105.067C137.133 104.8 130.867 98.4 124.067 90.8C115.267 81.0667 109.4 75.7333 104.067 72.8L96.3334 68.6667L92.0667 71.2C89.4 72.6667 80.7334 74.6667 69.6667 76.1333C59.8 77.6 51 79.4667 50.2 80.4C43.8 87.0667 -0.333294 170.533 0.733373 173.733C1.00004 174.667 6.20004 165.467 12.3334 153.333C26.8667 124.133 36.0667 108 44.6 96.6667L51.6667 87.3333L73 83.0667C84.8667 80.6667 95.9334 79.0667 98.0667 79.4667C100.6 80 106.2 85.2 116.067 96.2667C123.933 105.067 130.6 112.8 130.733 113.467C131 114.133 129.667 114.667 127.8 114.667C125.8 114.667 123.667 115.733 122.733 117.467C121.8 118.933 117.533 122 113.4 124.133C109.267 126.267 104.733 129.467 103.4 131.467C102.067 133.333 97.6667 138.667 93.5334 143.467C87 150.933 65.6667 184.4 65.6667 187.067C65.6667 187.6 66.4667 188 67.4 188C68.8667 188 74.3334 180.133 84.7334 163.2C89.9334 154.667 102.867 141.467 108.867 138.4C111.8 136.933 117.4 133.333 121.267 130.533C128.867 124.8 130.467 124.533 134.2 127.333C135.667 128.4 139.533 129.333 142.867 129.333C146.2 129.333 151.4 130.4 154.467 131.6L160.067 133.867L159.4 141.333C155.933 186.4 155.267 196.8 155.8 197.2C157.267 198.667 158.333 194.533 161.133 175.733C163.667 159.467 169.267 138.133 171.8 134.8C172.067 134.533 173.267 135.6 174.6 137.2C176.867 140 177.133 140.133 182.2 138C190.333 134.533 194.067 136.267 208.333 149.867C223.133 164.267 229.667 169.333 233 169.333C234.333 169.333 238.6 167.6 242.333 165.467L249.267 161.467L255.267 167.733C258.467 171.2 262.2 175.733 263.533 177.733C264.867 179.867 267.933 182.4 270.333 183.467C274.333 185.067 276.2 188 287.667 210.267C301.4 237.467 316.733 260.4 321.4 261.067C325 261.6 325.133 260.4 321.8 256.8C314.867 249.067 302.733 228.8 290.867 205.067C283.667 190.533 277.667 178 277.667 177.067C277.667 176.133 273.133 170.8 267.533 165.2L257.4 155.067L261.667 142.667C265.267 132.267 265.8 128.8 265.533 120.133L265 110L283.533 109.867H302.2L309.533 114.8C313.667 117.6 321.267 123.733 326.333 128.4C334.067 135.467 337 137.2 342.733 138.533C351.4 140.4 352.333 140.4 352.333 138.667C352.333 137.867 350.867 136.667 349 136C347.133 135.333 336.867 128.533 325.933 120.8C297.267 100.533 296.067 100 276.6 100C260.467 100 260.467 100 258.067 96.4C253.4 89.4667 241 77.8667 234.867 74.9333C224.2 69.7333 215.533 68.5333 206.867 71.0667C191.8 75.4667 181.667 86.4 180.6 99.4667C180.067 105.2 179.533 106.667 178.067 106.133C177 105.733 175.8 105.333 175.533 105.333C173.8 105.333 175.933 99.3333 183 83.7333C191 66.4 192.467 60.1333 189.4 57.6C188.467 56.9333 183.933 56 179.4 55.7333L171 55.2L159 67.4667C152.467 74.1333 147 80.2667 147 81.2C147 84.5333 150.867 82.1333 159.667 73.3333C167.933 65.0667 169.533 64 173.933 64C177.267 64 179 64.6667 179 65.8667C179 67.7333 166.067 96.9333 164.067 99.4667C162.867 101.067 152.867 99.8667 151.133 97.8667C149 95.3333 133.667 48.4 133.667 44.2667C133.667 40.9333 132.467 38.8 128.467 34.9333C125.667 32.2667 119.933 24.4 115.667 17.6C111.4 10.8 106.467 3.99999 104.6 2.53332C101.133 -0.133345 100.6 -0.266678 86.4667 1.46666Z" fill="white"/>
</svg>
                    </div>

                    <Menu theme='dark' defaultSelectedKeys={[index]} mode='inline'>
                        {MenuItemsLists}
                    </Menu>
                </Sider>
                <Layout className='site-layout' style={{ marginLeft: 80 }}>
                    <Content style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                        minHeight: 360,
                        padding: 14,
                        borderRadius: 8,
                        background: darkMode ? '#0f0f0f' : '#fff',
                    }}>
                        {props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <CopyrightCircleOutlined /> Hack Tools - The all in one Red team browser extension for web
                        pentesters
                        <Paragraph style={{ textAlign: 'center' }}>Ludovic COULON - Riadh BOUCHAHOUA</Paragraph>
                        <pre style={{ textAlign: 'center' }}>HackTools Version - 0.5.0</pre>
                        <Button icon={<FullscreenOutlined style={{ margin: 5 }} />} type='link'>
                            <a href={target} rel='noreferrer noopener' target='_blank'>
                                Fullscreen mode
                            </a>
                        </Button>
                        <Select
                            defaultValue={darkMode ? 'dark' : 'light'}
                            style={{ width: 150 }}
                            onChange={handleSwtichTheme}
                            options={[
                                {
                                    value: 'light',
                                    label: 'Light',
                                },
                                {
                                    value: 'dark',
                                    label: 'Dark',
                                },
                            ]}
                        />
                        <Button icon={<ArrowsAltOutlined style={{ margin: 5 }} />} onClick={() => windowMode()} type='link'>
                            Pop-up mode
                        </Button>
                    </Footer>
                </Layout>
            </Layout >
        </ConfigProvider >
    );
}
