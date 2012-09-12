(function (page, gConfig) {
    page.app = function () {
        console.log("Analyse start.");
        var articles = document.getElementsByTagName('article');
        var titles = [];
        var sources = [];
        var contents = [];

        for (var i = 0, max = articles.length; i < max; i++) {
            titles.push(articles[i].querySelector("a").innerHTML);
            sources.push(articles[i].querySelector("footer").querySelector("a").innerHTML);
            contents.push(articles[i].getElementsByTagName("div")[0].innerHTML);
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
