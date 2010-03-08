// ==UserScript==
// @name           UrlCleaner
// @description    URL から不要なパラメーターを削除し、リダイレクトします。
// @namespace      http://github.com/ussy/
// @include        http://*
// @include        https://*
// @require        http://gist.github.com/raw/34615/04333b7e307eb029462680e4f4cf961f72f4324c
// @author         Ussy
// @version        1.0.0
// ==/UserScript==

var DATABASE_URL = "http://wedata.net/databases/UrlCleaner/items.json";
var database = new Wedata.Database(DATABASE_URL);
GM_registerMenuCommand('UrlCleaner - clear cache', function() {
  database.clearCache();
});

var link = document.querySelector("link[rel=canonical]");
if (link && link.href == location.href) {
  return;
}

const SITEINFO = [
  /*
  {
    url: "^https?:\/\/.*utm.*",
    kill: "utm_source utm_medium utm_content utm_campaign"
  },
  {
    url: "http:\/\/(.+?)\.youtube\.com\/watch",
    live: "v"
  }
*/
];

SITEINFO.forEach(function(data) {
  tryRedirect(data);
});

database.get(function(items) {
  items.forEach(function(item) {
    tryRedirect(item.data);
  });
});

function tryRedirect(data) {
  if (!(new RegExp(data.url).test(location.href))) {
    return;
  }

  var newUrl = location.href.substring(0, location.href.length - location.search.length);
  var liveSearch = "";
  var search = "";
  location.search.substring(1).split("&").forEach(function(v) {
    var kv = v.split("=");
    var key = kv[0], val = kv[1];
    if (!key) {
      return;
    }

    if (data.live && data.live.split(" ").indexOf(key) > -1) {
      liveSearch += (key + (val ? "=" + val : "") + "&");
    } else if (data.kill && data.kill.split(" ").indexOf(key) == -1) {
      search += (key + (val ? "=" + val : "") + "&");
    }
  });

  if (liveSearch.length == 0 && search.length > 0) {
    newUrl += ("?" + search.substring(0, search.length - 1));
  } else if (liveSearch.length > 0) {
    newUrl += ("?" + liveSearch.substring(0, liveSearch.length - 1));
  }

  if (newUrl != location.href) {
    location.href = newUrl;
  }
}
