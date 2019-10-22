var percent1 = 15;
var percent2 = 2;
var percent3 = 35;
$( document ).ready(function() {
    window.setInterval(function(){
        if (percent1==99) {
            percent1=1;
        }
        $('.pba1').css('width', percent1+'%').attr('aria-valuenow', percent1); 
        $('.pbp1').text(percent1+'%'); 
        percent1 = percent1+1;
    }, 1500);
    window.setInterval(function(){
        if (percent2==99) {
            percent2=1;
        }
        $('.pba2').css('width', percent2+'%').attr('aria-valuenow', percent2); 
        $('.pbp2').text(percent2+'%'); 
        percent2 = percent2+1;
    }, 1000);
    window.setInterval(function(){
        if (percent3==99) {
            percent3=1;
        }
        $('.pba3').css('width', percent3+'%').attr('aria-valuenow', percent3); 
        $('.pbp3').text(percent3+'%'); 
        percent3 = percent3+1;
    }, 1250);
    
    // Charts
    var lineOptions = {
        delimiter: ",",
        fill: "rgba(162, 162, 162, 0.2)",
        max: null,
        min: 0,
        stroke: "rgba(141, 141, 141, 0.8)",
        strokeWidth: 1.5,
        height: 54,
        width: 128
    }
    $("#sparkline-area").sparkline([20,60,70,85,90,50,30,40,40,40,60,70,80,90,100,50,40,40,50,30,50,0], 
            {type: 'line',
            lineColor: 'rgba(74, 121, 147, 0.9)',
            fillColor: 'rgba(74, 121, 147, 0.4)',
            width: '100%',
            height: '48',
            chartRangeMin: 0,
            tooltipChartTitle: 'Balance',
            tooltipSuffix:' %'});
    $("#sparkline-bar").sparkline([256,324,258,220,123,20,144,50,64,45,212,100,300,200,126,123,324], 
            {type: 'bar',
            barColor: 'rgba(74, 121, 147, 0.9)',
            negBarColor: 'rgba(74, 121, 147, 0.4)',
            width: '128',
            height: '48',
            tooltipChartTitle: 'Visitors'});
    $("#sparkline-bar-2").sparkline([220,123,20,144,50,64,45,212,100,300,200,126,123,324, 256, 128], 
            {type: 'bar',
            barColor: 'rgba(74, 121, 147, 0.9)',
            negBarColor: 'rgba(74, 121, 147, 0.4)',
            width: '128',
            height: '48',
            tooltipChartTitle: 'Sales'});
    $("#sparkline-pie").sparkline([128, 64, 16], 
            {type: 'pie',
            sliceColors: ['rgba(255, 255, 255, 0.4)','rgba(255, 255, 255, 0.6)','rgba(255, 255, 255, 0.9)'],
            width: '96',
            height: '96'});
    var peityCPULoad = $(".peityCPULoad").peity("line", lineOptions);
    setInterval(function() {
        updateChart(peityCPULoad, "#cpuload", "#wellcpu");
    }, 2000);
    function updateChart(chart, percentElm, wellElm) {
        var random = Math.round(Math.random() * 100);
          var values = chart.text().split(",");
          values.shift();
          values.push(random);
          chart
            .text(values.join(","))
            .change();
        $(percentElm).text(random); 
        if (random < 50) {
            $(wellElm).removeClass("bg-success-light");
            $(wellElm).removeClass("bg-warning-light");
            $(wellElm).removeClass("bg-danger-light");    
            $(wellElm).addClass("bg-success-light");     
        } else if (random > 50 && random < 80) {
            $(wellElm).removeClass("bg-success-light");
            $(wellElm).removeClass("bg-warning-light");
            $(wellElm).removeClass("bg-danger-light");  
            $(wellElm).addClass("bg-warning-light");
        } else {
            $(wellElm).removeClass("bg-success-light");
            $(wellElm).removeClass("bg-warning-light");
            $(wellElm).removeClass("bg-danger-light");  
            $(wellElm).addClass("bg-danger-light");     
        }
    }
    
    
    
    Chart.defaults.global = {
        animation: true,
        animationSteps: 60,
        animationEasing: "easeOutQuart",
        showScale: true,
        scaleOverride: false,
        scaleSteps: null,
        scaleStepWidth: null,
        scaleStartValue: null,
        scaleLineColor: "rgba(0,0,0,0.1)",
        scaleLineWidth: 1,
        scaleShowLabels: true,
        scaleLabel: "<%=value%>",
        scaleIntegersOnly: true,
        scaleBeginAtZero: false,
        scaleFontFamily: "'Raleway', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        scaleFontSize: 12,
        scaleFontStyle: "normal",
        scaleFontColor: "#666",
        responsive: true,
        maintainAspectRatio: false,
        showTooltips: false,
        customTooltips: false,
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],
        tooltipFillColor: "rgba(0,0,0,0.7)",
        tooltipFontFamily: "'Raleway', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        tooltipFontSize: 14,
        tooltipFontStyle: "normal",
        tooltipFontColor: "#fff",
        tooltipTitleFontFamily: "'Raleway', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        tooltipTitleFontSize: 14,
        tooltipTitleFontStyle: "normal",
        tooltipTitleFontColor: "#fff",
        tooltipYPadding: 12,
        tooltipXPadding: 20,
        tooltipCaretSize: 8,
        tooltipCornerRadius: 4,
        tooltipXOffset: 10,
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
        multiTooltipTemplate: "<%= value %>",
        onAnimationProgress: function(){},
        onAnimationComplete: function(){}
    }
    
    var data = {
        labels: ["12 nov", "13 nov", "14 nov", "15 nov", "16 nov", "17 nov", "19 nov"],
        datasets: [
            {
                label: "Expected",
                fillColor: "rgba(74, 121, 147, 0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 60, 64, 66, 65, 55]
            },
            {
                label: "Real",
                fillColor: "rgba(74, 121, 147, 0.6)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [60, 55, 70, 58, 74, 60, 72]
            }
        ]
    };
    var options = {};
    var chartjsLineChartCtx = document.getElementById("chartjsLineChart").getContext("2d");
    var chartjsLineChart = new Chart(chartjsLineChartCtx).Line(data, options);
    
    // Toastr
    setTimeout(function() {
        toastr.options = {
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 2500
        };
        toastr.success('Welcome to Dee Admin Template');
    }, 150);
});