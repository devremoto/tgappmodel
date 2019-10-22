$(document).ready(function() {
             
    function addSearchResult(id, sponsored, url, title, reviews, stars) {
        var searchResults = $('.search-results');

        var searchResultElm = document.createElement('div');
        searchResultElm.setAttribute('class', 'search-result');


        /** Title **/
        // Text
        var titleElm = document.createElement('h4');
        titleElm.setAttribute('class', 'bold');
        // Link
        var titleHrefElm = document.createElement('a');
        titleHrefElm.setAttribute('href', 'javascript:void(0);');
        titleHrefElm.setAttribute('class', 'r-mar-10');
        titleHrefElm.innerHTML = title;
        titleElm.appendChild(titleHrefElm);
        if (sponsored) {
            var titleSpanElm = document.createElement('span');
            titleSpanElm.setAttribute('class', 'label label-warning label-s');
            titleSpanElm.innerHTML = 'Sponsored';
            titleElm.appendChild(titleSpanElm);
        }
        // Append
        searchResultElm.appendChild(titleElm);

        /** Info **/
        var infoParElm = document.createElement('p');
        infoParElm.setAttribute('class', 'no-mb');
        // URL
        var infoHrefElm = document.createElement('a');
        infoHrefElm.setAttribute('href', 'javascript:void(0);');
        infoHrefElm.innerHTML = url;
        infoParElm.appendChild(infoHrefElm);
        // Reviews
        var infoReviewsElm = document.createElement('span');
        infoReviewsElm.setAttribute('class', 'search-result-reviews');
        infoReviewsElm.innerHTML = " - "+reviews+" reviews - ";
        infoParElm.appendChild(infoReviewsElm);
        // Stars
        var infoStarsElm = document.createElement('span');
        var starsStr = "";
        for (var sAux = 0; sAux < stars; sAux++) {
            starsStr += '<i class="fa fa-star color-warning"></i>';
        }
        for (var soAux = stars; soAux < 5; soAux++) {
            starsStr += '<i class="fa fa-star-o color-warning"></i>';
        }
        infoStarsElm.innerHTML = starsStr;
        infoParElm.appendChild(infoStarsElm);
        // Words
        var infoWordsElm = document.createElement('span');
        infoWordsElm.setAttribute('class', 'search-result-words');
        infoWordsElm.innerHTML = ' - Lorem <strike>ipsum</strike> dolor sit <strike>amet</strike> (60%)';
        infoParElm.appendChild(infoWordsElm);
        // Append
        searchResultElm.appendChild(infoParElm);

        /* Description */
        var descriptionElm = document.createElement('p');
        descriptionElm.setAttribute('class', 'search-result-description');
        descriptionElm.innerHTML = loremWords(Math.floor((Math.random() * 60) + 20), true, true, false)+"...";
        searchResultElm.appendChild(descriptionElm);

        searchResults.append(searchResultElm);
    };

    addSearchResult(0, true, "http://www.deemble.com", "Dee Admin Template - Amazing Bootstrap Admin Template", 46, 5);
    addSearchResult(1, false, "http://wrapbootstrap.com/", "Wrapbootstrap - Bootstrap Themes and Templates", 128, 5);
    addSearchResult(2, false, "http://wrapbootstrap.com/themes/admin", "Wrapbootstrap - Admin and Dashboards Templates", 128, 4);
    addSearchResult(3, false, "http://wrapbootstrap.com/", "Lorem - Lorem ipsum templates", 64, 4);
    addSearchResult(4, false, "http://wrapbootstrap.com/themes/admin", "Ipsum - Best ipsumed templates", 0, 0);
    addSearchResult(5, false, "http://www.deemble.com/dolor", "The Dolor Templates", 0, 0);
    addSearchResult(6, false, "http://wrapbootstrap.com/themes/admin", "The Admin Lorem Themes", 0, 0);


 });