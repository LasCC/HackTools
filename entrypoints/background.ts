import "./background/keyboardShortcut.bg";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
});
