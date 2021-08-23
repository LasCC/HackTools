import React from 'react';
import { Typography, Card, Col, Row, Button, PageHeader } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { goTo } from 'react-chrome-extension-router';
import { GithubOutlined } from '@ant-design/icons';
import FeedRSS from './FeedRSS';
import ExploitCX from './ExploitCX';
import BugsCX from './BugsCX';
import DorksCX from './DorksCX';

const { Paragraph } = Typography;
const { Meta } = Card;

export default function CxsecurityChoose() {
	return (
		<QueueAnim delay={300} duration={1500}>
			<PageHeader
				onBack={() => goTo(FeedRSS)}
				title='CX Security Independent RSS'
				extra={[
					<Button key='1' type='primary'>
						<a href='https://cxsecurity.com/' rel='noreferrer noopener' target='_blank'>
							Visit orignal website
						</a>
					</Button>
				]}
			/>
			<Row gutter={[ 32, 24 ]} style={{ padding: 15 }}>
				<Col span={12}>
					<Card
						onClick={() => goTo(BugsCX)}
						style={{
							cursor: 'pointer',
							boxShadow:
								'0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)'
						}}
						cover={
							<img
								alt='bugs_security_illustration'
								src='https://www.ecomsecurity.org/wp-content/uploads/2016/04/security-bug.jpg'
							/>
						}
					>
						<Meta title='Bugs' description='Vulnerabilities Database' />
					</Card>
				</Col>
				<Col span={12}>
					<Card
						onClick={() => goTo(ExploitCX)}
						style={{
							cursor: 'pointer',
							boxShadow:
								'0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)'
						}}
						cover={
							<img
								alt='exploit_illustration'
								src='https://globalfreedomofexpression.columbia.edu/wp-content/uploads/2014/10/Computer-security-Exploit-000055689534_Medium.jpg'
							/>
						}
					>
						<Meta title='Exploit' description='The Exploit Database' />
					</Card>
				</Col>
				<Col span={12}>
					<Card
						onClick={() => goTo(DorksCX)}
						style={{
							cursor: 'pointer',
							boxShadow:
								'0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)'
						}}
						cover={
							<img
								alt='cve_image_logo'
								src='https://www.riskinsight-wavestone.com/wp-content/uploads/2020/01/Capture.png'
							/>
						}
					>
						<Meta title='Dorks' description='Dorks Database WLB2' />
					</Card>
				</Col>
			</Row>
			<div style={{ textAlign: 'center' }}>
				<Paragraph>You have a suggestion about the feed ?</Paragraph>
				<Button icon={<GithubOutlined />} type='link'>
					<a
						href='https://github.com/LasCC/Hack-Tools/issues/new'
						rel='noreferrer noopener'
						target='_blank'
						style={{ marginLeft: 8 }}
					>
						Give us your feedback
					</a>
				</Button>
			</div>
		</QueueAnim>
	);
}
