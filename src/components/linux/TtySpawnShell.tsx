import React from 'react';
import { Typography, Divider, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function TTY () {
    return (
        <div>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                TTY Spawn Shell
            </Title>
            <Paragraph style={{ margin: 15 }}>
                Often during pen tests you may obtain a shell without having tty, yet wish to interact further with the
                system. Here are some commands which will allow you to spawn a tty shell. Obviously some of this will
                depend on the system environment and installed packages.
                <Divider dashed />
            </Paragraph>
            <div
                style={{
                    padding: 15,
                }}
            >
                <Space direction="vertical">
                    <Title level={4}>All the steps to stabilize your shell</Title>
                    <Paragraph>
                        <strong>The first step:</strong>
                        <pre>
                            <Text>
                                python3 -c 'import pty;pty.spawn("/bin/bash")'
                            </Text>
                        </pre>
                        Which uses Python to spawn a better-featured bash shell. At this point, our shell will look a bit
                        prettier, but we still won’t be able to use tab autocomplete or the arrow keys.
                    </Paragraph>
                    <Paragraph>
                        <strong>Step two is:</strong>
                        <pre>
                            <Text copyable>
                                export TERM=xterm
                            </Text>
                        </pre>
                        This will give us access to term commands such as clear.
                    </Paragraph>
                    <Paragraph>
                        <strong>Finally (and most importantly) we will background the shell using</strong>
                        <pre>
                            <Text copyable>
                                Ctrl + Z
                            </Text>
                        </pre>
                        Back in our own terminal we use
                        <pre>
                            <Text copyable>
                                stty raw -echo; fg
                            </Text>
                        </pre>
                        This does two things: first, it turns off our own terminal echo which gives us access to tab
                        autocompletes, the arrow keys, and Ctrl + C to kill processes
                        <pre>
                            <Text copyable editable>
                                stty rows 38 columns 116
                            </Text>
                        </pre>
                    </Paragraph>
                </Space>
            </div>
        </div>
    );
}
