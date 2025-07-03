document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("output");

  function render(data) {
    const { outerHTML, classList, dataAttributes } = data;

    let dataAttrHTML = "";
    for (const key in dataAttributes) {
      dataAttrHTML += `<div><strong>${key}</strong>: ${dataAttributes[key]}</div>`;
    }

    let openButton = "";
    if (dataAttributes["data-source"]) {
      openButton = `
        <button id="open-in-vscode" style="margin-top: 10px; padding: 6px 10px; background: #26650B; color: white; border: none; border-radius: 4px; cursor: pointer;">
          📝 Open in VS Code
        </button>
      `;
    }

    root.innerHTML = `
      <div>
        <h3>🔍 Element Info</h3>
        <p><strong>Classes:</strong> ${classList || "—"}</p>
        <h4>Data Attributes</h4>
        ${dataAttrHTML || "<p>—</p>"}
        ${openButton}
        <h4>Outer HTML</h4>
        <pre style="background:#eee; padding:10px;">${outerHTML}</pre>
        <iframe id="vscode-opener" style="display:none;"></iframe>
      </div>
    `;

    const vscodeBtn = document.getElementById("open-in-vscode");
    if (vscodeBtn) {
      const file = dataAttributes["data-source"];
      
      vscodeBtn.addEventListener("click", () => {
        // Use your hardcoded test value
        const path = `C:/TruEstate/debugger/lens/src/Components/Footer.tsx:60:1`;

        // Normalize and create the vscode URL
        const url = `vscode://file/${path.replace(/\\/g, "/")}`;

        // Use iframe to avoid tab issues
        const iframe = document.getElementById("vscode-opener");
        iframe.src = url;
      });
    }
  }

  function refresh() {
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
          render(result);
        } else {
          root.innerHTML = "<p style='color:red;'>⚠️ Failed to get selected element.</p>";
        }
      }
    );
  }

  document.getElementById("refresh").addEventListener("click", refresh);
  refresh(); // Auto-refresh on load
});
