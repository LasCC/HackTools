import React from 'react';
import { Typography, Card, Col, Row, Button } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { goTo } from 'react-chrome-extension-router';
import { GithubOutlined } from '@ant-design/icons';
import FeedRSS from './FeedRSS';
import ExploitCX from './ExploitCX';
import BugsCX from './BugsCX';
import DorksCX from './DorksCX';

const { Paragraph } = Typography;
const { Meta } = Card;

export default function CxsecurityChoose () {
    return (
        <div>
            <PageHeader
                onBack={() => goTo( FeedRSS )}
                title='CX Security Independent RSS'
                extra={[
                    <Button href='https://cxsecurity.com' key='1' type='primary'>
                        Visit orignal website
                    </Button>
                ]}
            />
            <Row gutter={[ 32, 24 ]} style={{ padding: 15 }}>
                <Col span={12}>
                    <Card
                        onClick={() => goTo( BugsCX )}
                        style={{
                            cursor: 'pointer',
                            boxShadow:
                                '0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)'
                        }}
                        cover={
                            <img
                                alt='bugs_security_illustration'
                                src='../../assets/img/security-bugs.jpg'
                            />
                        }
                    >
                        <Meta title='Bugs' description='Vulnerabilities Database' />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        onClick={() => goTo( ExploitCX )}
                        style={{
                            cursor: 'pointer',
                            boxShadow:
                                '0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)'
                        }}
                        cover={
                            <img
                                alt='exploit_illustration'
                                src='../../assets/img/Capture.png'
                            />
                        }
                    >
                        <Meta title='Exploit' description='The Exploit Database' />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        onClick={() => goTo( DorksCX )}
                        style={{
                            cursor: 'pointer',
                            boxShadow:
                                '0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)'
                        }}
                        cover={
                            <img
                                alt='cve_image_logo'
                                src='../../assets/img/Computer-security-Exploit-000055689534_Medium.jpg'
                            />
                        }
                    >
                        <Meta title='Dorks' description='Dorks Database WLB2' />
                    </Card>
                </Col>
            </Row>
            <div style={{ textAlign: 'center' }}>
                <Paragraph>You have a suggestion about the feed ?</Paragraph>
                <Button href='https://github.com/LasCC/Hack-Tools/issues/new'
                    target='blank' icon={<GithubOutlined />} type='link'>
                    Give us your feedback
                </Button>
            </div>
        </div>
    );
}
