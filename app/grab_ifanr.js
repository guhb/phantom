(function (page, gConfig) {
    page.app = function () {
        console.log("Analyse start.");
        var articles = document.getElementsByClassName('entry-archive');
        var titles = [];
        var sources = [];
        var contents = [];

        for (var i = 0, max = articles.length; i < max; i++) {
            titles.push(articles[i].querySelector("h2").querySelector("a").innerHTML);
            sources.push(articles[i].getElementsByClassName("entry-meta")[0].querySelector("a").innerHTML);
            contents.push(articles[i].getElementsByClassName("entry-content")[0].innerHTML);
        }

        var articleList = [];
        for (var i = 0, max = articles.length; i < max; i++) {
            articleList.push({
                title: titles[i],
                source: sources[i],
                content: contents[i]
            });
        }

        console.log("Analyse finished.");
        return articleList;
    }

    page.app.save = function () {
        fs = require("fs");

        function decorateContent(string) {
            if (string.charAt(string.length-1) != "\n") {
                string += "\n";
            }
            return string;
        }

        file = fs.open(page.app.dataFile, "a");

        var date = new Date();
        file.write("===================================================================\n"
                 + "Website content grabber.\n"
                 + "DATA: " + date.toDateString() + "\n"
                 + "SITE: www.ifanr.com\n"
                 + "\n\n"
            );
        page.app.cache.forEach(function (item) {
            file.write("\nTITLE:")
            file.write(decorateContent(item.title));
            file.write("\nSOURCE:")
            file.write(decorateContent(item.source));
            file.write("\nCONTENT:")
            file.write(decorateContent(item.content));
        });
        file.close();
    }
})(page, gConfig);
