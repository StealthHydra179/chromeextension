$(function () {
    "use strict";

    $("#chart1").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 5, 8, 7, 10, 9, 10, 8, 6], {
        type: "bar",
        height: "35",
        barWidth: "2",
        resize: true,
        barSpacing: "3",
        barColor: "#008cff",
    });

    $("#chart2").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 5, 8, 7, 10, 9, 10, 8, 6], {
        type: "bar",
        height: "35",
        barWidth: "2",
        resize: true,
        barSpacing: "3",
        barColor: "#fd3550",
    });

    $("#chart3").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 5, 8, 7, 10, 9, 10, 8, 6], {
        type: "bar",
        height: "35",
        barWidth: "2",
        resize: true,
        barSpacing: "3",
        barColor: "#009688",
    });

    $("#chart4").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 5, 8, 7, 10, 9, 10, 8, 6], {
        type: "bar",
        height: "35",
        barWidth: "2",
        resize: true,
        barSpacing: "3",
        barColor: "#ffc107",
    });

    $("#chart5").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 5, 8, 7, 10, 9, 10, 8, 6], {
        type: "bar",
        height: "35",
        barWidth: "2",
        resize: true,
        barSpacing: "3",
        barColor: "#fff",
    });

    $("#chart6").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 5, 8, 7, 10, 9, 10, 8, 6], {
        type: "bar",
        height: "35",
        barWidth: "2",
        resize: true,
        barSpacing: "3",
        barColor: "#fff",
    });

    $("#chart7").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 5, 8, 7, 10, 9, 10, 8, 6], {
        type: "bar",
        height: "35",
        barWidth: "2",
        resize: true,
        barSpacing: "3",
        barColor: "#fff",
    });

    $("#chart8").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 5, 8, 7, 10, 9, 10, 8, 6], {
        type: "bar",
        height: "35",
        barWidth: "2",
        resize: true,
        barSpacing: "3",
        barColor: "#fff",
    });

    // easy pie chart

    $(".chart9").easyPieChart({
        easing: "easeOutBounce",
        barColor: "#008cff",
        lineWidth: 8,
        trackColor: "rgba(0, 0, 0, 0.12)",
        scaleColor: false,
        onStep: function (from, to, percent) {
            $(this.el).find(".w_percent").text(Math.round(percent));
        },
    });

    $(".chart10").easyPieChart({
        easing: "easeOutBounce",
        barColor: "#fd3550",
        lineWidth: 8,
        trackColor: "rgba(0, 0, 0, 0.12)",
        scaleColor: false,
        onStep: function (from, to, percent) {
            $(this.el).find(".w_percent").text(Math.round(percent));
        },
    });

    $(".chart11").easyPieChart({
        easing: "easeOutBounce",
        barColor: "#15ca20",
        lineWidth: 8,
        trackColor: "rgba(0, 0, 0, 0.12)",
        scaleColor: false,
        onStep: function (from, to, percent) {
            $(this.el).find(".w_percent").text(Math.round(percent));
        },
    });

    $(".chart12").easyPieChart({
        easing: "easeOutBounce",
        barColor: "#ffc107",
        lineWidth: 8,
        trackColor: "rgba(0, 0, 0, 0.12)",
        scaleColor: false,
        onStep: function (from, to, percent) {
            $(this.el).find(".w_percent").text(Math.round(percent));
        },
    });

    $(".chart13").easyPieChart({
        easing: "easeOutBounce",
        barColor: "#0dcaf0",
        lineWidth: 8,
        trackColor: "rgba(0, 0, 0, 0.12)",
        scaleColor: false,
        onStep: function (from, to, percent) {
            $(this.el).find(".w_percent").text(Math.round(percent));
        },
    });

    $(".chart14").easyPieChart({
        easing: "easeOutBounce",
        barColor: "#9c27b0",
        lineWidth: 8,
        trackColor: "rgba(0, 0, 0, 0.12)",
        scaleColor: false,
        onStep: function (from, to, percent) {
            $(this.el).find(".w_percent").text(Math.round(percent));
        },
    });

    $(".chart15").easyPieChart({
        easing: "easeOutBounce",
        barColor: "#ff5722",
        lineWidth: 8,
        trackColor: "rgba(0, 0, 0, 0.12)",
        scaleColor: false,
        onStep: function (from, to, percent) {
            $(this.el).find(".w_percent").text(Math.round(percent));
        },
    });

    $(".chart16").easyPieChart({
        easing: "easeOutBounce",
        barColor: "#009688",
        lineWidth: 8,
        trackColor: "rgba(0, 0, 0, 0.12)",
        scaleColor: false,
        onStep: function (from, to, percent) {
            $(this.el).find(".w_percent").text(Math.round(percent));
        },
    });
});
