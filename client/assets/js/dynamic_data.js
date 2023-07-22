//get specific data from the database
chrome.runtime.sendMessage({ message: "requestData" }, (response) => {
    console.log(response);
    let specificList = response.specificList;

    //update the website

    //unique websites visited
    document.getElementById("websites_visited_row_1").innerHTML = "" + Object.keys(specificList).length;

    //unique webpages visited
    let webpageCount = 0;
    for (let website in specificList) {
        webpageCount += Object.keys(specificList[website]).length - 11;
    }
    document.getElementById("webpages_visited_row_1").innerHTML = "" + webpageCount;

    //Average Time Per Day Over The Last 7 Days

    //total time used
    let totalTimeUsedVisible = calculate_totalTimeVisible(response);
    console.log("TOTAL TIME VISIBLE", totalTimeUsedVisible);
    //document.getElementById("total_time_used_row_1").innerHTML = totalTime
    // display time in hours, minutes, seconds (which ever one is applicable and only the largest one)
    document.getElementById("total_time_used_row_1").innerHTML = millisecondsToTimeString(totalTimeUsedVisible);

    // website history
    //TODO EDIT CODE TO HAVE HISTORY
    websiteHistory(response);

    // top 4 time breakdown, the rest of the time goes to
    topTimeBreakdown(response);

    // row 3?
    // top10WebsitesHistory(response)

    updateSummaryUIElements(response);

    // row 4
    // top websites
    allWebsites(response);

    // row 5
    // all webpages
    allPages(response);
});

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
            timeString += years + " year ";
        } else {
            timeString += years + " years ";
        }
    }
    if (months > 0) {
        if (months === 1) {
            timeString += months + " month ";
        } else {
            timeString += months + " months ";
        }
    }
    if (weeks > 0) {
        if (weeks === 1) {
            timeString += weeks + " week ";
        } else {
            timeString += weeks + " weeks ";
        }
    }
    if (days > 0) {
        if (days === 1) {
            timeString += days + " day ";
        } else {
            timeString += days + " days ";
        }
    }
    if (hours > 0) {
        if (hours === 1) {
            timeString += hours + " hour ";
        } else {
            timeString += hours + " hours ";
        }
    }
    if (minutes > 0) {
        if (minutes === 1) {
            timeString += minutes + " minute ";
        } else {
            timeString += minutes + " minutes ";
        }
    }
    if (seconds > 0) {
        if (seconds === 1) {
            timeString += seconds + " second ";
        } else {
            timeString += seconds + " seconds ";
        }
    }
    if (timeString === "") {
        timeString = "0 seconds";
    }

    return timeString;
}

function websiteHistory(response) {
    let tabList = response.tabList;

    // todo update graph

    // update graph additional information
    let historyTotalPages = document.getElementById("historyTotalPages");
    let totalPageVisits = 0;
    for (let i = 0; i < tabList.length; i++) {
        totalPageVisits += tabList[i]["total_visits"] >= 0 ? tabList[i]["total_visits"] : 0;
    }
    historyTotalPages.innerHTML = "" + totalPageVisits;

    let historyPagesPerHour = document.getElementById("historyPagesPerHour");
    let timeOnline = response.timeOnline;
    let pagesPerHour = Math.round(totalPageVisits / (timeOnline / 3600000));
    historyPagesPerHour.innerHTML = "" + pagesPerHour;
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
                    sortedSpecificArray[2]["value"]["total_time_visible"],
                ];
                labels = [sortedSpecificArray[0]["key"], sortedSpecificArray[1]["key"], sortedSpecificArray[2]["key"]];
                break;
            case 4:
                colors = [topWebsiteUsed1, topWebsiteUsed2, topWebsiteUsed3, topWebsiteUsed4];
                times = [
                    sortedSpecificArray[0]["value"]["total_time_visible"],
                    sortedSpecificArray[1]["value"]["total_time_visible"],
                    sortedSpecificArray[2]["value"]["total_time_visible"],
                    sortedSpecificArray[3]["value"]["total_time_visible"],
                ];
                labels = [
                    sortedSpecificArray[0]["key"],
                    sortedSpecificArray[1]["key"],
                    sortedSpecificArray[2]["key"],
                    sortedSpecificArray[3]["key"],
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
            calculate_totalTimeVisible(response) - totalTimeUsed,
        ];
        labels = [
            sortedSpecificArray[0]["key"],
            sortedSpecificArray[1]["key"],
            sortedSpecificArray[2]["key"],
            sortedSpecificArray[3]["key"],
            "Others",
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
                    borderWidth: [1, 1, 1, 1, 1],
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            cutout: 100,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
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
                        },
                    },
                },
            },
        },
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
        li.innerHTML = labels[i] + ' <span class="badge ' + pill_class + ' rounded-pill">' + millisecondsToTimeString(times[i]) + "</span>";
        legend.appendChild(li);
    }
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

    let percentageUsed = Math.floor((totalTimeVisible / totalTimeLoaded) * 100);
    // console.log(document.getElementById("timeActiveSummary"));
    document.getElementById("timeActiveSummary").setAttribute("data-percent", percentageUsed.toString());
    // console.log("Percentage Used: ", percentageUsed);

    $(".timeActiveSummary").easyPieChart({
        //time active *TODO refactor later
        easing: "easeOutBounce",
        barColor: "#fd3550",
        lineWidth: 8,
        trackColor: "rgba(0, 0, 0, 0.12)",
        scaleColor: false,
        onStep: function (from, to, percent) {
            $(this.el).find(".w_percent").text(Math.round(percent));
        },
    });
}

function allWebsites(response) {
    /*
    <thead class="table-light">
        <tr>
            <th>Website</th>
            <th>Logo</th>
            <th>Page ID</th>
            <th>Times Visited</th>
            <th>Date Accessed</th>
            <th>Active Time</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Iphone 5</td>
            <td>
                <img alt="product img" class="product-img-2" src="assets/images/products/01.png" />
            </td>
            <td>#9405822</td>
            <td>$1250.00</td>
            <td>03 Feb 2020</td>
            <td>
                <div class="progress" style="height: 4px">
                    <div class="progress-bar bg-success" role="progressbar" style="width: 100%"></div>
                </div>
            </td>
        </tr>
     */
    let table = document.getElementById("allWebsitesTableBody");

    let sortedSpecificArray = response.sortedSpecificArray;
    //top 10
    for (let i = 0; i < sortedSpecificArray.length; i++) {
        let row = table.insertRow(i);
        let website = row.insertCell(0);
        let logo = row.insertCell(1);
        let pageID = row.insertCell(2);
        let timesVisited = row.insertCell(3);
        let dateAccessed = row.insertCell(4);
        let activeTime = row.insertCell(5);

        website.innerHTML = sortedSpecificArray[i]["key"];
        logo.innerHTML =
            '<img alt="product img" class="product-img-2" src="' +
            sortedSpecificArray[i]["value"][Object.keys(sortedSpecificArray[i]["value"])[0]]["favicon"] +
            '" />';
    }
}

