(function () {
  const tooltipText = "A dwelling limit is the maximum amount your home insurance pays.";

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function addTooltip() {
    const elements = document.querySelectorAll("span, p, div");

    elements.forEach((el) => {
      const text = normalize(el.textContent);

      if (text.includes("dwelling limit") && !el.dataset.infoAdded) {
        el.dataset.infoAdded = "true";

        const wrap = document.createElement("span");
        wrap.style.position = "relative";
        wrap.style.display = "inline-block";
        wrap.style.marginLeft = "8px";
        wrap.style.verticalAlign = "middle";

        const icon = document.createElement("span");
        icon.textContent = "?";
        icon.style.display = "inline-block";
        icon.style.width = "20px";
        icon.style.height = "20px";
        icon.style.borderRadius = "50%";
        icon.style.background = "blue";
        icon.style.color = "white";
        icon.style.fontSize = "14px";
        icon.style.lineHeight = "20px";
        icon.style.textAlign = "center";
        icon.style.fontWeight = "bold";
        icon.style.cursor = "default";

        const tip = document.createElement("span");
        tip.textContent = tooltipText;
        tip.style.display = "none";
        tip.style.position = "absolute";
        tip.style.top = "26px";
        tip.style.left = "0";
        tip.style.minWidth = "220px";
        tip.style.maxWidth = "280px";
        tip.style.padding = "8px 10px";
        tip.style.background = "black";
        tip.style.color = "white";
        tip.style.borderRadius = "8px";
        tip.style.fontSize = "12px";
        tip.style.lineHeight = "1.4";
        tip.style.zIndex = "9999";

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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addTooltip);
  } else {
    addTooltip();
  }

  const observer = new MutationObserver(addTooltip);
  observer.observe(document.body, { childList: true, subtree: true });
})();
