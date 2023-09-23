import React from 'react';
import { Select, Col, Row } from 'antd';
import { useStore, GopherPayload } from '../store';

const { Option } = Select;

const DropdownSelect: React.FC = () => {
    const payload = useStore( ( state ) => state.payload );
    const setPayload = useStore( ( state ) => state.setPayload );

    const handlePayloadChange = ( value: GopherPayload ) => {
        setPayload( value );
    };

    return (
        <Row justify="center" >
            <Col xs={24} >
                <Select
                    placeholder="Select a payload"
                    value={payload}
                    showSearch
                    onChange={handlePayloadChange}
                    style={{ width: '100%' }}
                >
                    {Object.values( GopherPayload ).map( ( option ) => (
                        <Option key={option} value={option}>
                            {option}
                        </Option>
                    ) )}
                </Select>
            </Col>
        </Row>
    );
};

export default DropdownSelect;
