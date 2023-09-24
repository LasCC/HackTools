import React, { useState } from "react";
import { Alert, Card, Col, Row, Space, Typography } from "antd";
import { goTo } from "react-chrome-extension-router";
import PersistedState from 'use-persisted-state';
import Tabs from "./SideItemMenuRouting";
import systemBG from "../../../assets/img/systemBG.jpg";
import mobileBG from "../../../assets/img/mobileBG.jpg";
import miscBG from "../../../assets/img/miscBG.jpg";
import webBG from "../../../assets/img/webBG.jpg";
import Meta from "antd/es/card/Meta";
import { useStore } from "./GlobalStore";


enum HackToolsMode {
    web = "web",
    system = "system",
    mobile = "mobile",
    misc = "misc"
}

const LayoutChoice = () => {
    const { index, setIndex ,  hackTools , setHackToolsState} = useStore();
    const { Text } = Typography;
    const isMac = navigator.platform.toUpperCase().includes( 'MAC' );
    const keySymbol = isMac ? '⌘' : 'CRTL';

    const modes
        : Array<{
            name: HackToolsMode; backgroundImage: string; title: string; description?: string; shortcut: string | JSX.Element;

        }> = [
            {
                name: HackToolsMode.web,
                backgroundImage: webBG,
                title: "Web Security",
                description: "Various payloads and tools related to web security assessment.",
                shortcut: (
                    <div style={{ marginTop: 5 }}>
                        <Text keyboard>CRTL</Text>
                        <Text keyboard>ALT</Text>
                        <Text keyboard>1</Text>
                    </div>
                )
            },
            {
                name: HackToolsMode.system,
                backgroundImage: systemBG,
                title: "System Security",
                description: "Reconnaissance, exploitation and post-exploitation, OS related tools.",
                shortcut: (
                    <div style={{ marginTop: 5 }}>
                        <Text keyboard>CRTL</Text>
                        <Text keyboard>ALT</Text>
                        <Text keyboard>2</Text>
                    </div>
                )
            },
            {
                name: HackToolsMode.mobile,
                backgroundImage: mobileBG,
                title: "Mobile Security",
                description: "Android and iOS related payloads for debugging and app instrumentation.",
                shortcut: (
                    <div style={{ marginTop: 5 }}>
                        <Text keyboard>CRTL</Text>
                        <Text keyboard>ALT</Text>
                        <Text keyboard>3</Text>
                    </div>
                )
            },
            {
                name: HackToolsMode.misc,
                backgroundImage: miscBG,
                title: "General Purpose Tools",
                description: "Various tools such as a private cheatsheets, advanced methodology, etc.",
                shortcut: (
                    <div style={{ marginTop: 5 }}>
                        <Text keyboard>CRTL</Text>
                        <Text keyboard>ALT</Text>
                        <Text keyboard>4</Text>
                    </div>
                )
            }
        ];


    const navigateAndSetMode = ( mode: string ) => {
        // Navigate to the page and set its mode with persisted state
        // Fixing to the first element to 1 to prevent array index overflow when switching between modes that have different lengths of tabs
        // TODO: Implement a caching system ?
        setIndex( '1' );
        setHackToolsState( mode );
        // Not pretty but it works ...
        goTo( Tabs.filter( ( tab ) => tab.type === mode )[ 0 ].componentRoute );
    }

    const handleClickOnMode = ( mode: string ) => {
        navigateAndSetMode( mode );
    }

    const mappedModules = modes.map( ( mode ) => (
        <Col key={mode.name}
            span={12} xxl={6}
        >
            <Card
                style={{
                    width: "100%", marginTop: 16,
                    height: "350px",
                }}
                hoverable
                onClick={() => handleClickOnMode( mode.name )}
                cover={
                    <img
                        src={mode.backgroundImage}
                        alt={mode.name}
                        style={{
                            width: "100%",
                            height: "210px",
                            objectFit: "cover",
                        }}
                    />
                }
            >
                <Meta title={mode.title}
                    description={mode.description}
                />
                <Meta
                    description={mode.shortcut}
                />
            </Card>
        </Col>

    ) );

    return (
        <>
            <Row gutter={[ 24, 16 ]}>
                {mappedModules}
            </Row>
            <div style={{ marginTop: 8 }}>
                <Alert
                    message="New keyboard shortcuts"
                    description={
                        <span>
                            You can now use the keyboard shortcut to switch between the different modes, or use your <Text keyboard>{keySymbol}</Text> + <Text keyboard>k</Text> to open the command palette.
                        </span>
                    }
                    type="info"
                    showIcon
                    closable
                />
            </div>
        </>
    );
};

export default LayoutChoice;
