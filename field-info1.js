(function () {
  const tooltipText = "A dwelling limit is the maximum amount your home insurance pays.";

  function normalizeText(text) {
    return (text || "")
      .replace(/\s+/g, " ")
      .replace(/\*/g, "")
      .trim()
      .toLowerCase();
  }

  function addTooltip(target) {
    if (!target) return;
    if (target.querySelector(".custom-info-wrap")) return;

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
    target.appendChild(wrap);
  }

  function findDwellingLimit() {
    const spans = document.querySelectorAll("p span, span, p");

    spans.forEach((el) => {
      const text = normalizeText(el.textContent);
      if (text === "dwelling limit") {
        addTooltip(el);
      }
    });
  }

  function init() {
    findDwellingLimit();

    const observer = new MutationObserver(() => {
      findDwellingLimit();
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
