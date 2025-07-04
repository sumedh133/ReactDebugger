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
  const raw = dataAttributes["data-source"]; // e.g., C:\TruEstate\...\File.tsx:60:1
  const match = raw.match(/^(.+?):(\d+)/); // non-greedy up to first colon

  if (match) {
    let absPath = match[1].replace(/\\/g, "/"); // force Windows path to forward slashes
    const line = match[2];

    // Build clean VS Code URI
    const vscodeUrl = `vscode://file/${absPath}:${line}`;

    // Optional debug output
    console.log("Opening VS Code URL:", vscodeUrl);

    // Show link to user (debug)
    const linkDisplay = document.createElement("p");
    linkDisplay.innerHTML = `<strong>VS Code Link:</strong> <a href="${vscodeUrl}" style="color: #4ade80;">${vscodeUrl}</a>`;
    document.getElementById("output").appendChild(linkDisplay);

    vscodeBtn.addEventListener("click", () => {
      document.getElementById("vscode-opener").src = vscodeUrl;
    });
  } else {
    console.warn("Could not parse data-source:", raw);
  }
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
