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
        var path = "";
        if (libPath != null && typeof libPath == 'string') {
            //page.libraryPath = libPath;
            path = libPath + "/";
        }

        if (libScripts != null) {
            if (typeof libScripts == "string") {
                return _load(path + libScripts);
            } else if (typeof libScripts == "object" && libScripts instanceof Array) {
                for (var i = 0, max = libScripts.length; i < max; i++) {
                    if (!_load(path + libScripts[i])) {
                        return false;
                    }
                }
                return true;
            }
        } else {
            console.error("Library name must be provided.");
        }
        return false;
    }

    page.loadApp = function (app) {
        if (app == null || typeof app != "object") {
            console.error("app dose not exist.");
            return false;
        }

        var appDirectory = gConfig.appDirectory;
        if (app.path && typeof app.path == "string" && app.path != "") {
            appDirectory = appDirectory + "/" + app.path;
        }

        if (phantom.loadApp(app.file, appDirectory)
            && page.app != null && typeof page.app == "function") {
            console.log("App loaded.");
        } else {
            console.error("Fail to load app");
            return false;
        }

        page.app.cache = page.evaluate(page.app);

        if (app.dataFile && typeof app.dataFile == "string") {
            page.app.dataFile = gConfig.downloadDirectory + "/" + app.dataFile;
            if (page.app.save && typeof page.app.save == "function") {
                page.app.save();
            } else {
                console.log("Missing data saving rutine, failed to save data cache.");
            }
        }
    }

    page.onLoadStarted = function () {
        if (gConfig.debug.normal) {
            console.log("Start loading.");
        }
    }

    // This function is called by page.open
    // after the page is loaded and already
    // implemented in main.js as a callback
    //
    // page.onLoadFinished = function () {
    //     if (gConfig.debug.normal) {
    //         console.log("Load finished.");
    //     }
    // }

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