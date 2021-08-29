import React from 'react';
import { Typography, Card, Col, Row, Avatar, Tooltip, Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { goTo } from 'react-chrome-extension-router';
import { LinkOutlined, EyeOutlined, GithubOutlined } from '@ant-design/icons';
import ExploitDB from './ExploitDB';
import Cisco from './Cisco';
import cve from './CVESearch';
import cxsecurity_choose from './CxsecurityChoose';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

export default function FeedRSS() {
	return (
		<QueueAnim delay={300} duration={1500}>
			<Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
				Exploit Feed RSS
			</Title>
			<Paragraph style={{ margin: 15 }}>
				Feed about &gt; Exploits, Shellcode, 0days, Remote Exploits, Local Exploits, Web Apps, Vulnerability
				Reports, Security Articles, Tutorials and more.
			</Paragraph>
			<Row gutter={[ 32, 24 ]} style={{ padding: 15 }}>
				<Col span={12}>
					<Card
						onClick={() => goTo(ExploitDB)}
						style={{
							cursor: 'pointer',
							boxShadow:
								'0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)'
						}}
						cover={<img alt='exploit-db_website_homepage' src='https://i.imgur.com/ST3cgmI.png' />}
						actions={[
							<Tooltip title='Watch the feed'>
								<EyeOutlined key='goto_page' onClick={() => goTo(ExploitDB)} />
							</Tooltip>,
							<Tooltip title='Website link'>
								<a href='https://exploit-db.com' rel='noreferrer noopener' target='_blank'>
									<LinkOutlined key='website_link' />
								</a>
							</Tooltip>
						]}
					>
						<Meta
							avatar={<Avatar src='https://www.exploit-db.com/images/spider-orange.png' />}
							title='ExploitDB'
							description='Exploit Database Vulnerabilities'
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card
						onClick={() => goTo(Cisco)}
						style={{
							cursor: 'pointer',
							boxShadow:
								'0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)'
						}}
						cover={<img alt='cisco_image_logo' src='https://i.imgur.com/8EWAc2t.png' />}
						actions={[
							<Tooltip title='Watch the feed'>
								<EyeOutlined key='goto_page' onClick={() => goTo(Cisco)} />
							</Tooltip>,
							<Tooltip title='Website link'>
								<a
									href='https://tools.cisco.com/security/center/publicationListing.x'
									rel='noreferrer noopener'
									target='_blank'
								>
									<LinkOutlined key='website_link' />
								</a>
							</Tooltip>
						]}
					>
						<Meta
							avatar={
								<Avatar src='https://cdn.1min30.com/wp-content/uploads/2018/07/Symbole-Cisco.jpg' />
							}
							title='Cisco'
							description='Cisco Security Advisories'
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card
						onClick={() => goTo(cve)}
						style={{
							cursor: 'pointer',
							boxShadow:
								'0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)'
						}}
						cover={<img alt='cve_image_logo' src='https://i.imgur.com/AtKXVuk.png' />}
						actions={[
							<Tooltip title='Watch the feed'>
								<EyeOutlined key='goto_page' onClick={() => goTo(cve)} />
							</Tooltip>,
							<Tooltip title='Website link'>
								<a href='https://www.cve-search.org/' rel='noreferrer noopener' target='_blank'>
									<LinkOutlined key='website_link' />
								</a>
							</Tooltip>
						]}
					>
						<Meta
							avatar={
								<Avatar src='https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0012/5120/brand.gif?itok=mqo4KWCS' />
							}
							title='CVE'
							description='CVE Search engine'
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card
						onClick={() => goTo(cxsecurity_choose)}
						style={{
							cursor: 'pointer',
							boxShadow:
								'0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)'
						}}
						cover={<img alt='cve_image_logo' src='https://i.imgur.com/agGXTkQ.jpg' />}
						actions={[
							<Tooltip title='Watch the feed'>
								<EyeOutlined key='goto_page' onClick={() => goTo(cxsecurity_choose)} />
							</Tooltip>,
							<Tooltip title='Website link'>
								<a href='https://cxsecurity.com//' rel='noreferrer noopener' target='_blank'>
									<LinkOutlined key='website_link' />
								</a>
							</Tooltip>
						]}
					>
						<Meta
							avatar={
								<Avatar src='https://pbs.twimg.com/profile_images/3596734713/c2cd4061a323024ff00ccf0c83c61d1d.jpeg' />
							}
							title='CX'
							description='CXSECURITY'
						/>
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
