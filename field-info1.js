(function () {
  console.log("field-info1 loaded");

  const tooltipText = "A dwelling limit is the maximum amount your home insurance pays.";

  function normalizeText(text) {
    return (text || "")
      .replace(/\s+/g, " ")
      .replace(/\*/g, "")
      .trim()
      .toLowerCase();
  }

  function alreadyHasIcon(node) {
    return !!node.querySelector(".custom-info-wrap");
  }

  function tryAttachToNode(node) {
    if (!node || alreadyHasIcon(node)) return false;

    const text = normalizeText(node.textContent);
    if (!text.includes("dwelling limit")) return false;

    const wrap = document.createElement("span");
    wrap.className = "custom-info-wrap";

    const icon = document.createElement("span");
    icon.className = "custom-info-icon";
    icon.textContent = "i";

    const tip = document.createElement("span");
    tip.className = "custom-info-tip";
    tip.textContent = tooltipText;

    wrap.appendChild(icon);
    wrap.appendChild(tip);
    node.appendChild(wrap);

    console.log("Attached tooltip to:", node);
    return true;
  }

  function addInfoButtons() {
    const selectors = [
      "label",
      "legend",
      "span",
      "div",
      "p",
      ".label",
      ".field-label",
      ".form_label",
      ".field-title",
      ".frm-label",
      ".title"
    ].join(",");

    const nodes = document.querySelectorAll(selectors);
    let attached = 0;

    nodes.forEach((node) => {
      if (tryAttachToNode(node)) attached++;
    });

    console.log("Tooltip attachments:", attached);
  }

  function init() {
    addInfoButtons();

    const observer = new MutationObserver(() => {
      addInfoButtons();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
