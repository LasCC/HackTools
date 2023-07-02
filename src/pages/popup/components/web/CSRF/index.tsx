import React from 'react';
import { Row, Col } from 'antd';
import RequestInput from './RequestInput';
import POCOutput from './POCOutput';
import SaveButton from './SaveButton';

const CSRF: React.FC = () => (
  <Row gutter={[24, 24]}>
    <Col span={24}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <RequestInput />
        </Col>
        <Col span={24}>
          <POCOutput />
        </Col>
      </Row>
    </Col>
  </Row>
);

export default CSRF;
