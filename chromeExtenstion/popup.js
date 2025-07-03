const toggleBtn = document.getElementById("toggle");

chrome.storage.local.get("debugging", (data) => {
  const active = data.debugging || false;
  toggleBtn.textContent = active ? "Stop Debugging" : "Start Debugging";
});

toggleBtn.addEventListener("click", () => {
  chrome.storage.local.get("debugging", (data) => {
    const current = data.debugging || false;
    const newVal = !current;

    chrome.storage.local.set({ debugging: newVal }, () => {
      toggleBtn.textContent = newVal ? "Stop Debugging" : "Start Debugging";

      // Notify content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: newVal ? "START_DEBUG" : "STOP_DEBUG",
        });
      });
    });
  });
});