function allPages(response) {
    let table = document.getElementById("allPagesTableBody");
    /*context
    <thead class="table-light">
        <tr>
            <th>Website</th>
            <th>Logo</th>
            <th>Page ID</th>
            <th>State</th>
            <th>Visit Count</th>
            <th>Date Last Accessed</th>
            <th>Active Time</th>
        </tr>
    </thead>
    <tbody id="allPagesTableBody">
        <tr>
            <td>Iphone 5</td>
            <td>
                <img alt="product img" class="product-img-2" src="assets/images/products/01.png" />
            </td>
            <td>#9405822</td>
            <td>
                <span class="badge bg-light-success text-success w-100">Paid</span>
            </td>
            <td>$1250.00</td>
            <td>03 Feb 2020</td>
            <td>
                <div class="progress" style="height: 4px">
                    <div class="progress-bar bg-success" role="progressbar" style="width: 100%"></div>
                </div>
            </td>
        </tr>
           ...
     */

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
            '<a href="' +
            sortedTabList[i]["url"] +
            '">' +
            sortedTabList[i]["title"].substring(0, 80) +
            (sortedTabList[i]["title"].substring(0, 80) !== sortedTabList[i]["title"] ? "..." : "") +
            "</a>";
        tr.appendChild(webpageLink);

        // add logo
        let logo = document.createElement("td");
        logo.innerHTML = '<img alt="product img" class="product-img-2" src="' + sortedTabList[i]["favicon"] + '" />';
        tr.appendChild(logo);

        // add time visible
        let timeVisible = document.createElement("td");
        timeVisible.innerHTML = millisecondsToTimeString(sortedTabList[i]["total_time_visible"]);
        tr.appendChild(timeVisible);

        // add state
        let state = document.createElement("td");
        if (sortedTabList[i]["open"] === false) {
            state.innerHTML = '<span class="badge bg-light-danger text-danger w-100">Closed</span>';
        } else if (sortedTabList[i]["visibility"] === "visible") {
            state.innerHTML = '<span class="badge bg-light-success text-success w-100">Visible</span>';
        } else {
            state.innerHTML = '<span class="badge bg-light-warning text-warning w-100">Hidden</span>';
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
        if (sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"] > 0.67) {
            activeTime.innerHTML +=
                ' <div class="progress" style="height: 4px">' +
                '<div class="progress-bar bg-success" role="progressbar" style="width: ' +
                Math.floor((sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"]) * 100) +
                '%"></div>' +
                "</div>";
        } else if (sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"] > 0.33) {
            activeTime.innerHTML +=
                ' <div class="progress" style="height: 4px">' +
                '<div class="progress-bar bg-warning" role="progressbar" style="width: ' +
                Math.floor((sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"]) * 100) +
                '%"></div>' +
                "</div>";
        } else {
            activeTime.innerHTML +=
                ' <div class="progress" style="height: 4px">' +
                '<div class="progress-bar bg-danger" role="progressbar" style="width: ' +
                Math.floor((sortedTabList[i]["total_time_visible"] / sortedTabList[i]["total_time_loaded"]) * 100) +
                '%"></div>' +
                "</div>";
        }
        tr.appendChild(activeTime);

        table.appendChild(tr);
    }
}

/* EXAMPLE DATA
{
    "tabList": [
        {
            "document_id": "19031719AD4CAA0CB6AFC0348B73C665",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=symbolism+of+blue+in+the+great+gatsby&rlz=1C1ONGR_enCA1063CA1064&oq=symbolism+of+blue+in+the+&aqs=chrome.1.69i57j0i512l2j0i22i30l6j0i390i650.6831j0j7&sourceid=chrome&ie=UTF-8",
            "title": "symbolism of blue in the great gatsby - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60008,
            "total_visits": 0,
            "total_time_visible": 60009,
            "total_time_hidden": -1,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "EC5101BB91B53464282D20FDFA2A0957",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=15%2C000%2C000%2F11&rlz=1C1ONGR_enCA1063CA1064&oq=15%2C000%2C000%2F11&aqs=chrome..69i57j6.2015j0j4&sourceid=chrome&ie=UTF-8",
            "title": "15,000,000/11 - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60364,
            "total_visits": 0,
            "total_time_visible": 2563,
            "total_time_hidden": 57801,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "5964856AD56CD486C38CA6386EFBF967",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&rlz=1C1ONGR_enCA1063CA1064&oq=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&aqs=chrome..69i57j69i64j69i59j69i58.334j0j7&sourceid=chrome&ie=UTF-8",
            "title": "Error: Cannot access contents of the page. Extension manifest must request permission to access the respective host. - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925077
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925077
                }
            ],
            "open": true,
            "last_update_time": 1689821925077,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60364,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60365,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "0A32D42F9EC43BA8DD8BE87AFEFE2304",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/contest/1844/my",
            "title": "Status - Codeforces Round 884 (Div. 1 + Div. 2) - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925056
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925056
                }
            ],
            "open": true,
            "last_update_time": 1689821925056,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60386,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60387,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "A1A4A3E023A3AAF111B744D9DB7D32A4",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/contest/1844/my",
            "title": "Status - Codeforces Round 884 (Div. 1 + Div. 2) - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925056
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925056
                }
            ],
            "open": true,
            "last_update_time": 1689821925056,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60385,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60386,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "90BF30CB3B59A8D5DEFC0AAECADA5166",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/",
            "title": "Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925056
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925056
                }
            ],
            "open": true,
            "last_update_time": 1689821925056,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60384,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60385,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "BDF3B5595903D7308758F02ED4CD8E22",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/",
            "title": "Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925055
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925055
                }
            ],
            "open": true,
            "last_update_time": 1689821925055,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60384,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60385,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "B989B3911D23BBE2FD7A26F2D90CA310",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/blog/entry/95106",
            "title": "The Ultimate Topic List (with Resources, Problems and Templates) - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925057
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925057
                }
            ],
            "open": true,
            "last_update_time": 1689821925057,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60384,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60385,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "111B44741771121BE75C9B606CAF1D82",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/blog/entry/66909",
            "title": "[Tutorial] A way to Practice Competitive Programming : From Rating 1000 to 2400+ - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925057
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925057
                }
            ],
            "open": true,
            "last_update_time": 1689821925057,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60384,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60385,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "C42E04D07EE74B2E5BD1B48A96082415",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/blog/entry/48417",
            "title": "General ideas - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925057
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925057
                }
            ],
            "open": true,
            "last_update_time": 1689821925057,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60384,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60385,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "51856ADAFC9E5D65D318942108B6069C",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/blog/entry/104466",
            "title": "A bit more of general ideas - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925057
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925057
                }
            ],
            "open": true,
            "last_update_time": 1689821925057,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60380,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60381,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "849877AF03B29CE008C662F7C5886EB6",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/blog/entry/100910",
            "title": "[Tutorial] Collection of little techniques - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925057
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925057
                }
            ],
            "open": true,
            "last_update_time": 1689821925057,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60378,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60379,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "D123D4ADED992016EBD6C592F60CA79D",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=rTN749kONJI",
            "title": "I Bought a \"BROKEN\" Graphics Card on eBay... Can I Fix it?!? - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925061
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925061
                }
            ],
            "open": true,
            "last_update_time": 1689821925061,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60380,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60381,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "8856923DB49ADE4FCA27D985A3B80DE5",
            "origin": "https://www.termius.com",
            "url": "https://www.termius.com/free-ssh-client-for-windows",
            "title": "Free SSH client for Windows",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925062
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925062
                }
            ],
            "open": true,
            "last_update_time": 1689821925062,
            "favicon": "https://assets-global.website-files.com/5c7036349b5477bf13f828cf/63ebf04819aa00122e73b864_Mac%20app%20logo.png",
            "total_time": 60378,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60379,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "EF7BC24613C42F174E9771EEEC8F8021",
            "origin": "https://docs.google.com",
            "url": "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit",
            "title": "Todo list - Google Docs",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925062
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925062
                }
            ],
            "open": true,
            "last_update_time": 1689821925062,
            "favicon": "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico",
            "total_time": 60378,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60379,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "4C8A154302BE77F8B873F255ECF0FCC4",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=d2Tm3Yx4HWI",
            "title": "Academia is BROKEN! - Harvard Fake Data Scandal Explained - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925063
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925063
                }
            ],
            "open": true,
            "last_update_time": 1689821925063,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60376,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60377,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "E3F33E1F3307CD50EFE80F8D1D9FE078",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=g3X1QXXDXjw",
            "title": "Abusing the Banking System to get rich on a Pay-to-win Server! - Complex Gaming - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925064
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925064
                }
            ],
            "open": true,
            "last_update_time": 1689821925064,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60378,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60379,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "F342CE15DB13BAE5448AB02B14020525",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=5RC9cKkQYGA",
            "title": "MEGA FARM from 0$ on FLAT MAP with @FarmingGenius 👉 #1 - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925065
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925065
                }
            ],
            "open": true,
            "last_update_time": 1689821925065,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60376,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60377,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "E1A3EACFC96BF4BA9094EB78CE647DEA",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=j9ODgfIaxc4",
            "title": "(656) The Race to Save Texas’ Failed Megabridge - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925064
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925064
                }
            ],
            "open": true,
            "last_update_time": 1689821925064,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60376,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60377,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "A1E04D94E6F0BC379AC88006E5BEDCC6",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/",
            "title": "(656) YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925065
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925065
                }
            ],
            "open": true,
            "last_update_time": 1689821925065,
            "favicon": "https://www.youtube.com/s/desktop/2a7c6a10/img/favicon_32x32.png",
            "total_time": 60377,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60378,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "EE7FCC4D7BB9BD397C78AD7AC65C7F53",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=tk9guzivxiU",
            "title": "Epic 211-shot badminton rally delights fans in Malaysia - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925065
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925065
                }
            ],
            "open": true,
            "last_update_time": 1689821925065,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60376,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60377,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "71E9BD71B652FD77542A58904EEDB608",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=bgR3yESAEVE",
            "title": "Can Chess, with Hexagons? - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925064
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925064
                }
            ],
            "open": true,
            "last_update_time": 1689821925064,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60376,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60377,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "060B6F699C27EAF77EEDCA0968366483",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=QeVJOUFZV3U&list=PL-cVSmXe-NPgNO-cyZ_mie7e2c4Ley20q&index=17",
            "title": "(656) BRAKE CHECKED BY AI! AI R&D FINALLY CATCHING UP! WE'VE GOT WORK TO DO - F1 23 MY TEAM CAREER Part 17 - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925065
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925065
                }
            ],
            "open": true,
            "last_update_time": 1689821925065,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60375,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60376,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "D1FFA8731C2F2DD77034799E6A1A354B",
            "origin": "https://www.google.ca",
            "url": "https://www.google.ca/",
            "title": "Google",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925066
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925066
                }
            ],
            "open": true,
            "last_update_time": 1689821925066,
            "favicon": "https://www.google.ca/favicon.ico",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "C54D30499092A4DE14F5A8928B187CD4",
            "origin": "https://www.newegg.ca",
            "url": "https://www.newegg.ca/p/pl?d=6700xt&Order=1",
            "title": "6700xt | Newegg.ca",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925066
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925066
                }
            ],
            "open": true,
            "last_update_time": 1689821925066,
            "favicon": "https://c1.neweggimages.com/WebResource/ngm/newegg.ico",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "4E3FDA02AFC2E5AD79AD88E8E30BEDD9",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=Y0Ko0kvwfgA",
            "title": "(656) How Do Games Render So Much Grass? - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925067
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925067
                }
            ],
            "open": true,
            "last_update_time": 1689821925067,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "139AE7B11EB96D7E559D9949FFA51A23",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=Koc63QhxPgk",
            "title": "(656) Weak Perfect Graph Theorem - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925067
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925067
                }
            ],
            "open": true,
            "last_update_time": 1689821925067,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "63A74EA4CD637C651A9B9EA9228C3C81",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=f1&rlz=1C1ONGR_enCA1063CA1064&oq=f1&aqs=chrome.0.0i271j46i433i512j69i59j0i433i512j0i131i433i512j69i60j69i61l2.463j0j4&sourceid=chrome&ie=UTF-8",
            "title": "f1 - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925066
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925066
                }
            ],
            "open": true,
            "last_update_time": 1689821925066,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "2B45729E5316AE83DEC8854FFEE248E0",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=LUjR54Hf_dc",
            "title": "(656) EXTENDED Race Highlights I 2023 6 Hours of Monza I FIA WEC - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925067
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925067
                }
            ],
            "open": true,
            "last_update_time": 1689821925067,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "B11B1D960211780392A3D68721B25FE7",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=HFDTAqUhH2o",
            "title": "(656) Saving the cheapest PC on eBay - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925067
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925067
                }
            ],
            "open": true,
            "last_update_time": 1689821925067,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60375,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60376,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "1D6BCF997CBAF6821E0DA27970DA1226",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=FStOT4pP2tc",
            "title": "My 10 YEAR Indie Game Development Journey - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925068
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925068
                }
            ],
            "open": true,
            "last_update_time": 1689821925068,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60373,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60374,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "7C64A80D1042F7158A45E9715DE0DAFD",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=F3TMRCO8eyQ",
            "title": "(656) Sergio Perez Storms Through The Field In Austria! | 2023 Austrian Grand Prix - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925067
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925067
                }
            ],
            "open": true,
            "last_update_time": 1689821925067,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60373,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60374,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "F22BDF1FF4E0408E39C26990E20CC63F",
            "origin": "https://www.amygoodchild.com",
            "url": "https://www.amygoodchild.com/blog/computer-art-50s-and-60s?utm_source=ayjay&utm_medium=email&utm_campaign=art-out-of-time",
            "title": "Early Computer Art in the 50’s & 60’s — Amy Goodchild",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925068
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925068
                }
            ],
            "open": true,
            "last_update_time": 1689821925068,
            "favicon": "https://images.squarespace-cdn.com/content/v1/5f33cddd6aff255aabb0c6cd/1598285066323-AE6AS241FTS6QP3C4OA6/favicon.ico",
            "total_time": 60371,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60372,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "5E53CC309226F8F4CFEBF15B2D7BF4CD",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=i7jOxAarbo4",
            "title": "(656) AMD RX 7700 & 7800 Benchmark, Nvidia RTX 4060 Ti 16GB Review, Intel i9-14900KS | Broken Silicon 214 - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60373,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60374,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "2BB57CDCBD172D30CCE673F622AEFD9F",
            "origin": "https://www.instagram.com",
            "url": "https://www.instagram.com/direct/t/17843476547117960/",
            "title": "Instagram • Chats",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://static.cdninstagram.com/rsrc.php/yS/r/f_5NUHW7AZC.ico",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "38C465DAD91572A832131051AF104198",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=MF-KR6A3KyM",
            "title": "(656) Minecrafts Strangest EXPLOIT - Block Transmutation... - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "F5385D6793A46323DF1E39C3C07B1BA7",
            "origin": "https://developer.mozilla.org",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
            "title": "Array.prototype.forEach() - JavaScript | MDN",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://developer.mozilla.org/favicon-48x48.cbbd161b.png",
            "total_time": 60373,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60374,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "4B85D4BEC83EFA8C580DE7432BF30460",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=4ArVvrhhnyI",
            "title": "(656) How 23 Foods Get To The Grocery Store | Big Business | Insider Business - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://www.youtube.com/s/desktop/faa006c1/img/favicon_32x32.png",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "88BA9A4159B22814E2FECF9E6153E9FA",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=0EtgwIajVqs",
            "title": "(656) Download These Handy Tools NOW! - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "7D81830D8BC2003566A5B493105DB9F5",
            "origin": "https://craftinginterpreters.com",
            "url": "https://craftinginterpreters.com/representing-code.html",
            "title": "Representing Code · Crafting Interpreters",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://craftinginterpreters.com/image/favicon.png",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "1A29537F38E5D50B6CABFECEFC554805",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=o8YgqN9cG84",
            "title": "(656) Renovating a canoe while running a marathon - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "8B739EFE3E45FF4C3428C04CE837FB6A",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=HRcI7RSm9_o",
            "title": "(656) I Think 'F1 World' In The F1 23 Game Is A Flop... - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925070
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925070
                }
            ],
            "open": true,
            "last_update_time": 1689821925070,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60371,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60372,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "B3BFA21956CDC6CEAF48A71CAC5D348A",
            "origin": "https://developer.chrome.com",
            "url": "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect",
            "title": "chrome.runtime - Chrome Developers",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://developer.chrome.com/images/meta/favicon-32x32.png",
            "total_time": 60371,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60372,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "61C5FD9EE7290F18CFC752369E7D98DB",
            "origin": "https://login.microsoftonline.com",
            "url": "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DOEEN_8FpuH_qcIz6Ba3QN-s_mLP5JDageqzo2LrEM3mxWBgGgsz7vph3tcYUj6wnv9FWRhevGot91sFtvHgcBnB1P5-2V4m2QM9LsHT-Cm4svDK4Huyv6onkV38e5iOiEwqf_E86vuNTOZulAJEGfw&response_mode=form_post&nonce=638245343261842304.NTlmYzY0NjctODczYS00OTkzLWE5ZTUtNjVkNjY1Y2QxNWUwNDAyMDczYjktZmQyZi00NjAwLThkNmMtYmExMjUzMGZlYmJh&redirect_uri=https%3A%2F%2Fportal.office.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=c3df525c-1647-474e-aca8-dbf1fd068666&x-client-SKU=ID_NET472&x-client-ver=6.30.1.0&sso_reload=true",
            "title": "Sign in to your account",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925070
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925070
                }
            ],
            "open": true,
            "last_update_time": 1689821925070,
            "favicon": "https://aadcdn.msftauth.net/shared/1.0/content/images/favicon_a_eupayfgghqiai7k9sol6lg2.ico",
            "total_time": 60371,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60372,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "6280886BD3FB7D78D20744AD35CCD768",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=FLRnk01ffE8",
            "title": "(656) What could Russia learn from a captured Leopard 2 tank? - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925071
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925071
                }
            ],
            "open": true,
            "last_update_time": 1689821925071,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60371,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60372,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "CB48207A46CF0D9C4A1E88A8BF207618",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=x2ulsZ6aGXY",
            "title": "So how DO you build a safe submersible? - DSV Alvin - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925071
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925071
                }
            ],
            "open": true,
            "last_update_time": 1689821925071,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60370,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60371,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "E898819DB3732099DA7B259905D2E134",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=UTEAvb-tikU",
            "title": "(656) How This Tiny Truck Took Down an Army - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925071
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925071
                }
            ],
            "open": true,
            "last_update_time": 1689821925071,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60369,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60370,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "BB5F6172FB7785C45DF3BB6F66BED0E1",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=X29vxhlZIzE",
            "title": "(656) Can I get Top 100 on Every Map in the Summer Campaign? - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925072
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925072
                }
            ],
            "open": true,
            "last_update_time": 1689821925072,
            "favicon": "https://www.youtube.com/s/desktop/faa006c1/img/favicon_32x32.png",
            "total_time": 60368,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60369,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "D86B00CC49B177CE66B396DC3426986A",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/",
            "title": "(656) YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925071
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925071
                }
            ],
            "open": true,
            "last_update_time": 1689821925071,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60368,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60369,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "7A4E3C0DCACB48C5EFBD7B0105481022",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=iSpL9LnczVQ",
            "title": "(656) Building A Budget NAS with TrueNAS Scale - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60367,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60368,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "5693FC7BC33D9973F7195B8C92BD8919",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?rlz=1C1ONGR_enCA1063CA1064&q=website+wireframe+examples&tbm=isch&sa=X&ved=2ahUKEwiNw7Kp5YKAAxWmjYkEHdRpBuIQ0pQJegQIDBAB&biw=2560&bih=1232&dpr=1.5#imgrc=jB4157cyh8aIDM",
            "title": "website wireframe examples - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60367,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60368,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "BF9F9429788AA196A63319B5B490C1F0",
            "origin": "https://docs.oracle.com",
            "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html",
            "title": "The switch Statement (The Java™ Tutorials > Learning the Java Language > Language Basics)",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://docs.oracle.com/favicon.ico",
            "total_time": 60368,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60369,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "93078942FB0C9B4AEA6A13B8490DED90",
            "origin": "https://imageresizer.com",
            "url": "https://imageresizer.com/resize/download/64b321401a949dc9662ed05e",
            "title": "Image Resizer",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://imageresizer.com/favicon.ico",
            "total_time": 60368,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60369,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "7DA2F27FC5033592DC636C8813AA8C76",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=VPOu1mQ8Xho",
            "title": "(656) Nvidia RTX 4060 Ti 16GB Sales, AMD RX 7900, Meta exits Intel Leak, Arrow Lake | June Loose Ends - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60367,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60368,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "5E6C3111009CD6439099C23139C885AD",
            "origin": "https://stackoverflow.com",
            "url": "https://stackoverflow.com/questions/15485735/use-of-commas-versus-semicolons",
            "title": "javascript - Use of commas versus semicolons? - Stack Overflow",
            "visibility": "visible",
            "active": true,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925074
                },
                {
                    "visibility": "visible",
                    "time": 1689821925074
                },
                {
                    "visibility": "visible",
                    "time": 1689821985084
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925074
                }
            ],
            "open": true,
            "last_update_time": 1689821925074,
            "favicon": "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
            "total_time": 60368,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60369,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "AF4FAD7DBFDA164B9C5EE9BEADB82C9A",
            "origin": "https://chat.openai.com",
            "url": "https://chat.openai.com/",
            "title": "Exceptions: Error Handling Mechanism",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://chat.openai.com/favicon-32x32.png",
            "total_time": 60366,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60367,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "A406D7DB8869C49CA83AB85B4F0DCDAA",
            "origin": "https://drive.google.com",
            "url": "https://drive.google.com/drive/u/1/folders/1ZDj0PTAt1OtTSe90-qd6mB-hJ6dUpCW7",
            "title": "2023 Europe - Google Drive",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png",
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "82DA4C9644C3D1BC9C9FB1806AFAAC0C",
            "origin": "https://s3.amazonaws.com",
            "url": "https://s3.amazonaws.com/www-inside-design/uploads/2017/11/wireframes-martyna.png",
            "title": "wireframes-martyna.png (1920×2622)",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925074
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925074
                }
            ],
            "open": true,
            "last_update_time": 1689821925074,
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "464201CB048F47743E47522699A624FA",
            "origin": "https://mail.google.com",
            "url": "https://mail.google.com/mail/u/1/#inbox",
            "title": "Inbox (17,863) - aidenm888@gmail.com - Gmail",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925075
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925075
                }
            ],
            "open": true,
            "last_update_time": 1689821925075,
            "favicon": "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/unreadcountfavicon/3/100+_2x.png",
            "total_time": 60366,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60367,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "BF019C47323A4CB76B3A14914CA70B53",
            "origin": "https://app.deepsource.com",
            "url": "https://app.deepsource.com/gh/StealthHydra179/anti-distractor-chromeextension",
            "title": "StealthHydra179/anti-distractor-chromeextension • DeepSource",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925075
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925075
                }
            ],
            "open": true,
            "last_update_time": 1689821925075,
            "favicon": "https://app.deepsource.com/favicon/default-dark.svg",
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "19BDA75A5ED5CCCCD8127FE346E3FF34",
            "origin": "https://stackoverflow.com",
            "url": "https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023",
            "title": "javascript - chrome.runtime.sendMessage throws exception from content script after reloading Chrome Extension - Stack Overflow",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "7F3EAE7AE2CD3999B84C6953E9149B20",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=eYceyv7a4tA",
            "title": "(656) BEST GPUs to Buy Right Now... Nvidia Prices Plummet! - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925075
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925075
                }
            ],
            "open": true,
            "last_update_time": 1689821925075,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": -2,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": -1,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "3A114C3A47AC8C99F3F4E7779693A8AE",
            "origin": "https://www.codefactor.io",
            "url": "https://www.codefactor.io/dashboard",
            "title": "Dashboard",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://www.codefactor.io/Content/img/favicon.png?v=3",
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "C02B44B40A9678977C7DBA126769EC4E",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=test&rlz=1C1ONGR_enCA1063CA1064&oq=test&aqs=chrome.0.69i59j46i131i199i433i465i512j0i131i433i512l2j0i131i433i650j69i60j69i61j69i60.575j0j7&sourceid=chrome&ie=UTF-8",
            "title": "test - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "3E83DCD997DF6D266522A1A3A4AE89A7",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&rlz=1C1ONGR_enCA1063CA1064&oq=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&aqs=chrome..69i57.4847j0j7&sourceid=chrome&ie=UTF-8",
            "title": "Uncaught Error: Extension context invalidated. catch statement not working - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60364,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60365,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "06BB4ED1E94F982B9FD5BDF119484243",
            "origin": "https://github.com",
            "url": "https://github.com/GoogleChrome/web-vitals-extension/issues/118",
            "title": "Spurious errors are reported when navigating to chrome:// URLs · Issue #118 · GoogleChrome/web-vitals-extension",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://github.githubassets.com/favicons/favicon-dark.svg",
            "total_time": 60364,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60365,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "9478822B6FD633341416AFC4FFA988C8",
            "origin": "https://developer.chrome.com",
            "url": "https://developer.chrome.com/docs/extensions/mv3/",
            "title": "Welcome to Chrome Extensions - Chrome Developers",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925077
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925077
                }
            ],
            "open": true,
            "last_update_time": 1689821925077,
            "favicon": "https://developer.chrome.com/images/meta/favicon-32x32.png"
        },
        {
            "document_id": "12F0A081C7FBC16150D85CE95A9C3B87",
            "origin": "https://prettier.io",
            "url": "https://prettier.io/docs/en/options.html",
            "title": "Options · Prettier",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925077
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925077
                }
            ],
            "open": true,
            "last_update_time": 1689821925077,
            "favicon": "https://prettier.io/icon.png"
        },
        {
            "document_id": "912768C1DC6F7A6F4D588FB01D20CB99",
            "origin": "https://www.figma.com",
            "url": "https://www.figma.com/file/qs5dHUU5GnlizPLtUmjtLU/Untitled?type=design&node-id=1-2&mode=design&t=V2yJe8Apw2RzW5hJ-0",
            "title": "Untitled – Figma",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925077
                },
                {
                    "visibility": "visible",
                    "time": 1689821925472
                },
                {
                    "visibility": "hidden",
                    "time": 1689821928036
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925077
                }
            ],
            "open": true,
            "last_update_time": 1689821925077,
            "favicon": "https://static.figma.com/app/icon/1/favicon.svg"
        }
    ],
    "specificList": {
        "https://app.deepsource.com": {
            "https://app.deepsource.com/gh/StealthHydra179/anti-distractor-chromeextension": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925075
                    }
                ],
                "origin": "https://app.deepsource.com",
                "title": "StealthHydra179/anti-distractor-chromeextension • DeepSource",
                "total_time": 60365,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60366,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925075,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985442,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://app.deepsource.com/gh/StealthHydra179/anti-distractor-chromeextension"
            },
            "total_time": 60365,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60366,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://chat.openai.com": {
            "https://chat.openai.com/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925073
                    }
                ],
                "origin": "https://chat.openai.com",
                "title": "Exceptions: Error Handling Mechanism",
                "total_time": 60368,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60369,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925073,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://chat.openai.com/"
            },
            "total_time": 60368,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60369,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://codeforces.com": {
            "https://codeforces.com/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925056
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "Codeforces",
                "total_time": 60385,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60386,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925056,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/"
            },
            "https://codeforces.com/blog/entry/100910": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925057
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "[Tutorial] Collection of little techniques - Codeforces",
                "total_time": 60384,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60385,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925057,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/blog/entry/100910"
            },
            "https://codeforces.com/blog/entry/104466": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925057
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "A bit more of general ideas - Codeforces",
                "total_time": 60384,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60385,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925057,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/blog/entry/104466"
            },
            "https://codeforces.com/blog/entry/48417": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925057
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "General ideas - Codeforces",
                "total_time": 60384,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60385,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925057,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/blog/entry/48417"
            },
            "https://codeforces.com/blog/entry/66909": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925057
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "[Tutorial] A way to Practice Competitive Programming : From Rating 1000 to 2400+ - Codeforces",
                "total_time": 60384,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60385,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925057,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/blog/entry/66909"
            },
            "https://codeforces.com/blog/entry/95106": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925057
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "The Ultimate Topic List (with Resources, Problems and Templates) - Codeforces",
                "total_time": 60384,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60385,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925057,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/blog/entry/95106"
            },
            "https://codeforces.com/contest/1844/my": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925056
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "Status - Codeforces Round 884 (Div. 1 + Div. 2) - Codeforces",
                "total_time": 60386,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60387,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925056,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/contest/1844/my"
            },
            "total_time": 422691,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 422698,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://craftinginterpreters.com": {
            "https://craftinginterpreters.com/representing-code.html": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925069
                    }
                ],
                "origin": "https://craftinginterpreters.com",
                "title": "Representing Code · Crafting Interpreters",
                "total_time": 60372,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60373,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925069,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://craftinginterpreters.com/representing-code.html"
            },
            "total_time": 60372,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60373,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://developer.chrome.com": {
            "https://developer.chrome.com/docs/extensions/mv3/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925077
                    }
                ],
                "origin": "https://developer.chrome.com",
                "title": "Welcome to Chrome Extensions - Chrome Developers",
                "total_time": 60364,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60365,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925077,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://developer.chrome.com/docs/extensions/mv3/"
            },
            "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925069
                    }
                ],
                "origin": "https://developer.chrome.com",
                "title": "chrome.runtime - Chrome Developers",
                "total_time": 60372,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60373,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925069,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect"
            },
            "total_time": 120736,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 120738,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://developer.mozilla.org": {
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925069
                    }
                ],
                "origin": "https://developer.mozilla.org",
                "title": "Array.prototype.forEach() - JavaScript | MDN",
                "total_time": 60372,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60373,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925069,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach"
            },
            "total_time": 60372,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60373,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://docs.google.com": {
            "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925062
                    }
                ],
                "origin": "https://docs.google.com",
                "title": "Todo list - Google Docs",
                "total_time": 60380,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60381,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925062,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit"
            },
            "total_time": 60380,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60381,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://docs.oracle.com": {
            "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925073
                    }
                ],
                "origin": "https://docs.oracle.com",
                "title": "The switch Statement (The Java™ Tutorials > Learning the Java Language > Language Basics)",
                "total_time": 60368,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60369,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925073,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html"
            },
            "total_time": 60368,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60369,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://drive.google.com": {
            "https://drive.google.com/drive/u/1/folders/1ZDj0PTAt1OtTSe90-qd6mB-hJ6dUpCW7": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925073
                    }
                ],
                "origin": "https://drive.google.com",
                "title": "2023 Europe - Google Drive",
                "total_time": 60367,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60368,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925073,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985442,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://drive.google.com/drive/u/1/folders/1ZDj0PTAt1OtTSe90-qd6mB-hJ6dUpCW7"
            },
            "total_time": 60367,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60368,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://github.com": {
            "https://github.com/GoogleChrome/web-vitals-extension/issues/118": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925076
                    }
                ],
                "origin": "https://github.com",
                "title": "Spurious errors are reported when navigating to chrome:// URLs · Issue #118 · GoogleChrome/web-vitals-extension",
                "total_time": 60365,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60366,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925076,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://github.com/GoogleChrome/web-vitals-extension/issues/118"
            },
            "total_time": 60365,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60366,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://imageresizer.com": {
            "https://imageresizer.com/resize/download/64b321401a949dc9662ed05e": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925073
                    }
                ],
                "origin": "https://imageresizer.com",
                "title": "Image Resizer",
                "total_time": 60367,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60368,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925073,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985442,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://imageresizer.com/resize/download/64b321401a949dc9662ed05e"
            },
            "total_time": 60367,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60368,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://login.microsoftonline.com": {
            "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DOEEN_8FpuH_qcIz6Ba3QN-s_mLP5JDageqzo2LrEM3mxWBgGgsz7vph3tcYUj6wnv9FWRhevGot91sFtvHgcBnB1P5-2V4m2QM9LsHT-Cm4svDK4Huyv6onkV38e5iOiEwqf_E86vuNTOZulAJEGfw&response_mode=form_post&nonce=638245343261842304.NTlmYzY0NjctODczYS00OTkzLWE5ZTUtNjVkNjY1Y2QxNWUwNDAyMDczYjktZmQyZi00NjAwLThkNmMtYmExMjUzMGZlYmJh&redirect_uri=https%3A%2F%2Fportal.office.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=c3df525c-1647-474e-aca8-dbf1fd068666&x-client-SKU=ID_NET472&x-client-ver=6.30.1.0&sso_reload=true": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925070
                    }
                ],
                "origin": "https://login.microsoftonline.com",
                "title": "Sign in to your account",
                "total_time": 60371,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60372,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925070,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DOEEN_8FpuH_qcIz6Ba3QN-s_mLP5JDageqzo2LrEM3mxWBgGgsz7vph3tcYUj6wnv9FWRhevGot91sFtvHgcBnB1P5-2V4m2QM9LsHT-Cm4svDK4Huyv6onkV38e5iOiEwqf_E86vuNTOZulAJEGfw&response_mode=form_post&nonce=638245343261842304.NTlmYzY0NjctODczYS00OTkzLWE5ZTUtNjVkNjY1Y2QxNWUwNDAyMDczYjktZmQyZi00NjAwLThkNmMtYmExMjUzMGZlYmJh&redirect_uri=https%3A%2F%2Fportal.office.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=c3df525c-1647-474e-aca8-dbf1fd068666&x-client-SKU=ID_NET472&x-client-ver=6.30.1.0&sso_reload=true"
            },
            "total_time": 60371,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60372,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://mail.google.com": {
            "https://mail.google.com/mail/u/1/#inbox": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925075
                    }
                ],
                "origin": "https://mail.google.com",
                "title": "Inbox (17,863) - aidenm888@gmail.com - Gmail",
                "total_time": 60366,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60367,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925075,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://mail.google.com/mail/u/1/#inbox"
            },
            "total_time": 60366,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60367,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://prettier.io": {
            "https://prettier.io/docs/en/options.html": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925077
                    }
                ],
                "origin": "https://prettier.io",
                "title": "Options · Prettier",
                "total_time": 60364,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60365,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925077,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://prettier.io/docs/en/options.html"
            },
            "total_time": 60364,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60365,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://s3.amazonaws.com": {
            "https://s3.amazonaws.com/www-inside-design/uploads/2017/11/wireframes-martyna.png": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925074
                    }
                ],
                "origin": "https://s3.amazonaws.com",
                "title": "wireframes-martyna.png (1920×2622)",
                "total_time": 60368,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60369,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925074,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://s3.amazonaws.com/www-inside-design/uploads/2017/11/wireframes-martyna.png"
            },
            "total_time": 60368,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60369,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://stackoverflow.com": {
            "https://stackoverflow.com/questions/15485735/use-of-commas-versus-semicolons": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925074
                    }
                ],
                "origin": "https://stackoverflow.com",
                "title": "javascript - Use of commas versus semicolons? - Stack Overflow",
                "total_time": 60008,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": -1,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 60009,
                "total_visits": 0,
                "update_time": [
                    {
                        "time": 1689821925074,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821925074,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689821985084,
                        "visibility": "visible"
                    }
                ],
                "url": "https://stackoverflow.com/questions/15485735/use-of-commas-versus-semicolons"
            },
            "https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925076
                    }
                ],
                "origin": "https://stackoverflow.com",
                "title": "javascript - chrome.runtime.sendMessage throws exception from content script after reloading Chrome Extension - Stack Overflow",
                "total_time": 60365,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60366,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925076,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023"
            },
            "total_time": 120373,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60366,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": 60009,
            "total_visits": -1
        },
        "https://www.amygoodchild.com": {
            "https://www.amygoodchild.com/blog/computer-art-50s-and-60s?utm_source=ayjay&utm_medium=email&utm_campaign=art-out-of-time": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925068
                    }
                ],
                "origin": "https://www.amygoodchild.com",
                "title": "Early Computer Art in the 50’s & 60’s — Amy Goodchild",
                "total_time": 60373,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60374,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925068,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.amygoodchild.com/blog/computer-art-50s-and-60s?utm_source=ayjay&utm_medium=email&utm_campaign=art-out-of-time"
            },
            "total_time": 60373,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60374,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://www.codefactor.io": {
            "https://www.codefactor.io/dashboard": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925076
                    }
                ],
                "origin": "https://www.codefactor.io",
                "title": "Dashboard",
                "total_time": 60365,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60366,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925076,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.codefactor.io/dashboard"
            },
            "total_time": 60365,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60366,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://www.figma.com": {
            "https://www.figma.com/file/qs5dHUU5GnlizPLtUmjtLU/Untitled?type=design&node-id=1-2&mode=design&t=V2yJe8Apw2RzW5hJ-0": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925077
                    }
                ],
                "origin": "https://www.figma.com",
                "title": "Untitled – Figma",
                "total_time": 60364,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 57801,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 2563,
                "total_visits": 0,
                "update_time": [
                    {
                        "time": 1689821925077,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821925472,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689821928036,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.figma.com/file/qs5dHUU5GnlizPLtUmjtLU/Untitled?type=design&node-id=1-2&mode=design&t=V2yJe8Apw2RzW5hJ-0"
            },
            "total_time": 60364,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 57801,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": 2563,
            "total_visits": -1
        },
        "https://www.google.ca": {
            "https://www.google.ca/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925066
                    }
                ],
                "origin": "https://www.google.ca",
                "title": "Google",
                "total_time": 60376,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60377,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925066,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.ca/"
            },
            "total_time": 60376,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60377,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://www.google.com": {
            "https://www.google.com/search?q=15%2C000%2C000%2F11&rlz=1C1ONGR_enCA1063CA1064&oq=15%2C000%2C000%2F11&aqs=chrome..69i57j6.2015j0j4&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925076
                    }
                ],
                "origin": "https://www.google.com",
                "title": "15,000,000/11 - Google Search",
                "total_time": 60365,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60366,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925076,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=15%2C000%2C000%2F11&rlz=1C1ONGR_enCA1063CA1064&oq=15%2C000%2C000%2F11&aqs=chrome..69i57j6.2015j0j4&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&rlz=1C1ONGR_enCA1063CA1064&oq=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&aqs=chrome..69i57j69i64j69i59j69i58.334j0j7&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925077
                    }
                ],
                "origin": "https://www.google.com",
                "title": "Error: Cannot access contents of the page. Extension manifest must request permission to access the respective host. - Google Search",
                "total_time": 60364,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60365,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925077,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&rlz=1C1ONGR_enCA1063CA1064&oq=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&aqs=chrome..69i57j69i64j69i59j69i58.334j0j7&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&rlz=1C1ONGR_enCA1063CA1064&oq=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&aqs=chrome..69i57.4847j0j7&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925076
                    }
                ],
                "origin": "https://www.google.com",
                "title": "Uncaught Error: Extension context invalidated. catch statement not working - Google Search",
                "total_time": -2,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": -1,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925076,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&rlz=1C1ONGR_enCA1063CA1064&oq=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&aqs=chrome..69i57.4847j0j7&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=f1&rlz=1C1ONGR_enCA1063CA1064&oq=f1&aqs=chrome.0.0i271j46i433i512j69i59j0i433i512j0i131i433i512j69i60j69i61l2.463j0j4&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925066
                    }
                ],
                "origin": "https://www.google.com",
                "title": "f1 - Google Search",
                "total_time": 60374,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60375,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925066,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985442,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=f1&rlz=1C1ONGR_enCA1063CA1064&oq=f1&aqs=chrome.0.0i271j46i433i512j69i59j0i433i512j0i131i433i512j69i60j69i61l2.463j0j4&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=symbolism+of+blue+in+the+great+gatsby&rlz=1C1ONGR_enCA1063CA1064&oq=symbolism+of+blue+in+the+&aqs=chrome.1.69i57j0i512l2j0i22i30l6j0i390i650.6831j0j7&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925073
                    }
                ],
                "origin": "https://www.google.com",
                "title": "symbolism of blue in the great gatsby - Google Search",
                "total_time": 60367,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60368,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925073,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985442,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=symbolism+of+blue+in+the+great+gatsby&rlz=1C1ONGR_enCA1063CA1064&oq=symbolism+of+blue+in+the+&aqs=chrome.1.69i57j0i512l2j0i22i30l6j0i390i650.6831j0j7&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=test&rlz=1C1ONGR_enCA1063CA1064&oq=test&aqs=chrome.0.69i59j46i131i199i433i465i512j0i131i433i512l2j0i131i433i650j69i60j69i61j69i60.575j0j7&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925076
                    }
                ],
                "origin": "https://www.google.com",
                "title": "test - Google Search",
                "total_time": 60365,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60366,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925076,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=test&rlz=1C1ONGR_enCA1063CA1064&oq=test&aqs=chrome.0.69i59j46i131i199i433i465i512j0i131i433i512l2j0i131i433i650j69i60j69i61j69i60.575j0j7&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?rlz=1C1ONGR_enCA1063CA1064&q=website+wireframe+examples&tbm=isch&sa=X&ved=2ahUKEwiNw7Kp5YKAAxWmjYkEHdRpBuIQ0pQJegQIDBAB&biw=2560&bih=1232&dpr=1.5#imgrc=jB4157cyh8aIDM": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925073
                    }
                ],
                "origin": "https://www.google.com",
                "title": "website wireframe examples - Google Search",
                "total_time": 60368,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60369,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925073,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?rlz=1C1ONGR_enCA1063CA1064&q=website+wireframe+examples&tbm=isch&sa=X&ved=2ahUKEwiNw7Kp5YKAAxWmjYkEHdRpBuIQ0pQJegQIDBAB&biw=2560&bih=1232&dpr=1.5#imgrc=jB4157cyh8aIDM"
            },
            "total_time": 362203,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 362209,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://www.instagram.com": {
            "https://www.instagram.com/direct/t/17843476547117960/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925069
                    }
                ],
                "origin": "https://www.instagram.com",
                "title": "Instagram • Chats",
                "total_time": 60371,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60372,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925069,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985442,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.instagram.com/direct/t/17843476547117960/"
            },
            "total_time": 60371,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60372,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://www.newegg.ca": {
            "https://www.newegg.ca/p/pl?d=6700xt&Order=1": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925066
                    }
                ],
                "origin": "https://www.newegg.ca",
                "title": "6700xt | Newegg.ca",
                "total_time": 60375,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60376,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925066,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.newegg.ca/p/pl?d=6700xt&Order=1"
            },
            "total_time": 60375,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60376,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://www.termius.com": {
            "https://www.termius.com/free-ssh-client-for-windows": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925062
                    }
                ],
                "origin": "https://www.termius.com",
                "title": "Free SSH client for Windows",
                "total_time": 60378,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60379,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925062,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985442,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.termius.com/free-ssh-client-for-windows"
            },
            "total_time": 60378,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 60379,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://www.youtube.com": {
            "https://www.youtube.com/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925065
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) YouTube",
                "total_time": 60376,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60377,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925065,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/"
            },
            "https://www.youtube.com/watch?v=0EtgwIajVqs": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925069
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Download These Handy Tools NOW! - YouTube",
                "total_time": 60373,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60374,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925069,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=0EtgwIajVqs"
            },
            "https://www.youtube.com/watch?v=4ArVvrhhnyI": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925069
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) How 23 Foods Get To The Grocery Store | Big Business | Insider Business - YouTube",
                "total_time": 60372,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60373,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925069,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=4ArVvrhhnyI"
            },
            "https://www.youtube.com/watch?v=5RC9cKkQYGA": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925065
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "MEGA FARM from 0$ on FLAT MAP with @FarmingGenius 👉 #1 - YouTube",
                "total_time": 60376,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60377,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925065,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=5RC9cKkQYGA"
            },
            "https://www.youtube.com/watch?v=F3TMRCO8eyQ": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925067
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Sergio Perez Storms Through The Field In Austria! | 2023 Austrian Grand Prix - YouTube",
                "total_time": 60375,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60376,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925067,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=F3TMRCO8eyQ"
            },
            "https://www.youtube.com/watch?v=FLRnk01ffE8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925071
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) What could Russia learn from a captured Leopard 2 tank? - YouTube",
                "total_time": 60371,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60372,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925071,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=FLRnk01ffE8"
            },
            "https://www.youtube.com/watch?v=FStOT4pP2tc": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925068
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "My 10 YEAR Indie Game Development Journey - YouTube",
                "total_time": 60374,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60375,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925068,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=FStOT4pP2tc"
            },
            "https://www.youtube.com/watch?v=HFDTAqUhH2o": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925067
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Saving the cheapest PC on eBay - YouTube",
                "total_time": 60374,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60375,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925067,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=HFDTAqUhH2o"
            },
            "https://www.youtube.com/watch?v=HRcI7RSm9_o": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925070
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) I Think 'F1 World' In The F1 23 Game Is A Flop... - YouTube",
                "total_time": 60372,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60373,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925070,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=HRcI7RSm9_o"
            },
            "https://www.youtube.com/watch?v=Koc63QhxPgk": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925067
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Weak Perfect Graph Theorem - YouTube",
                "total_time": 60374,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60375,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925067,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=Koc63QhxPgk"
            },
            "https://www.youtube.com/watch?v=LUjR54Hf_dc": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925067
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) EXTENDED Race Highlights I 2023 6 Hours of Monza I FIA WEC - YouTube",
                "total_time": 60374,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60375,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925067,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=LUjR54Hf_dc"
            },
            "https://www.youtube.com/watch?v=MF-KR6A3KyM": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925069
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Minecrafts Strangest EXPLOIT - Block Transmutation... - YouTube",
                "total_time": 60373,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60374,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925069,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=MF-KR6A3KyM"
            },
            "https://www.youtube.com/watch?v=QeVJOUFZV3U&list=PL-cVSmXe-NPgNO-cyZ_mie7e2c4Ley20q&index=17": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925065
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) BRAKE CHECKED BY AI! AI R&D FINALLY CATCHING UP! WE'VE GOT WORK TO DO - F1 23 MY TEAM CAREER Part 17 - YouTube",
                "total_time": 60376,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60377,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925065,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=QeVJOUFZV3U&list=PL-cVSmXe-NPgNO-cyZ_mie7e2c4Ley20q&index=17"
            },
            "https://www.youtube.com/watch?v=UTEAvb-tikU": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925071
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) How This Tiny Truck Took Down an Army - YouTube",
                "total_time": 60371,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60372,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925071,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=UTEAvb-tikU"
            },
            "https://www.youtube.com/watch?v=VPOu1mQ8Xho": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925073
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Nvidia RTX 4060 Ti 16GB Sales, AMD RX 7900, Meta exits Intel Leak, Arrow Lake | June Loose Ends - YouTube",
                "total_time": 60368,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60369,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925073,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=VPOu1mQ8Xho"
            },
            "https://www.youtube.com/watch?v=X29vxhlZIzE": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925072
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Can I get Top 100 on Every Map in the Summer Campaign? - YouTube",
                "total_time": 60370,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60371,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925072,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=X29vxhlZIzE"
            },
            "https://www.youtube.com/watch?v=Y0Ko0kvwfgA": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925067
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) How Do Games Render So Much Grass? - YouTube",
                "total_time": 60374,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60375,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925067,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=Y0Ko0kvwfgA"
            },
            "https://www.youtube.com/watch?v=bgR3yESAEVE": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925064
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "Can Chess, with Hexagons? - YouTube",
                "total_time": 60377,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60378,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925064,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=bgR3yESAEVE"
            },
            "https://www.youtube.com/watch?v=d2Tm3Yx4HWI": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925063
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "Academia is BROKEN! - Harvard Fake Data Scandal Explained - YouTube",
                "total_time": 60378,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60379,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925063,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=d2Tm3Yx4HWI"
            },
            "https://www.youtube.com/watch?v=eYceyv7a4tA": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925075
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) BEST GPUs to Buy Right Now... Nvidia Prices Plummet! - YouTube",
                "total_time": 60366,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60367,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925075,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=eYceyv7a4tA"
            },
            "https://www.youtube.com/watch?v=g3X1QXXDXjw": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925064
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "Abusing the Banking System to get rich on a Pay-to-win Server! - Complex Gaming - YouTube",
                "total_time": 60378,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60379,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925064,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=g3X1QXXDXjw"
            },
            "https://www.youtube.com/watch?v=i7jOxAarbo4": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925069
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) AMD RX 7700 & 7800 Benchmark, Nvidia RTX 4060 Ti 16GB Review, Intel i9-14900KS | Broken Silicon 214 - YouTube",
                "total_time": 60373,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60374,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925069,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=i7jOxAarbo4"
            },
            "https://www.youtube.com/watch?v=iSpL9LnczVQ": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925073
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Building A Budget NAS with TrueNAS Scale - YouTube",
                "total_time": 60369,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60370,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925073,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=iSpL9LnczVQ"
            },
            "https://www.youtube.com/watch?v=j9ODgfIaxc4": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925064
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) The Race to Save Texas’ Failed Megabridge - YouTube",
                "total_time": 60378,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60379,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925064,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=j9ODgfIaxc4"
            },
            "https://www.youtube.com/watch?v=o8YgqN9cG84": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925069
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Renovating a canoe while running a marathon - YouTube",
                "total_time": 60372,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60373,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925069,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=o8YgqN9cG84"
            },
            "https://www.youtube.com/watch?v=rTN749kONJI": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925061
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "I Bought a \"BROKEN\" Graphics Card on eBay... Can I Fix it?!? - YouTube",
                "total_time": 60380,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60381,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925061,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=rTN749kONJI"
            },
            "https://www.youtube.com/watch?v=tk9guzivxiU": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925065
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "Epic 211-shot badminton rally delights fans in Malaysia - YouTube",
                "total_time": 60376,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60377,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925065,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985443,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=tk9guzivxiU"
            },
            "https://www.youtube.com/watch?v=x2ulsZ6aGXY": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689821925071
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "So how DO you build a safe submersible? - DSV Alvin - YouTube",
                "total_time": 60371,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60372,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689821925071,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689821985444,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=x2ulsZ6aGXY"
            },
            "total_time": 1690461,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 1690489,
            "total_time_inactive": -1,
            "total_time_loaded": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        }
    },
    "sortedSpecificArray": [
        {
            "key": "https://stackoverflow.com",
            "value": {
                "https://stackoverflow.com/questions/15485735/use-of-commas-versus-semicolons": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925074
                        }
                    ],
                    "origin": "https://stackoverflow.com",
                    "title": "javascript - Use of commas versus semicolons? - Stack Overflow",
                    "total_time": 60008,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": -1,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": 60009,
                    "total_visits": 0,
                    "update_time": [
                        {
                            "time": 1689821925074,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821925074,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689821985084,
                            "visibility": "visible"
                        }
                    ],
                    "url": "https://stackoverflow.com/questions/15485735/use-of-commas-versus-semicolons"
                },
                "https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925076
                        }
                    ],
                    "origin": "https://stackoverflow.com",
                    "title": "javascript - chrome.runtime.sendMessage throws exception from content script after reloading Chrome Extension - Stack Overflow",
                    "total_time": 60365,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60366,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925076,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023"
                },
                "total_time": 120373,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60366,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 60009,
                "total_visits": -1
            }
        },
        {
            "key": "https://www.figma.com",
            "value": {
                "https://www.figma.com/file/qs5dHUU5GnlizPLtUmjtLU/Untitled?type=design&node-id=1-2&mode=design&t=V2yJe8Apw2RzW5hJ-0": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925077
                        }
                    ],
                    "origin": "https://www.figma.com",
                    "title": "Untitled – Figma",
                    "total_time": 60364,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 57801,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": 2563,
                    "total_visits": 0,
                    "update_time": [
                        {
                            "time": 1689821925077,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821925472,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689821928036,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.figma.com/file/qs5dHUU5GnlizPLtUmjtLU/Untitled?type=design&node-id=1-2&mode=design&t=V2yJe8Apw2RzW5hJ-0"
                },
                "total_time": 60364,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 57801,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 2563,
                "total_visits": -1
            }
        },
        {
            "key": "https://app.deepsource.com",
            "value": {
                "https://app.deepsource.com/gh/StealthHydra179/anti-distractor-chromeextension": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925075
                        }
                    ],
                    "origin": "https://app.deepsource.com",
                    "title": "StealthHydra179/anti-distractor-chromeextension • DeepSource",
                    "total_time": 60365,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60366,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925075,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985442,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://app.deepsource.com/gh/StealthHydra179/anti-distractor-chromeextension"
                },
                "total_time": 60365,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60366,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://chat.openai.com",
            "value": {
                "https://chat.openai.com/": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925073
                        }
                    ],
                    "origin": "https://chat.openai.com",
                    "title": "Exceptions: Error Handling Mechanism",
                    "total_time": 60368,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60369,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925073,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://chat.openai.com/"
                },
                "total_time": 60368,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60369,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://codeforces.com",
            "value": {
                "https://codeforces.com/": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925056
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "Codeforces",
                    "total_time": 60385,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60386,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925056,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/"
                },
                "https://codeforces.com/blog/entry/100910": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925057
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "[Tutorial] Collection of little techniques - Codeforces",
                    "total_time": 60384,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60385,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925057,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/blog/entry/100910"
                },
                "https://codeforces.com/blog/entry/104466": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925057
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "A bit more of general ideas - Codeforces",
                    "total_time": 60384,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60385,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925057,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/blog/entry/104466"
                },
                "https://codeforces.com/blog/entry/48417": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925057
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "General ideas - Codeforces",
                    "total_time": 60384,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60385,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925057,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/blog/entry/48417"
                },
                "https://codeforces.com/blog/entry/66909": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925057
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "[Tutorial] A way to Practice Competitive Programming : From Rating 1000 to 2400+ - Codeforces",
                    "total_time": 60384,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60385,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925057,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/blog/entry/66909"
                },
                "https://codeforces.com/blog/entry/95106": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925057
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "The Ultimate Topic List (with Resources, Problems and Templates) - Codeforces",
                    "total_time": 60384,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60385,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925057,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/blog/entry/95106"
                },
                "https://codeforces.com/contest/1844/my": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925056
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "Status - Codeforces Round 884 (Div. 1 + Div. 2) - Codeforces",
                    "total_time": 60386,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60387,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925056,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/contest/1844/my"
                },
                "total_time": 422691,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 422698,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://craftinginterpreters.com",
            "value": {
                "https://craftinginterpreters.com/representing-code.html": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925069
                        }
                    ],
                    "origin": "https://craftinginterpreters.com",
                    "title": "Representing Code · Crafting Interpreters",
                    "total_time": 60372,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60373,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925069,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://craftinginterpreters.com/representing-code.html"
                },
                "total_time": 60372,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60373,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://developer.chrome.com",
            "value": {
                "https://developer.chrome.com/docs/extensions/mv3/": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925077
                        }
                    ],
                    "origin": "https://developer.chrome.com",
                    "title": "Welcome to Chrome Extensions - Chrome Developers",
                    "total_time": 60364,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60365,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925077,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://developer.chrome.com/docs/extensions/mv3/"
                },
                "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925069
                        }
                    ],
                    "origin": "https://developer.chrome.com",
                    "title": "chrome.runtime - Chrome Developers",
                    "total_time": 60372,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60373,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925069,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect"
                },
                "total_time": 120736,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 120738,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://developer.mozilla.org",
            "value": {
                "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925069
                        }
                    ],
                    "origin": "https://developer.mozilla.org",
                    "title": "Array.prototype.forEach() - JavaScript | MDN",
                    "total_time": 60372,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60373,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925069,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach"
                },
                "total_time": 60372,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60373,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://docs.google.com",
            "value": {
                "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925062
                        }
                    ],
                    "origin": "https://docs.google.com",
                    "title": "Todo list - Google Docs",
                    "total_time": 60380,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60381,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925062,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit"
                },
                "total_time": 60380,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60381,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://docs.oracle.com",
            "value": {
                "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925073
                        }
                    ],
                    "origin": "https://docs.oracle.com",
                    "title": "The switch Statement (The Java™ Tutorials > Learning the Java Language > Language Basics)",
                    "total_time": 60368,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60369,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925073,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html"
                },
                "total_time": 60368,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60369,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://drive.google.com",
            "value": {
                "https://drive.google.com/drive/u/1/folders/1ZDj0PTAt1OtTSe90-qd6mB-hJ6dUpCW7": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925073
                        }
                    ],
                    "origin": "https://drive.google.com",
                    "title": "2023 Europe - Google Drive",
                    "total_time": 60367,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60368,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925073,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985442,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://drive.google.com/drive/u/1/folders/1ZDj0PTAt1OtTSe90-qd6mB-hJ6dUpCW7"
                },
                "total_time": 60367,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60368,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://github.com",
            "value": {
                "https://github.com/GoogleChrome/web-vitals-extension/issues/118": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925076
                        }
                    ],
                    "origin": "https://github.com",
                    "title": "Spurious errors are reported when navigating to chrome:// URLs · Issue #118 · GoogleChrome/web-vitals-extension",
                    "total_time": 60365,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60366,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925076,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://github.com/GoogleChrome/web-vitals-extension/issues/118"
                },
                "total_time": 60365,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60366,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://imageresizer.com",
            "value": {
                "https://imageresizer.com/resize/download/64b321401a949dc9662ed05e": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925073
                        }
                    ],
                    "origin": "https://imageresizer.com",
                    "title": "Image Resizer",
                    "total_time": 60367,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60368,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925073,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985442,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://imageresizer.com/resize/download/64b321401a949dc9662ed05e"
                },
                "total_time": 60367,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60368,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://login.microsoftonline.com",
            "value": {
                "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DOEEN_8FpuH_qcIz6Ba3QN-s_mLP5JDageqzo2LrEM3mxWBgGgsz7vph3tcYUj6wnv9FWRhevGot91sFtvHgcBnB1P5-2V4m2QM9LsHT-Cm4svDK4Huyv6onkV38e5iOiEwqf_E86vuNTOZulAJEGfw&response_mode=form_post&nonce=638245343261842304.NTlmYzY0NjctODczYS00OTkzLWE5ZTUtNjVkNjY1Y2QxNWUwNDAyMDczYjktZmQyZi00NjAwLThkNmMtYmExMjUzMGZlYmJh&redirect_uri=https%3A%2F%2Fportal.office.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=c3df525c-1647-474e-aca8-dbf1fd068666&x-client-SKU=ID_NET472&x-client-ver=6.30.1.0&sso_reload=true": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925070
                        }
                    ],
                    "origin": "https://login.microsoftonline.com",
                    "title": "Sign in to your account",
                    "total_time": 60371,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60372,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925070,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DOEEN_8FpuH_qcIz6Ba3QN-s_mLP5JDageqzo2LrEM3mxWBgGgsz7vph3tcYUj6wnv9FWRhevGot91sFtvHgcBnB1P5-2V4m2QM9LsHT-Cm4svDK4Huyv6onkV38e5iOiEwqf_E86vuNTOZulAJEGfw&response_mode=form_post&nonce=638245343261842304.NTlmYzY0NjctODczYS00OTkzLWE5ZTUtNjVkNjY1Y2QxNWUwNDAyMDczYjktZmQyZi00NjAwLThkNmMtYmExMjUzMGZlYmJh&redirect_uri=https%3A%2F%2Fportal.office.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=c3df525c-1647-474e-aca8-dbf1fd068666&x-client-SKU=ID_NET472&x-client-ver=6.30.1.0&sso_reload=true"
                },
                "total_time": 60371,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60372,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://mail.google.com",
            "value": {
                "https://mail.google.com/mail/u/1/#inbox": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925075
                        }
                    ],
                    "origin": "https://mail.google.com",
                    "title": "Inbox (17,863) - aidenm888@gmail.com - Gmail",
                    "total_time": 60366,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60367,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925075,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://mail.google.com/mail/u/1/#inbox"
                },
                "total_time": 60366,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60367,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://prettier.io",
            "value": {
                "https://prettier.io/docs/en/options.html": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925077
                        }
                    ],
                    "origin": "https://prettier.io",
                    "title": "Options · Prettier",
                    "total_time": 60364,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60365,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925077,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://prettier.io/docs/en/options.html"
                },
                "total_time": 60364,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60365,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://s3.amazonaws.com",
            "value": {
                "https://s3.amazonaws.com/www-inside-design/uploads/2017/11/wireframes-martyna.png": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925074
                        }
                    ],
                    "origin": "https://s3.amazonaws.com",
                    "title": "wireframes-martyna.png (1920×2622)",
                    "total_time": 60368,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60369,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925074,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://s3.amazonaws.com/www-inside-design/uploads/2017/11/wireframes-martyna.png"
                },
                "total_time": 60368,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60369,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://www.amygoodchild.com",
            "value": {
                "https://www.amygoodchild.com/blog/computer-art-50s-and-60s?utm_source=ayjay&utm_medium=email&utm_campaign=art-out-of-time": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925068
                        }
                    ],
                    "origin": "https://www.amygoodchild.com",
                    "title": "Early Computer Art in the 50’s & 60’s — Amy Goodchild",
                    "total_time": 60373,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60374,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925068,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.amygoodchild.com/blog/computer-art-50s-and-60s?utm_source=ayjay&utm_medium=email&utm_campaign=art-out-of-time"
                },
                "total_time": 60373,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60374,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://www.codefactor.io",
            "value": {
                "https://www.codefactor.io/dashboard": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925076
                        }
                    ],
                    "origin": "https://www.codefactor.io",
                    "title": "Dashboard",
                    "total_time": 60365,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60366,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925076,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.codefactor.io/dashboard"
                },
                "total_time": 60365,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60366,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://www.google.ca",
            "value": {
                "https://www.google.ca/": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925066
                        }
                    ],
                    "origin": "https://www.google.ca",
                    "title": "Google",
                    "total_time": 60376,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60377,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925066,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.ca/"
                },
                "total_time": 60376,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60377,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://www.google.com",
            "value": {
                "https://www.google.com/search?q=15%2C000%2C000%2F11&rlz=1C1ONGR_enCA1063CA1064&oq=15%2C000%2C000%2F11&aqs=chrome..69i57j6.2015j0j4&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925076
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "15,000,000/11 - Google Search",
                    "total_time": 60365,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60366,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925076,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=15%2C000%2C000%2F11&rlz=1C1ONGR_enCA1063CA1064&oq=15%2C000%2C000%2F11&aqs=chrome..69i57j6.2015j0j4&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&rlz=1C1ONGR_enCA1063CA1064&oq=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&aqs=chrome..69i57j69i64j69i59j69i58.334j0j7&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925077
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "Error: Cannot access contents of the page. Extension manifest must request permission to access the respective host. - Google Search",
                    "total_time": 60364,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60365,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925077,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&rlz=1C1ONGR_enCA1063CA1064&oq=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&aqs=chrome..69i57j69i64j69i59j69i58.334j0j7&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&rlz=1C1ONGR_enCA1063CA1064&oq=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&aqs=chrome..69i57.4847j0j7&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925076
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "Uncaught Error: Extension context invalidated. catch statement not working - Google Search",
                    "total_time": -2,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": -1,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925076,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&rlz=1C1ONGR_enCA1063CA1064&oq=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&aqs=chrome..69i57.4847j0j7&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=f1&rlz=1C1ONGR_enCA1063CA1064&oq=f1&aqs=chrome.0.0i271j46i433i512j69i59j0i433i512j0i131i433i512j69i60j69i61l2.463j0j4&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925066
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "f1 - Google Search",
                    "total_time": 60374,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60375,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925066,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985442,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=f1&rlz=1C1ONGR_enCA1063CA1064&oq=f1&aqs=chrome.0.0i271j46i433i512j69i59j0i433i512j0i131i433i512j69i60j69i61l2.463j0j4&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=symbolism+of+blue+in+the+great+gatsby&rlz=1C1ONGR_enCA1063CA1064&oq=symbolism+of+blue+in+the+&aqs=chrome.1.69i57j0i512l2j0i22i30l6j0i390i650.6831j0j7&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925073
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "symbolism of blue in the great gatsby - Google Search",
                    "total_time": 60367,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60368,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925073,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985442,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=symbolism+of+blue+in+the+great+gatsby&rlz=1C1ONGR_enCA1063CA1064&oq=symbolism+of+blue+in+the+&aqs=chrome.1.69i57j0i512l2j0i22i30l6j0i390i650.6831j0j7&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=test&rlz=1C1ONGR_enCA1063CA1064&oq=test&aqs=chrome.0.69i59j46i131i199i433i465i512j0i131i433i512l2j0i131i433i650j69i60j69i61j69i60.575j0j7&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925076
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "test - Google Search",
                    "total_time": 60365,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60366,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925076,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=test&rlz=1C1ONGR_enCA1063CA1064&oq=test&aqs=chrome.0.69i59j46i131i199i433i465i512j0i131i433i512l2j0i131i433i650j69i60j69i61j69i60.575j0j7&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?rlz=1C1ONGR_enCA1063CA1064&q=website+wireframe+examples&tbm=isch&sa=X&ved=2ahUKEwiNw7Kp5YKAAxWmjYkEHdRpBuIQ0pQJegQIDBAB&biw=2560&bih=1232&dpr=1.5#imgrc=jB4157cyh8aIDM": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925073
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "website wireframe examples - Google Search",
                    "total_time": 60368,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60369,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925073,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?rlz=1C1ONGR_enCA1063CA1064&q=website+wireframe+examples&tbm=isch&sa=X&ved=2ahUKEwiNw7Kp5YKAAxWmjYkEHdRpBuIQ0pQJegQIDBAB&biw=2560&bih=1232&dpr=1.5#imgrc=jB4157cyh8aIDM"
                },
                "total_time": 362203,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 362209,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://www.instagram.com",
            "value": {
                "https://www.instagram.com/direct/t/17843476547117960/": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925069
                        }
                    ],
                    "origin": "https://www.instagram.com",
                    "title": "Instagram • Chats",
                    "total_time": 60371,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60372,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925069,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985442,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.instagram.com/direct/t/17843476547117960/"
                },
                "total_time": 60371,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60372,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://www.newegg.ca",
            "value": {
                "https://www.newegg.ca/p/pl?d=6700xt&Order=1": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925066
                        }
                    ],
                    "origin": "https://www.newegg.ca",
                    "title": "6700xt | Newegg.ca",
                    "total_time": 60375,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60376,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925066,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.newegg.ca/p/pl?d=6700xt&Order=1"
                },
                "total_time": 60375,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60376,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://www.termius.com",
            "value": {
                "https://www.termius.com/free-ssh-client-for-windows": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925062
                        }
                    ],
                    "origin": "https://www.termius.com",
                    "title": "Free SSH client for Windows",
                    "total_time": 60378,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60379,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925062,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985442,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.termius.com/free-ssh-client-for-windows"
                },
                "total_time": 60378,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 60379,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://www.youtube.com",
            "value": {
                "https://www.youtube.com/": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925065
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) YouTube",
                    "total_time": 60376,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60377,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925065,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/"
                },
                "https://www.youtube.com/watch?v=0EtgwIajVqs": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925069
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Download These Handy Tools NOW! - YouTube",
                    "total_time": 60373,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60374,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925069,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=0EtgwIajVqs"
                },
                "https://www.youtube.com/watch?v=4ArVvrhhnyI": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925069
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) How 23 Foods Get To The Grocery Store | Big Business | Insider Business - YouTube",
                    "total_time": 60372,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60373,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925069,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=4ArVvrhhnyI"
                },
                "https://www.youtube.com/watch?v=5RC9cKkQYGA": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925065
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "MEGA FARM from 0$ on FLAT MAP with @FarmingGenius 👉 #1 - YouTube",
                    "total_time": 60376,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60377,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925065,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=5RC9cKkQYGA"
                },
                "https://www.youtube.com/watch?v=F3TMRCO8eyQ": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925067
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Sergio Perez Storms Through The Field In Austria! | 2023 Austrian Grand Prix - YouTube",
                    "total_time": 60375,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60376,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925067,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=F3TMRCO8eyQ"
                },
                "https://www.youtube.com/watch?v=FLRnk01ffE8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925071
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) What could Russia learn from a captured Leopard 2 tank? - YouTube",
                    "total_time": 60371,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60372,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925071,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=FLRnk01ffE8"
                },
                "https://www.youtube.com/watch?v=FStOT4pP2tc": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925068
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "My 10 YEAR Indie Game Development Journey - YouTube",
                    "total_time": 60374,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60375,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925068,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=FStOT4pP2tc"
                },
                "https://www.youtube.com/watch?v=HFDTAqUhH2o": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925067
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Saving the cheapest PC on eBay - YouTube",
                    "total_time": 60374,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60375,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925067,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=HFDTAqUhH2o"
                },
                "https://www.youtube.com/watch?v=HRcI7RSm9_o": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925070
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) I Think 'F1 World' In The F1 23 Game Is A Flop... - YouTube",
                    "total_time": 60372,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60373,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925070,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=HRcI7RSm9_o"
                },
                "https://www.youtube.com/watch?v=Koc63QhxPgk": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925067
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Weak Perfect Graph Theorem - YouTube",
                    "total_time": 60374,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60375,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925067,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=Koc63QhxPgk"
                },
                "https://www.youtube.com/watch?v=LUjR54Hf_dc": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925067
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) EXTENDED Race Highlights I 2023 6 Hours of Monza I FIA WEC - YouTube",
                    "total_time": 60374,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60375,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925067,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=LUjR54Hf_dc"
                },
                "https://www.youtube.com/watch?v=MF-KR6A3KyM": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925069
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Minecrafts Strangest EXPLOIT - Block Transmutation... - YouTube",
                    "total_time": 60373,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60374,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925069,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=MF-KR6A3KyM"
                },
                "https://www.youtube.com/watch?v=QeVJOUFZV3U&list=PL-cVSmXe-NPgNO-cyZ_mie7e2c4Ley20q&index=17": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925065
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) BRAKE CHECKED BY AI! AI R&D FINALLY CATCHING UP! WE'VE GOT WORK TO DO - F1 23 MY TEAM CAREER Part 17 - YouTube",
                    "total_time": 60376,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60377,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925065,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=QeVJOUFZV3U&list=PL-cVSmXe-NPgNO-cyZ_mie7e2c4Ley20q&index=17"
                },
                "https://www.youtube.com/watch?v=UTEAvb-tikU": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925071
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) How This Tiny Truck Took Down an Army - YouTube",
                    "total_time": 60371,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60372,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925071,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=UTEAvb-tikU"
                },
                "https://www.youtube.com/watch?v=VPOu1mQ8Xho": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925073
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Nvidia RTX 4060 Ti 16GB Sales, AMD RX 7900, Meta exits Intel Leak, Arrow Lake | June Loose Ends - YouTube",
                    "total_time": 60368,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60369,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925073,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=VPOu1mQ8Xho"
                },
                "https://www.youtube.com/watch?v=X29vxhlZIzE": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925072
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Can I get Top 100 on Every Map in the Summer Campaign? - YouTube",
                    "total_time": 60370,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60371,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925072,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=X29vxhlZIzE"
                },
                "https://www.youtube.com/watch?v=Y0Ko0kvwfgA": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925067
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) How Do Games Render So Much Grass? - YouTube",
                    "total_time": 60374,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60375,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925067,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=Y0Ko0kvwfgA"
                },
                "https://www.youtube.com/watch?v=bgR3yESAEVE": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925064
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "Can Chess, with Hexagons? - YouTube",
                    "total_time": 60377,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60378,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925064,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=bgR3yESAEVE"
                },
                "https://www.youtube.com/watch?v=d2Tm3Yx4HWI": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925063
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "Academia is BROKEN! - Harvard Fake Data Scandal Explained - YouTube",
                    "total_time": 60378,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60379,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925063,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=d2Tm3Yx4HWI"
                },
                "https://www.youtube.com/watch?v=eYceyv7a4tA": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925075
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) BEST GPUs to Buy Right Now... Nvidia Prices Plummet! - YouTube",
                    "total_time": 60366,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60367,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925075,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=eYceyv7a4tA"
                },
                "https://www.youtube.com/watch?v=g3X1QXXDXjw": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925064
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "Abusing the Banking System to get rich on a Pay-to-win Server! - Complex Gaming - YouTube",
                    "total_time": 60378,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60379,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925064,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=g3X1QXXDXjw"
                },
                "https://www.youtube.com/watch?v=i7jOxAarbo4": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925069
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) AMD RX 7700 & 7800 Benchmark, Nvidia RTX 4060 Ti 16GB Review, Intel i9-14900KS | Broken Silicon 214 - YouTube",
                    "total_time": 60373,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60374,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925069,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=i7jOxAarbo4"
                },
                "https://www.youtube.com/watch?v=iSpL9LnczVQ": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925073
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Building A Budget NAS with TrueNAS Scale - YouTube",
                    "total_time": 60369,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60370,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925073,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=iSpL9LnczVQ"
                },
                "https://www.youtube.com/watch?v=j9ODgfIaxc4": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925064
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) The Race to Save Texas’ Failed Megabridge - YouTube",
                    "total_time": 60378,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60379,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925064,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=j9ODgfIaxc4"
                },
                "https://www.youtube.com/watch?v=o8YgqN9cG84": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925069
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Renovating a canoe while running a marathon - YouTube",
                    "total_time": 60372,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60373,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925069,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=o8YgqN9cG84"
                },
                "https://www.youtube.com/watch?v=rTN749kONJI": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925061
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "I Bought a \"BROKEN\" Graphics Card on eBay... Can I Fix it?!? - YouTube",
                    "total_time": 60380,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60381,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925061,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=rTN749kONJI"
                },
                "https://www.youtube.com/watch?v=tk9guzivxiU": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925065
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "Epic 211-shot badminton rally delights fans in Malaysia - YouTube",
                    "total_time": 60376,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60377,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925065,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985443,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=tk9guzivxiU"
                },
                "https://www.youtube.com/watch?v=x2ulsZ6aGXY": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689821925071
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "So how DO you build a safe submersible? - DSV Alvin - YouTube",
                    "total_time": 60371,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 60372,
                    "total_time_inactive": -1,
                    "total_time_loaded": -1,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689821925071,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689821985444,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=x2ulsZ6aGXY"
                },
                "total_time": 1690461,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 1690489,
                "total_time_inactive": -1,
                "total_time_loaded": -1,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        }
    ],
    "timeSinceInstall": 97186,
    "sortedTabList": [
        {
            "document_id": "19031719AD4CAA0CB6AFC0348B73C665",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=symbolism+of+blue+in+the+great+gatsby&rlz=1C1ONGR_enCA1063CA1064&oq=symbolism+of+blue+in+the+&aqs=chrome.1.69i57j0i512l2j0i22i30l6j0i390i650.6831j0j7&sourceid=chrome&ie=UTF-8",
            "title": "symbolism of blue in the great gatsby - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60008,
            "total_visits": 0,
            "total_time_visible": 60009,
            "total_time_hidden": -1,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "EC5101BB91B53464282D20FDFA2A0957",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=15%2C000%2C000%2F11&rlz=1C1ONGR_enCA1063CA1064&oq=15%2C000%2C000%2F11&aqs=chrome..69i57j6.2015j0j4&sourceid=chrome&ie=UTF-8",
            "title": "15,000,000/11 - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60364,
            "total_visits": 0,
            "total_time_visible": 2563,
            "total_time_hidden": 57801,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "5964856AD56CD486C38CA6386EFBF967",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&rlz=1C1ONGR_enCA1063CA1064&oq=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&aqs=chrome..69i57j69i64j69i59j69i58.334j0j7&sourceid=chrome&ie=UTF-8",
            "title": "Error: Cannot access contents of the page. Extension manifest must request permission to access the respective host. - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925077
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925077
                }
            ],
            "open": true,
            "last_update_time": 1689821925077,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60364,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60365,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "0A32D42F9EC43BA8DD8BE87AFEFE2304",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/contest/1844/my",
            "title": "Status - Codeforces Round 884 (Div. 1 + Div. 2) - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925056
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925056
                }
            ],
            "open": true,
            "last_update_time": 1689821925056,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60386,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60387,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "A1A4A3E023A3AAF111B744D9DB7D32A4",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/contest/1844/my",
            "title": "Status - Codeforces Round 884 (Div. 1 + Div. 2) - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925056
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925056
                }
            ],
            "open": true,
            "last_update_time": 1689821925056,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60385,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60386,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "90BF30CB3B59A8D5DEFC0AAECADA5166",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/",
            "title": "Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925056
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925056
                }
            ],
            "open": true,
            "last_update_time": 1689821925056,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60384,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60385,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "BDF3B5595903D7308758F02ED4CD8E22",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/",
            "title": "Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925055
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925055
                }
            ],
            "open": true,
            "last_update_time": 1689821925055,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60384,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60385,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "B989B3911D23BBE2FD7A26F2D90CA310",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/blog/entry/95106",
            "title": "The Ultimate Topic List (with Resources, Problems and Templates) - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925057
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925057
                }
            ],
            "open": true,
            "last_update_time": 1689821925057,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60384,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60385,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "111B44741771121BE75C9B606CAF1D82",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/blog/entry/66909",
            "title": "[Tutorial] A way to Practice Competitive Programming : From Rating 1000 to 2400+ - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925057
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925057
                }
            ],
            "open": true,
            "last_update_time": 1689821925057,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60384,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60385,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "C42E04D07EE74B2E5BD1B48A96082415",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/blog/entry/48417",
            "title": "General ideas - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925057
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925057
                }
            ],
            "open": true,
            "last_update_time": 1689821925057,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60384,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60385,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "51856ADAFC9E5D65D318942108B6069C",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/blog/entry/104466",
            "title": "A bit more of general ideas - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925057
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925057
                }
            ],
            "open": true,
            "last_update_time": 1689821925057,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60380,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60381,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "849877AF03B29CE008C662F7C5886EB6",
            "origin": "https://codeforces.com",
            "url": "https://codeforces.com/blog/entry/100910",
            "title": "[Tutorial] Collection of little techniques - Codeforces",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925057
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925057
                }
            ],
            "open": true,
            "last_update_time": 1689821925057,
            "favicon": "https://codeforces.org/s/0/favicon-32x32.png",
            "total_time": 60378,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60379,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "D123D4ADED992016EBD6C592F60CA79D",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=rTN749kONJI",
            "title": "I Bought a \"BROKEN\" Graphics Card on eBay... Can I Fix it?!? - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925061
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925061
                }
            ],
            "open": true,
            "last_update_time": 1689821925061,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60380,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60381,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "8856923DB49ADE4FCA27D985A3B80DE5",
            "origin": "https://www.termius.com",
            "url": "https://www.termius.com/free-ssh-client-for-windows",
            "title": "Free SSH client for Windows",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925062
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925062
                }
            ],
            "open": true,
            "last_update_time": 1689821925062,
            "favicon": "https://assets-global.website-files.com/5c7036349b5477bf13f828cf/63ebf04819aa00122e73b864_Mac%20app%20logo.png",
            "total_time": 60378,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60379,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "EF7BC24613C42F174E9771EEEC8F8021",
            "origin": "https://docs.google.com",
            "url": "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit",
            "title": "Todo list - Google Docs",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925062
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925062
                }
            ],
            "open": true,
            "last_update_time": 1689821925062,
            "favicon": "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico",
            "total_time": 60378,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60379,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "4C8A154302BE77F8B873F255ECF0FCC4",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=d2Tm3Yx4HWI",
            "title": "Academia is BROKEN! - Harvard Fake Data Scandal Explained - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925063
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925063
                }
            ],
            "open": true,
            "last_update_time": 1689821925063,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60376,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60377,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "E3F33E1F3307CD50EFE80F8D1D9FE078",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=g3X1QXXDXjw",
            "title": "Abusing the Banking System to get rich on a Pay-to-win Server! - Complex Gaming - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925064
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925064
                }
            ],
            "open": true,
            "last_update_time": 1689821925064,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60378,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60379,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "F342CE15DB13BAE5448AB02B14020525",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=5RC9cKkQYGA",
            "title": "MEGA FARM from 0$ on FLAT MAP with @FarmingGenius 👉 #1 - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925065
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925065
                }
            ],
            "open": true,
            "last_update_time": 1689821925065,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60376,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60377,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "E1A3EACFC96BF4BA9094EB78CE647DEA",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=j9ODgfIaxc4",
            "title": "(656) The Race to Save Texas’ Failed Megabridge - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925064
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925064
                }
            ],
            "open": true,
            "last_update_time": 1689821925064,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60376,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60377,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "A1E04D94E6F0BC379AC88006E5BEDCC6",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/",
            "title": "(656) YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925065
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925065
                }
            ],
            "open": true,
            "last_update_time": 1689821925065,
            "favicon": "https://www.youtube.com/s/desktop/2a7c6a10/img/favicon_32x32.png",
            "total_time": 60377,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60378,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "EE7FCC4D7BB9BD397C78AD7AC65C7F53",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=tk9guzivxiU",
            "title": "Epic 211-shot badminton rally delights fans in Malaysia - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925065
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925065
                }
            ],
            "open": true,
            "last_update_time": 1689821925065,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60376,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60377,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "71E9BD71B652FD77542A58904EEDB608",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=bgR3yESAEVE",
            "title": "Can Chess, with Hexagons? - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925064
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925064
                }
            ],
            "open": true,
            "last_update_time": 1689821925064,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60376,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60377,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "060B6F699C27EAF77EEDCA0968366483",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=QeVJOUFZV3U&list=PL-cVSmXe-NPgNO-cyZ_mie7e2c4Ley20q&index=17",
            "title": "(656) BRAKE CHECKED BY AI! AI R&D FINALLY CATCHING UP! WE'VE GOT WORK TO DO - F1 23 MY TEAM CAREER Part 17 - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925065
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925065
                }
            ],
            "open": true,
            "last_update_time": 1689821925065,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60375,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60376,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "D1FFA8731C2F2DD77034799E6A1A354B",
            "origin": "https://www.google.ca",
            "url": "https://www.google.ca/",
            "title": "Google",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925066
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925066
                }
            ],
            "open": true,
            "last_update_time": 1689821925066,
            "favicon": "https://www.google.ca/favicon.ico",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "C54D30499092A4DE14F5A8928B187CD4",
            "origin": "https://www.newegg.ca",
            "url": "https://www.newegg.ca/p/pl?d=6700xt&Order=1",
            "title": "6700xt | Newegg.ca",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925066
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925066
                }
            ],
            "open": true,
            "last_update_time": 1689821925066,
            "favicon": "https://c1.neweggimages.com/WebResource/ngm/newegg.ico",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "4E3FDA02AFC2E5AD79AD88E8E30BEDD9",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=Y0Ko0kvwfgA",
            "title": "(656) How Do Games Render So Much Grass? - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925067
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925067
                }
            ],
            "open": true,
            "last_update_time": 1689821925067,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "139AE7B11EB96D7E559D9949FFA51A23",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=Koc63QhxPgk",
            "title": "(656) Weak Perfect Graph Theorem - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925067
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925067
                }
            ],
            "open": true,
            "last_update_time": 1689821925067,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "63A74EA4CD637C651A9B9EA9228C3C81",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=f1&rlz=1C1ONGR_enCA1063CA1064&oq=f1&aqs=chrome.0.0i271j46i433i512j69i59j0i433i512j0i131i433i512j69i60j69i61l2.463j0j4&sourceid=chrome&ie=UTF-8",
            "title": "f1 - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925066
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925066
                }
            ],
            "open": true,
            "last_update_time": 1689821925066,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "2B45729E5316AE83DEC8854FFEE248E0",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=LUjR54Hf_dc",
            "title": "(656) EXTENDED Race Highlights I 2023 6 Hours of Monza I FIA WEC - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925067
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925067
                }
            ],
            "open": true,
            "last_update_time": 1689821925067,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60374,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60375,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "B11B1D960211780392A3D68721B25FE7",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=HFDTAqUhH2o",
            "title": "(656) Saving the cheapest PC on eBay - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925067
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925067
                }
            ],
            "open": true,
            "last_update_time": 1689821925067,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60375,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60376,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "1D6BCF997CBAF6821E0DA27970DA1226",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=FStOT4pP2tc",
            "title": "My 10 YEAR Indie Game Development Journey - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925068
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925068
                }
            ],
            "open": true,
            "last_update_time": 1689821925068,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60373,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60374,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "7C64A80D1042F7158A45E9715DE0DAFD",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=F3TMRCO8eyQ",
            "title": "(656) Sergio Perez Storms Through The Field In Austria! | 2023 Austrian Grand Prix - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925067
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925067
                }
            ],
            "open": true,
            "last_update_time": 1689821925067,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60373,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60374,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "F22BDF1FF4E0408E39C26990E20CC63F",
            "origin": "https://www.amygoodchild.com",
            "url": "https://www.amygoodchild.com/blog/computer-art-50s-and-60s?utm_source=ayjay&utm_medium=email&utm_campaign=art-out-of-time",
            "title": "Early Computer Art in the 50’s & 60’s — Amy Goodchild",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925068
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925068
                }
            ],
            "open": true,
            "last_update_time": 1689821925068,
            "favicon": "https://images.squarespace-cdn.com/content/v1/5f33cddd6aff255aabb0c6cd/1598285066323-AE6AS241FTS6QP3C4OA6/favicon.ico",
            "total_time": 60371,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60372,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "5E53CC309226F8F4CFEBF15B2D7BF4CD",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=i7jOxAarbo4",
            "title": "(656) AMD RX 7700 & 7800 Benchmark, Nvidia RTX 4060 Ti 16GB Review, Intel i9-14900KS | Broken Silicon 214 - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60373,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60374,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "2BB57CDCBD172D30CCE673F622AEFD9F",
            "origin": "https://www.instagram.com",
            "url": "https://www.instagram.com/direct/t/17843476547117960/",
            "title": "Instagram • Chats",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://static.cdninstagram.com/rsrc.php/yS/r/f_5NUHW7AZC.ico",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "38C465DAD91572A832131051AF104198",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=MF-KR6A3KyM",
            "title": "(656) Minecrafts Strangest EXPLOIT - Block Transmutation... - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "F5385D6793A46323DF1E39C3C07B1BA7",
            "origin": "https://developer.mozilla.org",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
            "title": "Array.prototype.forEach() - JavaScript | MDN",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://developer.mozilla.org/favicon-48x48.cbbd161b.png",
            "total_time": 60373,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60374,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "4B85D4BEC83EFA8C580DE7432BF30460",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=4ArVvrhhnyI",
            "title": "(656) How 23 Foods Get To The Grocery Store | Big Business | Insider Business - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://www.youtube.com/s/desktop/faa006c1/img/favicon_32x32.png",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "88BA9A4159B22814E2FECF9E6153E9FA",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=0EtgwIajVqs",
            "title": "(656) Download These Handy Tools NOW! - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "7D81830D8BC2003566A5B493105DB9F5",
            "origin": "https://craftinginterpreters.com",
            "url": "https://craftinginterpreters.com/representing-code.html",
            "title": "Representing Code · Crafting Interpreters",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://craftinginterpreters.com/image/favicon.png",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "1A29537F38E5D50B6CABFECEFC554805",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=o8YgqN9cG84",
            "title": "(656) Renovating a canoe while running a marathon - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60372,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60373,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "8B739EFE3E45FF4C3428C04CE837FB6A",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=HRcI7RSm9_o",
            "title": "(656) I Think 'F1 World' In The F1 23 Game Is A Flop... - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925070
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925070
                }
            ],
            "open": true,
            "last_update_time": 1689821925070,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60371,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60372,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "B3BFA21956CDC6CEAF48A71CAC5D348A",
            "origin": "https://developer.chrome.com",
            "url": "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect",
            "title": "chrome.runtime - Chrome Developers",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925069
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925069
                }
            ],
            "open": true,
            "last_update_time": 1689821925069,
            "favicon": "https://developer.chrome.com/images/meta/favicon-32x32.png",
            "total_time": 60371,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60372,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "61C5FD9EE7290F18CFC752369E7D98DB",
            "origin": "https://login.microsoftonline.com",
            "url": "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DOEEN_8FpuH_qcIz6Ba3QN-s_mLP5JDageqzo2LrEM3mxWBgGgsz7vph3tcYUj6wnv9FWRhevGot91sFtvHgcBnB1P5-2V4m2QM9LsHT-Cm4svDK4Huyv6onkV38e5iOiEwqf_E86vuNTOZulAJEGfw&response_mode=form_post&nonce=638245343261842304.NTlmYzY0NjctODczYS00OTkzLWE5ZTUtNjVkNjY1Y2QxNWUwNDAyMDczYjktZmQyZi00NjAwLThkNmMtYmExMjUzMGZlYmJh&redirect_uri=https%3A%2F%2Fportal.office.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=c3df525c-1647-474e-aca8-dbf1fd068666&x-client-SKU=ID_NET472&x-client-ver=6.30.1.0&sso_reload=true",
            "title": "Sign in to your account",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925070
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925070
                }
            ],
            "open": true,
            "last_update_time": 1689821925070,
            "favicon": "https://aadcdn.msftauth.net/shared/1.0/content/images/favicon_a_eupayfgghqiai7k9sol6lg2.ico",
            "total_time": 60371,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60372,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "6280886BD3FB7D78D20744AD35CCD768",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=FLRnk01ffE8",
            "title": "(656) What could Russia learn from a captured Leopard 2 tank? - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925071
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925071
                }
            ],
            "open": true,
            "last_update_time": 1689821925071,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60371,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60372,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "CB48207A46CF0D9C4A1E88A8BF207618",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=x2ulsZ6aGXY",
            "title": "So how DO you build a safe submersible? - DSV Alvin - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925071
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925071
                }
            ],
            "open": true,
            "last_update_time": 1689821925071,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60370,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60371,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "E898819DB3732099DA7B259905D2E134",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=UTEAvb-tikU",
            "title": "(656) How This Tiny Truck Took Down an Army - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925071
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925071
                }
            ],
            "open": true,
            "last_update_time": 1689821925071,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60369,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60370,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "BB5F6172FB7785C45DF3BB6F66BED0E1",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=X29vxhlZIzE",
            "title": "(656) Can I get Top 100 on Every Map in the Summer Campaign? - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925072
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925072
                }
            ],
            "open": true,
            "last_update_time": 1689821925072,
            "favicon": "https://www.youtube.com/s/desktop/faa006c1/img/favicon_32x32.png",
            "total_time": 60368,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60369,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "D86B00CC49B177CE66B396DC3426986A",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/",
            "title": "(656) YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925071
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925071
                }
            ],
            "open": true,
            "last_update_time": 1689821925071,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60368,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60369,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "7A4E3C0DCACB48C5EFBD7B0105481022",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=iSpL9LnczVQ",
            "title": "(656) Building A Budget NAS with TrueNAS Scale - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": 60367,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60368,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "5693FC7BC33D9973F7195B8C92BD8919",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?rlz=1C1ONGR_enCA1063CA1064&q=website+wireframe+examples&tbm=isch&sa=X&ved=2ahUKEwiNw7Kp5YKAAxWmjYkEHdRpBuIQ0pQJegQIDBAB&biw=2560&bih=1232&dpr=1.5#imgrc=jB4157cyh8aIDM",
            "title": "website wireframe examples - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60367,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60368,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "BF9F9429788AA196A63319B5B490C1F0",
            "origin": "https://docs.oracle.com",
            "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html",
            "title": "The switch Statement (The Java™ Tutorials > Learning the Java Language > Language Basics)",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://docs.oracle.com/favicon.ico",
            "total_time": 60368,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60369,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "93078942FB0C9B4AEA6A13B8490DED90",
            "origin": "https://imageresizer.com",
            "url": "https://imageresizer.com/resize/download/64b321401a949dc9662ed05e",
            "title": "Image Resizer",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://imageresizer.com/favicon.ico",
            "total_time": 60368,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60369,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "7DA2F27FC5033592DC636C8813AA8C76",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=VPOu1mQ8Xho",
            "title": "(656) Nvidia RTX 4060 Ti 16GB Sales, AMD RX 7900, Meta exits Intel Leak, Arrow Lake | June Loose Ends - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://www.youtube.com/s/desktop/eddc5c37/img/favicon_32x32.png",
            "total_time": 60367,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60368,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "5E6C3111009CD6439099C23139C885AD",
            "origin": "https://stackoverflow.com",
            "url": "https://stackoverflow.com/questions/15485735/use-of-commas-versus-semicolons",
            "title": "javascript - Use of commas versus semicolons? - Stack Overflow",
            "visibility": "visible",
            "active": true,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925074
                },
                {
                    "visibility": "visible",
                    "time": 1689821925074
                },
                {
                    "visibility": "visible",
                    "time": 1689821985084
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925074
                }
            ],
            "open": true,
            "last_update_time": 1689821925074,
            "favicon": "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
            "total_time": 60368,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60369,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "AF4FAD7DBFDA164B9C5EE9BEADB82C9A",
            "origin": "https://chat.openai.com",
            "url": "https://chat.openai.com/",
            "title": "Exceptions: Error Handling Mechanism",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://chat.openai.com/favicon-32x32.png",
            "total_time": 60366,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60367,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "A406D7DB8869C49CA83AB85B4F0DCDAA",
            "origin": "https://drive.google.com",
            "url": "https://drive.google.com/drive/u/1/folders/1ZDj0PTAt1OtTSe90-qd6mB-hJ6dUpCW7",
            "title": "2023 Europe - Google Drive",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925073
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925073
                }
            ],
            "open": true,
            "last_update_time": 1689821925073,
            "favicon": "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png",
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "82DA4C9644C3D1BC9C9FB1806AFAAC0C",
            "origin": "https://s3.amazonaws.com",
            "url": "https://s3.amazonaws.com/www-inside-design/uploads/2017/11/wireframes-martyna.png",
            "title": "wireframes-martyna.png (1920×2622)",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925074
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985444
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925074
                }
            ],
            "open": true,
            "last_update_time": 1689821925074,
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "464201CB048F47743E47522699A624FA",
            "origin": "https://mail.google.com",
            "url": "https://mail.google.com/mail/u/1/#inbox",
            "title": "Inbox (17,863) - aidenm888@gmail.com - Gmail",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925075
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925075
                }
            ],
            "open": true,
            "last_update_time": 1689821925075,
            "favicon": "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/unreadcountfavicon/3/100+_2x.png",
            "total_time": 60366,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60367,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "BF019C47323A4CB76B3A14914CA70B53",
            "origin": "https://app.deepsource.com",
            "url": "https://app.deepsource.com/gh/StealthHydra179/anti-distractor-chromeextension",
            "title": "StealthHydra179/anti-distractor-chromeextension • DeepSource",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925075
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985442
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925075
                }
            ],
            "open": true,
            "last_update_time": 1689821925075,
            "favicon": "https://app.deepsource.com/favicon/default-dark.svg",
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "19BDA75A5ED5CCCCD8127FE346E3FF34",
            "origin": "https://stackoverflow.com",
            "url": "https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023",
            "title": "javascript - chrome.runtime.sendMessage throws exception from content script after reloading Chrome Extension - Stack Overflow",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "7F3EAE7AE2CD3999B84C6953E9149B20",
            "origin": "https://www.youtube.com",
            "url": "https://www.youtube.com/watch?v=eYceyv7a4tA",
            "title": "(656) BEST GPUs to Buy Right Now... Nvidia Prices Plummet! - YouTube",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925075
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925075
                }
            ],
            "open": true,
            "last_update_time": 1689821925075,
            "favicon": "https://www.youtube.com/s/desktop/41d65310/img/favicon_32x32.png",
            "total_time": -2,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": -1,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "3A114C3A47AC8C99F3F4E7779693A8AE",
            "origin": "https://www.codefactor.io",
            "url": "https://www.codefactor.io/dashboard",
            "title": "Dashboard",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://www.codefactor.io/Content/img/favicon.png?v=3",
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "C02B44B40A9678977C7DBA126769EC4E",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=test&rlz=1C1ONGR_enCA1063CA1064&oq=test&aqs=chrome.0.69i59j46i131i199i433i465i512j0i131i433i512l2j0i131i433i650j69i60j69i61j69i60.575j0j7&sourceid=chrome&ie=UTF-8",
            "title": "test - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60365,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60366,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "3E83DCD997DF6D266522A1A3A4AE89A7",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&rlz=1C1ONGR_enCA1063CA1064&oq=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&aqs=chrome..69i57.4847j0j7&sourceid=chrome&ie=UTF-8",
            "title": "Uncaught Error: Extension context invalidated. catch statement not working - Google Search",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://www.google.com/favicon.ico",
            "total_time": 60364,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60365,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "06BB4ED1E94F982B9FD5BDF119484243",
            "origin": "https://github.com",
            "url": "https://github.com/GoogleChrome/web-vitals-extension/issues/118",
            "title": "Spurious errors are reported when navigating to chrome:// URLs · Issue #118 · GoogleChrome/web-vitals-extension",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925076
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925076
                }
            ],
            "open": true,
            "last_update_time": 1689821925076,
            "favicon": "https://github.githubassets.com/favicons/favicon-dark.svg",
            "total_time": 60364,
            "total_visits": -1,
            "total_time_visible": -1,
            "total_time_hidden": 60365,
            "total_time_loaded": -1,
            "total_time_closed": -1,
            "total_time_active": -1,
            "total_time_inactive": -1,
            "total_time_audible": -1,
            "total_time_muted": -1,
            "total_time_unmuted": -1
        },
        {
            "document_id": "9478822B6FD633341416AFC4FFA988C8",
            "origin": "https://developer.chrome.com",
            "url": "https://developer.chrome.com/docs/extensions/mv3/",
            "title": "Welcome to Chrome Extensions - Chrome Developers",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925077
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925077
                }
            ],
            "open": true,
            "last_update_time": 1689821925077,
            "favicon": "https://developer.chrome.com/images/meta/favicon-32x32.png"
        },
        {
            "document_id": "12F0A081C7FBC16150D85CE95A9C3B87",
            "origin": "https://prettier.io",
            "url": "https://prettier.io/docs/en/options.html",
            "title": "Options · Prettier",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925077
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925077
                }
            ],
            "open": true,
            "last_update_time": 1689821925077,
            "favicon": "https://prettier.io/icon.png"
        },
        {
            "document_id": "912768C1DC6F7A6F4D588FB01D20CB99",
            "origin": "https://www.figma.com",
            "url": "https://www.figma.com/file/qs5dHUU5GnlizPLtUmjtLU/Untitled?type=design&node-id=1-2&mode=design&t=V2yJe8Apw2RzW5hJ-0",
            "title": "Untitled – Figma",
            "visibility": "hidden",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689821925077
                },
                {
                    "visibility": "visible",
                    "time": 1689821925472
                },
                {
                    "visibility": "hidden",
                    "time": 1689821928036
                },
                {
                    "visibility": "hidden",
                    "time": 1689821985443
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689821925077
                }
            ],
            "open": true,
            "last_update_time": 1689821925077,
            "favicon": "https://static.figma.com/app/icon/1/favicon.svg"
        }
    ]
}
 */
