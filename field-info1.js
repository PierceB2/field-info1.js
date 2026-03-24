(function () {
  console.log("field-info1 loaded");

  const tooltips = {
    "Dwelling Limit": "A dwelling limit is the maximum amount your home insurance pays."
  };

  function normalizeText(text) {
    return (text || "")
      .replace(/\s+/g, " ")
      .replace(/\*/g, "")
      .trim();
  }

  function addInfoButtons() {
    const selectors = [
      "label",
      ".label",
      ".field-label",
      ".title",
      ".form_label",
      ".legend",
      ".field-title",
      ".frm-label"
    ].join(",");

    const labels = document.querySelectorAll(selectors);
    console.log("labels found:", labels.length);

    labels.forEach((node) => {
      if (node.dataset.infoProcessed === "true") return;

      const labelText = normalizeText(node.textContent);
      const tooltipText = tooltips[labelText];

      if (!tooltipText) return;

      node.dataset.infoProcessed = "true";

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

      console.log("info added to:", labelText);
    });
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
