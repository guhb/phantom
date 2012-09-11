var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs');

// arm phantom with custom feature.
phantom.injectJs("plugin/gconfig.js");
phantom.injectJs("plugin/phantom.js");
phantom.loadPlugins(gConfig.plugins.files, gConfig.plugins.path);

if (system.args.length === 1) {
    console.log('Usage: grabimg.js <some URL>');
    phantom.exit(1);
} else {
    address = system.args[1];

    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        } else {
            page.loadLibrary(gConfig.libraries.files, gConfig.libraries.path);
            //page.loadApp("grab_ifanr.js", gConfig.appDirectory);
            //page.loadApp("grab_qt_planet.js", gConfig.appDirectory);
            page.loadApp("grab_kde_planet.js", gConfig.appDirectory);
            //phantom.loadPlugins("save.js", "util");
            //console.log(page.util);
            //page.util.save("planet-qt.txt", "page.util.save", "a");
            // run the app and collect retruned data;
            var articles = page.evaluate(page.app);

            // the app used here return a list of articles object
            // grab from planet.qt-project.org. And the following
            // code perform some further process and save the list
            // to a local file within the 'download' directory.

            function decorateContent(string) {
                if (string.charAt(string.length-1) != "\n") {
                    string += "\n";
                }
                return string;
            }

            file = fs.open(gConfig.downloadDirectory + "/" + "planet-kde.txt", "a");
            articles.forEach(function (item) {
                file.write("\nTITLE:")
                file.write(decorateContent(item.title));
                file.write("\nSOURCE:")
                file.write(decorateContent(item.source));
                file.write("\nCONTENT:")
                file.write(decorateContent(item.content));
            });
            file.close();
        }
        phantom.exit();
    });
}
