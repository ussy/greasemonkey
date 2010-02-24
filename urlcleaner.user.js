// ==UserScript==
// @name           UrlCleaner
// @namespace      http://github.com/ussy/
// @include        https?://*
// ==/UserScript==

let link = document.querySelector("link[rel=canonical]");
if (link && link.href == location.href) {
  return;
}

const SITEINFO = [
  {
    domain: ".*",
    live: [],
    kill: ["utm_source", "utm_medium", "utm_content", "utm_campaign"]
  },
  {
    domain: "http:\/\/(.+?)\.youtube\.com\/watch",
    live: ["v"],
    kill: []
  }
];

SITEINFO.forEach(function(site) {
  if (!(new RegExp(site.domain).test(location.href))) {
    return;
  }

  let newUrl = location.href.substring(0, location.href.length - location.search.length);
  let liveSearch = "";
  let search = "";
  location.search.substring(1).split("&").forEach(function(v) {
    let [key, val] = v.split("=");
    if (!key) {
      return;
    }

    if (site.live.indexOf(key) > -1) {
      liveSearch += (key + (val ? "=" + val : "") + "&");
    } else if (site.kill.indexOf(key) == -1) {
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
});
