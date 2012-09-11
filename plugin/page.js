(function (page, gConfig) {
    if (page == null || typeof page == "undefined") {
        console.error("page does not exist.");
        return;
    }
    if (gConfig == null || typeof gConfig == "undefined") {
        console.error("gConfig does not exist.");
        return;
    }

    function _load(script) {
        if (script == null) {
            console.error("Script name must be provided.");
            return;
        }

        if (typeof script == "string" && script.indexOf(".js") != -1) {
            if (page.injectJs(script)) {
                if (gConfig.debug.normal) {
                    console.log("load " + script + " [OK]");
                }
                return true;
            } else {
                if (gConfig.debug.normal) {
                    console.log("load " + script + " [FAIL]");
                }
            }
        } else {
            console.log(script, " is not a javascript file.");
        }
        return false;
    }

    page.loadLibrary = function (libScripts, libPath) {
        if (libPath != null && typeof libPath == 'string') {
            page.libraryPath = libPath;
        }

        if (libScripts != null) {
            if (typeof libScripts == "string") {
                _load(libScripts);
            } else if (typeof libScripts == "object" && libScripts instanceof Array) {
                for (var i = 0, max = libScripts.length; i < max; i++) {
                    _load(libScripts[i]);
                }
            }
        } else {
            console.error("Library name must be provided.");
        }
    }

    page.loadApp = phantom.loadApp;

    page.onLoadStarted = function () {
        if (gConfig.debug.normal) {
            console.log("Start loading.");
        }
    }

    page.onLoadFinished = function () {
        if (gConfig.debug.normal) {
            console.log("Load finished.");
        }
    }

    page.onResourceRequested = function (request) {
        if (gConfig.debug.request) {
            console.log('Request' + JSON.stringify(request, undefined, 4));
        }
    }

    page.onResourceReceived = function (request) {
        if (gConfig.debug.receive) {
            console.log('Receive' + JSON.stringify(request, undefined, 4));
        }
    }

    page.onConsoleMessage = function (msg) {
        console.log(msg);
    }
})(page, gConfig);