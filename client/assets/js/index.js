$(function () {
    "use strict";

    // chart 1 (ADD HOVER INFORMATION)


    // chart 2

    // chart3

    var ctx = document.getElementById("chart3").getContext("2d");

    var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke1.addColorStop(0, "#00b09b");
    gradientStroke1.addColorStop(1, "rgba(0 176 155 / 45%)");

    var myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    label: "Revenue",
                    data: [3, 30, 10, 10, 22, 12, 5],
                    pointBorderWidth: 0,
                    pointHoverBackgroundColor: "#15ca20",
                    backgroundColor: "#15ca20",
                    fill: {
                        target: "origin",
                        above: "rgb(20 201 32 / 15%)", // Area will be red above the origin
                        below: "rgb(20 201 32 / 15%)", // And blue below the origin
                    },
                    borderColor: "#15ca20",
                    pointRadius: "0",
                    borderWidth: 3,
                    tension: 0.4,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            tooltips: {
                displayColors: false,
                mode: "nearest",
                intersect: false,
                position: "nearest",
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10,
            },
            scales: {
                x: {
                    stacked: false,
                    beginAtZero: true,
                    display: false,
                },
                y: {
                    stacked: false,
                    beginAtZero: true,
                    display: false,
                },
            },
        },
    });

    // $("#chart4").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 6, 8, 9, 10, 8, 6, 4, 5, 8, 7, 10, 9, 5, 8, 7, 9, 5, 4], {
    //     type: "bar",
    //     height: "30",
    //     barWidth: "2",
    //     resize: true,
    //     barSpacing: "3",
    //     barColor: "#008cff",
    // });
    //
    // $("#chart5").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 6, 8, 9, 10, 8, 6, 4, 5, 8, 7, 10, 9, 5, 8, 7, 9, 5, 4], {
    //     type: "bar",
    //     height: "30",
    //     barWidth: "2",
    //     resize: true,
    //     barSpacing: "3",
    //     barColor: "#fd3550",
    // });
    //
    // $("#chart6").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 6, 8, 9, 10, 8, 6, 4, 5, 8, 7, 10, 9, 5, 8, 7, 9, 5, 4], {
    //     type: "bar",
    //     height: "30",
    //     barWidth: "2",
    //     resize: true,
    //     barSpacing: "3",
    //     barColor: "#009688",
    // });
    //
    // $("#chart7").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 6, 8, 9, 10, 8, 6, 4, 5, 8, 7, 10, 9, 5, 8, 7, 9, 5, 4], {
    //     type: "bar",
    //     height: "30",
    //     barWidth: "2",
    //     resize: true,
    //     barSpacing: "3",
    //     barColor: "#ffc107",
    // });

    // easy pie chart





    $(".chart12").easyPieChart({
        easing: "easeOutBounce",
        barColor: "#0dcaf0",
        lineWidth: 8,
        trackColor: "rgba(0, 0, 0, 0.12)",
        scaleColor: false,
        onStep: function (from, to, percent) {
            $(this.el).find(".w_percent").text(Math.round(percent));
        },
    });



    // check template to re-add world map later
});
