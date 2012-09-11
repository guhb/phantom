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
    utils : {
        files : ["save.js"],
        path : "util"
    },
    downloadDirectory : "download",
    appDirectory : "app"
};