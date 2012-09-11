(function (page, gConfig) {
    page.app = function () {
        var articles = document.getElementsByClassName('day');
        var titles = [];
        var sources = [];
        var contents = [];

        for (var i = 0, max = articles.length; i < max; i++) {
            //titles.push(articles[i].getElementsByClassName("entrygroup")[0].querySelector("h4").querySelector("span").querySelector("a").innerHTML);
            //sources.push(articles[i].querySelector("h3").querySelector("span").querySelector("a").innerHTML);
            //contents.push(articles[i].getElementsByClassName("entrygroup")[0].getElementsByClassName("blogcontent")[0].innerHTML);
            _.each(articles[i], function (item) {
                titles.push(item.getElementsByClassName("entrygroup")[0].querySelector("h4").querySelector("span").querySelector("a").innerHTML);
                sources.push(item.querySelector("h3").querySelector("span").querySelector("a").innerHTML);
                contents.push(item.getElementsByClassName("entrygroup")[0].getElementsByClassName("blogcontent")[0].innerHTML);
            });
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
