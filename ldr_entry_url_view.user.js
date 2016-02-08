// ==UserScript==
// @name           LDR Entry Url View
// @namespace      http://github.com/ussy/
// @description    キー移動時にエントリの URL をメッセージの中に表示します。
// @grant          none
// @include        http://reader.livedoor.com/reader/*
// @include        http://reader.livedwango.com/reader/*
// @include        http://reader.livedoor.com/public/*
// @include        http://reader.livedwango.com/public/*
// @include        http://fastladder.com/reader/*
// @version        1.1.0
// ==/UserScript==

(function() {
    function contentEval(source) {
        if ("function" === typeof source) {
            source = "(" + source + ")();"
        }

        var script = document.createElement("script");
        script.setAttribute("type", "application/javascript");
        script.textContent = source;

        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    var init = function() {
        var w = window;
        w.register_hook('AFTER_INIT', function() {
            const NEXT_KEY = "j";
            const PREV_KEY = "k";
            with(w) {
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
            };
        });
    };

    contentEval(init);
})();
