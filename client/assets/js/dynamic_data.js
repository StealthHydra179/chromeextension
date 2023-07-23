var response;

function millisecondsToTimeString(milliseconds) {
    let years = Math.floor(milliseconds / 31536000000);
    milliseconds -= years * 31536000000;
    let months = Math.floor(milliseconds / 2592000000);
    milliseconds -= months * 2592000000;
    let weeks = Math.floor(milliseconds / 604800000);
    milliseconds -= weeks * 604800000;
    let days = Math.floor(milliseconds / 86400000);
    milliseconds -= days * 86400000;
    let hours = Math.floor(milliseconds / 3600000);
    milliseconds -= hours * 3600000;
    let minutes = Math.floor(milliseconds / 60000);
    milliseconds -= minutes * 60000;
    let seconds = Math.floor(milliseconds / 1000);
    // milliseconds -= seconds * 1000;
    // does not display miliseconds right now

    let timeString = "";
    if (years > 0) {
        if (years === 1) {
            timeString += years + "Y ";
        } else {
            timeString += years + "Y ";
        }
    }
    if (months > 0) {
        if (months === 1) {
            timeString += months + "M ";
        } else {
            timeString += months + "M ";
        }
    }
    if (weeks > 0) {
        if (weeks === 1) {
            timeString += weeks + "w ";
        } else {
            timeString += weeks + "w ";
        }
    }
    if (days > 0) {
        if (days === 1) {
            timeString += days + "d ";
        } else {
            timeString += days + "d ";
        }
    }
    if (hours > 0) {
        if (hours === 1) {
            timeString += hours + "h ";
        } else {
            timeString += hours + "h ";
        }
    }
    if (minutes > 0) {
        if (minutes === 1) {
            timeString += minutes + "m ";
        } else {
            timeString += minutes + "m ";
        }
    }
    if (seconds > 0) {
        if (seconds === 1) {
            timeString += seconds + "s ";
        } else {
            timeString += seconds + "s ";
        }
    }
    if (timeString === "") {
        timeString = "0s";
    }

    return timeString;
}

function generateBorderColor(index) {
    let colors = [
        "#6078ea",
        "#17c5ea",
        "#ffce00",
        "#ff6c00",
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ff00ff",
        "#00ffff",
        "#ffff00",
        "#000000"
    ];
    return colors[index % colors.length];
}

function calculate_totalTimeVisible(response) {
    let specificList = response.specificList;
    let totalTimeVisible = 0;
    for (let website in specificList) {
        for (let webpage in specificList[website]) {
            // console.log("ttv: ", specificList[website][webpage]["total_time_visible"])
            if (
                specificList[website][webpage]["total_time_visible"] === undefined ||
                specificList[website][webpage]["total_time_visible"] <= -1
            ) {
                continue;
            }
            totalTimeVisible += specificList[website][webpage]["total_time_visible"];
        }
    }
    return totalTimeVisible;
}


