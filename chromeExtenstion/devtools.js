chrome.devtools.panels.create("React Inspector", null, "panel.html", function (panel) {
  panel.onShown.addListener(() => {
    // Inject helper function into the page
    chrome.devtools.inspectedWindow.eval(`(${injectInspector.toString()})()`);

    // Set interval to inspect selected React component
    setInterval(() => {
      // Call the injected function from within the page context
      chrome.devtools.inspectedWindow.eval(`window.__inspectReactFiber?.()`);
    }, 1000);
  });
});

function injectInspector() {
  window.__inspectReactFiber = function () {
    const el = window.$0;
    if (!el) {
      console.warn("❌ No element selected in Elements panel.");
      return;
    }

    const fiberKey = Object.keys(el).find(k =>
      k.startsWith("__reactFiber$") || k.startsWith("__reactInternalInstance$")
    );
    const fiber = fiberKey ? el[fiberKey] : null;
    if (!fiber) {
      console.warn("❌ No React fiber found on selected element.");
      return;
    }

    let current = fiber;
    while (current && (typeof current.type === "string" || !current.type)) {
      current = current.return;
    }

    if (!current) {
      console.warn("❌ No React component instance found.");
      return;
    }

    const name = current.type?.name || current.elementType?.name || "[Anonymous]";
    console.clear();
    console.log(`🎯 React Component: %c${name}`, "color: green; font-weight: bold;");
    console.log("📦 Props:", current.memoizedProps);
    console.log("🧠 State:", current.memoizedState);
  };

  console.log("✅ React Inspector helper injected.");
}
