$(document).ready(function() {
             
    var faqCounter = 0;
   
    function addFAQuestion(faqsID, id, title, viewed, date) {
        var faquestions = $("#"+faqsID);

        faqCounter++;

        // Question
        var questionElm = document.createElement('div');
        questionElm.setAttribute('class', 'faq-question');
        
        // Title
        var titleElm = document.createElement('a');
        titleElm.setAttribute('class', 'faq-title collapsed');
        titleElm.setAttribute('href', '#faq'+faqCounter);
        titleElm.setAttribute('data-toggle', 'collapse');
        titleElm.setAttribute('aria-expanded', 'false');
        titleElm.setAttribute('aria-controls', 'faq'+(faqCounter));
        titleElm.innerHTML = title;
        questionElm.appendChild(titleElm);
        
        // Detail
        var detailElm = document.createElement('div');
        detailElm.setAttribute('class', 'faq-detail');
        detailElm.innerHTML = "Viewed "+viewed+" times since "+date;
        questionElm.appendChild(detailElm);
        
        // Stars
        var infoStarsElm = document.createElement('span');
        var starsStr = "";
        var stars = Math.floor((Math.random() * 4) + 1);
        for (var sAux = 0; sAux < stars; sAux++) {
            starsStr += '<i class="fa fa-star color-warning"></i>';
        }
        for (var soAux = stars; soAux < 5; soAux++) {
            starsStr += '<i class="fa fa-star-o color-warning"></i>';
        }
        var votes = Math.floor((Math.random() * 100) + 25);
        infoStarsElm.innerHTML = " - "+starsStr+" - "+votes+" votes";
        detailElm.appendChild(infoStarsElm);
        
        // Text 
        var collapsed = 'collapse';
        if (id==0) {
            collapsed = 'collapse in';
        }
        var textElm = document.createElement('div');
        textElm.setAttribute('id', 'faq'+(faqCounter));
        textElm.setAttribute('class', 'faq-text panel-collapse '+collapsed);
        textElm.setAttribute('aria-expanded', 'false');
        
        // Well
        var wellElm = document.createElement('div');
        wellElm.setAttribute('class', 'well');
        wellElm.innerHTML = loremWords(Math.floor((Math.random() * 60) + 20), true, true, false)+"...";
        textElm.appendChild(wellElm);
        
        questionElm.appendChild(textElm);
        
        faquestions.append(questionElm);
        
    };

    var faqsIDs = ['faq-questions-1', 'faq-questions-2', 'faq-questions-3', 'faq-questions-4'];
    for (var index in faqsIDs) {
        addFAQuestion(faqsIDs[index], 0, "Lorem ipsum dolor sit amet, condetetur sadipscing elitr?", 1024, "09/05/2020");
        addFAQuestion(faqsIDs[index], 1, "Consetetur sadipscing elitr sed diam noumy?", 728, "14/05/2022");
        addFAQuestion(faqsIDs[index], 2, "Magna aliquyam erat sed diam voluptua?", 512, "12/01/2019");
        addFAQuestion(faqsIDs[index], 3, "What's the point of using Lorem Ipsum?", 256, "22/03/2012");
        addFAQuestion(faqsIDs[index], 4, "Nunc mus senectus etiam congue fames?", 128, "21/04/2015");
    }

 });

$( document ).ready(function() {
    var faqData = [
        {
            value: 12,
            color: "rgba(74, 121, 147, 0.5)",
            highlight: "rgba(74, 121, 147, 0.9)",
            label: "Pending"
        },
        {
            value: 8,
            color: "rgba(163, 200, 220, 0.5)",
            highlight: "rgba(163, 200, 220, 0.9)",
            label: "Approved"
        },
        {
            value: 100,
            color: "rgba(29, 73, 97, 0.5)",
            highlight: "rgba(29, 73, 97, 0.9)",
            label: "Answered"
        }
    ];
    var chartjsPieChartCtx = document.getElementById("faq-pie").getContext("2d");
    var chartjsPieChart = new Chart(chartjsPieChartCtx).Pie(faqData, {});
});
