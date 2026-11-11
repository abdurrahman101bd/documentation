(function () {
  var root = document.documentElement;
  var key = "md-editor-theme";

  function readTheme() {
    try {
      var saved = localStorage.getItem(key);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function applyTheme(value) {
    root.setAttribute("data-theme", value);
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  root.setAttribute("data-theme", readTheme());

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("theme");
    if (toggle) {
      toggle.addEventListener("click", function () {
        applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }

    var copy = [
      "Write and read side by side with zero latency. Quick insert tools add bold, italic, headings, code blocks, tables and links in one tap.",
      "Switch to a distraction free reader built on a WebView with a custom Marked.js engine, with styled code blocks, tables and images in light and dark themes.",
      "Export any note as a PDF or a Markdown file, print it, or share it as plain text with a single tap."
    ];

    var out = document.getElementById("tab-out");
    var tabs = document.querySelectorAll(".tabs [role='tab']");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
        tab.setAttribute("aria-selected", "true");
        out.textContent = copy[Number(tab.getAttribute("data-tab"))];
      });
    });
  });
})();