function onLoad() {
    let specificListExtraKeys = 12;

    //get specific data from the database
    chrome.runtime.sendMessage({ message: "requestData" }, (response) => {
        console.log(response);
        if (response === "Not Initialized") {
            console.log("Not Initialized");
            setTimeout(onLoad, 1000);
        } else {
            let specificList = response.specificList;

            //row 1
            //update the website
            first_row_statistics(response);

            // row2
            // website history
            websiteHistory(response);
            // top 4 time breakdown
            topTimeBreakdown(response);

            // row 3
            //graph summary
            websiteViewTime(response);
            // percentage summaries
            updateSummaryUIElements(response);

            // row 4
            // top websites
            allWebsites(response);

            // row 5
            // all webpages
            allPages(response);
        }
    });

    function first_row_statistics(response) {
        specificList = response.specificList;
        //unique websites visited
        document.getElementById("websites_visited_row_1").innerHTML = "" + Object.keys(specificList).length;

        //unique webpages visited
        let webpageCount = 0;
        for (let website in specificList) {
            webpageCount += Object.keys(specificList[website]).length - specificListExtraKeys;
        }
        document.getElementById("webpages_visited_row_1").innerHTML = "" + webpageCount;

        //Average Time Per Day
        let totalTime = calculate_totalTimeVisible(response);
        let totalDays = Math.ceil(response.timeOnline / 86400000);
        let averageTimePerDay = totalTime / totalDays;
        console.log("atpd:", averageTimePerDay);
        document.getElementById("average_time_per_day_row_1").innerHTML = millisecondsToTimeString(averageTimePerDay);

        //total time used
        let totalTimeUsedVisible = calculate_totalTimeVisible(response);
        console.log("TOTAL TIME VISIBLE", totalTimeUsedVisible);
        //document.getElementById("total_time_used_row_1").innerHTML = totalTime
        // display time in hours, minutes, seconds (which ever one is applicable and only the largest one)
        document.getElementById("total_time_used_row_1").innerHTML = millisecondsToTimeString(totalTimeUsedVisible);

    }

    function websiteHistory(response) {
        let tabList = response.tabList;

        // update graph additional information
        let historyTotalPages = document.getElementById("historyTotalPages");
        let totalPageVisits = 0;
        for (let i = 0; i < tabList.length; i++) {
            totalPageVisits += tabList[i]["total_visits"] >= 0 ? tabList[i]["total_visits"] : 0;
        }
        historyTotalPages.innerHTML = "" + totalPageVisits;

        let historyPagesPerHour = document.getElementById("historyPagesPerHour");
        let timeOnline = response.timeOnline;
        let timeTracked = document.getElementById("historyTracked");
        timeTracked.innerHTML = millisecondsToTimeString(timeOnline);
        let pagesPerHour = Math.round(totalPageVisits / Math.ceil(timeOnline / 3600000));
        historyPagesPerHour.innerHTML = "" + pagesPerHour;

        //update graph
        // create datasets
        // convert tablist visit_history into a frequency table by hour if extention time < 1 day, other wise split by day, but if less than 1 hour split by minutes
        let frequencyTable = {};
        let timeOnlineInDays = response.timeSinceInstall / 86400000;
        let timeOnlineInHours = response.timeSinceInstall / 3600000;
        let timeOnlineInMinutes = response.timeSinceInstall / 60000;
        let datasets;
        let timeLabels = [];
        if (timeOnlineInHours < 4) {
            for (let i = 0; i < timeOnlineInMinutes - 1; i++) {
                timeLabels.push((i + 1) + "m");
            }
            for (let i = 0; i < tabList.length; i++) {
                let times = [];
                for (let j = 0; j < timeOnlineInMinutes - 1; j++) {
                    times.push(0);
                }
                let visitHistory = tabList[i]["visit_history"];
                for (let j = 0; j < visitHistory.length; j++) {
                    let visitTime = visitHistory[j];
                    let visitTimeInMinutes = (Date.now() - visitTime) / 60000;
                    let index = Math.min(Math.max(Math.floor(timeOnlineInMinutes - visitTimeInMinutes), 0), timeOnlineInMinutes - 1);
                    times[Math.floor(index)] += 1;
                }
                // //remove trailing zeros
                // for (let j = times.length - 1; j >= 0; j--) {
                //     if (times[j] === 0 && j > 0 && times[j-1] === 0) {
                //         times.pop();
                //     } else {
                //         break;
                //     }
                // }
                // //replace leading zeros with undefined
                // for (let j = 0; j < times.length; j++) {
                //     if (times[j] === 0 && j < times.length - 1 && times[j+1] === 0) {
                //         times[j] = undefined;
                //     } else {
                //         break;
                //     }
                // }

                frequencyTable[tabList[i]["documentId"]] = times;
            }


            datasets = [];
            for (let i = 0; i < tabList.length; i++) {
                let dataset = {
                    label: tabList[i]["title"],
                    data: frequencyTable[tabList[i]["documentId"]],
                    backgroundColor: "transparent",
                    borderColor: generateBorderColor(i),
                    pointRadius: "0",
                    borderWidth: 4,
                    tension: 0.4
                };
                datasets.push(dataset);
            }
        } else if (timeOnlineInDays < 4) {
            for (let i = 0; i < timeOnlineInHours - 1; i++) {
                timeLabels.push((i + 1) + "h");
            }
            for (let i = 0; i < tabList.length; i++) {
                let times = [];
                for (let j = 0; j < timeOnlineInHours - 1; j++) {
                    times.push(0);
                }
                let visitHistory = tabList[i]["visit_history"];
                for (let j = 0; j < visitHistory.length; j++) {
                    let visitTime = visitHistory[j];
                    let visitTimeInHours = (Date.now() - visitTime) / 3600000;
                    let index = Math.min(Math.max(Math.floor(timeOnlineInHours - visitTimeInHours), 0), timeOnlineInHours - 1);
                    times[Math.floor(index)] += 1;
                }

                frequencyTable[tabList[i]["documentId"]] = times;
            }

            datasets = [];
            for (let i = 0; i < tabList.length; i++) {
                let dataset = {
                    label: tabList[i]["title"],
                    data: frequencyTable[tabList[i]["documentId"]],
                    backgroundColor: "transparent",
                    borderColor: generateBorderColor(i),
                    pointRadius: "0",
                    borderWidth: 4,
                    tension: 0.4

                };
                datasets.push(dataset);
            }
        } else {
            for (let i = 0; i < timeOnlineInDays - 1; i++) {
                timeLabels.push((i + 1) + "d");
            }
            for (let i = 0; i < tabList.length; i++) {
                let times = [];
                for (let j = 0; j < timeOnlineInDays - 1; j++) {
                    times.push(0);
                }
                let visitHistory = tabList[i]["visit_history"];
                for (let j = 0; j < visitHistory.length; j++) {
                    let visitTime = visitHistory[j];
                    let visitTimeInDays = (Date.now() - visitTime) / 86400000;
                    let index = Math.min(Math.max(Math.floor(timeOnlineInDays - visitTimeInDays), 0), timeOnlineInDays - 1);
                    times[Math.floor(index)] += 1;
                }

                frequencyTable[tabList[i]["documentId"]] = times;
            }

            datasets = [];
            for (let i = 0; i < tabList.length; i++) {
                let dataset = {
                    label: tabList[i]["title"],
                    data: frequencyTable[tabList[i]["documentId"]],
                    backgroundColor: "transparent",
                    borderColor: generateBorderColor(i),
                    pointRadius: "0",
                    borderWidth: 4,
                    tension: 0.4

                };
            }
        }


        var pagesVisitedChart = document.getElementById("pagesVisitedChart").getContext("2d");

        var gradientStroke1 = pagesVisitedChart.createLinearGradient(0, 0, 0, 300);
        gradientStroke1.addColorStop(0, "#6078ea");
        gradientStroke1.addColorStop(1, "#17c5ea");

        var gradientStroke2 = pagesVisitedChart.createLinearGradient(0, 0, 0, 300);
        gradientStroke2.addColorStop(0, "#ff8359");
        gradientStroke2.addColorStop(1, "#ffdf40");
        // console.log(datasets);
        var myChart = new Chart(pagesVisitedChart, {
            type: "line",
            data: {
                labels: timeLabels,
                datasets: datasets
            },
            options: {
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            fontColor: "#5f5f5f",
                            boxWidth: 40
                        },
                        position: "bottom"
                    }
                },

                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                fontColor: "#585757"
                            },
                            gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.07)"
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                fontColor: "#585757",
                                precision: 0
                            },
                            gridLines: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.07)"
                            }
                        }
                    ]
                }
            }
        });
    }

    function topTimeBreakdown(response) {
        let sortedSpecificArray = response.sortedSpecificArray;

        let totalTimeUsed = 0;
        let length = response.sortedSpecificArray.length;
        for (let i = 0; i < sortedSpecificArray.length; i++) {
            if (sortedSpecificArray[i]["value"]["total_time_visible"] <= 0) {
                length = i;
                console.log("b1", sortedSpecificArray[i]["value"]["total_time_visible"]);
                break;
            }
            totalTimeUsed += sortedSpecificArray[i]["value"]["total_time_visible"];
            if (i >= 3) {
                if (totalTimeUsed >= calculate_totalTimeVisible(response)) {
                    console.log("timematch?");
                    length = 4;
                } else {
                    length = 5;
                }
                break;
            }
        }

        console.log("LENGTH: ", length);

        let pieChart = document.getElementById("topTimesPieChart").getContext("2d");

        let topWebsiteUsed1 = pieChart.createLinearGradient(0, 0, 0, 300);
        topWebsiteUsed1.addColorStop(0, "#fc4a1a");
        topWebsiteUsed1.addColorStop(1, "#f7b733");

        let topWebsiteUsed2 = pieChart.createLinearGradient(0, 0, 0, 300);
        topWebsiteUsed2.addColorStop(0, "#008cff");
        topWebsiteUsed2.addColorStop(1, "#8e54e9");

        let topWebsiteUsed3 = pieChart.createLinearGradient(0, 0, 0, 300);
        topWebsiteUsed3.addColorStop(0, "#ee0979");
        topWebsiteUsed3.addColorStop(1, "#ff6a00");

        let topWebsiteUsed4 = pieChart.createLinearGradient(0, 0, 0, 300);
        topWebsiteUsed4.addColorStop(0, "#42e695");
        topWebsiteUsed4.addColorStop(1, "#3bb86d");

        let others = pieChart.createLinearGradient(0, 0, 0, 300);
        others.addColorStop(0, "#12a986");
        others.addColorStop(1, "#4dcaff");

        let colors = [];
        let times = [];
        let labels = [];
        if (length < 5) {
            switch (length) {
                case 1:
                    colors = [topWebsiteUsed1];
                    times = [sortedSpecificArray[0]["value"]["total_time_visible"]];
                    labels = [sortedSpecificArray[0]["key"]];
                    break;
                case 2:
                    colors = [topWebsiteUsed1, topWebsiteUsed2];
                    times = [sortedSpecificArray[0]["value"]["total_time_visible"], sortedSpecificArray[1]["value"]["total_time_visible"]];
                    labels = [sortedSpecificArray[0]["key"], sortedSpecificArray[1]["key"]];
                    break;
                case 3:
                    colors = [topWebsiteUsed1, topWebsiteUsed2, topWebsiteUsed3];
                    times = [
                        sortedSpecificArray[0]["value"]["total_time_visible"],
                        sortedSpecificArray[1]["value"]["total_time_visible"],
                        sortedSpecificArray[2]["value"]["total_time_visible"]
                    ];
                    labels = [sortedSpecificArray[0]["key"], sortedSpecificArray[1]["key"], sortedSpecificArray[2]["key"]];
                    break;
                case 4:
                    colors = [topWebsiteUsed1, topWebsiteUsed2, topWebsiteUsed3, topWebsiteUsed4];
                    times = [
                        sortedSpecificArray[0]["value"]["total_time_visible"],
                        sortedSpecificArray[1]["value"]["total_time_visible"],
                        sortedSpecificArray[2]["value"]["total_time_visible"],
                        sortedSpecificArray[3]["value"]["total_time_visible"]
                    ];
                    labels = [
                        sortedSpecificArray[0]["key"],
                        sortedSpecificArray[1]["key"],
                        sortedSpecificArray[2]["key"],
                        sortedSpecificArray[3]["key"]
                    ];
                    break;
            }
        } else {
            colors = [topWebsiteUsed1, topWebsiteUsed2, topWebsiteUsed3, topWebsiteUsed4, others];
            times = [
                sortedSpecificArray[0]["value"]["total_time_visible"],
                sortedSpecificArray[1]["value"]["total_time_visible"],
                sortedSpecificArray[2]["value"]["total_time_visible"],
                sortedSpecificArray[3]["value"]["total_time_visible"],
                calculate_totalTimeVisible(response) - totalTimeUsed
            ];
            labels = [
                sortedSpecificArray[0]["key"],
                sortedSpecificArray[1]["key"],
                sortedSpecificArray[2]["key"],
                sortedSpecificArray[3]["key"],
                "Others"
            ];
        }

        // console.log("Colors: ", colors);
        // console.log("Times: ", times);

        new Chart(pieChart, {
            type: "doughnut",
            data: {
                labels: labels,
                datasets: [
                    {
                        backgroundColor: colors,
                        hoverBackgroundColor: colors,
                        data: times,
                        borderWidth: [1, 1, 1, 1, 1]
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                cutout: "80%",
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || "";

                                if (label) {
                                    label += ": ";
                                }
                                // console.log("CONTEXT:", context);
                                if (context.parsed !== null) {
                                    // console.log(context.parsed.y)
                                    label += millisecondsToTimeString(context.parsed);
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // update legend
        let legend = document.getElementById("topTimesBreakdownLegend");

        for (let i = 0; i < length; i++) {
            let li = document.createElement("li");
            li.className = "list-group-item d-flex bg-transparent justify-content-between align-items-center";

            if (i === 0) {
                li.className += " border-top";
            }

            let pill_class;
            switch (i) {
                case 0:
                    pill_class = "bg-warning text-dark";
                    break;
                case 1:
                    pill_class = "bg-primary";
                    break;
                case 2:
                    pill_class = "bg-danger";
                    break;
                case 3:
                    pill_class = "bg-success";
                    break;
                case 4:
                    pill_class = "bg-info";
                    break;
                case 5:
                    pill_class = "bg-secondary";
            }
            li.innerHTML = "<span style=\"max-width:70%\">" + labels[i] + "</span>" + " <span class=\"badge " + pill_class + " rounded-pill\">" + millisecondsToTimeString(times[i]) + "</span>";
            legend.appendChild(li);
        }
    }

    function websiteViewTime(response) {
        //averagePagesStatistic average pages per website
        let averagePagesStatistic = document.getElementById("averagePagesStatistic");
        // calculate ratio of tab pages : specific website
        let ratio = response.tabList.length / response.sortedSpecificArray.length;
        averagePagesStatistic.innerHTML = ratio.toFixed(2);


        //averageTimePerWebsiteStatistic average time per website
        let averageTimePerWebsiteStatistic = document.getElementById("averageTimePerWebsiteStatistic");
        // calculate ratio of overall visible time : number of websites
        let ratio2 = calculate_totalTimeVisible(response) / response.sortedSpecificArray.length;
        averageTimePerWebsiteStatistic.innerHTML = millisecondsToTimeString(ratio2);


        //averageTimePerPageStatistic average time per page
        let averageTimePerPageStatistic = document.getElementById("averageTimePerPageStatistic");
        // calculate ratio of overall visible time : number of tabs
        let ratio3 = calculate_totalTimeVisible(response) / response.tabList.length;
        averageTimePerPageStatistic.innerHTML = millisecondsToTimeString(ratio3);


        //averageVisitsPerPageStatistic average views per page
        let averageVisitsPerPageStatistic = document.getElementById("averageVisitsPerPageStatistic");
        // calculate ratio of overall view count : number of tabs
        let totalViews = 0;
        for (let i = 0; i < response.tabList.length; i++) {
            if (response.tabList[i]["total_visits"] === undefined || response.tabList[i]["total_visits"] === null || response.tabList[i]["total_visits"] < 0) {
                continue;
            }
            totalViews += response.tabList[i]["total_visits"];
        }
        let ratio4 = totalViews / response.tabList.length;
        averageVisitsPerPageStatistic.innerHTML = ratio4.toFixed(2);


        //update chart
        //do same data manipulation as in pagesVisitedChart
        let sortedTabList = response.sortedTabList;
        let labels = [];
        let times = [];

        let timeOnlineInDays = response.timeSinceInstall / 86400000;
        let timeOnlineInHours = response.timeSinceInstall / 3600000;
        let timeOnlineInMinutes = response.timeSinceInstall / 60000;

        if (timeOnlineInHours < 4) {
            // create labels
            for (let i = 0; i < timeOnlineInMinutes - 1; i++) {
                labels[i] = i + 1 + "m";
                times.push(0);
            }

            for (let i = 0; i < sortedTabList.length; i++) {

                console.log(times, labels, sortedTabList[i].title);
                //calculate time since install for each tab update time and add correspond times to each relevant bucket in tab array
                let updateTime = sortedTabList[i]["update_time"];
                for (let j = 0; j < updateTime.length; j++) {
                    let timeSinceInstall = updateTime[j].time - (Date.now() - response.timeSinceInstall);
                    let index = Math.floor(timeSinceInstall / 60000);
                    // console.log(updateTime[j].time, index, (Date.now() - response.timeSinceInstall), timeSinceInstall);
                    if (updateTime[j].visibility === "visible") {
                        let time = updateTime[j].time;
                        let time2;
                        if (j + 1 >= updateTime.length) {
                            time2 = Date.now();
                        } else {
                            time2 = updateTime[j + 1].time;
                        }
                        // check if it spans multiple time values
                        if (Math.floor(time / 60000) !== Math.floor(time2 / 60000)) {
                            // calculate time in each bucket
                            //first bucket
                            times[index] += (Math.floor(time / 60000) + 1) * 60000 - time;
                            //last bucket
                            times[index + Math.floor(time2 / 60000) - Math.floor(time / 60000) - 1] += time2 - Math.floor(time2 / 60000) * 60000;

                            for (let k = 1; k < Math.floor(time2 / 60000) - Math.floor(time / 60000) - 1; k++) {
                                times[index + k] += 60000;
                            }
                        } else {
                            times[index] += time2 - time;
                        }
                    }
                }
                //if last tab is visible
                if (updateTime[updateTime.length - 1].visibility === "visible") {
                    let time = updateTime[updateTime.length - 1].time;
                    let time2 = Date.now();
                    let index = Math.floor((time - (Date.now() - response.timeSinceInstall)) / 60000);
                    // check if it spans multiple time values
                    if (Math.floor(time / 60000) !== Math.floor(time2 / 60000)) {
                        // calculate time in each bucket
                        //first bucket
                        times[index] += (Math.floor(time / 60000) + 1) * 60000 - time;
                        //last bucket
                        times[index + Math.floor(time2 / 60000) - Math.floor(time / 60000) - 1] += time2 - Math.floor(time2 / 60000) * 60000;
                    }
                }
            }
        } else if (timeOnlineInDays < 4) {
            // create labels
            for (let i = 0; i < timeOnlineInHours - 1; i++) {
                labels[i] = i + 1 + "h";
                times.push(0);
            }

            for (let i = 0; i < sortedTabList.length; i++) {
                console.log(times, labels, sortedTabList[i].title);
                //calculate time since install for each tab update time and add correspond times to each relevant bucket in tab array
                let updateTime = sortedTabList[i]["update_time"];
                for (let j = 0; j < updateTime.length; j++) {
                    let timeSinceInstall = updateTime[j].time - (Date.now() - response.timeSinceInstall);
                    let index = Math.floor(timeSinceInstall / 3600000);
                    // console.log(updateTime[j].time, index, (Date.now() - response.timeSinceInstall), timeSinceInstall);
                    if (updateTime[j].visibility === "visible") {
                        let time = updateTime[j].time;
                        let time2;
                        if (j + 1 >= updateTime.length) {
                            time2 = Date.now();
                        } else {
                            time2 = updateTime[j + 1].time;
                        }
                        // check if it spans multiple time values
                        if (Math.floor(time / 3600000) !== Math.floor(time2 / 3600000)) {
                            // calculate time in each bucket
                            //first bucket
                            times[index] += (Math.floor(time / 3600000) + 1) * 3600000 - time;
                            //last bucket
                            times[index + Math.floor(time2 / 3600000) - Math.floor(time / 3600000) - 1] += time2 - Math.floor(time2 / 3600000) * 3600000;

                            for (let k = 1; k < Math.floor(time2 / 3600000) - Math.floor(time / 3600000) - 1; k++) {
                                times[index + k] += 3600000;
                            }
                        } else {
                            times[index] += time2 - time;
                        }
                    }
                }
                //if last tab is visible
                if (updateTime[updateTime.length - 1].visibility === "visible") {
                    let time = updateTime[updateTime.length - 1].time;
                    let time2 = Date.now();
                    let index = Math.floor((time - (Date.now() - response.timeSinceInstall)) / 3600000);
                    // check if it spans multiple time values
                    if (Math.floor(time / 3600000) !== Math.floor(time2 / 3600000)) {
                        // calculate time in each bucket
                        //first bucket
                        times[index] += (Math.floor(time / 3600000) + 1) * 3600000 - time;
                        //last bucket
                        times[index + Math.floor(time2 / 3600000) - Math.floor(time / 3600000) - 1] += time2 - Math.floor(time2 / 3600000) * 3600000;
                    } else {
                        times[index] += time2 - time;
                    }
                }
            }
        } else {
            // create labels
            for (let i = 0; i < timeOnlineInDays - 1; i++) {
                labels[i] = i + 1 + "d";
                times.push(0);
            }

            for (let i = 0; i < sortedTabList.length; i++) {
                console.log(times, labels, sortedTabList[i].title);
                //calculate time since install for each tab update time and add correspond times to each relevant bucket in tab array
                let updateTime = sortedTabList[i]["update_time"];
                for (let j = 0; j < updateTime.length; j++) {
                    let timeSinceInstall = updateTime[j].time - (Date.now() - response.timeSinceInstall);
                    let index = Math.floor(timeSinceInstall / 86400000);
                    // console.log(updateTime[j].time, index, (Date.now() - response.timeSinceInstall), timeSinceInstall);
                    if (updateTime[j].visibility === "visible") {
                        let time = updateTime[j].time;
                        let time2;
                        if (j + 1 >= updateTime.length) {
                            time2 = Date.now();
                        } else {
                            time2 = updateTime[j + 1].time;
                        }
                        // check if it spans multiple time values
                        if (Math.floor(time / 86400000) !== Math.floor(time2 / 86400000)) {
                            // calculate time in each bucket
                            //first bucket
                            times[index] += (Math.floor(time / 86400000) + 1) * 86400000 - time;
                            //last bucket
                            times[index + Math.floor(time2 / 86400000) - Math.floor(time / 86400000) - 1] += time2 - Math.floor(time2 / 86400000) * 86400000;

                            for (let k = 1; k < Math.floor(time2 / 86400000) - Math.floor(time / 86400000) - 1; k++) {
                                times[index + k] += 86400000;
                            }
                        } else {
                            times[index] += time2 - time;
                        }
                    }
                }
                //if last tab is visible
                if (updateTime[updateTime.length - 1].visibility === "visible") {
                    let time = updateTime[updateTime.length - 1].time;
                    let time2 = Date.now();
                    let index = Math.floor((time - (Date.now() - response.timeSinceInstall)) / 86400000);
                    // check if it spans multiple time values
                    if (Math.floor(time / 86400000) !== Math.floor(time2 / 86400000)) {
                        // calculate time in each bucket
                        //first bucket
                        times[index] += (Math.floor(time / 86400000) + 1) * 86400000 - time;
                        //last bucket
                        times[index + Math.floor(time2 / 86400000) - Math.floor(time / 86400000) - 1] += time2 - Math.floor(time2 / 86400000) * 86400000;
                    } else {
                        times[index] += time2 - time;
                    }
                }
            }
        }


        let websiteViewTimeChart = document.getElementById("websiteViewTimeChart").getContext("2d");

        let gradientStroke1 = websiteViewTimeChart.createLinearGradient(0, 0, 0, 300);
        gradientStroke1.addColorStop(0, "#00b09b");
        gradientStroke1.addColorStop(1, "rgba(0 176 155 / 45%)");
        console.log(times, labels);
        let myChart = new Chart(websiteViewTimeChart, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Total Viewed Time",
                        data: times,
                        pointBorderWidth: 0,
                        pointHoverBackgroundColor: "#15ca20",
                        backgroundColor: "#15ca20",
                        fill: {
                            target: "origin",
                            above: "rgb(20 201 32 / 15%)", // Area will be red above the origin
                            below: "rgb(20 201 32 / 15%)" // And blue below the origin
                        },
                        borderColor: "#15ca20",
                        pointRadius: "0",
                        borderWidth: 3,
                        tension: 0.4
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || "";

                                if (label) {
                                    label += ": ";
                                }
                                // console.log("CONTEXT:", context);
                                if (context.raw !== null) {
                                    // console.log(context.parsed.y)
                                    label += millisecondsToTimeString(context.raw);
                                }
                                return label;
                            }
                        }
                    }
                },
                tooltips: {
                    displayColors: false,
                    mode: "nearest",
                    intersect: false,
                    position: "nearest",
                    xPadding: 10,
                    yPadding: 10,
                    caretPadding: 10
                },
                scales: {
                    x: {
                        stacked: false,
                        beginAtZero: true,
                        display: true
                    },
                    y: {
                        stacked: false,
                        beginAtZero: true,
                        display: false
                    }
                }
            }
        });
    }

    function updateSummaryUIElements(response) {
        let tabList = response.tabList;

        //calculate total time active
        let totalTimeVisible = 0;
        for (let i = 0; i < tabList.length; i++) {
            if (
                tabList[i]["total_time_visible"] === undefined ||
                tabList[i]["total_time_visible"] === null ||
                tabList[i]["total_time_visible"] === -1
            ) {
                continue;
            }
            totalTimeVisible += tabList[i]["total_time_visible"];
        }

        let totalTimeLoaded = 0;
        for (let i = 0; i < tabList.length; i++) {
            if (
                tabList[i]["total_time_loaded"] === undefined ||
                tabList[i]["total_time_loaded"] === null ||
                tabList[i]["total_time_loaded"] === -1
            ) {
                continue;
            }
            totalTimeLoaded += tabList[i]["total_time_loaded"];
        }

        let percentageVisible = (totalTimeVisible / totalTimeLoaded) * 100;
        // console.log(document.getElementById("timeVisibleSummary"));
        document.getElementById("timeVisibleSummary").setAttribute("data-percent", percentageVisible.toString());
        // console.log("Percentage Used: ", percentageVisible);

        //create chart
        $(".timeVisibleSummary").easyPieChart({
            //time active *TODO refactor later
            easing: "easeOutBounce",
            barColor: "#fd3550",
            lineWidth: 8,
            trackColor: "rgba(0, 0, 0, 0.12)",
            scaleColor: false,
            onStep: function(from, to, percent) {
                $(this.el).find(".w_percent").text(Math.round(percent));
            }
        });


        //calculate total time hidden (its the opposite of visible)
        let percentageHidden = 100 - percentageVisible;
        document.getElementById("timeHiddenSummary").setAttribute("data-percent", percentageHidden.toString());

        //create chart
        $(".timeHiddenSummary").easyPieChart({
            easing: "easeOutBounce",
            barColor: "#9c27b0",
            lineWidth: 8,
            trackColor: "rgba(0, 0, 0, 0.12)",
            scaleColor: false,
            onStep: function(from, to, percent) {
                $(this.el).find(".w_percent").text(Math.round(percent));
            }
        });


        //single page website summary
        // number of websites with only one page
        let singlePageWebsites = 0;
        for (let website in response.specificList) {
            if (Object.keys(response.specificList[website]).length === 1 + specificListExtraKeys) {
                singlePageWebsites++;
            }
        }
        // turn single page websites into a percentage
        let percentageSinglePageWebsites = (singlePageWebsites / Object.keys(response.specificList).length) * 100;
        document.getElementById("singlePageWebsiteSummary").setAttribute("data-percent", percentageSinglePageWebsites.toString());


        $(".singlePageWebsiteSummary").easyPieChart({
            easing: "easeOutBounce",
            barColor: "#008cff",
            lineWidth: 8,
            trackColor: "rgba(0, 0, 0, 0.12)",
            scaleColor: false,
            onStep: function(from, to, percent) {
                $(this.el).find(".w_percent").text(Math.round(percent));
            }
        });

        //pages from most used website
        if (response.sortedSpecificArray.length > 0) {
            let mostUsedWebsite = response.sortedSpecificArray[0]["key"];
            let mostUsedWebsitePages = Object.keys(response.specificList[mostUsedWebsite]).length - specificListExtraKeys;
            let percentageMostUsedWebsitePages = (mostUsedWebsitePages / Object.keys(response.tabList).length) * 100;
            document.getElementById("pagesMostUsedWebsiteSummary").setAttribute("data-percent", percentageMostUsedWebsitePages.toString());
        } else {
            document.getElementById("pagesMostUsedWebsiteSummary").setAttribute("data-percent", "0");
        }

        $(".pagesMostUsedWebsiteSummary").easyPieChart({
            easing: "easeOutBounce",
            barColor: "#15ca20",
            lineWidth: 8,
            trackColor: "rgba(0, 0, 0, 0.12)",
            scaleColor: false,
            onStep: function(from, to, percent) {
                $(this.el).find(".w_percent").text(Math.round(percent));
            }
        });

        //pagesVisitedOnceSummary
        let pagesVisitedOnce = 0;
        response.tabList.forEach(website => {
            if (website.total_visits === 1) {
                pagesVisitedOnce++;
            }
        });

        let percentagePagesVisitedOnce = (pagesVisitedOnce / Object.keys(response.tabList).length) * 100;
        document.getElementById("pagesVisitedOnceSummary").setAttribute("data-percent", percentagePagesVisitedOnce.toString());

        $(".pagesVisitedOnceSummary").easyPieChart({
            easing: "easeOutBounce",
            barColor: "#ffc107",
            lineWidth: 8,
            trackColor: "rgba(0, 0, 0, 0.12)",
            scaleColor: false,
            onStep: function(from, to, percent) {
                $(this.el).find(".w_percent").text(Math.round(percent));
            }
        });


        //pagesVisitedOnceSummary
        // if webpage visible to loaded time is under 10%
        let pagesLoadedUnder10 = 0;
        response.tabList.forEach(website => {
            if (website.total_time_visible / website.total_time_loaded < 0.1) {
                pagesLoadedUnder10++;
            }
        });

        let percentagePagesLoadedUnder10 = (pagesLoadedUnder10 / Object.keys(response.tabList).length) * 100;
        document.getElementById("ineffectivelyUsedWebsitesSummary").setAttribute("data-percent", percentagePagesLoadedUnder10.toString());


        $(".ineffectivelyUsedWebsitesSummary").easyPieChart({
            easing: "easeOutBounce",
            barColor: "#0dcaf0",
            lineWidth: 8,
            trackColor: "rgba(0, 0, 0, 0.12)",
            scaleColor: false,
            onStep: function(from, to, percent) {
                $(this.el).find(".w_percent").text(Math.round(percent));
            }
        });
    }

    function allWebsites(response) {
        /*
        <thead class="table-light">
            <tr>
                <th>Website</th>
                <th>Logo</th>
                <th>Times Visited</th>
                <th>Time Visible</th>
                <th>Date Accessed</th>
                <th>Active Time</th>
            </tr>
        </thead>
         */
        let table = document.getElementById("allWebsitesTableBody");

        let sortedSpecificArray = response.sortedSpecificArray;
        for (let i = 0; i < sortedSpecificArray.length; i++) {
            let row = table.insertRow(i);
            let website = row.insertCell(0);
            let logo = row.insertCell(1);
            let timesVisited = row.insertCell(2);
            let timeVisible = row.insertCell(3);
            let dateAccessed = row.insertCell(4);
            let activeTime = row.insertCell(5);

            website.innerHTML = sortedSpecificArray[i]["key"];


            let currentIndex = 0;
            let found = false;
            for (let currentIndex = 0; currentIndex < Object.keys(sortedSpecificArray[i]["value"]).length; currentIndex++) {
                if (sortedSpecificArray[i]["value"][Object.keys(sortedSpecificArray[i]["value"])[currentIndex]]["favicon"] !== undefined) {
                    logo.innerHTML = "<img alt=\"product img\" class=\"product-img-2\" src=\"" + sortedSpecificArray[i]["value"][Object.keys(sortedSpecificArray[i]["value"])[currentIndex]]["favicon"] + "\" />";
                    found = true;
                    break;
                }
            }
            if (!found) {
                logo.innerHTML = "<img alt=\"product img\" style=\"background-color: #eeeeee\" class=\"product-img-2\" src=\"./assets/images/icons/file.svg\" />";
            }

            timesVisited.innerHTML = sortedSpecificArray[i]["value"]["total_visits"] < 0 ? 0 : sortedSpecificArray[i]["value"]["total_visits"];

            if (sortedSpecificArray[i]["value"]["total_time_visible"] <= 0) {
                timeVisible.innerHTML = millisecondsToTimeString(0);
            } else {
                timeVisible.innerHTML = millisecondsToTimeString(sortedSpecificArray[i]["value"]["total_time_visible"]);
            }

            let date = new Date(sortedSpecificArray[i]["value"]["last_update_time"]);
            dateAccessed.innerHTML = date.toLocaleDateString() + " " + date.toLocaleTimeString();

            //progress bar like allPages
            let totalTimeVisible = sortedSpecificArray[i]["value"]["total_time_visible"];
            let totalTimeLoaded = sortedSpecificArray[i]["value"]["total_time_loaded"];
            if (totalTimeVisible === undefined || totalTimeVisible === null || totalTimeVisible <= 0) {
                totalTimeVisible = 0;
            }
            let percentageUsed = 0;
            if (totalTimeLoaded === undefined || totalTimeLoaded === null || totalTimeLoaded <= 0) {
                totalTimeLoaded = 0;
            } else {
                percentageUsed = Math.floor((totalTimeVisible / totalTimeLoaded) * 100);
            }

            if (percentageUsed <= 33) {
                activeTime.innerHTML = " <div class=\"progress\" style=\"height: 4px\">" +
                    "<div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: " + percentageUsed + "%\"></div></div>";
            } else if (percentageUsed <= 67) {
                activeTime.innerHTML = " <div class=\"progress\" style=\"height: 4px\">" +
                    "<div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: " + percentageUsed + "%\"></div></div>";
            } else {
                activeTime.innerHTML = " <div class=\"progress\" style=\"height: 4px\">" +
                    "<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: " + percentageUsed + "%\"></div></div>";
            }
        }
    }

    function allPages(response) {
        this.response = response;
        filterPages();
    }
}


