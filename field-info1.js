(function () {
  function addInfoButtons() {
    const labels = document.querySelectorAll("label, .label, .field-label, .title, .form_label");

    labels.forEach((node) => {
      if (node.dataset.infoProcessed === "true") return;

      const raw = node.textContent;
      const match = raw && raw.match(/\[info:(.*?)\]/i);
      if (!match) return;

      const infoText = match[1].trim();
      const cleanedText = raw.replace(match[0], "").trim();

      node.dataset.infoProcessed = "true";
      node.textContent = cleanedText + " ";

      const wrap = document.createElement("span");
      wrap.className = "custom-info-wrap";

      const icon = document.createElement("span");
      icon.className = "custom-info-icon";
      icon.innerText = "i";

      const tip = document.createElement("span");
      tip.className = "custom-info-tip";
      tip.textContent = infoText;

      wrap.appendChild(icon);
      wrap.appendChild(tip);

      node.appendChild(wrap);
    });
  }

  function init() {
    addInfoButtons();

    const observer = new MutationObserver(addInfoButtons);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
