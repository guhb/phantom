(function (page, gConfig) {
    page.app = function () {
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
})(page, gConfig);
