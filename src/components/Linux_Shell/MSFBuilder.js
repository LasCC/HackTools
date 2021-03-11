import React from 'react';
import { Input, Typography, Row, Divider, Select, Form, Col } from 'antd';
import PersistedState from 'use-persisted-state';
import Clipboard from 'react-clipboard.js';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph } = Typography;

const MSFBuilder = () => {
	// LocalStorage stuff
	const msfVenomBuilder = PersistedState('msfVenomBuilder');

	// Antd stuff
	const { Option } = Select;

	let payloads = require('../../assets/data/Payloads.json');
	let encoder = require('../../assets/data/Encoder.json');

	const [ values, setValues ] = msfVenomBuilder({
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

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleChangeSelect = (prop) => (data) => {
		setValues({ ...values, [prop]: data });
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
				<Form>
					<Form.Item name='payload' label='Payload' rules={[ { message: 'Missing area' } ]}>
						<Select
							showSearch
							options={payloads}
							value={values.Payload}
							onChange={handleChangeSelect('Payload')}
							placeholder='python/meterpreter/reverse_http'
							filterOption={(inputValue, option) =>
								option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
						>
							{payloads.map((data, key) => {
								return <Option key={key}>{data.value}</Option>;
							})}
						</Select>
					</Form.Item>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col span={12}>
							<Form.Item name='ip_address' label='LHOST' rules={[ { message: 'Missing area' } ]}>
								<Input
									value={values.LHOST}
									onChange={handleChange('LHOST')}
									maxLength={15}
									placeholder='IP Address or domain (ex: 212.212.111.222)'
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='port' label='LPORT' rules={[ { message: 'Missing area' } ]}>
								<Input
									value={values.LPORT}
									onChange={handleChange('LPORT')}
									maxLength={5}
									placeholder='Port (ex: 1337)'
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col span={12}>
							<Form.Item name='encoder' label='Encoder' rules={[ { message: 'Missing area' } ]}>
								<Select
									showSearch
									options={encoder}
									value={values.Encoder}
									onChange={handleChangeSelect('Encoder')}
									placeholder='x86/shikata_ga_nai'
									filterOption={(inputValue, option) =>
										option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
								>
									{encoder.map((data, key) => {
										return <Option key={key}>{data.value}</Option>;
									})}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name='iteration' label='Iterations' rules={[ { message: 'Missing area' } ]}>
								<Input
									value={values.EncoderIterations}
									onChange={handleChange('EncoderIterations')}
									placeholder='4'
								/>
							</Form.Item>
						</Col>
					</Row>
					<Form.Item name='badchar' label='Bad Characters' rules={[ { message: 'Missing area' } ]}>
						<Input
							value={values.BadCharacters}
							onChange={handleChange('BadCharacters')}
							maxLength={2}
							placeholder='\x00\x0a\x0d'
						/>
					</Form.Item>
				</Form>
				<Paragraph>
					<pre>{JSON.stringify(values, undefined, 2)}</pre>
				</Paragraph>
			</div>
		</QueueAnim>
	);
};

export default MSFBuilder;