onLoad();


function filterPages() {
    console.log(response);
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    console.log("filtering pages");
    console.log(startDate, endDate);

    if (startDate === "" && endDate === "") {
        let table = document.getElementById("allPagesTableBody");

        let sortedTabList = response.sortedTabList;

        for (let i = 0; i < sortedTabList.length; i++) {
            if (sortedTabList[i]["total_visits"] === undefined) {
                console.log("skipping: ", sortedTabList[i], sortedTabList[i]["total_time_visible"], sortedTabList[i]["total_visits"]);
                continue;
            }

            if (sortedTabList[i]["total_time_visible"] <= 0) {
                sortedTabList[i]["total_time_visible"] = 0;
            }

            // add row
            let tr = document.createElement("tr");
            let webpageLink = document.createElement("td");
            //update with actuall link
            webpageLink.innerHTML =
                "<a href=\"" +
                sortedTabList[i]["url"] +
                "\">" +
                sortedTabList[i]["title"].substring(0, 80) +
                (sortedTabList[i]["title"].substring(0, 80) !== sortedTabList[i]["title"] ? "..." : "") +
                "</a>";
            tr.appendChild(webpageLink);

            // add logo
            let logo = document.createElement("td");
            if (sortedTabList[i]["favicon"] === undefined) {
                logo.innerHTML = "<img alt=\"product img\" style=\"background-color: #eeeeee\" class=\"product-img-2\" src=\"./assets/images/icons/file.svg\" />";
            } else {
                logo.innerHTML = "<img alt=\"product img\" style=\"background-color: #eeeeee\" class=\"product-img-2\" src=\"" + sortedTabList[i]["favicon"] + "\" />";
            }
            tr.appendChild(logo);

            // add time visible
            let timeVisible = document.createElement("td");
            timeVisible.innerHTML = millisecondsToTimeString(sortedTabList[i]["total_time_visible"]);
            tr.appendChild(timeVisible);

            // add state
            let state = document.createElement("td");
            if (sortedTabList[i]["open"] === false) {
                state.innerHTML = "<span class=\"badge bg-light-danger text-danger w-100\">Closed</span>";
            } else if (sortedTabList[i]["visibility"] === "visible") {
                state.innerHTML = "<span class=\"badge bg-light-success text-success w-100\">Visible</span>";
            } else {
                state.innerHTML = "<span class=\"badge bg-light-warning text-warning w-100\">Hidden</span>";
            }
            tr.appendChild(state);

            // add visit count
            let visitCount = document.createElement("td");
            visitCount.innerHTML = sortedTabList[i]["total_visits"];
            tr.appendChild(visitCount);

            // add date last accessed
            let dateLastAccessed = document.createElement("td");
            let accessDate = new Date(sortedTabList[i]["last_update_time"]);
            dateLastAccessed.innerHTML = accessDate.toLocaleDateString() + " " + accessDate.toLocaleTimeString();
            tr.appendChild(dateLastAccessed);

            // add active time
            let activeTime = document.createElement("td");
            if (sortedTabList[i]["total_time_visible"] <= 0 || sortedTabList[i]["total_time_loaded"] <= 0 || sortedTabList[i]["total_time_visible"] === undefined || sortedTabList[i]["total_time_loaded"] === undefined) {
                activeTime.innerHTML = " <div class=\"progress\" style=\"height: 4px\">" +
                    "<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width:0\"></div></div>";
            } else if (sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"] > 0.67) {
                activeTime.innerHTML =
                    " <div class=\"progress\" style=\"height: 4px\">" +
                    "<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: " +
                    Math.floor((sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"]) * 100) +
                    "%\"></div>" +
                    "</div>";
            } else if (sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"] > 0.33) {
                activeTime.innerHTML =
                    " <div class=\"progress\" style=\"height: 4px\">" +
                    "<div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: " +
                    Math.floor((sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"]) * 100) +
                    "%\"></div>" +
                    "</div>";
            } else {
                activeTime.innerHTML =
                    " <div class=\"progress\" style=\"height: 4px\">" +
                    "<div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: " +
                    Math.floor((sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"]) * 100) +
                    "%\"></div>" +
                    "</div>";
            }
            tr.appendChild(activeTime);

            table.appendChild(tr);
        }
        return;
    }

    // if (startDate === "" || endDate === "") {
    //     window.alert("Please enter a valid date range");
    //     return
    // }

    if (startDate === "") {
        startDate = "0000-00-00";
    }

    if (endDate === "") {
        endDate = "9999-99-99";
    }

    if (startDate > endDate) {
        window.alert("Please enter a valid date range");
        return;
    }


    let startYear = parseInt(startDate.split("-")[0]);
    let startMonth = parseInt(startDate.split("-")[1]);
    let startDay = parseInt(startDate.split("-")[2]);

    let endYear = parseInt(endDate.split("-")[0]);
    let endMonth = parseInt(endDate.split("-")[1]);
    let endDay = parseInt(endDate.split("-")[2]);


    let table = document.getElementById("allPagesTableBody");
    table.innerHTML = "";

    console.log(response);
    let sortedTabList = response.sortedTabList;

    for (let i = 0; i < sortedTabList.length; i++) {
        if (sortedTabList[i]["total_visits"] === undefined) {
            console.log("skipping: ", sortedTabList[i], sortedTabList[i]["total_time_visible"], sortedTabList[i]["total_visits"]);
            continue;
        }

        if (sortedTabList[i]["total_time_visible"] <= 0) {
            sortedTabList[i]["total_time_visible"] = 0;
        }

        let dateLoaded = new Date(sortedTabList[i]["last_update_time"]);
        console.log(dateLoaded.getFullYear(), dateLoaded.getMonth(), dateLoaded.getDate());
        console.log(startYear, startMonth, startDay);
        console.log(endYear, endMonth, endDay);
        if (dateLoaded.getFullYear() < startYear || dateLoaded.getFullYear() > endYear) {
            continue;
        }
        if (dateLoaded.getMonth() + 1 < startMonth || dateLoaded.getMonth() + 1 > endMonth) {
            console.log("month");
            continue;
        }
        if (dateLoaded.getDate() < startDay || dateLoaded.getDate() > endDay) {
            continue;
        }

        // add row
        let tr = document.createElement("tr");
        let webpageLink = document.createElement("td");
        //update with actual link
        webpageLink.innerHTML =
            "<a href=\"" +
            sortedTabList[i]["url"] +
            "\">" +
            sortedTabList[i]["title"].substring(0, 80) +
            (sortedTabList[i]["title"].substring(0, 80) !== sortedTabList[i]["title"] ? "..." : "") +
            "</a>";
        tr.appendChild(webpageLink);

        // add logo
        let logo = document.createElement("td");
        if (sortedTabList[i]["favicon"] === undefined) {
            logo.innerHTML = "<img alt=\"product img\" style=\"background-color: #eeeeee\" class=\"product-img-2\" src=\"./assets/images/icons/file.svg\" />";
        } else {
            logo.innerHTML = "<img alt=\"product img\" style=\"background-color: #eeeeee\" class=\"product-img-2\" src=\"" + sortedTabList[i]["favicon"] + "\" />";
        }
        tr.appendChild(logo);

        // add time visible
        let timeVisible = document.createElement("td");
        timeVisible.innerHTML = millisecondsToTimeString(sortedTabList[i]["total_time_visible"]);
        tr.appendChild(timeVisible);

        // add state
        let state = document.createElement("td");
        if (sortedTabList[i]["open"] === false) {
            state.innerHTML = "<span class=\"badge bg-light-danger text-danger w-100\">Closed</span>";
        } else if (sortedTabList[i]["visibility"] === "visible") {
            state.innerHTML = "<span class=\"badge bg-light-success text-success w-100\">Visible</span>";
        } else {
            state.innerHTML = "<span class=\"badge bg-light-warning text-warning w-100\">Hidden</span>";
        }
        tr.appendChild(state);

        // add visit count
        let visitCount = document.createElement("td");
        visitCount.innerHTML = sortedTabList[i]["total_visits"];
        tr.appendChild(visitCount);

        // add date last accessed
        let dateLastAccessed = document.createElement("td");
        let accessDate = new Date(sortedTabList[i]["last_update_time"]);
        dateLastAccessed.innerHTML = accessDate.toLocaleDateString() + " " + accessDate.toLocaleTimeString();
        tr.appendChild(dateLastAccessed);

        // add active time
        let activeTime = document.createElement("td");
        if (sortedTabList[i]["total_time_visible"] <= 0 || sortedTabList[i]["total_time_loaded"] <= 0 || sortedTabList[i]["total_time_visible"] === undefined || sortedTabList[i]["total_time_loaded"] === undefined) {
            activeTime.innerHTML = " <div class=\"progress\" style=\"height: 4px\">" +
                "<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width:0\"></div></div>";
        } else if (sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"] > 0.67) {
            activeTime.innerHTML =
                " <div class=\"progress\" style=\"height: 4px\">" +
                "<div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: " +
                Math.floor((sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"]) * 100) +
                "%\"></div>" +
                "</div>";
        } else if (sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"] > 0.33) {
            activeTime.innerHTML =
                " <div class=\"progress\" style=\"height: 4px\">" +
                "<div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: " +
                Math.floor((sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"]) * 100) +
                "%\"></div>" +
                "</div>";
        } else {
            activeTime.innerHTML =
                " <div class=\"progress\" style=\"height: 4px\">" +
                "<div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: " +
                Math.floor((sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"]) * 100) +
                "%\"></div>" +
                "</div>";
        }
        tr.appendChild(activeTime);

        table.appendChild(tr);
    }
}

document.getElementById("filterPagesButton").addEventListener("click", filterPages);