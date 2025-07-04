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

    window.__reactFiberTarget = current;
    patchFiberState(current);
    inspectFiber(current);
  };

  function inspectFiber(current) {
    const name = current.type?.name || current.elementType?.name || "[Anonymous]";

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

    console.clear();
    console.log(`🎯 React Component: %c${name}`, "color: green; font-weight: bold;");
    console.log("📦 Props:", current.memoizedProps);
    console.log("🧠 State Hooks:");
    hookStates.forEach(({ index, value }) => {
      console.log(`State[${index}]:`, value);
    });

    const cleanedProps = safeClone(current.memoizedProps);
    const cleanedState = safeClone(hookStates);

    window.postMessage({
      source: "react-inspector",
      type: "fiberData",
      payload: {
        name,
        props: cleanedProps,
        state: cleanedState,
      },
    }, "*");
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

  function safeClone(obj) {
    const seen = new WeakSet();
    return JSON.parse(JSON.stringify(obj, (key, value) => {
      if (typeof value === "function") return "[Function]";
      if (typeof value === "symbol") return "[Symbol]";
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return "[Circular]";
        seen.add(value);
      }
      return value;
    }));
  }

  console.log("✅ React Inspector helper injected.");
}
