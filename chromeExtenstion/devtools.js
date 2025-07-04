chrome.devtools.panels.create("DevLens", null, "panel.html", function (panel) {
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
    if (!el) return;

    const fiberKey = Object.keys(el).find(k =>
      k.startsWith("__reactFiber$") || k.startsWith("__reactInternalInstance$")
    );
    const fiber = fiberKey ? el[fiberKey] : null;
    if (!fiber) return;

    let current = fiber;
    while (current && (typeof current.type === "string" || !current.type)) {
      current = current.return;
    }
    if (!current) return;

    window.__reactFiberTarget = current;
    patchFiberState(current);
    inspectFiber(current);
  };

  function inspectFiber(current) {
    const name = current.type?.name || current.elementType?.name || "[Anonymous]";
    const lineData = findSourceData(current);
    const props = safeClone(current.memoizedProps);
    const state = safeClone(extractHookStates(current.memoizedState));

    window.postMessage({
      source: "react-inspector",
      type: "fiberData",
      payload: {
        name,
        props,
        state,
        fileInfo: lineData
      }
    }, "*");
  }

  function extractHookStates(hookState) {
    const result = [];
    let current = hookState, i = 0;
    while (current) {
      result.push({ index: i, value: current.memoizedState });
      current = current.next;
      i++;
    }
    return result;
  }

  function patchFiberState(current) {
    let hook = current.memoizedState;
    while (hook) {
      if (hook.queue?.dispatch && !hook.queue.__patched) {
        const originalDispatch = hook.queue.dispatch;
        hook.queue.dispatch = function (...args) {
          const result = originalDispatch.apply(this, args);
          setTimeout(() => {
            if (window.__reactFiberTarget) {
              inspectFiber(window.__reactFiberTarget);
            }
          }, 0);
          hook.queue.__patched = true;
          return result;
        };
      }
      hook = hook.next;
    }
  }

  function findSourceData(fiber) {
    const hostEl = fiber.stateNode;
    if (!hostEl?.getAttribute) return null;
    const attr = hostEl.getAttribute("data-source");
    if (!attr) return null;
    const [file, line] = attr.split(":");
    return { file, line };
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
}
