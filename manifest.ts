const manifest: chrome.runtime.ManifestV3 = {
    manifest_version: 3,
    name: "Hack-Tools",
    version: "1.0.0",
    description: "The all in one browser extension for offensive security professionals",
    action: {
        default_title: "Hack-Tools",
        default_popup: "src/pages/popup/index.html",
        default_icon: {
            "16": "./icons/ht_icon16.png",
            "32": "./icons/ht_icon32.png",
            "48": "./icons/ht_icon48.png",
            "128": "./icons/ht_icon128.png",
        },
    },
    icons: {
        "16": "./icons/ht_icon16.png",
        "32": "./icons/ht_icon32.png",
        "48": "./icons/ht_icon48.png",
        "128": "./icons/ht_icon128.png",
    },
    commands: {
        panel: {
            description: "Open popup window",
            global: true,
            suggested_key: {
                default: "Ctrl+Shift+2",
                mac: "MacCtrl+Shift+2"
            }
        }
    },
    background: { service_worker: "src/pages/background/index.js" },
    devtools_page: "src/pages/devtools/index.html",
};

export default manifest;
