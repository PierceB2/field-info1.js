(function () {
  const tooltipText = "A dwelling limit is the maximum amount your home insurance pays.";

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function isVisible(el) {
    const style = window.getComputedStyle(el);
    return style.display !== "none" &&
           style.visibility !== "hidden" &&
           el.offsetParent !== null;
  }

  function getGlobalTooltip() {
    let tooltip = document.getElementById("global-dwelling-tooltip");

    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "global-dwelling-tooltip";
      tooltip.textContent = tooltipText;

      tooltip.style.position = "fixed";
      tooltip.style.padding = "8px 10px";
      tooltip.style.background = "#111";
      tooltip.style.color = "#fff";
      tooltip.style.borderRadius = "8px";
      tooltip.style.fontSize = "12px";
      tooltip.style.lineHeight = "1.4";
      tooltip.style.minWidth = "220px";
      tooltip.style.maxWidth = "280px";
      tooltip.style.boxShadow = "0 6px 18px rgba(0,0,0,0.2)";
      tooltip.style.zIndex = "9999999";
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = "0";
      tooltip.style.transition = "opacity 0.15s ease";
      tooltip.style.pointerEvents = "none";

      document.body.appendChild(tooltip);
    }

    return tooltip;
  }

  function addTooltip() {
    const elements = document.querySelectorAll("span, p, div");
    const tooltip = getGlobalTooltip();

    elements.forEach((el) => {
      const text = normalize(el.textContent);

      if (text !== "dwelling limit") return;
      if (el.dataset.infoAdded) return;
      if (!isVisible(el)) return;

      const childExactMatch = Array.from(el.querySelectorAll("span, p, div")).some((child) => {
        return child !== el && normalize(child.textContent) === "dwelling limit";
      });

      if (childExactMatch) return;

      el.dataset.infoAdded = "true";

      const icon = document.createElement("span");
      icon.textContent = "i";
      icon.style.display = "inline-block";
      icon.style.width = "18px";
      icon.style.height = "18px";
      icon.style.marginLeft = "8px";
      icon.style.borderRadius = "50%";
      icon.style.background = "#2b6cff";
      icon.style.color = "#fff";
      icon.style.fontSize = "12px";
      icon.style.lineHeight = "18px";
      icon.style.textAlign = "center";
      icon.style.fontWeight = "bold";
      icon.style.cursor = "pointer";
      icon.style.verticalAlign = "middle";

      icon.addEventListener("mouseenter", function (e) {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
        tooltip.style.top = (e.clientY + 14) + "px";
        tooltip.style.left = (e.clientX + 14) + "px";
      });

      icon.addEventListener("mousemove", function (e) {
        tooltip.style.top = (e.clientY + 14) + "px";
        tooltip.style.left = (e.clientX + 14) + "px";
      });

      icon.addEventListener("mouseleave", function () {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = "0";
      });

      el.appendChild(icon);
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
