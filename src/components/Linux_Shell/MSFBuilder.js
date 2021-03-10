import React, { useState } from 'react';
import { Button, Input, Typography, message, Divider } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN({
	scriptUrl: [ './iconfont.js' ]
});

const MSFBuilder = () => {
	// Antd stuff
	const { TextArea } = Input;

	const [ values, setValues ] = useState({
		showPassword: false,
		submitted: false,
		email: '',
		password: ''
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	return (
		<QueueAnim delay={300} duration={1500}>
			<div style={{ margin: 15 }}>
				<Title variant='Title level={3}' style={{ fontWeight: 'bold' }}>
					MSF Venom Builder
				</Title>
				<Paragraph>
					Msfvenom is a command line instance of Metasploit that is used to generate and output all of the
					various types of shell code that are available in Metasploit.
				</Paragraph>
			</div>
			<Divider dashed />
			<div
				key='a'
				style={{
					marginTop: 15,
					marginLeft: 15
				}}
			>
				<p>lmao</p>
			</div>
			<div
				key='b'
				style={{
					marginTop: 15,
					marginLeft: 15
				}}
			>
				<pre>lamo3</pre>
			</div>
		</QueueAnim>
	);
};

export default MSFBuilder;
