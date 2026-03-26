(function () {
  const tooltipText = "A dwelling limit is the maximum amount your home insurance pays.";

  function addTooltip() {
    const elements = document.querySelectorAll("span, p, div");

    elements.forEach((el) => {
      const text = (el.textContent || "").trim();

      if (text === "Dwelling Limit" && !el.dataset.infoAdded) {
        el.dataset.infoAdded = "true";

        const wrap = document.createElement("span");
        wrap.style.position = "relative";
        wrap.style.display = "inline-block";
        wrap.style.marginLeft = "6px";
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
        icon.style.cursor = "default";
        icon.style.fontWeight = "bold";

        const tip = document.createElement("span");
        tip.textContent = tooltipText;
        tip.style.visibility = "hidden";
        tip.style.opacity = "0";
        tip.style.position = "absolute";
        tip.style.top = "24px";
        tip.style.left = "0";
        tip.style.minWidth = "200px";
        tip.style.maxWidth = "260px";
        tip.style.padding = "8px 10px";
        tip.style.background = "#111";
        tip.style.color = "#fff";
        tip.style.borderRadius = "8px";
        tip.style.fontSize = "12px";
        tip.style.lineHeight = "1.4";
        tip.style.zIndex = "9999";
        tip.style.transition = "opacity 0.2s ease";
        tip.style.pointerEvents = "none";

        wrap.addEventListener("mouseenter", () => {
          tip.style.visibility = "visible";
          tip.style.opacity = "1";
        });

        wrap.addEventListener("mouseleave", () => {
          tip.style.visibility = "hidden";
          tip.style.opacity = "0";
        });

        wrap.appendChild(icon);
        wrap.appendChild(tip);
        el.appendChild(wrap);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addTooltip);
  } else {
    addTooltip();
  }

  const observer = new MutationObserver(addTooltip);
  observer.observe(document.body, { childList: true, subtree: true });
})();
