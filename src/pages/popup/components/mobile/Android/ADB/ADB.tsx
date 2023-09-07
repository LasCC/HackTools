import React from 'react'
import useADBStore from './store/ADBStore'
import { Col, Divider, Input, Row, Select, Switch } from 'antd';
import { ADB_MODE } from './store/ADBStore';
import { WifiOutlined } from '@ant-design/icons';
import { FaUsb } from 'react-icons/fa';
import { FaDoorOpen } from 'react-icons/fa';
import { TbBrandAndroid } from 'react-icons/tb';

const ADB = () => {
  const { mode,
    handleModeChange,
    adb_ip,
    handleIPChange,
    adb_port,
    handlePortChange } = useADBStore()

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={8}>
          <Select
            defaultValue={'USB'}
            style={{ width: "100%" }}
            onChange={handleModeChange}
            options={[
              { value: 'USB', label: <><FaUsb />{" USB"}</> },
              { value: 'Remote', label: <><WifiOutlined />{" Remote"}</> },
            ]}
          />
        </Col>

        <>
          <Col span={8}>
            <Input
              maxLength={30}
              prefix={<TbBrandAndroid />}
              name='Ip address'
              placeholder={mode === ADB_MODE.LOCAL ? 'ADB device name | (adb devices)' : 'ADB IP address (ex: IP:PORT)'}
              onChange={handleIPChange}
              value={adb_ip}
            />
          </Col>
          {mode === ADB_MODE.REMOTE &&
            <Col span={8}>
              <Input
                maxLength={5}
                prefix={<FaDoorOpen />}
                name='ADB port'
                placeholder='ADB tcp port (ex: 5555)'
                onChange={handlePortChange}
                value={adb_port}
              />
            </Col>
          }

        </>
      </Row>
          <Divider />
    </>
  )
}

export default ADB