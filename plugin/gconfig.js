var gConfig = {
    debug : {
        normal : true,
        request : true,
        receive : false
    },
    plugins :{
        files : ["page.js"],
        path : "plugin"
    },
    libraries : {
        files : ["jquery.min.js", "underscore-min.js"],
        path : "lib"
    },
    downloadDirectory : "download",
    appDirectory : "app",
    apps : {
        grabPlanetKde : {
            path : "",
            file : "grab_planet_kde.js",
            dataFile : "planet_kde.txt"
        },
        grabPlanetQt : {
            path : "",
            file : "grab_planet_qt.js",
            dataFile : "planet_qt.txt"
        },
        grabIfanr : {
            path : "",
            file : "grab_ifanr.js",
            dataFile : "ifanr.txt"
        }
    }
};