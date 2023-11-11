import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Divider,
  Input,
  Tabs,
  Tooltip,
  Space,
  Select,
  Form,
  Popconfirm,
  Slider,
  Drawer,
  Upload,
  message,
  ColorPicker,
  Radio,
} from "antd";
import {
  FileTextOutlined,
  LinkOutlined,
  WifiOutlined,
  MailOutlined,
  PhoneOutlined,
  MessageOutlined,
  CalendarOutlined,
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useStore } from "../../GlobalStore";
import { Segmented, Typography, DatePicker } from "antd";
import { QRCodeSVG } from "qrcode.react";
import dayjs from "dayjs";
import { icons } from "./icons";
import type { QRCodeProps } from "antd";
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";

const { Title, Paragraph, Text, Link } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

function QRGenerator() {
  const [level, setLevel] = useState<string | number>("L");
  const [activeTab, setActiveTab] = useState("1");
  const [dig, setDig] = useState(true);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<number>(365);
  const [icon, setIcon] = useState(icons.HackTools);
  const [iconSize, setIconSize] = useState<number>(75);
  const isDarkMode = useStore((state) => state.darkMode);

  const initialQRState = {
    url: "https://github.com/LasCC/HackTools",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    wifi: { ssid: "AirPort Wifi", auth: "WPA", password: "11223344" },
    email: {
      to: "contact@me.com",
      subject: "Hello",
      message: "Hello from HackTools!",
    },
    tel: "+1234567890",
    sms: { number: "+1234567890", message: "Hello from HackTools!" },
    event: {
      title: "🧨 Warning - Event Calendar",
      description: "Come join us!",
      location: "World",
      date: [
        dayjs().format("YYYYMMDDTHHmmss"),
        dayjs().add(1, "hour").format("YYYYMMDDTHHmmss"),
      ],
    },
    color: "#000000",
    bgColor: "#00000000",
    dig: true,
  };

  const [formValues, setFormValues] = useState(initialQRState);

  useEffect(() => {
    if (isDarkMode) {
      message.info(
        "For the best experience, use light mode for this component."
      );
    }
  }, [isDarkMode]);

  const resetQRCodeValue = () => {
    setFormValues(initialQRState);
  };

  const handleInputChange = (field, value) => {
    setFormValues((prevState) => ({ ...prevState, [field]: value }));
    if (field === "icon" && value === "") {
      setDig(false);
    }
  };

  const handleNestedInputChange = (field, subField, value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [field]: { ...prevState[field], [subField]: value },
    }));
  };

  const getQRValue = () => {
    switch (activeTab) {
      case "1": // URL
        return formValues.url;
      case "2": // Text
        return formValues.text;
      case "3": // WiFi
        return `WIFI:T:${formValues.wifi.auth};S:${formValues.wifi.ssid};P:${formValues.wifi.password};;`;
      case "4": // Email
        return `mailto:${formValues.email.to}?subject=${formValues.email.subject}&body=${formValues.email.message}`;
      case "5": // Telephone
        return `tel:${formValues.tel}`;
      case "6": // SMS
        return `smsto:${formValues.sms.number}:${formValues.sms.message}`;
      case "7": // Calendar Event
        const startDate = dayjs(formValues.event.date[0]).format(
          "YYYYMMDDTHHmmss"
        );
        const endDate = formValues.event.date[1]
          ? dayjs(formValues.event.date[1]).format("YYYYMMDDTHHmmss")
          : "";
        return `BEGIN:VEVENT\nSUMMARY:${
          formValues.event.title
        }\nDTSTART:${startDate}\n${
          endDate ? `DTEND:${endDate}\n` : ""
        }DESCRIPTION:${formValues.event.description}\nLOCATION:${
          formValues.event.location
        }\nEND:VEVENT`;
      default:
        return "";
    }
  };

  const increase = () => {
    setSize((prevSize) => {
      const newSize = prevSize + 10;
      if (newSize > 365) {
        return 365;
      }
      return newSize;
    });
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg+xml";
    if (!isJpgOrPng) {
      message.error("Only JPG/PNG/SVG files can be uploaded!");
    }
    return isJpgOrPng;
  };

  const decline = () => {
    setSize((prevSize) => {
      const newSize = prevSize - 10;
      if (newSize < 48) {
        return 48;
      }
      return newSize;
    });
  };

  const qrValue = getQRValue();
  const maxLengths = { L: 2953, M: 2331, Q: 1663, H: 1273 };

  if (qrValue.length > maxLengths[level]) {
    message.error(
      "The data is too long to be encoded into a QR code, reloading the page..."
    );
    setTimeout(() => window.location.reload(), 3000);
    return;
  }

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setIcon(url);
      });
    }
  };

  const downloadQRCode = () => {
    const svg = document
      .getElementById("qrcode")
      ?.querySelector<SVGSVGElement>("svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.setAttribute(
        "src",
        "data:image/svg+xml;base64," +
          btoa(unescape(encodeURIComponent(svgData)))
      );
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        if (ctx) {
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const png = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.download = "QRCode.png";
          a.href = png;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      };
    }
  };

  const handleIconClick = (iconUrl) => {
    setIcon(iconUrl);
  };

  return (
    <div style={{ padding: 8 }}>
      <Title level={3}>QR Code Generator</Title>
      <Paragraph>
        During phishing exercises, you may want to send a link to the target
        that will redirect them to a malicious website. However, you may not
        want to send the link directly to the target, as they may be suspicious
        of the link and not click on it. Instead, you can send them a QR code
        that they can scan with their phone, which will redirect them to a
        controlled website.
        <br />
        <br />
        For more advanced phishing attacks (e.g.{" "}
        <Link
          href="https://owasp.org/www-community/attacks/Qrljacking"
          target="_blank"
        >
          QRLJacking
        </Link>
        ), you can use the{" "}
        <Link href="https://breakdev.org/evilqr-phishing/" target="_blank">
          EvilQR
        </Link>{" "}
        tool to perform remote account takeover, through sign-in QR code
        phishing.
      </Paragraph>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <div
            id="qrcode"
            style={{ display: "flex", width: "100%", height: "auto" }}
            onClick={() => setOpen(true)}
          >
            <QRCodeSVG
              className="qrcode"
              size={size}
              level={level as QRCodeProps["errorLevel"]}
              value={getQRValue()}
              fgColor={formValues.color}
              bgColor={formValues.bgColor}
              includeMargin={false}
              imageSettings={{
                src: icon,
                height: iconSize,
                width: iconSize,
                excavate: dig && icon !== "",
              }}
            />
          </div>
        </Col>
        <Col span={14}>
          <Form layout="vertical">
            <Tabs
              defaultActiveKey="1"
              tabPosition="left"
              onChange={(key) => {
                setActiveTab(key);
                resetQRCodeValue();
                setDig(true);
              }}
            >
              <TabPane
                tab={
                  <Tooltip title="URL">
                    <LinkOutlined />
                  </Tooltip>
                }
                key="1"
              >
                <Space direction="vertical">
                  <Text strong>URL</Text>
                  <Text type="secondary">
                    You can create a QR code that will redirect the target to a
                    website.
                  </Text>
                  <Form.Item label="Website URL">
                    <Input
                      placeholder="https://github.com/LasCC/HackTools"
                      value={formValues.url}
                      onChange={(e) => handleInputChange("url", e.target.value)}
                    />
                  </Form.Item>
                </Space>
              </TabPane>
              <TabPane
                tab={
                  <Tooltip title="Raw Text">
                    <FileTextOutlined />
                  </Tooltip>
                }
                key="2"
              >
                <Space direction="vertical">
                  <Text strong>Text</Text>
                  <Text type="secondary">
                    You can create a QR code that will display text when
                    scanned.
                  </Text>
                  <Form.Item label="Raw Text">
                    <TextArea
                      rows={4}
                      placeholder="Hello from HackTools!"
                      value={formValues.text}
                      onChange={(e) =>
                        handleInputChange("text", e.target.value)
                      }
                    />
                  </Form.Item>
                </Space>
              </TabPane>
              <TabPane
                tab={
                  <Tooltip title="WIFI">
                    <WifiOutlined />
                  </Tooltip>
                }
                key="3"
              >
                <Space direction="vertical">
                  <Text strong>WIFI</Text>
                  <Text type="secondary">
                    You can create a QR code that will connect the target to a
                    WIFI network.
                  </Text>
                  <Form.Item label="Authentication">
                    <Select
                      defaultValue={formValues.wifi.auth}
                      onChange={(value) =>
                        handleNestedInputChange("wifi", "auth", value)
                      }
                      options={[
                        {
                          label: "Authentication",
                          options: [
                            { label: "None", value: "nopass" },
                            { label: "WEP", value: "WEP" },
                            { label: "WPA/WPA2", value: "WPA" },
                          ],
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item label="SSID">
                    <Input
                      placeholder="SSID"
                      value={formValues.wifi.ssid}
                      onChange={(e) =>
                        handleNestedInputChange("wifi", "ssid", e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Password">
                    <Input.Password
                      placeholder="Password"
                      value={formValues.wifi.password}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "wifi",
                          "password",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                </Space>
              </TabPane>
              <TabPane
                tab={
                  <Tooltip title="EMAIL">
                    <MailOutlined />
                  </Tooltip>
                }
                key="4"
              >
                <Space direction="vertical">
                  <Text strong>Email</Text>
                  <Text type="secondary">
                    You can create a QR code that will send an email to the
                    target.
                  </Text>
                  <Form.Item label="To">
                    <Input
                      placeholder="To: contact@hackme.com"
                      value={formValues.email.to}
                      onChange={(e) =>
                        handleNestedInputChange("email", "to", e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Subject">
                    <Input
                      placeholder="Subject: Hello!"
                      value={formValues.email.subject}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "email",
                          "subject",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Message">
                    <TextArea
                      rows={4}
                      placeholder="Message"
                      value={formValues.email.message}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "email",
                          "message",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                </Space>
              </TabPane>
              <TabPane
                tab={
                  <Tooltip title="TEL">
                    <PhoneOutlined />
                  </Tooltip>
                }
                key="5"
              >
                <Space direction="vertical">
                  <Text strong>Telephone</Text>
                  <Text type="secondary">
                    You may need to add the country code before the number.
                  </Text>
                  <Form.Item label="Telephone Number">
                    <Input
                      placeholder="+1234567890"
                      value={formValues.tel}
                      onChange={(e) => handleInputChange("tel", e.target.value)}
                    />
                  </Form.Item>
                </Space>
              </TabPane>
              <TabPane
                tab={
                  <Tooltip title="SMS">
                    <MessageOutlined />
                  </Tooltip>
                }
                key="6"
              >
                <Space direction="vertical">
                  <Text strong>SMS</Text>
                  <Text type="secondary">
                    You may need to add the country code before the number.
                  </Text>
                  <Form.Item label="Number">
                    <Input
                      placeholder="Number"
                      value={formValues.sms.number}
                      onChange={(e) =>
                        handleNestedInputChange("sms", "number", e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Message">
                    <TextArea
                      rows={4}
                      placeholder="Message"
                      maxLength={6}
                      value={formValues.sms.message}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "sms",
                          "message",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                </Space>
              </TabPane>
              <TabPane
                tab={
                  <Tooltip title="Calendar Event">
                    <CalendarOutlined />
                  </Tooltip>
                }
                key="7"
              >
                <Space direction="vertical">
                  <Text strong>Calendar Event</Text>
                  <Text type="secondary">
                    You can create a QR code that will add an event to the
                    target's calendar.
                  </Text>
                  <Form.Item label="Title">
                    <Input
                      placeholder="Title"
                      value={formValues.event.title}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "event",
                          "title",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Description">
                    <Input
                      placeholder="Description"
                      value={formValues.event.description}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "event",
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Location">
                    <Input
                      placeholder="Location"
                      value={formValues.event.location}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "event",
                          "location",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Date and Time">
                    <DatePicker.RangePicker
                      showTime
                      value={[
                        formValues.event.date[0]
                          ? dayjs(formValues.event.date[0])
                          : null,
                        formValues.event.date[1]
                          ? dayjs(formValues.event.date[1])
                          : null,
                      ]}
                      onChange={(dates) =>
                        handleNestedInputChange(
                          "event",
                          "date",
                          dates.map((d) => (d ? d.toISOString() : null))
                        )
                      }
                    />
                  </Form.Item>
                </Space>
              </TabPane>
            </Tabs>
          </Form>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[0, 0]}>
        <Col span={24}>
          <Space direction="vertical">
            <Text strong>Icon</Text>
            <Text type="secondary">
              Select an icon to display in the center of the QR code.
            </Text>
            <Space>
              {Object.entries(icons).map(([name, url]) => (
                <img
                  key={name}
                  src={url}
                  alt={name}
                  onClick={() => {
                    handleIconClick(url);
                    setDig(true);
                  }}
                  style={{ cursor: "pointer", width: 35, height: "auto" }}
                />
              ))}
              <Tooltip title="Upload an icon">
                <Upload
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  <Button icon={<PlusOutlined />} />
                </Upload>
              </Tooltip>
              <Tooltip title="Remove icon">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    setIcon("");
                    setDig(false);
                  }}
                />
              </Tooltip>
            </Space>
            <Popconfirm
              placement="topLeft"
              title="Warning"
              description="HackTools is not responsible for the use of generated QR codes"
              onConfirm={downloadQRCode}
              okText="Download"
              cancelText="Cancel"
            >
              <Button type="primary">Download</Button>
            </Popconfirm>
          </Space>
        </Col>
        <Drawer
          title="QRCode Configuration"
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
        >
          <Space direction="vertical">
            <Text strong>Error Correction Level</Text>
            <Text type="secondary">
              The error correction level is used to determine how much of the QR
              code can be damaged but still be readable.
            </Text>
            <Segmented
              options={["L", "M", "Q", "H"]}
              value={level}
              onChange={setLevel}
            />
            <Divider />

            <Text strong>Size {size}px</Text>
            <Text type="secondary">The size of the QR code in pixels.</Text>
            <Button.Group style={{ marginBottom: 16 }}>
              <Button
                onClick={decline}
                disabled={size <= 48}
                icon={<MinusOutlined />}
              >
                Smaller
              </Button>
              <Button
                onClick={increase}
                disabled={size >= 365}
                icon={<PlusOutlined />}
              >
                Larger
              </Button>
            </Button.Group>
            <Divider />

            <Text strong>Icon Size</Text>
            <Text type="secondary">
              ⚠️ Setting the icon size too large may cause the QR code to be
              unreadable.
            </Text>
            <Slider
              min={10}
              max={100}
              onChange={(value: number) => setIconSize(value)}
              value={iconSize}
            />
            <Divider />

            <Text strong>Icon Dig</Text>
            <Text type="secondary">Excavate the icon from the QR code.</Text>
            <Text italic type="secondary">
              We recommend to enable this option if you upload your own PNG/JPG
              image, and disable it if you use a SVG image.
            </Text>
            <Radio.Group value={dig} onChange={(e) => setDig(e.target.value)}>
              <Radio value={true}>Enabled</Radio>
              <Radio value={false}>Disabled</Radio>
            </Radio.Group>
            <Divider />

            <ColorPicker
              allowClear
              value={formValues.color}
              showText={(color) => (
                <span>QRCode Color ({color.toHexString()})</span>
              )}
              onChange={(color) =>
                handleInputChange("color", color.toHexString())
              }
              presets={[
                {
                  label: "Recommended",
                  colors: [
                    "#000000",
                    "#000000E0",
                    "#000000A6",
                    "#00000073",
                    "#00000040",
                    "#00000026",
                    "#0000001A",
                    "#00000012",
                    "#0000000A",
                    "#00000005",
                    "#F5222D",
                    "#FA8C16",
                    "#FADB14",
                    "#8BBB11",
                    "#52C41A",
                    "#13A8A8",
                    "#1677FF",
                    "#2F54EB",
                    "#722ED1",
                    "#EB2F96",
                    "#F5222D4D",
                    "#FA8C164D",
                    "#FADB144D",
                    "#8BBB114D",
                    "#52C41A4D",
                    "#13A8A84D",
                    "#1677FF4D",
                    "#2F54EB4D",
                    "#722ED14D",
                    "#EB2F964D",
                  ],
                },
                { label: "Remove Background", colors: ["#00000000"] },
              ]}
            />
            <ColorPicker
              allowClear
              value={formValues.bgColor}
              showText={(color) => (
                <span>QRCode Background Color ({color.toHexString()})</span>
              )}
              onChange={(color) =>
                handleInputChange("bgColor", color.toHexString())
              }
              presets={[
                {
                  label: "Recommended",
                  colors: [
                    "#000000",
                    "#000000E0",
                    "#000000A6",
                    "#00000073",
                    "#00000040",
                    "#00000026",
                    "#0000001A",
                    "#00000012",
                    "#0000000A",
                    "#00000005",
                    "#F5222D",
                    "#FA8C16",
                    "#FADB14",
                    "#8BBB11",
                    "#52C41A",
                    "#13A8A8",
                    "#1677FF",
                    "#2F54EB",
                    "#722ED1",
                    "#EB2F96",
                    "#F5222D4D",
                    "#FA8C164D",
                    "#FADB144D",
                    "#8BBB114D",
                    "#52C41A4D",
                    "#13A8A84D",
                    "#1677FF4D",
                    "#2F54EB4D",
                    "#722ED14D",
                    "#EB2F964D",
                  ],
                },
                { label: "Remove Background", colors: ["#00000000"] },
              ]}
            />
          </Space>
        </Drawer>
      </Row>
    </div>
  );
}

export default QRGenerator;
