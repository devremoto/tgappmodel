$( document ).ready(function() {
    
    Chart.defaults.global = {
        // Boolean - Whether to animate the chart
        animation: true,
        // Number - Number of animation steps
        animationSteps: 60,
        // String - Animation easing effect
        animationEasing: "easeOutQuart",
        // Boolean - If we should show the scale at all
        showScale: true,
        // Boolean - If we want to override with a hard coded scale
        scaleOverride: false,
        // Number - The number of steps in a hard coded scale
        scaleSteps: null,
        // Number - The value jump in the hard coded scale
        scaleStepWidth: null,
        // Number - The scale starting value
        scaleStartValue: null,
        // String - Colour of the scale line
        scaleLineColor: "rgba(0,0,0,0.1)",
        // Number - Pixel width of the scale line
        scaleLineWidth: 1,
        // Boolean - Whether to show labels on the scale
        scaleShowLabels: true,
        // Interpolated JS string - can access value
        scaleLabel: "<%=value%>",
        // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
        scaleIntegersOnly: true,
        // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: false,
        // String - Scale label font declaration for the scale label
        scaleFontFamily: "'Raleway', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        // Number - Scale label font size in pixels
        scaleFontSize: 12,
        // String - Scale label font weight style
        scaleFontStyle: "normal",
        // String - Scale label font colour
        scaleFontColor: "#666",
        // Boolean - whether or not the chart should be responsive and resize when the browser does.
        responsive: true,
        // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: false,
        // Boolean - Determines whether to draw tooltips on the canvas or not
        showTooltips: true,
        // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
        customTooltips: false,
        // Array - Array of string names to attach tooltip events
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],
        // String - Tooltip background colour
        tooltipFillColor: "rgba(0,0,0,0.7)",
        // String - Tooltip label font declaration for the scale label
        tooltipFontFamily: "'Raleray', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        // Number - Tooltip label font size in pixels
        tooltipFontSize: 14,
        // String - Tooltip font weight style
        tooltipFontStyle: "normal",
        // String - Tooltip label font colour
        tooltipFontColor: "#fff",
        // String - Tooltip title font declaration for the scale label
        tooltipTitleFontFamily: "'Raleway', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        // Number - Tooltip title font size in pixels
        tooltipTitleFontSize: 14,
        // String - Tooltip title font weight style
        tooltipTitleFontStyle: "normal",
        // String - Tooltip title font colour
        tooltipTitleFontColor: "#fff",
        // Number - pixel width of padding around tooltip text
        tooltipYPadding: 12,
        // Number - pixel width of padding around tooltip text
        tooltipXPadding: 20,
        // Number - Size of the caret on the tooltip
        tooltipCaretSize: 8,
        // Number - Pixel radius of the tooltip border
        tooltipCornerRadius: 4,
        // Number - Pixel offset from point x to tooltip edge
        tooltipXOffset: 10,
        // String - Template string for single tooltips
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
        // String - Template string for multiple tooltips
        multiTooltipTemplate: "<%= value %>",
        // Function - Will fire on animation progression.
        onAnimationProgress: function(){},
        // Function - Will fire on animation completion.
        onAnimationComplete: function(){}
    }

    var data = {
        labels: ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh"],
        datasets: [
            {
                label: "First dataset",
                fillColor: "rgba(74, 121, 147, 0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 66, 65, 55]
            },
            {
                label: "Second dataset",
                fillColor: "rgba(74, 121, 147, 0.6)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 50, 39, 86, 37, 80]
            }
        ]
    };
    var polarData = [
        {
            value: 300,
            color:"rgba(74, 121, 147, 0.5)",
            highlight: "rgba(74, 121, 147, 0.9)",
            label: "First"
        },
        {
            value: 150,
            color: "rgba(163, 200, 220, 0.5)",
            highlight: "rgba(163, 200, 220, 0.9)",
            label: "Second"
        },
        {
            value: 100,
            color: "rgba(29, 73, 97, 0.5)",
            highlight: "rgba(29, 73, 97, 0.9)",
            label: "Third"
        }
    ];
    var pieDonutData = [
        {
            value: 300,
            color: "rgba(74, 121, 147, 0.5)",
            highlight: "rgba(74, 121, 147, 0.9)",
            label: "First"
        },
        {
            value: 50,
            color: "rgba(163, 200, 220, 0.5)",
            highlight: "rgba(163, 200, 220, 0.9)",
            label: "Second"
        },
        {
            value: 100,
            color: "rgba(29, 73, 97, 0.5)",
            highlight: "rgba(29, 73, 97, 0.9)",
            label: "Third"
        }
    ];
    var radarData = {
        labels: ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh"],
        datasets: [
            {
                label: "First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: "Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };
    
    var options = {};
    
    var chartjsLineChartCtx = document.getElementById("chartjsLineChart").getContext("2d");
    var chartjsLineChart = new Chart(chartjsLineChartCtx).Line(data, options);
    var chartjsBarChartCtx = document.getElementById("chartjsBarChart").getContext("2d");
    var chartjsBarChart = new Chart(chartjsBarChartCtx).Bar(data, options);
    var chartjsRadarChartCtx = document.getElementById("chartjsRadarChart").getContext("2d");
    var chartjsRadarChart = new Chart(chartjsRadarChartCtx).Radar(radarData, options);
    var chartjsPolarChartCtx = document.getElementById("chartjsPolarChart").getContext("2d");
    var chartjsPolarChart = new Chart(chartjsPolarChartCtx).PolarArea(polarData, options);
    var chartjsPieChartCtx = document.getElementById("chartjsPieChart").getContext("2d");
    var chartjsPieChart = new Chart(chartjsPieChartCtx).Pie(pieDonutData,options);
    var chartjsDoughnutChartCtx = document.getElementById("chartjsDoughnutChart").getContext("2d");
    var chartjsDoughnutChart = new Chart(chartjsDoughnutChartCtx).Doughnut(pieDonutData,options);
    
});
