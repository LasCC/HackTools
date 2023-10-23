import React, { useEffect, useState, useRef } from 'react';
import { GraphCanvas, lightTheme, darkTheme, GraphCanvasRef, useSelection } from 'reagraph';
import scanmeData from './scanme.json';
import { useStore } from "../../GlobalStore";
import { Button, Drawer, Descriptions, Row, Col } from 'antd';
import { List, Typography } from 'antd';
const { Text } = Typography;
import { Badge, Tag , Input} from 'antd'

const { Paragraph } = Typography;


// TODO: antD drawer pop, onNodeClick for adding oberservations and getting all info of the node 
// TODO: mark open/filtered/closed ports by color
// TODO: mark service->host penteststate (to_check, vulnerable,exploited) by icon
// TODO: autoload methodology for each service



interface Host {
    address: string;
    hostnames: string[];
    uptime: number;
    distance: number;
    services: Service[];
}

interface Service {
    port: number;
    state: string;
    parentId: string;
    parentHost: string;
    protocol: string;
    service: string;
    banner: string;
    scripts_results: ScriptResult[];
    metadata: Metadata;
}

interface ScriptResult {
    id: string;
    output: string;
    elements: any;
}

interface Metadata {
    state: string;
    observation: string;
}




const GraphComponent = () => {
    const { darkMode } = useStore.getState()
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [currentNode, setCurrentNode] = useState(null);


    const graphRef = useRef<GraphCanvasRef | null>(null);

    const {
        selections,
        onNodeClick: handleNodeClick,
        onCanvasClick
    } = useSelection({
        ref: graphRef,
        nodes: nodes,
        edges: edges,
        selections: [nodes.length > 0 ? nodes[0].id : ''],
        type: 'single'
    });

    const onNodeClick = (nodeId) => {

        setCurrentNode(nodeId);
        setOpen(true);
    };
    useEffect(() => {
        const nodes = [];
        const edges = [];

        scanmeData.forEach((host, index) => {
            nodes.push({
                id: `host-${index}`,
                label: host.address,
                type: 'host',
                ...host,
                size: 20
            });

            host.services.forEach((service, serviceIndex) => {
                nodes.push({
                    id: `service-${index}-${serviceIndex}`,
                    parentId: `host-${index}`,
                    parentHost: host.address,
                    label: `${service.port}/${service.protocol} (${service?.service})`,
                    type: 'service',
                    ...service,
                    size: 10
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

    const displayNodeInfoOnDrawer = () => {
        if (!currentNode) return null;

        console.log(currentNode);
        const { type } = currentNode;
        let data = [];

        if (type === 'host') {
            const { address, hostnames, uptime, distance, services } = currentNode as Host;
            data = [
                { label: "Address", value: address },
                { label: "Hostnames", value: hostnames.join(', ') },
                { label: "Uptime", value: uptime },
                { label: "Distance", value: distance },
                {
                    label: `Service (open) - ${services.filter(svc => svc.state === "open").length}`,


                    value: services.filter(svc => svc.state === "open").map((svc, index) =>
                        <Tag
                            key={index}
                            color="green"
                        >
                            {svc.service}
                        </Tag>
                    )
                },
                {
                    label: `Service (filtered) - ${services.filter(svc => svc.state === "filtered").length}`,
                    value: services.filter(svc => svc.state === "filtered").map((svc, index) =>
                        <Tag
                            key={index}
                            color="grey"
                            onClick={() => {
                                setCurrentNode({ data: svc, id: `service-${currentNode.data.id.split('-')[0]}-${index}` });
                                setOpen(true);
                            }}
                        >
                            {svc.service}
                        </Tag>
                    )
                },
                {
                    label: `Service (closed) - ${services.filter(svc => svc.state === "closed").length}`,
                    value: services.filter(svc => svc.state === "closed").map((svc, index) =>
                        <Tag
                            key={index}
                            color="red"
                            onClick={() => {
                                setCurrentNode({ data: svc, id: `service-${currentNode.data.id.split('-')[1]}-${index}` });
                                setOpen(true);
                            }}
                        >
                            {svc.service}
                        </Tag>
                    )
                },
            ];
        } else if (type === 'service') {
            const { port, state, protocol, service, banner, scripts_results } = currentNode;
            data = [
                { label: "Port", value: port },
                { label: "State", value: <Tag color={state === 'open' ? 'green' : state === 'filtered' ? 'grey' : 'lightred'}>{state}</Tag> },
                { label: "Protocol", value: protocol },
                { label: "Service", value: service },
                { label: "Banner", value: banner ? banner : 'N/A' },
                {
                    label: "Scripts Results", value: scripts_results && scripts_results.length > 0 ? scripts_results.map((script, index) => (
                        <div key={index}>
                            <Tag color="blue">{script.id}</Tag>
                            <Paragraph>{script.output || 'N/A'}</Paragraph>
                        </div>
                    )) : 'N/A'
                },
                { label: "Methodology", value: "N/A" }
            ];
        }

        return (
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<Text strong>{item.label}</Text>}
                            description={item.value}
                        />
                    </List.Item>
                )}
            />
        );
    };


    return (
        <>
            <Row
                key={"graph_canvas"}
                gutter={[16, 16]}
                >
                <Col
                    key={"graph_canvas"} style={{
                        border: 'solid 1px red',
                        borderRadius: 5,
                        height: "80vh",
                        width: "91vw",
                        margin: 5,
                        position: 'relative'
                    }}
                >
                    <GraphCanvas
                        ref={graphRef}
                        nodes={nodes}
                        edges={edges}
                        draggable={true}
                        animated={true}
                        theme={darkMode ? darkTheme : lightTheme}
                        selections={selections}
                        onNodeClick={onNodeClick}
                        onCanvasClick={onCanvasClick}
                    />
                </Col>
                
                <Col>
                    <Input.Search
                        placeholder="Type query"
                        enterButton="Search"
                        size="large"
                        onSearch={value => console.log(value)}
                    />
                </Col>
            </Row>


            <Drawer
                title={currentNode ? (currentNode.type === 'host' ? currentNode.address : `${currentNode.parentHost}:${currentNode.port}`) : 'N/A'}
                placement="right"
                closable={true}
                onClose={() => setOpen(false)}
                open={open}
            >
                {displayNodeInfoOnDrawer()}
            </Drawer>
        </>
    );
};

export default GraphComponent;