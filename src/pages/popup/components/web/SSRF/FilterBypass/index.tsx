import React, { useState, useEffect} from 'react';
import { Input, Alert, Row, Col , Typography, message} from 'antd';
import Title from 'antd/es/typography/Title';
import {useStore}  from "../store"
import Paragraph from 'antd/es/typography/Paragraph';



const  index =  ()  => {
    const { obfuscatedIPv4, setIPv4forObfuscation , ipv4forObfuscation } = useStore()
    
    // const {obfuscatedIPv4} = useStore((state) => state.obfuscatedIPv4)



    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(obfuscatedIPv4.join("\n"));
        message.success('All Ips addresses copied to clipboard!');
      } catch (err) {
        message.error('Failed to copy text');
      }
    };


  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Title level={2}>SSRF Ip filter bypass</Title>
        <Typography.Text type="secondary">This tool help generate mutation  based on a provided IPv4 address you provide to obfuscated or even bypass certain filters.</Typography.Text>
      </Col>
      <Col xs={24}>
      <Input
        value={ipv4forObfuscation}
        onChange={(e) => setIPv4forObfuscation(e.target.value)}
        placeholder="127.0.0.1"
      />
      </Col>
      <Col xs={24}>
      <Paragraph copyable={{ onCopy: handleCopy }}>
      <pre>
        {obfuscatedIPv4.join("\n")}
      </pre>
      </Paragraph>
      </Col>
    </Row>
  )
}


export default index