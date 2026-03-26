(function () {
  const tooltipText = "A dwelling limit is the maximum amount your home insurance pays.";

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function addTooltip() {
    const elements = document.querySelectorAll("span, p, div");

    elements.forEach((el) => {
      const text = normalize(el.textContent);

      if (text === "dwelling limit" && !el.dataset.infoAdded) {
        el.dataset.infoAdded = "true";

        const wrap = document.createElement("span");
        wrap.style.position = "relative";
        wrap.style.display = "inline-block";
        wrap.style.marginLeft = "8px";
        wrap.style.verticalAlign = "middle";

        const icon = document.createElement("span");
        icon.textContent = "i";
        icon.style.display = "inline-block";
        icon.style.width = "18px";
        icon.style.height = "18px";
        icon.style.borderRadius = "50%";
        icon.style.background = "#2b6cff";
        icon.style.color = "#fff";
        icon.style.fontSize = "12px";
        icon.style.lineHeight = "18px";
        icon.style.textAlign = "center";
        icon.style.fontWeight = "bold";
        icon.style.cursor = "default";

        const tip = document.createElement("span");
        tip.textContent = tooltipText;
        tip.style.display = "none";
        tip.style.position = "absolute";
        tip.style.top = "24px";
        tip.style.left = "0";
        tip.style.minWidth = "220px";
        tip.style.maxWidth = "280px";
        tip.style.padding = "8px 10px";
        tip.style.background = "#111";
        tip.style.color = "#fff";
        tip.style.borderRadius = "8px";
        tip.style.fontSize = "12px";
        tip.style.lineHeight = "1.4";
        tip.style.zIndex = "9999";
        tip.style.boxShadow = "0 6px 18px rgba(0,0,0,0.2)";

        wrap.addEventListener("mouseenter", function () {
          tip.style.display = "block";
        });

        wrap.addEventListener("mouseleave", function () {
          tip.style.display = "none";
        });

        wrap.appendChild(icon);
        wrap.appendChild(tip);
        el.appendChild(wrap);
      }
    });
  }

  function init() {
    addTooltip();
    const observer = new MutationObserver(addTooltip);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
