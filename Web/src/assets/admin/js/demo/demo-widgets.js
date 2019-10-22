var percent = 15;
$( document ).ready(function() {
    window.setInterval(function(){
        $( ".exchange-quote" ).each(function() {
            $(this).html(getQuote());
        });
    }, 1000);
    window.setInterval(function(){
        if (percent==99) {
            percent=15;
        }
        $('.progress-bar-animated').css('width', percent+'%').attr('aria-valuenow', percent); 
        $('.progress-bar-percent').text(percent+'%'); 
        percent = percent+1;
    }, 500);
}); 
function getQuote() {
    var min = 1.100,
        max = 1.110,
        quote = Math.random() * (max - min) + min;
    return quote.toFixed(3);
}
var updatingChart1 = $(".updating-chart-1").peity("line", { width: 98, height: 48, fill: ["#0cc7c7"], stroke: ["#0aa1a1"] })
    setInterval(function() {
        var random = Math.round(Math.random() * 10);
        var values = updatingChart1.text().split(",");
        values.shift();
        values.push(random);
        updatingChart1
            .text(values.join(","))
            .change();
    }, 1000);

var updatingChart2 = $(".updating-chart-2").peity("line", { width: 98, height: 48, fill: ["#0cc7c7"], stroke: ["#0aa1a1"] })
    setInterval(function() {
        var random = Math.round(Math.random() * 10);
        var values = updatingChart2.text().split(",");
        values.shift();
        values.push(random);
        updatingChart2
            .text(values.join(","))
            .change();
    }, 1000);

var updatingHeartBeat = $(".updatingHeartBeat").peity("line", { width: 98, height: 48, fill: ["#f5495b"], stroke: ["#B43542"] })
    setInterval(function() {
        var random = Math.round(Math.random() * 10);
        var values = updatingHeartBeat.text().split(",");
        values.shift();
        values.push(random);
        updatingHeartBeat
            .text(values.join(","))
            .change();
    }, 1000);
