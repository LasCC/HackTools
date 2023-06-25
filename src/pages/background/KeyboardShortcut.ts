export default function (chrome) {
    if (!chrome) return
    let /**@type chrome.windows.Window*/windowInst = null
    const windowModeHandler = () => {
        if (windowInst) return chrome.windows.update(windowInst.id, { focused: true })
        const width = 1100;
        const height = 800;
        chrome.windows.create({
            url: chrome.runtime.getURL('src/pages/popup/index.html'),
            width: width,
            height: height,
            type: 'popup'
        }, window => windowInst = window)
    }
    chrome.commands.onCommand.addListener(command => {
        if (command === 'panel') {
            windowModeHandler()
        }
    })
}
