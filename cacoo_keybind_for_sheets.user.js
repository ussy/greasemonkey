// ==UserScript==
// @name           Cacoo keybind for sheets
// @namespace      http://github.com/ussy/
// @include        https://cacoo.com/diagrams/*
// ==/UserScript==
with (unsafeWindow) {
  document.addEventListener("keydown", function handleKey(e) {
    var tag = (e.target || e.srcElement).tagName;
    if (/input|textarea/i.test(tag)) {
      return;
    }

    if (e.keyCode == 74) {
      var next = $(document.querySelector("ul.s_shapeSheetNavi a.active")).parent().next().find("a");
      next.length == 0 ? $(document.querySelector("ul.s_shapeSheetNavi li:first-child a")).click() : next.click();
    } else if (e.keyCode == 75) {
      var prev = $(document.querySelector("ul.s_shapeSheetNavi a.active")).parent().prev().find("a");
      prev.length == 0 ? $(document.querySelector("ul.s_shapeSheetNavi li:last-child a")).click() : prev.click();
    }

    e.preventDefault();
  }, false);
}
