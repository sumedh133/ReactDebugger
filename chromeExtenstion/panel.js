document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("name");
  const sourceEl = document.getElementById("source");
  const propsEl = document.getElementById("props");
  const stateEl = document.getElementById("state");
  const tailwindEl = document.getElementById("tailwind");
  const output = document.getElementById("output");

  function safeSet(el, html) {
    el.innerHTML = html || "—";
  }

  function renderReact(name, props, state) {
    console.log("📦 React Data:", { name, props, state });
    safeSet(nameEl, `🎯 ${name}`);
    propsEl.textContent = JSON.stringify(props, null, 2);
    stateEl.textContent = JSON.stringify(state.map((s) => s.value), null, 2);
  }

  function renderDOM(data) {
    const { outerHTML, classList, dataAttributes } = data;

    // Tailwind class list
    safeSet(tailwindEl, classList || "—");

    // VS Code Source Line
    const sourceAttr = dataAttributes["data-source"];
    if (sourceAttr) {
      safeSet(
        sourceEl,
        `<div class="file-link" id="open-in-vscode">📂 ${sourceAttr}</div>`
      );

      const vscodeBtn = document.getElementById("open-in-vscode");
      const match = sourceAttr.match(/^(.+?):(\d+)/);
      if (match) {
        const path = match[1].replace(/\\/g, "/");
        const line = match[2];
        const vscodeUrl = `vscode://file/${path}:${line}`;

        vscodeBtn.addEventListener("click", () => {
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = vscodeUrl;
          document.body.appendChild(iframe);
        });

        console.log("🛠 VS Code URL:", vscodeUrl);
      } else {
        console.warn("⚠️ Couldn’t parse source path:", sourceAttr);
      }
    } else {
      sourceEl.innerText = "—";
    }

    console.log("🔍 Data Attributes:", dataAttributes);
    console.log("📄 Outer HTML:", outerHTML);
  }

  function refresh() {
    chrome.devtools.inspectedWindow.eval(`window.__inspectReactFiber?.()`);

    chrome.devtools.inspectedWindow.eval(
      `(() => {
        const el = $0;
        if (!el) return null;
        const attrs = {};
        for (const attr of el.attributes) {
          if (attr.name.startsWith("data-")) {
            attrs[attr.name] = attr.value;
          }
        }
        return {
          outerHTML: el.outerHTML,
          classList: el.className,
          dataAttributes: attrs
        };
      })()`,
      (result, exception) => {
        if (!exception && result) {
          renderDOM(result);
        } else {
          sourceEl.innerHTML = "<p style='color:red;'>⚠️ Failed to get selected element.</p>";
        }
      }
    );
  }

  document.getElementById("refresh").addEventListener("click", refresh);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.source === "react-inspector" && message.type === "fiberData") {
      const { name, props, state } = message.payload;
      renderReact(name, props, state);
    }
  });

  refresh(); // Initial load
});
