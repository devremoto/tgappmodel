$( document ).ready(function() {
    $("#sparkline-line").sparkline([50,60,70,85,90,50,30,40,40,40,60,70,80,90,100,50,40,40,50,30,50,70], 
            {type: 'line',
            lineColor: 'rgba(74, 121, 147, 0.9)',
            fillColor:  false,
            width: '164',
            height: '76',
            lineWidth: 1.5,
            spotRadius: 2,
            chartRangeMin: 0,
            tooltipChartTitle: 'Usage',
            tooltipSuffix:' %'});
    $("#sparkline-line-sm").sparkline([50,60,70,85,90,50,30,40,40,40,60,70,80,90,100,50,40,40,50,30,50,70], 
            {type: 'line',
            fillColor:  false});
    $("#sparkline-area").sparkline([50,60,70,85,90,50,30,40,40,40,60,70,80,90,100,50,40,40,50,30,50,70], 
            {type: 'line',
            lineColor: 'rgba(74, 121, 147, 0.9)',
            fillColor: 'rgba(74, 121, 147, 0.4)',
            width: '164',
            height: '76',
            chartRangeMin: 0,
            tooltipChartTitle: 'Usage',
            tooltipSuffix:' %'});
    $("#sparkline-area-sm").sparkline([50,60,70,85,90,50,30,40,40,40,60,70,80,90,100,50,40,40,50,30,50,70], 
            {type: 'line'});
    $("#sparkline-bar").sparkline([520,612,451,220,123,0,-144,-122,45,212,100,-423,300], 
            {type: 'bar',
            barColor: 'rgba(74, 121, 147, 0.9)',
            negBarColor: 'rgba(74, 121, 147, 0.4)',
            width: '164',
            height: '76',
            tooltipChartTitle: 'Balance',
            tooltipSuffix:' €'});
    $("#sparkline-bar-sm").sparkline([5,6,7,2,0,-4,-2,4,2,0,-4,3], 
            {type: 'bar'});
    $("#sparkline-tristate").sparkline([1,0,0,-1,1,-1,1,-1,0,1,-1,0], 
            {type: 'tristate',
            posBarColor: 'rgba(74, 121, 147, 0.9)',
            negBarColor: 'rgba(74, 121, 147, 0.4)',
            zeroBarColor: 'rgba(74, 121, 147, 0.6)',
            width: '164',
            height: '36'});
    $("#sparkline-tristate-sm").sparkline([1,0,0,-1,1,-1,1,-1,0,1,-1,0], 
            {type: 'tristate'});
     $("#sparkline-discrete").sparkline([4,6,7,7,4,3,2,1,4,4,4,6,7,7,4,3,2,1,4,4,3,2,1,4,4], 
            {type: 'discrete',
            lineColor: 'rgba(74, 121, 147, 0.9)',
            width: '164',
            height: '36'});
    $("#sparkline-discrete-sm").sparkline([4,6,7,7,4,3,2,1,4,4,4,6,7,7,4,3,2,1,4,4,3,2,1,4,4], 
            {type: 'discrete'});
    $("#sparkline-bullet").sparkline([10,12,12,9,7], 
            {type: 'bullet',
            targetColor: 'rgba(74, 121, 147, 0.9)',
            performanceColor: 'rgba(74, 121, 147, 0.6)',
            rangeColors: ['rgba(74, 121, 147, 0.2)','rgba(74, 121, 147, 0.3)','rgba(74, 121, 147, 0.4)'],
            width: '164',
            height: '36'});
    $("#sparkline-bullet-sm").sparkline([10,12,12,9,7], 
            {type: 'bullet'});
    $("#sparkline-pie").sparkline([1, 1, 2], 
            {type: 'pie',
            sliceColors: ['rgba(74, 121, 147, 0.4)','rgba(74, 121, 147, 0.6)','rgba(74, 121, 147, 0.9)'],
            width: '76',
            height: '76'});
    $("#sparkline-pie-sm").sparkline([1, 1, 2], 
            {type: 'pie'});
    $("#sparkline-box").sparkline([4,27,34,52,54,59,61,68,78,82,85,87,91,93,100], 
            {type: 'box',
            boxLineColor: 'rgba(74, 121, 147, 0.4)',
            boxFillColor: 'rgba(74, 121, 147, 0.6)',
            whiskerColor: 'rgba(74, 121, 147, 0.8)',
            outlierLineColor: 'rgba(74, 121, 147, 1.0)',
            outlierFillColor: 'rgba(74, 121, 147, 1.0)',
            medianColor: '#FFFFFF',
            targetColor: 'rgba(74, 121, 147, 1.0)',
            width: '164',
            height: '36'});
    $("#sparkline-box-sm").sparkline([4,27,34,52,54,59,61,68,78,82,85,87,91,93,100], 
            {type: 'box'});
});
