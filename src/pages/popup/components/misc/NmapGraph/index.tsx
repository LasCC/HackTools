import React from 'react'
import type { TabsProps } from 'antd';
import { Tabs, theme } from 'antd';
import { GraphCanvas, lightTheme, darkTheme } from 'reagraph';
import { useStore } from "../../GlobalStore"


const { darkMode } = useStore.getState()

const nodes = [
    {
        id: '1',
        label: '1'
    },
    {
        id: '2',
        label: '2'
    }
];

const edges = [
    {
        source: '1',
        target: '2',
        id: '1-2',
        label: '1-2'
    },
    {
        source: '2',
        target: '1',
        id: '2-1',
        label: '2-1'
    }
];





const Canvas = <div key={"graph_canvas"} style={{
    border: 'solid 1px red',
    borderRadius: 5,
    height: "80vh",
    width: "91vw",
    margin: 5,
    position: 'relative'
}}
>

    <GraphCanvas nodes={nodes} edges={edges}
        draggable={true}
        animated={true}
        theme={darkMode ? darkTheme : lightTheme}
    />
</div>

// #FIXME: Theme switching is not working, it is not re-rendering the canvas with the new theme, need force refresh ?


const index = () => {
    const items: TabsProps['items'] = [

        {
            key: '1',
            label: `Dashboard`,
            children: Canvas
        },
        {
            key: '2',
            label: `Nmap Graph`,
            children: Canvas
        },
        {
            key: '3',
            label: `Table`,
            children: Canvas
        }
    ];
    return (
        <Tabs
            defaultActiveKey="1"
            items={items}
        />
    )
}

export default index