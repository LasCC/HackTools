import React, { useState } from "react";
import { Card, Col, Row, Typography } from "antd";
import { goTo } from "react-chrome-extension-router";
import PersistedState from 'use-persisted-state';
import Tabs from "./SideItemMenuRouting";
import systemBG from "../../../assets/img/systemBG.jpg";
import mobileBG from "../../../assets/img/mobileBG.jpg";
import miscBG from "../../../assets/img/miscBG.jpg";
import webBG from "../../../assets/img/webBG.jpg";
import Meta from "antd/es/card/Meta";


enum HackToolsMode {
    web = "web",
    system = "system",
    mobile = "mobile",
    misc = "misc"
}

const LayoutChoice = () => {
    const useMenuIndex = PersistedState<string>( 'tab_index_cache' ); // Disabled for now
    const hackToolsState = PersistedState<string>( "hack_tools_mode" );
    const [ hackTools, setHackTools ] = hackToolsState( "web" );
    const { Text } = Typography;

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
                description: "Various tools such as a private cheatsheets, advanced methodology, notes taking, etc.",
                shortcut: (
                    <div style={{ marginTop: 5 }}>
                        <Text keyboard>CRTL</Text>
                        <Text keyboard>ALT</Text>
                        <Text keyboard>4</Text>
                    </div>
                )
            }
        ];


    const [ index, setIndex ] = useMenuIndex( '1' )


    const navigateAndSetMode = ( mode: string ) => {
        // Navigate to the page and set its mode with persisted state
        // Fixing to the first element to 1 to prevent array index overflow when switching between modes that have different lengths of tabs
        // TODO: Implement a caching system ?
        setIndex( '1' );
        setHackTools( mode );
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
        </>
    );
};

export default LayoutChoice;
