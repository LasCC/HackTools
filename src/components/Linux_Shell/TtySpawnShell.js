import React from 'react';
import { Button, message, Typography, Divider } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import Clipboard from 'react-clipboard.js';

const { Title, Paragraph } = Typography;

export default (props) => {
	const successInfoTtyShell = () => {
		message.success('Your tty has been copied');
	};

	return (
		<QueueAnim delay={300} duration={1500}>
			<Title variant='Title level={3}' style={{ fontWeight: 'bold', margin: 15 }}>
				TTY Spawn Shell
			</Title>
			<Paragraph style={{ margin: 15 }}>
				Often during pen tests you may obtain a shell without having tty, yet wish to interact further with the
				system. Here are some commands which will allow you to spawn a tty shell. Obviously some of this will
				depend on the system environment and installed packages.
			</Paragraph>
			<Divider dashed />
			<div
				key='a'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>Python spawn shell </Title>
				<Paragraph editable copyable>
					python -c 'import pty; pty.spawn("/bin/bash")'
				</Paragraph>
				<Clipboard component='a' data-clipboard-text={`python -c 'import pty; pty.spawn("/bin/bash")'`}>
					<Button type='primary' onClick={successInfoTtyShell} style={{ marginBottom: 10, marginTop: 15 }}>
						<CopyOutlined />
						Copy the TTY
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='b'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>Fully Interactive TTY</Title>
				<Title level={4}>All the steps to stabilize your shell</Title>
				<Paragraph>
					<strong>The first step:</strong>
					<pre>
						<Paragraph style={{ margin: 0 }} copyable>
							python3 -c 'import pty;pty.spawn("/bin/bash")'
						</Paragraph>
					</pre>
					Which uses Python to spawn a better-featured bash shell. At this point, our shell will look a bit
					prettier, but we still won’t be able to use tab autocomplete or the arrow keys.
				</Paragraph>
				<br />
				<Paragraph>
					<strong>Step two is:</strong>
					<pre>
						<Paragraph style={{ margin: 0 }} copyable>
							export TERM=xterm
						</Paragraph>
					</pre>
					This will give us access to term commands such as clear.
				</Paragraph>
				<br />
				<Paragraph>
					<strong>Finally (and most importantly) we will background the shell using</strong>
					<pre>
						<Paragraph style={{ margin: 0 }} copyable>
							Ctrl + Z
						</Paragraph>
					</pre>
					Back in our own terminal we use
					<pre>
						<Paragraph style={{ margin: 0 }} copyable>
							stty raw -echo; fg
						</Paragraph>
					</pre>
					This does two things: first, it turns off our own terminal echo which gives us access to tab
					autocompletes, the arrow keys, and Ctrl + C to kill processes
				</Paragraph>
				<Paragraph>
					<pre>
						<Paragraph style={{ margin: 0 }} copyable>
							stty rows 38 columns 116
						</Paragraph>
					</pre>
				</Paragraph>
			</div>
			<Divider dashed />
			<div
				key='c'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>OS system spawn shell</Title>
				<Paragraph copyable>echo os.system("/bin/bash")</Paragraph>
				<Clipboard component='a' data-clipboard-text={`echo os.system("/bin/bash")`}>
					<Button type='primary' onClick={successInfoTtyShell} style={{ marginBottom: 10, marginTop: 15 }}>
						<CopyOutlined />
						Copy the TTY
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='d'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>Bash spawn shell </Title>
				<Paragraph copyable>/bin/sh -i</Paragraph>
				<Clipboard component='a' data-clipboard-text={'/bin/sh -i'}>
					<Button type='primary' onClick={successInfoTtyShell} style={{ marginBottom: 10, marginTop: 15 }}>
						<CopyOutlined />
						Copy the TTY
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='e'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>Perl spawn shell </Title>
				<Paragraph copyable>perl —e 'exec "/bin/sh";'</Paragraph>
				<Clipboard component='a' data-clipboard-text={`perl —e 'exec "/bin/sh";'`}>
					<Button type='primary' onClick={successInfoTtyShell} style={{ marginBottom: 10, marginTop: 15 }}>
						<CopyOutlined />
						Copy the TTY
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='f'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>Ruby spawn shell </Title>
				<Paragraph copyable>ruby: exec "/bin/sh"</Paragraph>
				<Clipboard component='a' data-clipboard-text={`ruby: exec "/bin/sh"`}>
					<Button type='primary' onClick={successInfoTtyShell} style={{ marginBottom: 10, marginTop: 15 }}>
						<CopyOutlined />
						Copy the TTY
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='g'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>Lua spawn shell </Title>
				<Paragraph copyable>lua: os.execute("/bin/sh")</Paragraph>
				<Clipboard component='a' data-clipboard-text={`lua: os.execute("/bin/sh")`}>
					<Button type='primary' onClick={successInfoTtyShell} style={{ marginBottom: 10, marginTop: 15 }}>
						<CopyOutlined />
						Copy the TTY
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='h'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>IRB spawn shell </Title>
				<Paragraph copyable>exec "/bin/sh"</Paragraph>
				<Clipboard component='a' data-clipboard-text={`exec "/bin/sh"`}>
					<Button type='primary' onClick={successInfoTtyShell} style={{ marginBottom: 10, marginTop: 15 }}>
						<CopyOutlined />
						Copy the TTY
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='i'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>VI spawn shell </Title>
				<Paragraph copyable>:!bash</Paragraph>
				<Clipboard component='a' data-clipboard-text={':!bash'}>
					<Button type='primary' onClick={successInfoTtyShell} style={{ marginBottom: 10, marginTop: 15 }}>
						<CopyOutlined />
						Copy the TTY
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='j'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>VI(2) spawn shell </Title>
				<Paragraph copyable>:set shell=/bin/bash:shell</Paragraph>
				<Clipboard component='a' data-clipboard-text={':set shell=/bin/bash:shell'}>
					<Button type='primary' onClick={successInfoTtyShell} style={{ marginBottom: 10, marginTop: 15 }}>
						<CopyOutlined />
						Copy the TTY
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='k'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>Nmap spawn shell </Title>
				<Paragraph copyable>!sh</Paragraph>
				<Clipboard component='a' data-clipboard-text={'!sh'}>
					<Button type='primary' onClick={successInfoTtyShell} style={{ marginBottom: 10, marginTop: 15 }}>
						<CopyOutlined />
						Copy the TTY
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
		</QueueAnim>
	);
};
