(function (page, gConfig) {
    if (page == null || typeof page == "undefined") {
        console.error("page does not exist.");
        return;
    }
    if (gConfig == null || typeof gConfig == "undefined") {
        console.error("gConfig does not exist.");
        return;
    }

    page.util = page.util || page.util || {};

    page.util.save = function (file, content, mode) {
    	fs = require("fs");
    	f= fs.open(gConfig.downloadDirectory + "/" + file, mode);
    	fs.write(content);
    }
})(page, gConfig);