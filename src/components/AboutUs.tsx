import React from 'react';
import { Typography, Divider } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph, Link } = Typography;

export default function AboutUs () {
    return (
        <QueueAnim delay={300} duration={1500}>
            <Title
                level={2}
                style={{
                    fontWeight: 'bold',
                    margin: 15
                }}
            >
                About us
            </Title>
            <Paragraph
                style={{
                    margin: 15
                }}
            >
                Our story of two students creating this app
            </Paragraph>
            <Divider dashed />
            <div
                key='a'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>
                    HackTools, is a web extension facilitating your web application penetration tests, it includes cheat
                    sheets as well as all the tools used during a test such as XSS payloads, Reverse shells and much
                    more. With the extension you no longer need to search for payloads in different websites or in your
                    local storage space, most of the tools are accessible in one click. HackTools is accessible either
                    in pop up mode or in a whole tab in the Devtools part of the browser with F12.
                </Paragraph>
                <Paragraph>
                    Note that this project is maintained, developed and made available for free, you can offer us a
                    coffee, it will be very encouraging and greatly appreciated
                </Paragraph>
                <Paragraph>HackTools is created by Ludovic COULON and Riadh BOUCHAHOUA</Paragraph>
                <a href='https://www.paypal.com/paypalme/hacktoolsEXT' target='_blank' rel='noreferrer noopener'>
                    <img
                        src='https://paymentweek.com/wp-content/uploads/2014/09/paypal-copy-1024x489.png'
                        alt='Paypal'
                        style={{
                            height: '50px',
                            width: 'auto',
                        }}
                    />
                </a>
            </div>
            <Divider dashed />
            <div
                key='b'
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}>Contribute</Title>
                <Paragraph>
                    We are always looking for community input into our software. Feel free to contribute to the Hack-Tools repository:
                </Paragraph>
                <Paragraph>- Contribute the project: <Link href='https://github.com/LasCC/Hack-Tools' target='_blank'>https://github.com/LasCC/Hack-Tools</Link></Paragraph>

                <Paragraph strong>Before submitting a bug report</Paragraph>
                <Paragraph>Check the open issues, to see if the problem is already reported.</Paragraph>
                <Paragraph>If you encounter a problem that was reported and closed, check why it was closed and if you think it should be reopened, open a new issue instead.</Paragraph>
                <Paragraph>- Report a bug: <Link href='https://github.com/LasCC/Hack-Tools/issues' target='_blank'>https://github.com/LasCC/Hack-Tools/issues</Link></Paragraph>
            </div>
            <Divider dashed />
            <div key="c"
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Title level={3}> Credits </Title> <Paragraph> PentestMonkey </Paragraph>
                <Paragraph> GTFOBins </Paragraph> <Paragraph> Antd </Paragraph> <Paragraph> Iconfont CN </Paragraph>
                <Paragraph> John Hammond </Paragraph> <Paragraph> The Noun Project </Paragraph>
                <Paragraph> PayloadsAllTheThings </Paragraph>
                <Paragraph> Fabien LOISON(flozz) for the p0wny @shell </Paragraph>
                <Paragraph> GoProSlowYo for the zsh reverse shell </Paragraph>
                <Paragraph> MITRE ATT&CK </Paragraph>
                <Paragraph> Thanks to dejisec for the Active Directory scripts ! <Link href='https://gist.github.com/dejisec/3477eff3258f1f43fc3c57de56295f34' target='_blank'>Link</Link> </Paragraph>
            </div>
        </QueueAnim>
    );
}
