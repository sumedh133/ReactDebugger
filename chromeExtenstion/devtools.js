chrome.devtools.panels.create("React Inspector", null, "panel.html", function (panel) {
  panel.onShown.addListener(() => {
    chrome.devtools.inspectedWindow.eval(`(${injectInspector.toString()})()`);

    chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
      chrome.devtools.inspectedWindow.eval(`window.__inspectReactFiber?.()`);
    });
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

    // Store for future update triggers
    window.__reactFiberTarget = current;

    // Start watching for dispatches
    patchFiberState(current);

    // Inspect immediately
    inspectFiber(current);
  };

  function inspectFiber(current) {
    const name = current.type?.name || current.elementType?.name || "[Anonymous]";
    console.clear();
    console.log(`🎯 React Component: %c${name}`, "color: green; font-weight: bold;");
    console.log("📦 Props:", current.memoizedProps);

    function extractHookStates(hookState) {
      const result = [];
      let current = hookState;
      let i = 0;

      while (current) {
        result.push({ index: i, value: current.memoizedState });
        current = current.next;
        i++;
      }

      return result;
    }

    const hookStates = extractHookStates(current.memoizedState);

    console.log("🧠 State Hooks:");
    hookStates.forEach(({ index, value }) => {
      console.log(`State[${index}]:`, value);
    });
  }

  function patchFiberState(current) {
    let hook = current.memoizedState;
    while (hook) {
      if (hook.queue && hook.queue.dispatch && !hook.queue.__patched) {
        const originalDispatch = hook.queue.dispatch;
        hook.queue.dispatch = function (...args) {
          const result = originalDispatch.apply(this, args);
          setTimeout(() => {
            if (window.__reactFiberTarget) {
              inspectFiber(window.__reactFiberTarget);
            }
          }, 0);
          return result;
        };
        hook.queue.__patched = true;
      }
      hook = hook.next;
    }
  }

  console.log("✅ React Inspector helper injected.");
}
