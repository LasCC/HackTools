import React from 'react';
import { Typography, Divider } from 'antd';
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
				HackTools, is a web extension facilitating your web application penetration tests, it includes cheat
				sheets as well as all the tools used during a test such as XSS payloads, Reverse shells and much more.
				With the extension you no longer need to search for payloads in different websites or in your local
				storage space, most of the tools are accessible in one click. HackTools is accessible either in pop up
				mode or in a whole tab in the Devtools part of the browser with F12.
			</Paragraph>
			<Paragraph>
				Note that this project is maintained, developed and made available for free, you can offer us a coffee,
				it will be very encouraging and greatly appreciated
			</Paragraph>
			<Paragraph>HackTools is created by Ludovic COULON and Riadh BOUCHAHOUA</Paragraph>
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
			<Paragraph> GoProSlowYo for the zsh reverse shell </Paragraph>
		</div>
	</QueueAnim>
);
