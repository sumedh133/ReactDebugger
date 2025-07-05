function addJsonSearch() {
  // Create search container
  const searchContainer = document.createElement('div');
  searchContainer.className = 'json-search-container';
  searchContainer.style = 'margin-bottom: 10px; display: flex; gap: 5px;';
  
  // Create search input
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search in props and state...';
  searchInput.style = 'flex-grow: 1; padding: 5px; border: 1px solid #ccc; border-radius: 4px;';
  
  // Create search button
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  searchButton.style = 'padding: 5px 10px; background: #0078d7; color: white; border: none; border-radius: 4px; cursor: pointer;';
  
  // Create clear button
  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear';
  clearButton.style = 'padding: 5px 10px; background: #f0f0f0; border: none; border-radius: 4px; cursor: pointer;';
  
  // Append elements
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(searchButton);
  searchContainer.appendChild(clearButton);
  
  // Insert before props and state sections
  const propsHeader = document.querySelector('h3[data-section="props"]') || document.querySelector('h3:nth-of-type(1)');
  if (propsHeader) {
    propsHeader.parentNode.insertBefore(searchContainer, propsHeader);
  } else {
    document.getElementById('props').parentNode.insertBefore(searchContainer, document.getElementById('props'));
  }
  
  // Expand nodes function
  function expandAllNodes() {
    const togglers = document.querySelectorAll('.json-formatter-row:not(.json-formatter-open) > .json-formatter-toggler-link');
    if (togglers.length === 0) return false; // No more to expand
    
    togglers.forEach(toggler => toggler.click());
    return true; // We expanded some nodes
  }
  
  // Recursive expand function
  function expandAllRecursively(callback) {
    if (expandAllNodes()) {
      // If we expanded nodes, there might be more nested ones, so wait a bit and try again
      setTimeout(() => expandAllRecursively(callback), 50);
    } else {
      // No more nodes to expand, now execute the callback
      if (callback) callback();
    }
  }
  
  // Search in both expanded and collapsed content
  function searchInJson() {
    const searchTerm = searchInput.value.toLowerCase();
    if (!searchTerm) return;
    
    // Function to perform the search after expansion
    function performSearch() {
      // Remove existing highlights
      const highlights = document.querySelectorAll('.json-search-highlight');
      highlights.forEach(el => {
        el.classList.remove('json-search-highlight');
      });
      
      // Search in key and value elements
      const keyElements = document.querySelectorAll('.json-formatter-key');
      const valueElements = document.querySelectorAll('.json-formatter-string, .json-formatter-number, .json-formatter-boolean');
      
      let foundElements = [];
      
      // Search in keys
      keyElements.forEach(el => {
        if (el.textContent.toLowerCase().includes(searchTerm)) {
          el.classList.add('json-search-highlight');
          foundElements.push(el);
        }
      });
      
      // Search in values
      valueElements.forEach(el => {
        if (el.textContent.toLowerCase().includes(searchTerm)) {
          el.classList.add('json-search-highlight');
          foundElements.push(el);
        }
      });
      
      // Scroll to first result
      if (foundElements.length > 0) {
        foundElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        alert('No matches found for: ' + searchTerm);
      }
    }
    
    // First expand all nodes, then search
    expandAllRecursively(performSearch);
  }
  
  // Clear search
  function clearSearch() {
    searchInput.value = '';
    const highlights = document.querySelectorAll('.json-search-highlight');
    highlights.forEach(el => {
      el.classList.remove('json-search-highlight');
    });
  }
  
  // Add event listeners
  searchButton.addEventListener('click', searchInJson);
  clearButton.addEventListener('click', clearSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchInJson();
  });
}
function addSearchStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .json-search-highlight {
      background-color: yellow !important;
      color: black !important;
      padding: 0 2px !important;
    }
    .json-search-container {
      margin: 10px 0;
    }
  `;
  document.head.appendChild(style);
}
document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("name");
  const propsEl = document.getElementById("props");
  const stateEl = document.getElementById("state");
  const tailwindEl = document.getElementById("tailwind");
  const output = document.getElementById("output");
  const vscodeBtn = document.getElementById("vscode-btn");
  addSearchStyles();
  addJsonSearch();

  const CLASS_GROUPS = {
    Spacing: ["m", "p", "gap", "space"],
    Sizing: ["w", "h", "min", "max"],
    Layout: ["flex", "grid", "block", "inline", "absolute", "relative", "fixed"],
    Text: ["text", "font", "leading", "tracking", "truncate", "whitespace"],
    Color: ["bg", "text", "border", "from", "to", "via", "ring"],
    Border: ["border", "rounded", "divide"],
    Animation: ["transition", "animate", "duration", "ease", "delay"],
    Effects: ["shadow", "opacity", "filter", "blur"],
    Misc: ["cursor", "select", "z", "overflow", "align", "justify", "items", "content"]
  };

  function safeSet(el, html) {
    el.innerHTML = html || "—";
  }

  // Updated renderReact function to use JSONFormatter
  function renderReact(name, props, state) {
    safeSet(nameEl, `🎯 ${name}`);
    
    // Clear previous content
    propsEl.innerHTML = '';
    stateEl.innerHTML = '';
    
    // Format props with JSONFormatter
    if (props && Object.keys(props).length > 0) {
      const propsFormatter = new JSONFormatter(props, 1, {
        hoverPreviewEnabled: true,
        animateOpen: true,
        animateClose: true
      });
      propsEl.appendChild(propsFormatter.render());
    } else {
      propsEl.textContent = '{}';
    }
    
    // Format state with JSONFormatter
    const stateValues = state.map(s => s.value);
    if (stateValues && stateValues.length > 0) {
      const stateFormatter = new JSONFormatter(stateValues, 1, {
        hoverPreviewEnabled: true,
        animateOpen: true,
        animateClose: true
      });
      stateEl.appendChild(stateFormatter.render());
    } else {
      stateEl.textContent = '[]';
    }
  }

  function categorizeTailwindClasses(classListStr) {
    const classes = classListStr.trim().split(/\s+/);
    const grouped = {};

    for (const cls of classes) {
      let added = false;
      for (const [group, prefixes] of Object.entries(CLASS_GROUPS)) {
        if (prefixes.some(prefix => cls.startsWith(prefix))) {
          if (!grouped[group]) grouped[group] = [];
          grouped[group].push(cls);
          added = true;
          break;
        }
      }
      if (!added) {
        if (!grouped["Other"]) grouped["Other"] = [];
        grouped["Other"].push(cls);
      }
    }

    return grouped;
  }

  function renderTailwindClasses(classListStr) {
    if (!classListStr) {
      tailwindEl.innerHTML = "—";
      return;
    }

    const grouped = categorizeTailwindClasses(classListStr);
    let html = "";

    for (const group of Object.keys(grouped).sort()) {
      html += `<div><strong>${group}</strong></div>`;
      html += `<div class="tags" style="margin-bottom: 4px;">`;
      html += grouped[group]
        .sort((a, b) => a.localeCompare(b))
        .map(cls => `<span class="tag">${cls}</span>`)
        .join(" ");
      html += `</div>`;
    }

    tailwindEl.innerHTML = html;
  }

  function renderDOM(data) {
    const { outerHTML, classList, dataAttributes } = data;
    renderTailwindClasses(classList);

    const sourceAttr = dataAttributes["data-source"];
    if (sourceAttr) {
      const match = sourceAttr.match(/^(.+?):(\d+)/);
      if (match) {
        const path = match[1].replace(/\\/g, "/");
        const line = match[2];
        const vscodeUrl = `vscode://file/${path}:${line}`;

        vscodeBtn.style.display = "inline-block";
        vscodeBtn.onclick = () => {
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = vscodeUrl;
          document.body.appendChild(iframe);
        };
      } else {
        vscodeBtn.style.display = "none";
      }
    } else {
      vscodeBtn.style.display = "none";
    }
  }

  function fetchDOMInfo() {
    chrome.devtools.inspectedWindow.eval(
      `(${function() {
        const el = $0;
        if (!el) return null;

        const attrs = {};
        for (const attr of el.attributes) {
          if (attr.name.startsWith("data-")) {
            attrs[attr.name] = attr.value;
          }
        }

        const originalStyle = window.getComputedStyle(el);
        const rawClasses = el.className.split(/\\s+/);
        const dummy = document.createElement(el.tagName);
        dummy.style.all = 'initial';
        document.body.appendChild(dummy);

        const relevantProps = [
          "display", "position", "top", "left", "right", "bottom",
          "zIndex", "width", "height", "margin", "padding",
          "color", "backgroundColor", "fontSize", "fontWeight",
          "flexDirection", "justifyContent", "alignItems", "textAlign",
          "overflow", "visibility", "opacity", "gap", "border", "borderRadius"
        ];

        const activeClasses = [];

        for (const cls of rawClasses) {
          dummy.className = cls;
          const testStyle = getComputedStyle(dummy);
          const matches = relevantProps.some(prop => testStyle[prop] === originalStyle[prop]);
          if (matches) activeClasses.push(cls);
        }

        dummy.remove();

        return {
          outerHTML: el.outerHTML,
          classList: activeClasses.join(" "),
          dataAttributes: attrs
        };
      }})()`,
      (result, exception) => {
        if (!exception && result) {
          renderDOM(result);
        } else {
          vscodeBtn.style.display = "none";
          output.innerHTML = "<p style='color:red;'>⚠️ Failed to get selected element.</p>";
        }
      }
    );
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message?.source === "react-inspector" && message.type === "fiberData") {
      const { name, props, state } = message.payload;
      renderReact(name, props, state);
    }
  });

  chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
    chrome.devtools.inspectedWindow.eval(`window.__inspectReactFiber?.()`);
    fetchDOMInfo();
  });

  // Initial load
  setTimeout(() => {
    chrome.devtools.inspectedWindow.eval(`!!$0`, (hasSelection) => {
      if (hasSelection) {
        chrome.devtools.inspectedWindow.eval(`window.__inspectReactFiber?.()`);
        fetchDOMInfo();
      } else {
        output.innerHTML = "⚠️ Select a DOM node to inspect.";
      }
    });
  }, 300);
});