import React from "react";
import { Typography, Divider } from "antd";
import QueueAnim from "rc-queue-anim";

const { Title, Paragraph } = Typography;

export default (props) => {
  return (
    <QueueAnim delay={300} duration={1500}>
      <Title
        variant='Title level={3}'
        style={{ fontWeight: "bold", margin: 15 }}
      >
        About us
      </Title>
      <Paragraph style={{ margin: 15 }}>Story telling :zzz:</Paragraph>
      <Divider dashed />
      <div
        key='a'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Paragraph>
          We are two students who are very passionate about computer security,
          The idea came to us during our CTF training, we noticed that we often
          use the same tools (Spawining a shell, reverse shell in php, base64
          encoding etc ...), that's when we came up with the idea of grouping
          most of the tools and payloads in one place, a simple web application
          could do the job but it was quite frustrating to go back and forth,
          that's why we thought to implement an extension directly in the
          browser.
        </Paragraph>
        <Paragraph>
          Hacktools is available at hand in the web browser, you have access to
          the extension as a pop up, and a standard display in the Chrome
          Devtool part with "F12" in the Hacktool tab.
        </Paragraph>
        <Paragraph>
          Note that this project is maintained, developed and made available for
          free, you can offer us a coffee, it will be very encouraging and
          greatly appreciated :)
        </Paragraph>
        <Paragraph>
          HackTools is created by Ludovic COULON and Riadh BOUCHAHOUA
        </Paragraph>
        <a
          href='https://www.buymeacoffee.com/hacktools'
          target='_blank'
          rel='noreferrer noopener'
        >
          <img
            src='https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png'
            alt='Buy Me A Coffee'
            style={{
              height: 41,
              width: 174,
            }}
          />
        </a>
      </div>
      <Divider dashed />
      <div
        key='a'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title variant='Title level={3}'>Credits</Title>
        <Paragraph>PentestMonkey</Paragraph>
        <Paragraph>GTFOBins</Paragraph>
        <Paragraph>Antd</Paragraph>
        <Paragraph>Iconfont CN</Paragraph>
        <Paragraph>John Hammond</Paragraph>
      </div>
    </QueueAnim>
  );
};
