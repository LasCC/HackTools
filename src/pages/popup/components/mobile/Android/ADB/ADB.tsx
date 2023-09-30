import { WifiOutlined } from '@ant-design/icons';
import { Col, Divider, Input, Row, Select, Typography } from 'antd';
import { FaDoorOpen, FaUsb } from 'react-icons/fa';
import { TbBrandAndroid } from 'react-icons/tb';
import adbCommands from '../../../../assets/data/Mobile/ADB/ADB.json';
import useADBStore, { ADB_MODE } from './store/ADBStore';
const { Title, Paragraph, Text } = Typography;


const ADB = () => {
    const { mode,
        handleModeChange,
        adb_ip,
        handleIPChange,
        adb_port,
        handlePortChange } = useADBStore()

    const handleCommand = ( command ) => {
        if ( adb_ip && command.command.includes( "${device}" ) ) {
            if ( mode === ADB_MODE.REMOTE ) {
                return command.command.replace( /\${device}/g, String( "-s " + adb_ip + ":" + ( adb_port ? adb_port : "5555" ) ) );
            } else if ( mode === ADB_MODE.LOCAL ) {
                return command.command.replace( /\${device}/g, String( "-s " + adb_ip ) );
            }
        } else {
            return command.command.replace( /\${device}/g, "" );
        }
    }

    const ADB_OPTIONS = [
        { value: 'USB', label: <><FaUsb />{" USB"}</> },
        { value: 'Remote', label: <><WifiOutlined />{" Remote"}</> },
    ];
    const defaultValue = mode === ADB_MODE.LOCAL ? ADB_OPTIONS[ 0 ].value : ADB_OPTIONS[ 1 ].value;
    return (
        <div style={{ padding: 15 }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={8}>
                    <Select
                        defaultValue={defaultValue}
                        style={{ width: "100%" }}
                        onChange={handleModeChange}
                        options={ADB_OPTIONS}
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

            {adbCommands.map( ( command, index ) => (
                <div key={index}>
                    <Title level={4}>{command.name}</Title>
                    <Paragraph>{command.description}</Paragraph>
                    <Paragraph>
                        <pre><Text copyable>
                            {handleCommand( command )}
                        </Text></pre>
                    </Paragraph>
                </div >
            ) )
            }
        </div>
    )
}

export default ADB