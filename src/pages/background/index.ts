import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import keyboardShortcut from "./KeyboardShortcut";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

// Popup mode rendering when we use the keyboard shortcut
// Chrome API cooldown (~60s) is needed to popup window right after being closed
keyboardShortcut(chrome);