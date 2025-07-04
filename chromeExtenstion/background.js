// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.source === "react-inspector") {
    // Broadcast to all panel listeners
    chrome.runtime.sendMessage(message);
  }
});
