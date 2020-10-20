import React from 'react';
import { Typography, Divider, Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph } = Typography;

export default (props) => (
	<QueueAnim delay={300} duration={1500}>
		<Title
			variant='Title level={3}'
			style={{
				fontWeight: 'bold',
				margin: 15
			}}
		>
			About us
		</Title>
		<Paragraph
			style={{
				margin: 15
			}}
		>
			Our story of two students creating this app
		</Paragraph>
		<Divider dashed />
		<div
			key='a'
			style={{
				padding: 15,
				marginTop: 15
			}}
		>
			<Paragraph>
				e are two students who are very passionate about computer security, e idea came to us during our CTF
				training, we noticed that we often the same tools(Spawining a shell, reverse shell in php, base64 ding
				etc...), that 's when we came up with the idea of grouping of the tools and payloads in one place, a
				simple web application c do the job but it was quite frustrating to go back and forth, th why we thought
				to implement an extension directly in the browser.
			</Paragraph>
			<Paragraph>
				acktools is available at hand in the web browser, you have access to e extension as a pop up, and a
				standard display in the Chrome Devtool part with "F12" in the Hacktool tab.
			</Paragraph>
			<Paragraph>
				ote that this project is maintained, developed and made available for ee, you can offer us a coffee, it
				will be very encouraging and greatly appreciated: )
			</Paragraph>
			<Paragraph>HackTools is created by Ludovic COULON and Riadh BOUCHAHOUA </Paragraph>
			<a href='https://www.paypal.com/paypalme/hacktoolsEXT' target='_blank' rel='noreferrer noopener'>
				<img
					src='https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png'
					alt='Paypal'
					style={{
						height: 41,
						width: 174
					}}
				/>
			</a>
		</div>
		<Divider dashed />
		<div
			key='b'
			style={{
				padding: 15,
				marginTop: 15
			}}
		>
			<Title variant='Title level={3}'> Credits </Title> <Paragraph> PentestMonkey </Paragraph>
			<Paragraph> GTFOBins </Paragraph> <Paragraph> Antd </Paragraph> <Paragraph> Iconfont CN </Paragraph>
			<Paragraph> John Hammond </Paragraph> <Paragraph> The Noun Project </Paragraph>
			<Paragraph> PayloadsAllTheThings </Paragraph>
			<Paragraph> Fabien LOISON(flozz) for the p0wny @shell </Paragraph>
		</div>
	</QueueAnim>
);
