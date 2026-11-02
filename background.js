const MENU_ID = "page-qr-show";

function createMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: "Показать QR-код страницы",
      contexts: ["page"]
    });
  });
}

chrome.runtime.onInstalled.addListener(createMenu);
chrome.runtime.onStartup.addListener(createMenu);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID || !tab?.id) {
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  }).catch((error) => {
    // Browser-internal and privileged pages cannot be scripted.
    console.warn("Page QR could not run on this page:", error.message);
  });
});
