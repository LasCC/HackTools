import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Card, Typography, Space, List, Divider } from "antd";
const { Title, Text } = Typography;

const CVEResearch = () => {
	const [apiKey, setApiKey] = useState("");
	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");

	const fetchData = async () => {
		// const response = await axios.post(
		//   'https://corsproxy.io/?https://vulners.com/api/v3/search/lucene',
		//   {
		//     query: search,
		//     skip: 0,
		//     size: 10,
		//     fields: [
		//       'id',
		//       'title',
		//       'description',
		//       'type',
		//       'bulletinFamily',
		//       'cvss',
		//       'published',
		//       'modified',
		//       'lastseen',
		//       'href',
		//       'sourceHref',
		//       'sourceData',
		//       'cvelist'
		//     ],
		//     apiKey: apiKey
		//   }
		// );

		// Access the nested data array

		// const results = response.data.data.search;
		/* tslint:disable-next-line:no-console */
		// @ts-ignore
		setData(mocking);
	};

	const mocking = [
		{
			result: "OK",
			data: {
				search: [
					{
						_index: "es6_bulletins_bulletin_v3",
						_type: "_doc",
						_id: "CVE-2014-2265",
						_score: 0.000020293273,
						_source: {
							lastseen: "2023-05-11T10:11:51",
							bulletinFamily: "NVD",
							cvelist: ["CVE-2014-2265"],
							description:
								"Rock Lobster Contact Form 7 before 3.7.2 allows remote attackers to bypass the CAPTCHA protection mechanism and submit arbitrary form data by omitting the _wpcf7_captcha_challenge_captcha-719 parameter.",
							modified: "2022-09-27T23:15:00",
							id: "CVE-2014-2265",
							href: "https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-2265",
							published: "2014-03-14T10:55:00",
							type: "cve",
							title: "CVE-2014-2265",
							cvss: {
								score: 5,
								vector: "AV:N/AC:L/Au:N/C:N/I:P/A:N",
							},
							vhref: "https://vulners.com/cve/CVE-2014-2265",
						},
						highlight: {
							references: [
								'http://<span class="vulners-highlight">contactform7</span>.com/2014/02/26/contact-form-7-372/',
							],
						},
						sort: [0.000020293273, 1394794500000],
						flatDescription:
							"Rock Lobster Contact Form 7 before 3.7.2 allows remote attackers to bypass the CAPTCHA protection mechanism and submit arbitrary form data by omitting the _wpcf7_captcha_challenge_captcha-719...",
					},
					{
						_index: "es6_bulletins_bulletin_v3",
						_type: "_doc",
						_id: "8013AE2F-877F-598C-B69A-FB4E7CDE9D77",
						_score: 3.8811315e-8,
						_source: {
							lastseen: "2022-08-11T15:01:46",
							bulletinFamily: "exploit",
							cvelist: ["CVE-2020-35489"],
							description:
								" Check-WP-CVE-2020-35489\n\n CVE-2020-35489\nThe CVE-2020-35489 ...",
							modified: "2022-08-11T09:41:06",
							published: "2020-12-24T09:10:17",
							id: "8013AE2F-877F-598C-B69A-FB4E7CDE9D77",
							href: "",
							type: "githubexploit",
							title:
								"Exploit for Unrestricted Upload of File with Dangerous Type in Rocklobster Contact Form 7",
							cvss: {
								score: 10,
								vector: "AV:N/AC:L/Au:N/C:C/I:C/A:C",
							},
							privateArea: 1,
							vhref:
								"https://vulners.com/githubexploit/8013AE2F-877F-598C-B69A-FB4E7CDE9D77",
						},
						highlight: {},
						sort: [3.8811315e-8, 1608801017000],
						flatDescription:
							"Check-WP-CVE-2020-35489 CVE-2020-35489 The CVE-2020-35489...",
					},
					{
						_index: "es6_bulletins_bulletin_v3",
						_type: "_doc",
						_id: "A9AF97E8-458C-5B4F-B974-5762CA37AB0B",
						_score: 1.473818e-37,
						_source: {
							lastseen: "2021-12-10T15:13:41",
							bulletinFamily: "exploit",
							cvelist: ["CVE-2020-35489"],
							description:
								" Check-WP-CVE-2020-35489\n\n CVE-2020-35489\nThe CVE-2020-35489 ...",
							modified: "2021-10-23T19:26:26",
							published: "2021-04-22T05:17:16",
							id: "A9AF97E8-458C-5B4F-B974-5762CA37AB0B",
							href: "",
							type: "githubexploit",
							title:
								"Exploit for Unrestricted Upload of File with Dangerous Type in Rocklobster Contact Form 7",
							cvss: {
								score: 10,
								vector: "AV:N/AC:L/Au:N/C:C/I:C/A:C",
							},
							privateArea: 1,
							vhref:
								"https://vulners.com/githubexploit/A9AF97E8-458C-5B4F-B974-5762CA37AB0B",
						},
						highlight: {},
						sort: [1.473818e-37, 1619068636000],
						flatDescription:
							"Check-WP-CVE-2020-35489 CVE-2020-35489 The CVE-2020-35489...",
					},
					{
						_index: "es6_bulletins_bulletin_v3",
						_type: "_doc",
						_id: "EDB-ID:49294",
						_score: 0,
						_source: {
							lastseen: "2020-12-21T08:31:11",
							description: "",
							published: "2020-12-21T00:00:00",
							type: "exploitdb",
							title:
								"Wordpress Plugin Contact Form 7 5.3.1 - Unrestricted File Upload",
							bulletinFamily: "exploit",
							cvelist: [],
							modified: "2020-12-21T00:00:00",
							id: "EDB-ID:49294",
							href: "https://www.exploit-db.com/exploits/49294",
							sourceData:
								' Exploit Title: Wordpress Plugin Contact Form 7 5.3.1 - Unrestricted File Upload\r\n Date: 12/20/2020\r\n Exploit Author: Ramón Vila Ferreres (@ramonvfer)\r\n Vendor Homepage: https://contactform7.com\r\n Software Link: https://wordpress.org/plugins/contact-form-7/\r\n Version: 5.3.1 and below\r\n Tested on: Windows 10 1909, Ubuntu 20.4\r\n\r\nExplanation\r\n---------------------------------------------------------------------\r\nContactForm7 version 5.3.1 and below doesn\'t properly sanitize \r\nuploaded filenames to prevent Arbitrary File Upload that can lead\r\nto full server takeover in the worst-case scenario.\r\n\r\nThis happens in the wpcf7_antiscript_file_name function, that fails\r\nto sanitize the provided filename if it ends with any Unicode special\r\ncharacter ranging from U+0000 (null) to U+001F (us).\r\n\r\nThe function matches both the file name and the file extension against\r\nan exclusion regex. Appending any unicode special character to the \r\nfile extension results in a complete bypass of this verification (as\r\nthe regex doesn\'t match) leading to the Unrestricted File Upload.\r\n\r\nExploit\r\n---------------------------------------------------------------------\r\n1. Change the file extension of the file you want to upload (e.g: \r\n"shell.php") to its equivalent with the special character ending (in\r\nthis case "shell.php" (appended U+0000))\r\n\r\n2. Upload the file using ContactForm7 file upload feature in the \r\ntarget website.\r\n\r\n3. Go to <target.com>/wp-content/uploads/wpcf7_uploads/shell.php\r\nNote the special character at the end\r\nNote that the file upload location may vary as it is configurable.\r\n\r\n4. Now you have uploaded your file!',
							sourceHref: "https://www.exploit-db.com/download/49294",
							cvss: {
								score: 0,
								vector: "NONE",
							},
							vhref: "https://vulners.com/exploitdb/EDB-ID:49294",
						},
						highlight: {
							sourceData: [
								' Exploit Title: Wordpress Plugin Contact Form 7 5.3.1 - Unrestricted File Upload\r\n Date: 12/20/2020\r\n Exploit Author: Ramón Vila Ferreres (@ramonvfer)\r\n Vendor Homepage: https://<span class="vulners-highlight">contactform7</span>.com\r',
							],
						},
						sort: [0, 1608508800000],
						flatDescription:
							"Exploit Title: Wordpress Plugin Contact Form 7 5.3.1 - Unrestricted File Upload Date: 12/20/2020 Exploit Author: Ramón Vila Ferreres (@ramonvfer) Vendor Homepage: https://contactform7.com Software Link: https://wordpress.org/plugins/contact-form-7/ Version: 5.3.1 and below Tested on: Windows 10...",
					},
					{
						_index: "es6_bulletins_bulletin_v3",
						_type: "_doc",
						_id: "PACKETSTORM:160630",
						_score: 0,
						_source: {
							lastseen: "2020-12-21T17:51:36",
							description: "",
							published: "2020-12-20T00:00:00",
							type: "packetstorm",
							title: "WordPress Contact Form 7 5.3.1 Shell Upload",
							bulletinFamily: "exploit",
							cvelist: [],
							modified: "2020-12-20T00:00:00",
							id: "PACKETSTORM:160630",
							href: "https://packetstormsecurity.com/files/160630/WordPress-Contact-Form-7-5.3.1-Shell-Upload.html",
							sourceData:
								'` Exploit Title: Wordpress Plugin Contact Form 7 5.3.1 - Unrestricted File Upload  \n Date: 12/20/2020  \n Exploit Author: Ramón Vila Ferreres (@ramonvfer)  \n Vendor Homepage: https://contactform7.com  \n Software Link: https://wordpress.org/plugins/contact-form-7/  \n Version: 5.3.1 and below  \n Tested on: Windows 10 1909, Ubuntu 20.4  \n  \nExplanation  \n---------------------------------------------------------------------  \nContactForm7 version 5.3.1 and below doesn\'t properly sanitize   \nuploaded filenames to prevent Arbitrary File Upload that can lead  \nto full server takeover in the worst-case scenario.  \n  \nThis happens in the wpcf7_antiscript_file_name function, that fails  \nto sanitize the provided filename if it ends with any Unicode special  \ncharacter ranging from U+0000 (null) to U+001F (us).  \n  \nThe function matches both the file name and the file extension against  \nan exclusion regex. Appending any unicode special character to the   \nfile extension results in a complete bypass of this verification (as  \nthe regex doesn\'t match) leading to the Unrestricted File Upload.  \n  \nExploit  \n---------------------------------------------------------------------  \n1. Change the file extension of the file you want to upload (e.g:   \n"shell.php") to its equivalent with the special character ending (in  \nthis case "shell.php" (appended U+0000))  \n  \n2. Upload the file using ContactForm7 file upload feature in the   \ntarget website.  \n  \n3. Go to <target.com>/wp-content/uploads/wpcf7_uploads/shell.php  \nNote the special character at the end  \nNote that the file upload location may vary as it is configurable.  \n  \n4. Now you have uploaded your file!',
							cvss: {
								score: 0,
								vector: "NONE",
							},
							sourceHref:
								"https://packetstormsecurity.com/files/download/160630/wpcontactform7531-shell.txt",
							vhref: "https://vulners.com/packetstorm/PACKETSTORM:160630",
						},
						highlight: {
							sourceData: [
								'` Exploit Title: Wordpress Plugin Contact Form 7 5.3.1 - Unrestricted File Upload  \n Date: 12/20/2020  \n Exploit Author: Ramón Vila Ferreres (@ramonvfer)  \n Vendor Homepage: https://<span class="vulners-highlight">contactform7</spa',
							],
						},
						sort: [0, 1608422400000],
						flatDescription:
							"` Exploit Title: Wordpress Plugin Contact Form 7 5.3.1 - Unrestricted File Upload   Date: 12/20/2020 Exploit Author: Ramón Vila Ferreres (@ramonvfer) Vendor Homepage: https://contactform7.com Software Link: https://wordpress.org/plugins/contact-form-7/ Version: 5.3.1 and below Tested on: Windows...",
					},
					{
						_index: "es6_bulletins_bulletin_v3",
						_type: "_doc",
						_id: "THREATPOST:0E15C66722D04D8B54AE59F8976CEDAF",
						_score: 0,
						_source: {
							lastseen: "2020-12-17T23:23:41",
							bulletinFamily: "info",
							cvelist: ["CVE-2020-35489"],
							description:
								"A patch for the popular WordPress plugin called Contact Form 7 was released Thursday. It fixes a critical bug that allows an unauthenticated adversary to takeover a website running the plugin or possibly hijack the entire server hosting the site. [The patch](<https://contactform7.com/2020/12/>) comes in the form of a 5.3.2 version update to the Contact Form 7 plugin.\n\nThe WordPress utility is active on 5 million websites with a majority of those sites ([70 percent](<https://wordpress.org/plugins/contact-form-7/advanced/>)) running version 5.3.1 or older of the Contact Form 7 plugin.\n\nThe critical vulnerability ([CVE-2020-35489](<https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-35489>)) is classified as an unrestricted file upload bug, according to [Astra Security Research, which found the flaw on Wednesday](<https://www.getastra.com/blog/911/plugin-exploit/contact-form-7-unrestricted-file-upload-vulnerability/>).\n\n **Quick Fix **\n\n“The plugin developer ([Takayuki Miyoshi](<https://contactform7.com/>)) was quick to fix the vulnerability, realizing its critical nature. We communicated back and forth trying to release the update as soon as possible to prevent any exploitation. An update fixing the issue has already been released, [in version 5.3.2](<https://contactform7.com/2020/12/>),” according to Astra.  \n[![](https://media.threatpost.com/wp-content/uploads/sites/103/2019/02/19151457/subscribe2.jpg)](<https://threatpost.com/newsletter-sign/>)The bug hunter credited for identifying the flaw, [Jinson Varghese](<https://www.getastra.com/blog/911/plugin-exploit/contact-form-7-unrestricted-file-upload-vulnerability/>), wrote that the vulnerability allows an unauthenticated user to bypass any form file-type restrictions in Contact Form 7 and upload an executable binary to a site running the plugin version 5.3.1 or earlier.\n\nNext, the adversary can do a number of malicious things, such as deface the website or redirect visitors to a third-party website in attempt to con visitors into handing over financial and personal information.\n\nIn addition to taking over the targeted website, an attacker could also commandeer the server hosting the site if there is no containerization used to segregate the website on the server hosting the WordPress instance, according to researchers.\n\n **Easy to Exploit**\n\n“It is easily exploitable. And the attacker wouldn’t need to be authenticated and the attack can be done remotely,” said Naman Rastogi, digital marketer and growth hacker with Astra, in an email interview with Threatpost.\n\nHe said a Contact Form 7 update has now been pushed. “For users who have automatic updates on for WordPress plugin the software will automatically update. For others, they indeed will be required to proactively update,” he told Threatpost.\n\nTo keep perspective on the bug, web analytics firm Netcraft estimates there are 455 million websites using the WordPress platform right now. That suggests 1.09 percent of WordPress sites could be vulnerable to attack via this flaw.\n\n**Download our exclusive **[**FREE Threatpost Insider eBook**](<https://threatpost.com/ebooks/healthcare-security-woes-balloon-in-a-covid-era-world/?utm_source=FEATURE&utm_medium=FEATURE&utm_campaign=Nov_eBook>) [_**Healthcare Security Woes Balloon in a Covid-Era World**_](<https://threatpost.com/ebooks/healthcare-security-woes-balloon-in-a-covid-era-world/?utm_source=ART&utm_medium=ART&utm_campaign=Nov_eBook>)** , sponsored by ZeroNorth, to learn more about what these security risks mean for hospitals at the day-to-day level and how healthcare security teams can implement best practices to protect providers and patients. Get the whole story and **[**DOWNLOAD the eBook now**](<https://threatpost.com/ebooks/healthcare-security-woes-balloon-in-a-covid-era-world/?utm_source=ART&utm_medium=ART&utm_campaign=Nov_eBook>)** – on us!**\n,",
							modified: "2020-12-17T22:27:38",
							published: "2020-12-17T22:27:38",
							id: "THREATPOST:0E15C66722D04D8B54AE59F8976CEDAF",
							href: "https://threatpost.com/contact-form-7-plugin-bug/162383/",
							type: "threatpost",
							title:
								"5M WordPress Sites Running 'Contact Form 7' Plugin Open to Attack",
							cvss: {
								score: 0,
								vector: "NONE",
							},
							vhref:
								"https://vulners.com/threatpost/THREATPOST:0E15C66722D04D8B54AE59F8976CEDAF",
						},
						highlight: {
							references: [
								'https://<span class="vulners-highlight">contactform7</span>.com/2020/12/',
							],
							description: [
								'[The patch](<https://<span class="vulners-highlight">contactform7</span>.com/2020/12/>) comes in the form of a 5.3.2 version update to the Contact Form 7 pluginthe flaw on Wednesday](<https://www.getastra.com/blog/911/plugin-exploit/contact-form-7-unrestricted-file-upload-vulnerability/>).\n\n **Quick Fix **\n\n“The plugin developer ([Takayuki Miyoshi](<https://<span class="vulners-highlight">contactform7</span>An update fixing the issue has already been released, [in version 5.3.2](<https://<span class="vulners-highlight">contactform7</span>.com/2020/12/>),” according to Astra.  \n[!',
							],
						},
						sort: [0, 1608244058000],
						flatDescription:
							"A patch for the popular WordPress plugin called Contact Form 7 was released Thursday. It fixes a critical bug that allows an unauthenticated adversary to takeover a website running the plugin or possibly hijack the entire server hosting the site. The patch comes in the form of a 5.3.2 version...",
					},
					{
						_index: "es6_bulletins_bulletin_v3",
						_type: "_doc",
						_id: "CVE-2020-35489",
						_score: 0,
						_ignored: ["enchantments.twitter.tweets.text.keyword"],
						_source: {
							lastseen: "2023-05-10T15:30:09",
							bulletinFamily: "NVD",
							cvelist: ["CVE-2020-35489"],
							description:
								"The contact-form-7 (aka Contact Form 7) plugin before 5.3.2 for WordPress allows Unrestricted File Upload and remote code execution because a filename may contain special characters.",
							modified: "2020-12-22T12:57:00",
							id: "CVE-2020-35489",
							href: "https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2020-35489",
							published: "2020-12-17T19:15:00",
							type: "cve",
							title: "CVE-2020-35489",
							cvss: {
								score: 10,
								vector: "AV:N/AC:L/Au:N/C:C/I:C/A:C",
							},
							vhref: "https://vulners.com/cve/CVE-2020-35489",
						},
						highlight: {
							references: [
								'https://<span class="vulners-highlight">contactform7</span>.com/2020/12/17/contact-form-7-532/',
							],
						},
						sort: [0, 1608232500000],
						flatDescription:
							"The contact-form-7 (aka Contact Form 7) plugin before 5.3.2 for WordPress allows Unrestricted File Upload and remote code execution because a filename may contain special...",
					},
					{
						_index: "es6_bulletins_bulletin_v3",
						_type: "_doc",
						_id: "WPEX-ID:7391118E-EEF5-4FF8-A8EA-F6B65F442C63",
						_score: 0,
						_source: {
							lastseen: "2021-02-15T22:16:24",
							bulletinFamily: "exploit",
							cvelist: ["CVE-2020-35489"],
							description:
								"The popular WordPress plugin, Contact Form 7 was found to be vulnerable to Unrestricted File Upload.\n",
							modified: "2020-12-21T10:53:24",
							id: "WPEX-ID:7391118E-EEF5-4FF8-A8EA-F6B65F442C63",
							href: "",
							published: "2020-12-17T00:00:00",
							type: "wpexploit",
							title: "Contact Form 7 < 5.3.2 - Unrestricted File Upload",
							sourceData:
								"Append a unicode special character (from U+0000 [null] to U+001F [us]) to a filename and upload it via the ContactForm7 upload feature",
							cvss: {
								score: 10,
								vector: "AV:N/AC:L/Au:N/C:C/I:C/A:C",
							},
							vhref:
								"https://vulners.com/wpexploit/WPEX-ID:7391118E-EEF5-4FF8-A8EA-F6B65F442C63",
						},
						highlight: {
							references: [
								'https://<span class="vulners-highlight">contactform7</span>.com/2020/12/17/contact-form-7-532/more-38314',
							],
							sourceData: [
								'Append a unicode special character (from U+0000 [null] to U+001F [us]) to a filename and upload it via the <span class="vulners-highlight">ContactForm7</span> upload feature',
							],
						},
						sort: [0, 1608163200000],
						flatDescription:
							"The popular WordPress plugin, Contact Form 7 was found to be vulnerable to Unrestricted File Upload.  Append a unicode special character (from U+0000 [null] to U+001F [us]) to a filename and upload it via the ContactForm7 upload...",
					},
					{
						_index: "es6_bulletins_bulletin_v3",
						_type: "_doc",
						_id: "WPVDB-ID:7391118E-EEF5-4FF8-A8EA-F6B65F442C63",
						_score: 0,
						_source: {
							lastseen: "2021-02-15T22:16:24",
							bulletinFamily: "software",
							cvelist: ["CVE-2020-35489"],
							description:
								"The popular WordPress plugin, Contact Form 7 was found to be vulnerable to Unrestricted File Upload.\n\n PoC\n\nAppend a unicode special character (from U+0000 [null] to U+001F [us]) to a filename and upload it via the ContactForm7 upload feature\n",
							modified: "2020-12-21T10:53:24",
							id: "WPVDB-ID:7391118E-EEF5-4FF8-A8EA-F6B65F442C63",
							href: "https://wpscan.com/vulnerability/7391118e-eef5-4ff8-a8ea-f6b65f442c63",
							published: "2020-12-17T00:00:00",
							type: "wpvulndb",
							title: "Contact Form 7 < 5.3.2 - Unrestricted File Upload",
							sourceData: "",
							cvss: {
								score: 10,
								vector: "AV:N/AC:L/Au:N/C:C/I:C/A:C",
							},
							vhref:
								"https://vulners.com/wpvulndb/WPVDB-ID:7391118E-EEF5-4FF8-A8EA-F6B65F442C63",
						},
						highlight: {
							references: [
								'https://<span class="vulners-highlight">contactform7</span>.com/2020/12/17/contact-form-7-532/more-38314',
							],
							description: [
								'.\n\n PoC\n\nAppend a unicode special character (from U+0000 [null] to U+001F [us]) to a filename and upload it via the <span class="vulners-highlight">ContactForm7</span> upload feature',
							],
						},
						sort: [0, 1608163200000],
						flatDescription:
							"The popular WordPress plugin, Contact Form 7 was found to be vulnerable to Unrestricted File Upload. PoC Append a unicode special character (from U+0000 [null] to U+001F [us]) to a filename and upload it via the ContactForm7 upload...",
					},
					{
						_index: "es6_bulletins_bulletin_v3",
						_type: "_doc",
						_id: "WPVDB-ID:810A985F-B671-4A69-B9C3-7F35D72E84DE",
						_score: 0,
						_source: {
							lastseen: "2021-02-15T22:19:10",
							bulletinFamily: "software",
							cvelist: [],
							description:
								"The Flamingo WordPress plugin was affected by a CSV Injection security vulnerability",
							modified: "2020-01-29T06:00:05",
							published: "2020-01-15T00:00:00",
							id: "WPVDB-ID:810A985F-B671-4A69-B9C3-7F35D72E84DE",
							href: "https://wpscan.com/vulnerability/810a985f-b671-4a69-b9c3-7f35d72e84de",
							type: "wpvulndb",
							title: "Flamingo < 2.1.1 - CSV Injection",
							sourceData: "",
							cvss: {
								score: 0,
								vector: "NONE",
							},
							vhref:
								"https://vulners.com/wpvulndb/WPVDB-ID:810A985F-B671-4A69-B9C3-7F35D72E84DE",
						},
						highlight: {
							references: [
								'https://<span class="vulners-highlight">contactform7</span>.com/2020/01/15/heads-up-about-spreadsheet-vulnerabilities/',
							],
						},
						sort: [0, 1579046400000],
						flatDescription:
							"The Flamingo WordPress plugin was affected by a CSV Injection security...",
					},
				],
				exactMatch: null,
				references: null,
				total: 14,
				maxSearchSize: 100,
			},
		},
	];

	return (
		<div>
			<Space direction="vertical" style={{ width: "100%" }}>
				<Input
					placeholder="Enter API Key"
					value={apiKey}
					onChange={(e) => setApiKey(e.target.value)}
				/>
				<Input
					placeholder="Service"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button onClick={fetchData}>Fetch Data</Button>
				<Divider />
				<List
					// Use data directly now, it already is the array
					dataSource={mocking[0].data.search}
					renderItem={(item) => (
						<List.Item>
							<Card title={item._source.title} style={{ width: "100%" }}>
								<Space direction="vertical">
									<Text>
										<strong>Description:</strong> {item._source.description}
									</Text>
									<Text>
										<strong>Type:</strong> {item._source.type}
									</Text>
									<Text>
										<strong>Bulletin Family:</strong>{" "}
										{item._source.bulletinFamily}
									</Text>
									<Text>
										<strong>CVSS Score:</strong> {item._source.cvss.score}
									</Text>
									<Text>
										<strong>Published:</strong> {item._source.published}
									</Text>
									<Text>
										<strong>Modified:</strong> {item._source.modified}
									</Text>
									<Text>
										<strong>Last Seen:</strong> {item._source.lastseen}
									</Text>
									<Text>
										<strong>Source:</strong>{" "}
										<a href={item._source.sourceHref}>Link</a>
									</Text>
								</Space>
							</Card>
						</List.Item>
					)}
				/>
			</Space>
		</div>
	);
};

export default CVEResearch;
