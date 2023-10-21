import React, { useEffect, useState } from 'react';
import { GraphCanvas, lightTheme, darkTheme } from 'reagraph';
import scanmeData from './scanme.json';
import { useStore } from "../../GlobalStore";

const GraphComponent = () => {
    const { darkMode } = useStore.getState()
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        const nodes = [];
        const edges = [];

        scanmeData.forEach((host, index) => {
            nodes.push({
                id: `host-${index}`,
                label: host.address,
                type: 'host',
            });

            host.services.forEach((service, serviceIndex) => {
                nodes.push({
                    id: `service-${index}-${serviceIndex}`,
                    label: `Port: ${service.port}`,
                    type: 'service',
                    banner: service.banner,
                });

                edges.push({
                    source: `host-${index}`,
                    target: `service-${index}-${serviceIndex}`,
                    id: `edge-${index}-${serviceIndex}`,
                    label: `Port: ${service.port}`,
                });
            });
        });

        setNodes(nodes);
        setEdges(edges);
    }, []);

    return (
        <div key={"graph_canvas"} style={{
            border: 'solid 1px red',
            borderRadius: 5,
            height: "80vh",
            width: "91vw",
            margin: 5,
            position: 'relative'
        }}
        >

            <GraphCanvas
                nodes={nodes}
                edges={edges}
                draggable={true}
                animated={true}
                theme={darkMode ? darkTheme : lightTheme}
            />
        </div>
    );
};

export default GraphComponent;