$( document ).ready(function() {

    var pieOptions = {
        delimiter: null,
        fill: ["rgba(74, 121, 147, 0.2)", "rgba(74, 121, 147, 0.4)", "rgba(74, 121, 147, 0.5)", "rgba(74, 121, 147, 0.8)"],
        radius: 8,
        height: 64,
        width: 128
    }

    var donutOptions = {
        delimiter: null,
        fill: ["rgba(74, 121, 147, 0.2)", "rgba(74, 121, 147, 0.4)", "rgba(74, 121, 147, 0.5)", "rgba(74, 121, 147, 0.8)"],
        innerRadius: null,
        radius: 8,
        height: 64,
        width: 128
    }

    var lineOptions = {
        delimiter: ",",
        fill: "rgba(74, 121, 147, 0.2)",
        max: null,
        min: 0,
        stroke: "rgba(74, 121, 147, 0.8)",
        strokeWidth: 1,
        height: 64,
        width: 128
    }

    var barOptions = {
        delimiter: ",",
        fill: ["rgba(74, 121, 147, 0.2)", "rgba(74, 121, 147, 0.4)", "rgba(74, 121, 147, 0.5)", "rgba(74, 121, 147, 0.8)"],
        max: null,
        min: 0,
        padding: 0.1,
        height: 64,
        width: 128
    }

    $(".peityBarChart").peity("bar", barOptions);
    $(".peityLineChart").peity("line", lineOptions);
    $(".peityDonutChart").peity("donut", donutOptions);
    $(".peityPieChart").peity("pie", pieOptions);
    $(".peityBarChart-sm").peity("bar", {});
    $(".peityLineChart-sm").peity("line", {});
    $(".peityDonutChart-sm").peity("donut", {});
    $(".peityPieChart-sm").peity("pie", {});
    var peityUpdatingLineChart = $(".peityUpdatingLineChart").peity("line", lineOptions)
    var peityUpdatingBarChart = $(".peityUpdatingBarChart").peity("bar", barOptions)
    var peityUpdatingDonutChart = $(".peityUpdatingDonutChart").peity("donut", donutOptions)
    var peityUpdatingPieChart = $(".peityUpdatingPieChart").peity("pie", pieOptions)
    setInterval(function() {
        updateChart(peityUpdatingLineChart);
        updateChart(peityUpdatingBarChart);
        updateChart(peityUpdatingDonutChart);
        updateChart(peityUpdatingPieChart);
    }, 1000);
    function updateChart(chart) {
        var random = Math.round(Math.random() * 10);
          var values = chart.text().split(",");
          values.shift();
          values.push(random);
          chart
            .text(values.join(","))
            .change();
    }
});
