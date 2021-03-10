import React, { useState } from 'react';
import { Button, Input, Typography, message, Divider, Select } from 'antd';
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
	const { Option } = Select;

	const options = [
		{
			value: 'Burns Bay Road'
		},
		{
			value: 'Downing Street'
		},
		{
			value: 'Wall Street'
		}
	];

	const [ values, setValues ] = useState({
		Payload: '',
		LHOST: '',
		LPORT: '',
		Encoder: '',
		EncoderIterations: '',
		Platform: '',
		Arch: '',
		NOP: '',
		BadCharacters: '',
		Additional: '',
		Format: '',
		Outfile: ''
	});

	const handleChange = (prop) => (data) => {
		setValues({ ...values, [prop]: data });
	};

	console.log(values.Payload);

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
				<Select
					style={{ width: 200 }}
					showSearch
					options={options}
					value={values.Payload}
					onChange={handleChange('Payload')}
					placeholder='try to type `b`'
					filterOption={(inputValue, option) =>
						option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
				>
					{options.map((k, i) => {
						return <Option key={i}>{k.value}</Option>;
					})}
				</Select>
				<pre style={{ color: 'white' }}>{JSON.stringify(values, undefined, 2)}</pre>
			</div>
		</QueueAnim>
	);
};

export default MSFBuilder;
