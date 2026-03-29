/**
 * 블로그 목록(/blog/) — ?category=love 등 쿼리로 클라이언트 필터
 */
(function () {
  var body = document.body;
  if (!body || body.getAttribute("data-blog-list-page") !== "all") return;

  var ALLOWED = ["love", "tarot", "psychology", "test", "life"];

  function applyFilter(cat) {
    var c = (cat || "").toLowerCase().trim();
    if (!c || ALLOWED.indexOf(c) === -1) return false;

    var cards = document.querySelectorAll(".blog-card[data-blog-category]");
    var shown = 0;
    cards.forEach(function (el) {
      var ok = el.getAttribute("data-blog-category") === c;
      el.hidden = !ok;
      if (ok) shown += 1;
    });

    document.querySelectorAll(".blog-cat-tab").forEach(function (tab) {
      var k = tab.getAttribute("data-blog-cat") || "";
      var active = k === c;
      tab.classList.toggle("is-active", active);
      if (active) tab.setAttribute("aria-current", "page");
      else tab.removeAttribute("aria-current");
    });

    var empty = document.getElementById("blog-category-empty");
    if (empty) empty.hidden = shown > 0;

    return true;
  }

  try {
    var q = new URLSearchParams(window.location.search).get("category");
    if (q) applyFilter(q);
  } catch (e) {
    /* ignore */
  }
})();
