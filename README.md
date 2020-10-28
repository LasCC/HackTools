<div align="center">
  <img alt="logo_hack_tools" src="https://i.imgur.com/evnvda2.png" />
  <h1>Welcome to HackTools 🛠</h1>
  <p>
    <img alt="Version" src="https://img.shields.io/badge/version-0.2.1-blue.svg?cacheSeconds=2592000" />
    <img alt="release" src="https://img.shields.io/github/v/release/LasCC/Hack-Tools?color=yellow" />
    <a href="https://addons.mozilla.org/en-US/firefox/addon/hacktools" target="_blank">
    <img alt="mozilla" src="https://img.shields.io/amo/v/hacktools?color=purple&label=mozilla%20addons&logo=mozilla" />
    </a>
    <img alt="commit" src="https://img.shields.io/github/last-commit/LasCC/Hack-Tools" />
    <img alt="stars" src="https://img.shields.io/github/stars/LasCC/Hack-Tools?style=social" />
  </p>
  <p align="center">
    <a href="#the-all-in-one-red-team-browser-extension-for-web-pentesters"><b>Introduction</b></a>
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

### The all-in-one Red Team browser extension for **Web Pentesters**

HackTools, is a web extension facilitating your **web application penetration tests**, it includes **cheat sheets** as well as all the **tools** used during a test such as XSS payloads, Reverse shells and much more.

With the extension you **no longer need to search for payloads in different websites** or in your local storage space, most of the tools are accessible in one click. HackTools is accessible either in **pop up mode** or in a whole tab in the **Devtools** part of the browser with F12.

### Current functions:

- Dynamic Reverse Shell generator (PHP, Bash, Ruby, Python, Perl, Netcat)
- Shell Spawning (TTY Shell Spawning)
- XSS Payloads
- Basic SQLi payloads
- Local file inclusion payloads (LFI)
- Base64 Encoder / Decoder
- Hash Generator (MD5, SHA1, SHA256, SHA512, SM3)
- Useful Linux commands (Port Forwarding, SUID)
- RSS Feed (Exploit DB, Cisco Security Advisories, CXSECURITY)
- CVE Search Engine
- Various method of data exfiltration and download from a remote machine

## Preview

<div align='center'>
  <img alt="preview_1" src="https://i.imgur.com/02ym26m.png" />
</div>

<div align='center'>
  <img alt="preview_2" src="https://i.imgur.com/A22KDs7.png" />
</div>

<div align='center'>
  <img alt="preview_3" src="https://i.imgur.com/TxWUC7r.png" />
</div>

<div align='center'>
  <img alt="preview_4" src="https://i.imgur.com/KrDX7t6.png" />
</div>

# Install the extension

## Chromium based browser

All the available releases are [here.](https://github.com/LasCC/Hack-Tools/releases)

Otherwise, if you want to build the project yourself from the source code

## Mozilla Firefox

You can download **HackTools** on the Firefox browser add-ons [here.](https://addons.mozilla.org/en-US/firefox/addon/hacktools/)

## Build from source code

```node
yarn install && yarn build
```

Once the build is done correctly, webpack will create a new folder called **dist**

After that you need to go to the **extension** tab on your chrome based navigator and turn on the **developer mode**

<img alt="extension_tutorial" src="https://i.imgur.com/0GRfu2K.png" />

Then click on the **load unpacked** button in the top left corner

<img alt="extension_tutorial" src="https://i.imgur.com/q41GeAb.png" />

Once you clicked on the button you just need to select the **dist folder** and that's it ! 🎉

<img alt="extension_tutorial" src="https://i.imgur.com/mL4TVu0.png" />

## Authors

👤 **Ludovic COULON & Riadh BOUCHAHOUA**

## Show your support

You can give a ⭐️ if this project helped you !

Note that this project is maintained, developed and made available for **free**, you can offer us a coffee, it will be very **encouraging and greatly appreciated** 😊

<a href="https://www.paypal.me/hacktoolsEXT" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important" ></a>
