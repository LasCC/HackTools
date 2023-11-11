import React, { useEffect, useState, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { Col, Drawer, Empty, Input, List, Row, Tag, Typography, message } from 'antd';
import useNmapStore from './store';
import { useStore } from '../../GlobalStore'
import WindowSecretDumper from '../../system/windows/SecretsDumper';


const  {Text} = Typography

const ForceGraph = () => {
    const { data, queryData, searchQuery, setSearchQuery, queryResult } = useNmapStore();
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const { darkMode } = useStore()
    const [open, setOpen] = useState(false);
    const [currentNode, setCurrentNode] = useState(null);
    const fgRef = useRef(null);


    useEffect(() => {
        const displayData = queryResult.length > 0 ? queryResult : data;
        if (displayData.length === 0) {
            message.error("No results found...");
            return;
        }

        const nodes = [];
        const links = [];
        const hostIds = new Set();

        displayData.forEach((service, index) => {
            nodes.push({
                id: service.id,
                label: service.type === "host" ? service.address : `${service.service}:${service.port}`,

                type: "service",
                ...service,
                size: service.state === 'open' ? 8 : 5,
            });

            if (!hostIds.has(service.address)) {
                nodes.push({
                    id: service.address,
                    label: service.address,
                    type: "host",
                    size: 20,
                });
                hostIds.add(service.address);
            }

            if (service.address && service.id) {
                links.push({
                    source: service.address,
                    target: service.id,
                    id: `edge-${index}`,
                    label: `Port: ${service.port}`,
                });
            }
        });

        setGraphData({ nodes, links });
        fgRef.current.zoomToFit(500);

    }, [queryResult, data, darkMode]);

    const onNodeClick = (node) => {
        setCurrentNode(node);
        setOpen(true);
    };

    const displayNodeInfoOnDrawer = () => {
        if (!currentNode) return null;
        console.log(currentNode)
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
                ...(Array.isArray(scripts_results) ? scripts_results.map((script, index) => ({
                    label: `Script ${index + 1} (${script.id})`,
                    value: script.output
                })) : []),
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
            const hostServices = data.filter(service => service.address === id);
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
             <Row gutter={[8, 8]}>
            <Col span={24} style={{ border: 'solid 1px red', borderRadius: 5, margin: 5 }}>
                <ForceGraph2D
                   ref={fgRef}
                    height={window.innerHeight * 0.8}
                    width={window.innerWidth * 0.92}
                    graphData={graphData}
                    nodeAutoColorBy="id"
                    linkAutoColorBy="type"
                    linkDirectionalParticles={1}
                    nodeVal="size"
                    onNodeClick={onNodeClick}
                    d3VelocityDecay={0.2} // Adjust this value to control the nodes' speed
                    d3AlphaDecay={0.0228} 
                    nodeLabel="label"
                    nodeCanvasObject={(node, ctx, globalScale) => {
                        const label = node.label;
                        let fontSize = 12/globalScale;
                        if (node.type === "host") {
                            fontSize *= 1.2; // Make the font size 20% bigger for host nodes
                        }
                        ctx.font = `${node.type === "host" ? 'bold ' : ''}${fontSize}px Sans-Serif`; // Make the text bold for host nodes
                        const textWidth = ctx.measureText(label).width;
                        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
                    
                        const nodeColor = node.type === "host" ? '#1890ff' : node.state === 'open' ? 'green' : node.state === 'closed' ? 'red' : 'grey';
                        ctx.fillStyle = nodeColor;
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI, false);
                        ctx.fill();
                        
                        // @LasCC if you want to better the node styling, it's here

                        // Draw a circle around the selected node
                        if (currentNode && currentNode.id === node.id) {
                            ctx.strokeStyle = 'yellow';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(node.x, node.y, node.size + 5, 0, 2 * Math.PI, false);
                            ctx.stroke();
                        }
                    
                        // Only display the label if the zoom level is high enough
                        if (globalScale > 2) {
                            const textColor = darkMode ? 'white' : 'black';
                            ctx.fillStyle = textColor;
                            ctx.fillText(label, node.x, node.y);
                        }
                    }}
                        />
            </Col>
            <Col span={24}>
                <Input.Search
                    placeholder="Enter SQL query"
                    enterButton="Submit"
                    size="large"
                    value={searchQuery}
                    onChange={(evt) => setSearchQuery(evt.target.value)}
                    onSearch={queryData}
                />
            </Col>
            <Drawer
                title={currentNode ? currentNode.id : "N/A"}
                placement="right"
                closable={true}
                onClose={() => setOpen(false)}
                open={open}
            >
                {currentNode && <pre>{displayNodeInfoOnDrawer()}</pre> }
            </Drawer>
        </Row>
        </>


    );
};

export default ForceGraph;