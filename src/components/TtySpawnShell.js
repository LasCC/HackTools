import React, { useState } from "react";
import { Button, message, Typography, Row, Col, Divider } from "antd";
import { CopyOutlined, WifiOutlined, LinkOutlined } from "@ant-design/icons";
import MaskedInput from "antd-mask-input";
import QueueAnim from "rc-queue-anim";
import Clipboard from "react-clipboard.js";

const { Title, Paragraph } = Typography;

export default (props) => {
  const [values, setValues] = useState({
    ip: "",
    port: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const successInfoReverseShell = () => {
    message.success("Your reverse shell has been copied");
  };
  const successInfoEncodeURL = () => {
    message.success("Reverse shell URI encoded has been copied");
  };

  return (
    <QueueAnim delay={300} duration={1500}>
      <Title
        variant='Title level={3}'
        style={{ fontWeight: "bold", margin: 15 }}
      >
        TTY Spawn Shell
      </Title>
      <Paragraph style={{ margin: 15 }}>
        Often during pen tests you may obtain a shell without having tty, yet
        wish to interact further with the system. Here are some commands which
        will allow you to spawn a tty shell. Obviously some of this will depend
        on the system environment and installed packages.
      </Paragraph>
      <div style={{ padding: 15 }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <MaskedInput
              prefix={<WifiOutlined />}
              mask='111.111.111.111'
              name='Ip adress'
              placeholderChar=' '
              placeholder='IP Address (ex: 212.212.111.222)'
              onChange={handleChange("ip")}
            />
          </Col>
          <Col span={12}>
            <MaskedInput
              placeholderChar=' '
              prefix={
                <svg
                  t='1592848067245'
                  class='iconfont'
                  viewBox='0 0 1024 1024'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  p-id='5009'
                  width='15'
                  height='15'
                >
                  <path
                    d='M170.666667 640H106.666667a21.333333 21.333333 0 0 1-21.333334-21.333333v-426.666667a21.333333 21.333333 0 0 1 21.333334-21.333333h768a21.333333 21.333333 0 0 1 21.333333 21.333333v426.666667a21.333333 21.333333 0 0 1-21.333333 21.333333H810.666667v64a21.333333 21.333333 0 0 1-21.333334 21.333333H725.333333v64a21.333333 21.333333 0 0 1-21.333333 21.333334h-426.666667a21.333333 21.333333 0 0 1-21.333333-21.333334V725.333333H192a21.333333 21.333333 0 0 1-21.333333-21.333333V640zM128 213.333333v384h64a21.333333 21.333333 0 0 1 21.333333 21.333334V682.666667h64a21.333333 21.333333 0 0 1 21.333334 21.333333V768h384v-64a21.333333 21.333333 0 0 1 21.333333-21.333333H768v-64a21.333333 21.333333 0 0 1 21.333333-21.333334H853.333333V213.333333H128z m469.333333 64a21.333333 21.333333 0 1 1 42.666667 0v85.333334a21.333333 21.333333 0 1 1-42.666667 0v-85.333334z m85.333334 0a21.333333 21.333333 0 1 1 42.666666 0v85.333334a21.333333 21.333333 0 1 1-42.666666 0v-85.333334z m-170.666667 0a21.333333 21.333333 0 1 1 42.666667 0v85.333334a21.333333 21.333333 0 1 1-42.666667 0v-85.333334z m-85.333333 0a21.333333 21.333333 0 1 1 42.666666 0v85.333334a21.333333 21.333333 0 1 1-42.666666 0v-85.333334z m-85.333334 0a21.333333 21.333333 0 0 1 42.666667 0v85.333334a21.333333 21.333333 0 0 1-42.666667 0v-85.333334z m-85.333333 0a21.333333 21.333333 0 0 1 42.666667 0v85.333334a21.333333 21.333333 0 0 1-42.666667 0v-85.333334z'
                    fill='#000000'
                    p-id='5010'
                  />
                </svg>
              }
              mask='1111'
              name='Port'
              placeholder='Port (ex: 1337)'
              onChange={handleChange("port")}
            />
          </Col>
        </Row>
      </div>
      <Divider dashed />
      <Paragraph>s</Paragraph>
    </QueueAnim>
  );
};
