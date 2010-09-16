// ==UserScript==
// @name           Add English Page Search
// @namespace      http://github.com/ussy/
// @include        http://www.google.co.jp/search?*
// ==/UserScript==
(function() {
  var ul = document.querySelector("#tbd ul.tbt");
  if (!ul) {
    return;
  }

  var english = location.href.indexOf("&lr=lang_en") > -1;
  var li = document.createElement("li");
  li.setAttribute("id", english ? "lr_lang_1ja" : "lr_lang_1en");
  li.setAttribute("class", "tbou");
  var a = document.createElement("a");
  a.innerHTML = english ? "日本語のページを検索" : "英語のページを検索";
  a.setAttribute("class", "q qs");
  if (location.href.indexOf("&lr=") == -1) {
    a.setAttribute("href", location.href + (english ? "&lr=lang_ja" : "&lr=lang_en"));
  } else {
    a.setAttribute("href", english ?
                   location.href.replace("&lr=lang_en", "&lr=lang_ja") :
                   location.href.replace("&lr=lang_ja", "&lr=lang_en"));
  }

  li.appendChild(a);
  english ? ul.insertBefore(li, document.querySelector("#lr_lang_1en")) : ul.appendChild(li);
})();