(function (page, gConfig) {
	page.app = function () {
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
})(page, gConfig);
