(function () {
  function changeLabel() {
    const elements = document.querySelectorAll("span, p, div");

    elements.forEach((el) => {
      const text = (el.textContent || "").trim();

      if (text === "Dwelling Limit" && !el.dataset.tested) {
        el.dataset.tested = "true";
        el.style.color = "red";
        el.style.fontWeight = "bold";
        el.textContent = "Dwelling Limit TEST";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", changeLabel);
  } else {
    changeLabel();
  }

  const observer = new MutationObserver(changeLabel);
  observer.observe(document.body, { childList: true, subtree: true });
})();
