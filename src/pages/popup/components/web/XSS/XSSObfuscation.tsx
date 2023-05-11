import React, { useState } from 'react';
import { Typography, Divider, Tabs, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const { Title } = Typography;

const XSSObfuscation = () => {

    const [js, setJS] = useState('');
    const [obfuscated, setObfuscated] = useState('');

    const handleOnChange = (e) => {
        setJS(e.target.value);
        // base64 encode the js
        const obf = btoa(e.target.value);
        setObfuscated(`eval(atob('${obf}'))`)
    }

    return (
        <>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                JS Obfuscatation
            </Title>

            <TextArea rows={4} onChange={handleOnChange} value={js} style={{ cursor: 'auto', marginTop: 15, color: '#777' }} placeholder='Enter some JS to obfuscate...' />

            <Divider orientation='center'>Obfuscated</Divider>

            <TextArea rows={4} value={obfuscated} />


        </>)

}

export default XSSObfuscation;