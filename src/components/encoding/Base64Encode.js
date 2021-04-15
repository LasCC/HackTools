import React, { useState } from 'react';
import { Button, Input, Typography, message, Divider } from 'antd';
import { CopyOutlined, createFromIconfontCN, ClearOutlined } from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN({
	scriptUrl: [ './iconfont.js' ]
});

const Base64Encode = () => {
	const [ input, setInput ] = useState('');
	const [ output, setOutput ] = useState('');
	const { TextArea } = Input;
	const successBase64Copy = () => {
		message.success('Your payload has been copied successfully !');
	};
	const handleChange = (name) => (event) => {
		setInput(event.target.value);
	};
	const handleClick = (type) => {
		if (type === 'encode') {
			setOutput(btoa(input));
		} else if (type === 'decode') {
			try {
				setOutput(atob(input));
			} catch (ex) {
				setOutput('Unable to decode properly : Incorrect base64 :-( ');
				message.error('Incorrect Base64 please try something else');
			}
		} else if (type === 'decode_url') {
			try {
				setOutput(decodeURI(input));
			} catch (ex) {
				setOutput('Unable to decode properly : Incorrect base64 :-( ');
				message.error('Incorrect Base64 please try something else');
			}
		}
		return;
	};
	return (
		<QueueAnim delay={300} duration={1500}>
			<div style={{ margin: 15 }}>
				<Title variant='Title level={3}' style={{ fontWeight: 'bold' }}>
					Base64 Encoder / Decoder
				</Title>
				<Paragraph>
					In computer science, Base64 is a group of binary-to-text encoding schemes that represent binary data
					in an ASCII string format by translating it into a radix-64 representation.
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
				<TextArea
					rows={4}
					value={input}
					onChange={handleChange('input')}
					placeholder='Some Base64 or ASCII Text to Encode / Decode...'
				/>
				<Button
					type='primary'
					style={{ marginBottom: 10, marginTop: 15 }}
					onClick={() => handleClick('encode')}
				>
					<IconFont type='icon-lock' />
					Encode
				</Button>
				<Button
					type='dashed'
					style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					onClick={() => handleClick('decode')}
				>
					<IconFont type='icon-lock-open' />
					Decode
				</Button>
				<Button
					type='text'
					style={{ marginBottom: 10, marginTop: 15, marginLeft: 8 }}
					onClick={() => handleClick('decode_url')}
				>
					<IconFont type='icon-lock-open' />
					Decode URL
				</Button>
			</div>
			<div
				key='b'
				style={{
					marginTop: 15,
					marginLeft: 15
				}}
			>
				<TextArea
					rows={4}
					value={output}
					style={{ cursor: 'auto', marginTop: 15, color: '#777' }}
					placeholder='The results will appear here'
				/>
				<Clipboard component='a' data-clipboard-text={output}>
					<Button type='primary' style={{ marginBottom: 10, marginTop: 15 }} onClick={successBase64Copy}>
						<CopyOutlined /> Copy
					</Button>
				</Clipboard>
				<Button
					type='link'
					danger
					style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					onClick={() => setOutput('')}
				>
					<ClearOutlined /> Clear
				</Button>
			</div>
		</QueueAnim>
	);
};

export default Base64Encode;
