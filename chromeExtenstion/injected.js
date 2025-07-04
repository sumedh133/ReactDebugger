(function () {
  const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  function getSelectedElement() {
    if (!hook || !hook.getClosestFiberFromDOMNode) {
      console.warn("❌ DevTools hook or getClosestFiberFromDOMNode not found");
      return;
    }

    const $0 = window.$0; // DevTools-selected element
    if (!$0) {
      console.warn("❌ No element selected in DevTools ($0 is null)");
      return;
    }

    const fiber = hook.getClosestFiberFromDOMNode($0);
    if (!fiber) {
      console.warn("❌ No fiber found for selected element");
      return;
    }
    console.log("check")

    let owner = fiber;
    while (owner && !owner.memoizedProps) {
      owner = owner.return;
    }

    if (owner) {
      console.log("🎯 Selected React component:", owner.elementType?.name);
      console.log("📦 Props:", owner.memoizedProps);
      console.log("🧠 State:", owner.memoizedState);
    } else {
      console.warn("❌ Could not find React component from selection");
    }
  }

  // Expose for manual triggering
  window.inspectReactComponent = getSelectedElement;

  // Auto-run on DevTools selection change (when $0 changes)
  let lastInspectedEl = null;
  setInterval(() => {
    if (window.$0 !== lastInspectedEl) {
      lastInspectedEl = window.$0;
      getSelectedElement();
    }
  }, 500);
})();
