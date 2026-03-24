(function () {

  // ADD YOUR FIELD LABELS + TOOLTIP TEXT HERE
  const tooltips = {
    "Dwelling Limit": "A dwelling limit is the maximum amount your home insurance pays."
  };

  function addInfoButtons() {

    const labels = document.querySelectorAll(
      "label, .label, .field-label, .title, .form_label"
    );

    labels.forEach((node) => {

      if (node.dataset.infoProcessed === "true") return;

      const labelText = node.textContent.trim();

      if (!tooltips[labelText]) return;

      node.dataset.infoProcessed = "true";

      const wrap = document.createElement("span");
      wrap.className = "custom-info-wrap";

      const icon = document.createElement("span");
      icon.className = "custom-info-icon";
      icon.innerText = "i";

      const tip = document.createElement("span");
      tip.className = "custom-info-tip";
      tip.textContent = tooltips[labelText];

      wrap.appendChild(icon);
      wrap.appendChild(tip);

      node.appendChild(wrap);
    });
  }

  function init() {
    addInfoButtons();

    const observer = new MutationObserver(addInfoButtons);
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
