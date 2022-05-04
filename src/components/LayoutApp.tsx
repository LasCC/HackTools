import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Menu, Typography, Button, Badge, Select, } from 'antd';
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
import DynamicTheme from '../theming';
import { themes } from '../themes';
import EchoBase64 from './file_transfer/ObfuscatedFiles';

const { Paragraph } = Typography;
const { Sider, Content, Footer } = Layout;
const IconFont = createFromIconfontCN( {
    scriptUrl: [ './iconfont.js' ]
} );

const defaultTheme = themes[ 0 ];
const options = themes.map( ( theme ) => ( {
    label: theme.displayName,
    value: theme.id
} ) );

export default function LayoutApp ( props: {
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
} ) {

    const useDefaultTheme = PersistedState<string>( 'default_colored_theme' );
    const [ themeId, setThemeId ] = useDefaultTheme( defaultTheme.id );
    const selectThemeId = useCallback(
        ( option ) => setThemeId( option as string ),
        []
    );

    interface IRouterComponent {
        key: string;
        icon: JSX.Element;
        name: string;
        componentRoute: React.FunctionComponent;
    }

    const Tabs: Array<IRouterComponent> = [
        {
            key: '1',
            icon: <IconFont type='icon-gnubash' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'Reverse Shell',
            componentRoute: ReverseShell
        },
        {
            key: '2',
            icon: <IconFont type='icon-php' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'PHP Reverse Shell',
            componentRoute: PhpReverseShell
        },
        {
            key: '3',
            icon: <IconFont type='icon-lvzhou_yuanchengTelnet' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'TTY Spawn Shell',
            componentRoute: TtySpawnShell
        },
        {
            key: '4',
            icon: <IconFont type='icon-linux' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'Useful Linux commands',
            componentRoute: LinuxCommands
        },
        {
            key: '5',
            icon: (
                <Badge dot size='default' style={{ transform: `translate(3px, 5px)` }}>
                    <IconFont type='icon-powershell' style={{ fontSize: '1.5em', marginTop: 3 }} />
                </Badge>
            ),
            name: 'PowerShell Commands',
            componentRoute: PowershellCommands
        },
        {
            key: '6',
            icon: <IconFont type='icon-transfer' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'Transfer Methods',
            componentRoute: FileTransfer
        },
        {
            key: '7',
            icon: <IconFont type='icon-l-file' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'LFI',
            componentRoute: LFI
        },
        {
            key: '8',
            icon: <IconFont type='icon-js' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'XSS',
            componentRoute: XSS
        },
        {
            key: '9',
            icon: (
                <Badge dot size='default' style={{ transform: `translate(3px, 5px)` }}>
                    <IconFont type='icon-sql' style={{ fontSize: '1.5em', marginTop: 3 }} />
                </Badge>
            ),
            name: 'SQL Injection',
            componentRoute: SQLi
        },
        {
            key: '10',
            icon: <IconFont type='icon-jiemaleixing' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'Data Encoding',
            componentRoute: Base64Encode
        },
        {
            key: '11',
            icon: (
                <Badge dot size='default' style={{ transform: `translate(3px, 5px)` }}>
                    <IconFont type='icon-Encode-File' style={{ fontSize: '1.5em', marginTop: 3 }} />
                </Badge>
            ),
            name: 'Obfuscated Files or Information',
            componentRoute: EchoBase64
        },
        {
            key: '12',
            icon: <IconFont type='icon-hash' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'Hashing',
            componentRoute: Hashing
        },
        {
            key: '13',
            icon: <IconFont type='icon-Cloud' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'Feed RSS',
            componentRoute: FeedRSS
        },
        /* {
            key: '13',
            icon: (
                <Badge dot size='default' style={{ transform: `translate(3px, 5px)` }}>
                    <IconFont type='icon-http' style={{ fontSize: '1.5em', marginTop: 3 }} />
                </Badge>
            ),
            name: 'HTTP Repeater',
            componentRoute: HTTPUtils
        }, */
        {
            key: '14',
            icon: <IconFont type='icon-shield' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'MSF Builder',
            componentRoute: MSFBuilder
        },
        {
            key: '15',
            icon: <IconFont type='icon-about' style={{ fontSize: '1.5em', marginTop: 3 }} />,
            name: 'About us',
            componentRoute: AboutUs
        }
    ];

    const MenuItemsLists = Tabs.map( ( item ) => (
        <Menu.Item style={{ overflow: 'hidden' }} key={item.key} icon={item.icon} onClick={() => navigate( item )}>
            {item.name}
        </Menu.Item>
    ) );

    const useMenuIndex = PersistedState<string>( 'tab_index_cache' ); // Disabled for now
    const [ index, setIndex ] = useMenuIndex( '1' );

    const navigate = ( { componentRoute, key }: { componentRoute: React.FunctionComponent; key: string } ) => {
        goTo( componentRoute );
        setIndex( key );
    };

    const windowMode = () => {
        const width = 1100;
        const height = 800;

        chrome.windows.create( {
            url: chrome.extension.getURL( 'index.html' ),
            width: width,
            height: height,
            type: 'popup'
        } );
    };

    useEffect( () => {
        const currentComponent = Tabs.filter( ( obj ) => obj.key === index )[ 0 ].componentRoute;
        goTo( currentComponent );
    }, [] );

    const target = window.location.href;
    return (
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
                <div className='logo'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='45' height='35' viewBox='0 0 134.624 80.584'>
                        <g transform='translate(-6.457 -23.8)'>
                            <path
                                d='M138.715,62.377c-9.043-1.871-15.592.78-21.673,4.989l-5.616-26.958-2.18-10.463a1.432,1.432,0,0,0-.624-.936c-.312-.156-6.86-4.21-32.431-4.21s-34.458,4.678-34.77,4.834c-.468.312-.78.624-.78,1.091L36.9,57.543c-4.678,0-19.022.624-26.039,9.2C7.119,71.264,6.651,78.125,9.3,84.829c4.054,9.979,14.033,16.839,26.506,18.087a80.594,80.594,0,0,0,8.42.468c21.985,0,40.071-8.887,52.389-16.06,1.559-.468,11.538-3.274,24.635-8.42,14.812-5.769,18.554-14.033,18.71-14.5a2.163,2.163,0,0,0,0-1.4C139.495,62.689,139.183,62.377,138.715,62.377ZM43.448,32.128c2.495-1.091,11.694-4.21,32.743-4.21,20.581,0,28.377,2.651,30.248,3.43L111.585,56.3a165.118,165.118,0,0,1-40.851,8.887C51.088,66.9,41.733,63,39.238,61.6ZM95.058,84.517c-13.409,7.8-33.991,17.931-59.094,15.436-11.382-1.247-20.27-7.328-24.012-16.216-2.183-5.613-1.871-11.382,1.091-14.968,5.925-7.328,18.554-8.108,23.232-8.108L34.249,74.694a1.367,1.367,0,0,0,.78,1.559c9.979,6.081,21.049,8.264,31.5,8.264,16.216,0,31.34-5.145,40.7-9.043A85,85,0,0,1,95.058,84.517ZM120,75.942C114.236,78.125,109.091,80,104.881,81.4c2.183-1.715,4.054-3.43,6.081-5.145,7.172-6.237,13.1-11.382,21.829-11.382a19.881,19.881,0,0,1,2.962.156C134.038,67.522,129.516,72.356,120,75.942Z'
                                transform='translate(0 0)'
                                fill='#F0F2F5'
                                stroke='#F0F2F5'
                                strokeWidth='2'
                            />
                        </g>
                    </svg>
                </div>

                <Menu theme='dark' defaultSelectedKeys={[ index ]} mode='inline'>
                    {MenuItemsLists}
                </Menu>
            </Sider>
            <Layout className='site-layout' style={{ marginLeft: 80 }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <CopyrightCircleOutlined /> Hack Tools - The all in one Red team browser extension for web
                    pentesters
                    <Paragraph style={{ textAlign: 'center' }}>Ludovic COULON - Riadh BOUCHAHOUA</Paragraph>
                    <pre style={{ textAlign: 'center' }}>HackTools Version - 0.4.0</pre>
                    <Button icon={<FullscreenOutlined style={{ margin: 5 }} />} type='link'>
                        <a href={target} rel='noreferrer noopener' target='_blank'>
                            Fullscreen mode
                        </a>
                    </Button>
                    <DynamicTheme themes={themes} value={themeId} />
                    <Select
                        value={themeId}
                        style={{ minWidth: 200 }}
                        options={options}
                        onSelect={selectThemeId}
                    />
                    <Button icon={<ArrowsAltOutlined style={{ margin: 5 }} />} onClick={() => windowMode()} type='link'>
                        Pop-up mode
                    </Button>
                </Footer>
            </Layout>
        </Layout>
    );
}
