// ==UserScript==
// @name           LDR Entry Url View
// @namespace      http://www.pshared.net/
// @description    キー移動時にエントリの URL をメッセージの中に表示します。
// @include        http://reader.livedoor.com/reader/*
// @include        http://reader.livedoor.com/public/*
// @include        http://fastladder.com/reader/*
// ==/UserScript==

(function() {
    const NEXT_KEY = "j";
    const PREV_KEY = "k";
    var w = this.unsafeWindow || window;
    w.addEventListener("load", function() {with(w) {
        var showActiveItemUrl = function() {
            var item = get_active_item(true);
            if (!item) {
                return;
            }

            message(item.link);
        }

        var nextFunc = Keybind._keyfunc[NEXT_KEY];
        Keybind.add(NEXT_KEY, function() {
            nextFunc();
            showActiveItemUrl();
        });

        var prevFunc = Keybind._keyfunc[PREV_KEY];
        Keybind.add(PREV_KEY, function() {
            prevFunc();
            showActiveItemUrl();
        });
    }}, false);
})();
