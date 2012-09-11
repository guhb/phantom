(function (phantom, gConfig) {
	if (phantom == null || typeof phantom == "undefined") {
		console.error("phantom does not exist.");
		return;
	}

    function _load(script) {
        if (script == null) {
            console.error("Script name must be provided.");
            return;
        }

        if (typeof script == "string" && script.indexOf(".js") != -1) {
            if (phantom.injectJs(script)) {
                if (gConfig.debug.normal) {
                    console.log("load " + script + " [OK]");
                }
            } else {
                if (gConfig.debug.normal) {
                    console.log("load " + script + " [FAIL]");
                }
            }
        } else {
            console.log(script, " is not a javascript file.");
        }
    }

	phantom.loadPlugins = function (libScripts, libPath) {
	    if (libPath != null && typeof libPath == 'string') {
	        phantom.libraryPath = libPath;
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
	        console.error("Plugin name must be provided.");
	    }
	}

	phantom.loadUtil = phantom.loadPlugins;

	phantom.loadApp = phantom.loadPlugins;
})(phantom, gConfig);