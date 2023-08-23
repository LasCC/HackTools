import React from 'react'
import { Col, Divider, Input, Row, Select, Switch } from 'antd';
import { AiOutlineFile } from 'react-icons/ai';
import { useStore } from '../store'

const index = () => {

  const XXEfilename = useStore((state) => state.XXEfilename);
  const setXXEfilename = useStore((state) => state.setXXEfileName);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Input
            maxLength={30}
            prefix={<AiOutlineFile />}
            name='Ip address'
            placeholder="Ressource to fetch eg. file:///etc/hostname"
            onChange={setXXEfilename}
            value={XXEfilename}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <pre>
            OK
          </pre>
        </Col>
      </Row>
    </>
  )
}

export default index