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
        var fs = require("fs");
        f= fs.open(gConfig.downloadDirectory + "/" + file, mode);
        f.write(content);
        f.close();
    }
})(page, gConfig);