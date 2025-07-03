document.addEventListener("click", (event) => {
  const el = event.target.closest("[data-source]");
  if (!el) return;

  const source = el.getAttribute("data-source");
  alert(`Component source: ${source}`);
});
