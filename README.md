<div align="center">
  <img alt="logo_hack_tools" src="https://i.imgur.com/yoUssC7.png" />
  <h1>Welcome to HackTools !</h1>
  <p>
    <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000&style=for-the-badge" />
    <a href="https://addons.mozilla.org/en-US/firefox/addon/hacktools" target="_blank">
      <img alt="mozilla" src="https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white" />
    </a>
    <a href="https://chrome.google.com/webstore/detail/hack-tools/cmbndhnoonmghfofefkcccljbkdpamhi?hl=en" target="_blank">
      <img alt="chrome-extension" src="https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white" />
    </a>
    <a href="https://github.com/LasCC/Hack-Tools/issues/88" target="_blank">
      <img alt="safari-extension" src="https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=Safari&logoColor=white" />
    </a>
    <img alt="Downloads" src="https://img.shields.io/github/downloads/LasCC/Hack-Tools/total.svg?style=for-the-badge" />
    <a href="https://inventory.raw.pm/" target="_blank">
      <img alt="RawSecInventory" src="https://inventory.raw.pm/img/badges/Rawsec-inventoried-FF5050_for-the-badge.svg" />
    <a/>
  </p>
  <p align="center">
    <a href="#the-all-in-one-browser-extension-for-offensive-security-professionals"><b>Introduction</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#preview"><b>Preview</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#install-the-extension"><b>Install</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#build-from-source-code"><b>Build</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#show-your-support"><b>Support</b></a>
  </p>
</div>

---

>[!NOTE]  
>Dear Users,
>
>We're excited to announce a major revamp of our app! Due to recent changes and multiple complications with the browser extension environment, we have decided to develop HackTools as a web application moving forward.
>
>To keep you engaged, we have uploaded our latest browser extension build alpha at this link: [https://hacktools.sh](https://hacktools.sh/)
>
>Stay tuned for exciting new features and improvements coming soon!
>
>Thank you for your support.

---

### The all-in-one browser extension for **offensive security professionals**

HackTools, is a web extension facilitating your **web application penetration tests**, it includes **cheat sheets** as well as all the **tools** used during a test such as XSS payloads, Reverse shells and much more.

With the extension you **no longer need to search for payloads in different websites** or in your local storage space, most of the tools are accessible in one click. HackTools is accessible either in pop up mode or in a whole tab in the Devtools part of the browser with <kbd>F12</kbd>.

### Current functions

- Dynamic Reverse Shell generator (PHP, Bash, Ruby, Python, Perl, Netcat)
- Shell Spawning (TTY Shell Spawning)
- XSS Payloads
- Basic SQLi payloads
- Local file inclusion payloads (LFI)
- Base64 Encoder / Decoder
- Hash Generator (MD5, SHA1, SHA256, SHA512, SM3)
- Useful Linux commands (Port Forwarding, SUID)
- Various method of data exfiltration and download from a remote machine

#### Command Palette

With the new version of the extension, a command panel has been added in order to facilitate the use of the experience. The command panel allows you to access all the functions of the extension in a few keystrokes.

To open the command palette, you can use the shortcut <kbd>CTRL</kbd> + <kbd>K</kbd> or <kbd>⌘</kbd> + <kbd>K</kbd> on macOS.

- You can use the <kbd>↑</kbd> and <kbd>↓</kbd> arrow keys to navigate through the different commands.
- <kbd>Enter</kbd> to validate your choice.
- <kbd>⌘</kbd> + <kbd>L</kbd> to toggle the dark theme.
- <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>1,2,3,4</kbd> to switch between the different tabs.

## Preview

<div align='center'>
  <img alt="preview_2" src="https://i.imgur.com/7Q09ZwW.png" />
</div>

<div align='center'>
  <img alt="preview_3" src="https://i.imgur.com/JPH0dIW.png" />
</div>

<div align='center'>
  <img alt="preview_4" src="https://i.imgur.com/UFZX7xH.png" />
</div>

<div align='center'>
  <img alt="preview_5" src="https://i.imgur.com/TtfhQf9.png" />
</div>

<div align='center'>
  <img alt="preview_6" src="https://i.imgur.com/l8mppjS.png" />
</div>

# Install the extension

<h2> 
  <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/chromium.svg" alt="chromium_icon" title='Chromium' width="35" height="35" style="float:left;margin-right:5px;" />
   Chromium based browser
</h2>

You can download the **latest build** [here.](https://github.com/LasCC/Hack-Tools/releases)

Or, you can download the extension on the **chrome web store** [here.](https://chrome.google.com/webstore/detail/hack-tools/cmbndhnoonmghfofefkcccljbkdpamhi)

Otherwise, you can build the project yourself from the source code

<h2> 
  <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/firefox.svg" alt="firefox_icon" title='Firefox' width="35" height="35" style="float:left;margin-right:5px;" /> 
   Mozilla Firefox
</h2>

You can download **HackTools** on the Firefox browser add-ons [here.](https://addons.mozilla.org/en-US/firefox/addon/hacktools/)

<h2> 
  <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/safari.svg" alt="safari_icon" title='Safari' width="35" height="35" style="float:left;margin-right:5px;" /> 
   Instructions to build for Safari
</h2>

Create a safari web extension project using the command below. _This is to be run once._

```bash
xcrun safari-web-extension-coverter [path_to_dist_folder]
```

Follow the instructions to create the project the default language should be Swift.

- Build project.
- Open Safari and enable unsigned extensions; Develop -> Allow Unsigned Extensions.
- Open Safari -> Preferences -> Extensions and enable Hack-Tools
- Click on the extension icon and switch to full screen mode.

_Instructions provided by [jayluxferro](https://github.com/LasCC/Hack-Tools/issues/88)_

### Build from source code

```bash
git clone https://github.com/LasCC/Hack-Tools.git
cd Hack-Tools
npm install && npm run build
```

Once the build is done correctly, webpack will create a new folder called **dist**

After that you need to go to the **extension** tab on your chrome based navigator and turn on the **developer mode**

<img alt="extension_tutorial" src="https://i.imgur.com/ZHwUTfk.png" />

Then click on the **load unpacked** button in the top left corner

<img alt="extension_tutorial" src="https://i.imgur.com/TLDjLyO.png" />

Once you clicked on the button you just need to select the **dist folder** and that's it ! 🎉

<img alt="extension_tutorial" src="https://i.imgur.com/fH894v8.png" />

## Authors

👤 <a href="http://github.com/LasCC" alt="Github_account_Ludovic_COULON" target="_blank">**Ludovic COULON**</a> & <a href="http://github.com/rb-x" alt="Github_account_Riadh_BOUCHAHOUA" target="_blank">**Riadh BOUCHAHOUA**</a>

## Show your support

You can give a ⭐️ if this project helped you !

Note that this project is maintained, developed and made available for **free**, you can offer us a coffee, it will be very **encouraging and greatly appreciated** 😊

<a href="https://www.paypal.me/hacktoolsEXT" target="_blank"><img src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" alt="Paypal" style="height: 30px !important;width: auto !important"></a>
