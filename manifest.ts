const manifest: chrome.runtime.ManifestV3 = {
    manifest_version: 3,
    name: "Hack-Tools",
    version: "0.5.0",
    description: "The all in one Red team extension for web pentester",
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
    // permissions: ["contextMenus", "tabs", "activeTab", "storage"],
    // background: { service_worker: "src/pages/background/index.js" },
    devtools_page: "src/pages/devtools/index.html",
};

export default manifest;
