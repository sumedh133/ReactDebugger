// content.js
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data?.source === "react-inspector") {
    chrome.runtime.sendMessage(event.data);
  }
});
