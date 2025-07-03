document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  chrome.devtools.inspectedWindow.eval(
    "$0?.outerHTML",
    (result, exception) => {
      if (exception) {
        root.innerText = "⚠️ Error reading selected element.";
        console.error(exception);
      } else {
        root.innerText = "✅ Selected Element:\n\n" + result;
      }
    }
  );
});
