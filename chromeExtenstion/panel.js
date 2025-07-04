chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.source === "react-inspector" && message.type === "fiberData") {
    const { name, props, state } = message.payload;
    render(name, props, state);
  }
});

function render(name, props, state) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>🎯 <b>${name}</b></h2>
    <h3>📦 Props</h3>
    <pre>${JSON.stringify(props, null, 2)}</pre>
    <h3>🧠 State</h3>
    <pre>${JSON.stringify(state.map(s => s.value), null, 2)}</pre>
  `;
}
