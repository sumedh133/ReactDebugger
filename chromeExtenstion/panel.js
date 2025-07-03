function getSelectedElementInfo() {
  chrome.devtools.inspectedWindow.eval(`
    (function() {
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
    })()
  `, (result, exception) => {
    const output = document.getElementById("output");
    if (exception || !result) {
      output.innerHTML = "<p style='color:red;'>⚠️ No element selected or error occurred.</p>";
      return;
    }

    output.innerHTML = `
      <h3>🔍 Element Info</h3>
      <p><strong>Classes:</strong> ${result.classList || '—'}</p>
      <p><strong>Data Attributes:</strong></p>
      <pre>${JSON.stringify(result.dataAttributes, null, 2)}</pre>
      <p><strong>Outer HTML:</strong></p>
      <pre>${result.outerHTML}</pre>
    `;
  });
}

document.getElementById("refresh").addEventListener("click", getSelectedElementInfo);

// Optionally load on open:
getSelectedElementInfo();
