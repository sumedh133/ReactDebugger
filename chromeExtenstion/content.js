let debugging = false;

// Check if we're on localhost
const isLocalhost =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

// Check if it's a React app
const isReactApp = !!document.querySelector('[data-source]');


if (!isLocalhost) {
  console.log("[DevLens] Not on localhost. Extension disabled.");
} else if (!isReactApp) {
  console.log("[DevLens] Not a React app. Extension disabled.");
} else {
  console.log("[DevLens] Running on React app at localhost ✅");

  function onClick(event) {
    if (!debugging) return;

    const el = event.target.closest("[data-source]");
    if (!el) return;

    const source = el.getAttribute("data-source");
    alert(`Source: ${source}`);
  }

  document.addEventListener("click", onClick, true);

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "START_DEBUG") {
      debugging = true;
      console.log("[DevLens] Debugging enabled");
    } else if (message.type === "STOP_DEBUG") {
      debugging = false;
      console.log("[DevLens] Debugging disabled");
    }
  });
}
