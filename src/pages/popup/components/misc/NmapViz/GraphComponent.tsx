
import React, { useEffect, useState, useRef } from 'react';
import { GraphCanvas, lightTheme, darkTheme, GraphCanvasRef, useSelection } from 'reagraph';
import scanmeData from './scanme.json';
import { useStore } from "../../GlobalStore";
import { Button, Drawer, Descriptions, Row, Col } from 'antd';
import { List, Typography } from 'antd';
const { Text } = Typography;
import { Badge, Tag, Input } from 'antd'
import useNmapStore from './store';

const { Paragraph } = Typography;

// TODO: antD drawer pop, onNodeClick for adding oberservations and getting all info of the node 
// make it zoom in the clicked node
// TODO: mark open/filtered/closed ports by color
// TODO: mark service->host penteststate (to_check, vulnerable,exploited) by icon
// TODO: autoload methodology for each service




const GraphComponent = () => {
    const { darkMode } = useStore.getState()
    const { data, queryData, searchQuery , setSearchQuery } = useNmapStore();
    const [open, setOpen] = useState(false);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [hostServices, setHostServices] = useState([]);
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
        const hostIds = new Set();
    
        data.forEach((service, index) => {
            // Create a node for the service
            nodes.push({
                id: service.id,
                label: `${service.service}:${service.port}`,
                type: 'service', // Set the type property here
                ...service,
                size: 20
            });
    
            // Create a node for the host if it doesn't exist yet
            if (!hostIds.has(service.address)) {
                nodes.push({
                    id: service.address,
                    label: service.address,
                    type: 'host', // And here
                    size: 30
                });
                hostIds.add(service.address);
            }
    
            // Create an edge from the host to the service
            if (service.address && service.id) {
                edges.push({
                    source: service.address,
                    target: service.id,
                    id: `edge-${index}`,
                    label: `Port: ${service.port}`,
                });
            }
        });
    
        setNodes(nodes);
        setEdges(edges);
    }, [data]);


    const displayNodeInfoOnDrawer = () => {
        if (!currentNode) return null;

        const { type, id } = currentNode;

        if (type === 'service') {
            const { address, hostnames, uptime, distance, port, state, protocol, service, banner, scripts_results, metadata } = currentNode;
            const data = [
                { label: "Address", value: address },
                { label: "Hostnames", value: hostnames.join(', ') },
                { label: "Uptime", value: uptime },
                { label: "Distance", value: distance },
                { label: "Port", value: port },
                { label: "State", value: <Tag color={state === 'open' ? 'green' : state === 'closed' ? 'red' : 'grey'}>{state}</Tag> },
                { label: "Protocol", value: protocol },
                { label: "Service", value: service },
                { label: "Banner", value: banner },
                // Add script results
                ...scripts_results.map((script, index) => ({
                    label: `Script ${index + 1} (${script.id})`,
                    value: script.output
                })),
                // Add more fields as needed...
            ];

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
        } else if (type === 'host') {
            const hostServices = scanmeData.filter(service => service.address === id);
            const openServices = hostServices.filter(service => service.state === 'open');
            const closedServices = hostServices.filter(service => service.state === 'closed');
            const filteredServices = hostServices.filter(service => service.state === 'filtered');

            return (
                <>
                    {openServices.length > 0 ? (
                        <>
                            <Typography.Title level={4}>Open Services</Typography.Title>
                            <List
                                itemLayout="horizontal"
                                dataSource={openServices}
                                renderItem={service => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<Text strong>{`${service.service}:${service.port}/tcp`}</Text>}
                                            description={<Tag color='green'>{service.state}</Tag>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </>
                    ) : null}

                    {closedServices.length > 0 ? (
                        <>
                            <Typography.Title level={4}>Closed Services</Typography.Title>
                            <List
                                itemLayout="horizontal"
                                dataSource={closedServices}
                                renderItem={service => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<Text strong>{`${service.service}:${service.port}/tcp`}</Text>}
                                            description={<Tag color='red'>{service.state}</Tag>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </>
                    ) : null}



                    {filteredServices.length > 0 ? (
                        <>
                            <Typography.Title level={4}>Filtered Services</Typography.Title>
                            <List
                                itemLayout="horizontal"
                                dataSource={filteredServices}
                                renderItem={service => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<Text strong>{`${service.service}:${service.port}/tcp`}</Text>}
                                            description={<Tag color='grey'>{service.state}</Tag>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </>
                    ) : null}


                </>
            );
        }

        return null;

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

                <Col span={24}>
                    <Input.Search
                        placeholder="Enter SQL query"
                        enterButton="Submit"
                        size="large"
                        value={searchQuery}
                    onChange={evt => setSearchQuery(evt.target.value)}
                        onSearch={queryData}
                    />
                </Col>
            </Row>


            <Drawer
                title={currentNode ? (currentNode.type === 'host' ? currentNode.address : `${currentNode.service}:${currentNode.port}`) : 'N/A'}
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