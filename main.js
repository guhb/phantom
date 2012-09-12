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

    if (address.indexOf("http://") == -1) {
        address = "http://" + address;
    }

    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        } else {
            page.loadLibrary(gConfig.libraries.files, gConfig.libraries.path);
            page.loadApp(gConfig.apps.grabIfanr);
        }
        phantom.exit();
    });
}
