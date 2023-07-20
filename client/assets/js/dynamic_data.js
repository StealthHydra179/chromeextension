//get specific data from the database
chrome.runtime.sendMessage({message: "requestData"}, (response) => {
    console.log(response)
    let specificList = response.specificList

    //update the website

    //unique websites visited
    document.getElementById("websites_visited_row_1").innerHTML = "" + Object.keys(specificList).length

    //unique webpages visited
    let webpageCount = 0
    for (let website in specificList) {
        webpageCount += Object.keys(specificList[website]).length
    }
    document.getElementById("webpages_visited_row_1").innerHTML = webpageCount


    //Average Time Per Day Over The Last 7 Days


    //total time used
    let totalTimeUsedVisible = calculate_totalTimeVisible(response)
    console.log("TOTAL TIME VISIBLE", totalTimeUsedVisible)
    //document.getElementById("total_time_used_row_1").innerHTML = totalTime
    // display time in hours, minutes, seconds (which ever one is applicable and only the largest one)
    timeString = millisecondsToTimeString(totalTimeUsedVisible)
    document.getElementById("total_time_used_row_1").innerHTML = timeString


    // top 10 websites used
    //TODO EDIT CODE TO HAVE HISTORY


    // top 4 time breakdown, the rest of the time goes to
    topTimeBreakdown(response)


    // row 3?


    // row 4
    // top websites
    topWebsites(response)
})

function calculate_totalTimeVisible(response) {
    let specificList = response.specificList
    let totalTimeVisible = 0
    for (let website in specificList) {
        for (let webpage in specificList[website]) {
            // console.log("ttv: ", specificList[website][webpage]["total_time_visible"])
            if (specificList[website][webpage]["total_time_visible"] === undefined || specificList[website][webpage]["total_time_visible"] <= -1) {
                continue
            }
            totalTimeVisible += specificList[website][webpage]["total_time_visible"]
        }
    }
    return totalTimeVisible
}

function millisecondsToTimeString(milliseconds) {
    let years = Math.floor(milliseconds / 31536000000)
    milliseconds -= years * 31536000000
    let months = Math.floor(milliseconds / 2592000000)
    milliseconds -= months * 2592000000
    let weeks = Math.floor(milliseconds / 604800000)
    milliseconds -= weeks * 604800000
    let days = Math.floor(milliseconds / 86400000)
    milliseconds -= days * 86400000
    let hours = Math.floor(milliseconds / 3600000)
    milliseconds -= hours * 3600000
    let minutes = Math.floor(milliseconds / 60000)
    milliseconds -= minutes * 60000
    let seconds = Math.floor(milliseconds / 1000)
    milliseconds -= seconds * 1000
    // does not display miliseconds right now

    let timeString = ""
    if (years > 0) {
        if (years === 1) {
            timeString += years + " year "
        } else {
            timeString += years + " years "
        }
    }
    if (months > 0) {
        if (months === 1) {
            timeString += months + " month "
        } else {
            timeString += months + " months "
        }
    }
    if (weeks > 0) {
        if (weeks === 1) {
            timeString += weeks + " week "
        } else {
            timeString += weeks + " weeks "
        }
    }
    if (days > 0) {
        if (days === 1) {
            timeString += days + " day "
        } else {
            timeString += days + " days "
        }
    }
    if (hours > 0) {
        if (hours === 1) {
            timeString += hours + " hour "
        } else {
            timeString += hours + " hours "
        }
    }
    if (minutes > 0) {
        if (minutes === 1) {
            timeString += minutes + " minute "
        } else {
            timeString += minutes + " minutes "
        }
    }
    if (seconds > 0) {
        if (seconds === 1) {
            timeString += seconds + " second "
        } else {
            timeString += seconds + " seconds "
        }
    }
    if (timeString === "") {
        timeString = "0 seconds"
    }

    return timeString
}

function topTimeBreakdown(response) {
    let sortedSpecificArray = response.sortedSpecificArray;

    let totalTimeUsed = 0
    let length = response.sortedSpecificArray.length
    for (let i = 0; i < sortedSpecificArray.length; i++) {
        if (sortedSpecificArray[i]["value"]["total_time_visible"] <= 0) {
            length = i
            console.log("b1", sortedSpecificArray[i]["value"]["total_time_visible"])
            break
        }
        totalTimeUsed += sortedSpecificArray[i]["value"]["total_time_visible"]
        if (i >= 3) {
            if (totalTimeUsed >= calculate_totalTimeVisible(response)) {
                console.log("timematch?")
                length = 4
            } else {
                length = 5
            }
            break
        }
    }

    console.log("LENGTH: ", length)

    let pieChart = document.getElementById("topTimesPieChart").getContext('2d');

    let topWebsiteUsed1 = pieChart.createLinearGradient(0, 0, 0, 300);
    topWebsiteUsed1.addColorStop(0, '#fc4a1a');
    topWebsiteUsed1.addColorStop(1, '#f7b733');

    let topWebsiteUsed2 = pieChart.createLinearGradient(0, 0, 0, 300);
    topWebsiteUsed2.addColorStop(0, '#008cff');
    topWebsiteUsed2.addColorStop(1, '#8e54e9');

    let topWebsiteUsed3 = pieChart.createLinearGradient(0, 0, 0, 300);
    topWebsiteUsed3.addColorStop(0, '#ee0979');
    topWebsiteUsed3.addColorStop(1, '#ff6a00');

    let topWebsiteUsed4 = pieChart.createLinearGradient(0, 0, 0, 300);
    topWebsiteUsed4.addColorStop(0, '#42e695');
    topWebsiteUsed4.addColorStop(1, '#3bb86d');

    let others = pieChart.createLinearGradient(0, 0, 0, 300);
    others.addColorStop(0, '#12a986');
    others.addColorStop(1, '#4dcaff');

    let colors = []
    let times = []
    let labels = []
    if (length < 5) {
        switch (length) {
            case 1:
                colors = [topWebsiteUsed1]
                times = [sortedSpecificArray[0]["value"]["total_time_visible"]]
                labels = [sortedSpecificArray[0]["key"]]
                break
            case 2:
                colors = [topWebsiteUsed1, topWebsiteUsed2]
                times = [sortedSpecificArray[0]["value"]["total_time_visible"], sortedSpecificArray[1]["value"]["total_time_visible"]]
                labels = [sortedSpecificArray[0]["key"], sortedSpecificArray[1]["key"]]
                break
            case 3:
                colors = [topWebsiteUsed1, topWebsiteUsed2, topWebsiteUsed3]
                times = [sortedSpecificArray[0]["value"]["total_time_visible"], sortedSpecificArray[1]["value"]["total_time_visible"], sortedSpecificArray[2]["value"]["total_time_visible"]]
                labels = [sortedSpecificArray[0]["key"], sortedSpecificArray[1]["key"], sortedSpecificArray[2]["key"]]
                break
            case 4:
                colors = [topWebsiteUsed1, topWebsiteUsed2, topWebsiteUsed3, topWebsiteUsed4]
                times = [sortedSpecificArray[0]["value"]["total_time_visible"], sortedSpecificArray[1]["value"]["total_time_visible"], sortedSpecificArray[2]["value"]["total_time_visible"], sortedSpecificArray[3]["value"]["total_time_visible"]]
                labels = [sortedSpecificArray[0]["key"], sortedSpecificArray[1]["key"], sortedSpecificArray[2]["key"], sortedSpecificArray[3]["key"]]
                break
        }
    } else {
        colors = [topWebsiteUsed1, topWebsiteUsed2, topWebsiteUsed3, topWebsiteUsed4, others]
        times = [sortedSpecificArray[0]["value"]["total_time_visible"], sortedSpecificArray[1]["value"]["total_time_visible"], sortedSpecificArray[2]["value"]["total_time_visible"], sortedSpecificArray[3]["value"]["total_time_visible"], calculate_totalTimeVisible(response) - totalTimeUsed]
        labels = [sortedSpecificArray[0]["key"], sortedSpecificArray[1]["key"], sortedSpecificArray[2]["key"], sortedSpecificArray[3]["key"], "Others"]
    }

    console.log("Colors: ", colors)
    console.log("Times: ", times)

    new Chart(pieChart, {
        type: 'doughnut', data: {
            labels: labels, datasets: [{
                backgroundColor: colors, hoverBackgroundColor: colors, data: times, borderWidth: [1, 1, 1, 1, 1]
            }]
        }, options: {
            maintainAspectRatio: false, cutout: 100, plugins: {
                legend: {
                    display: false,
                }, tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.label || ''

                            if (label) {
                                label += ': '
                            }
                            console.log("CONTEXT:", context)
                            if (context.parsed !== null) {
                                // console.log(context.parsed.y)
                                label += millisecondsToTimeString(context.parsed)
                            }
                            return label
                        }
                    }
                }
            }

        }
    });

    // update legend
    let legend = document.getElementById("topTimesBreakdownLegend")


    for (let i = 0; i < length; i++) {
        let li = document.createElement("li")
        li.className = "list-group-item d-flex bg-transparent justify-content-between align-items-center"
        if (i === 0) {
            li.className += " border-top"
        }

        let pill_class
        switch (i) {
            case 0:
                pill_class = "bg-warning text-dark"
                break
            case 1:
                pill_class = "bg-primary"
                break
            case 2:
                pill_class = "bg-danger"
                break
            case 3:
                pill_class = "bg-success"
                break
            case 4:
                pill_class = "bg-info"
                break
            case 5:
                pill_class = "bg-secondary"
        }
        li.innerHTML = labels[i] + " <span class=\"badge " + pill_class + " rounded-pill\">" + millisecondsToTimeString(times[i]) + "</span>"
        legend.appendChild(li)
    }
}

function topWebsites(response) {

}

/*EXAMPLE DATA
{
    "tabList": [
        {
            "active": false,
            "audible": false,
            "document_id": "0A32D42F9EC43BA8DD8BE87AFEFE2304",
            "last_update_time": 1689816408911,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238957
                },
                {
                    "state": "loaded",
                    "time": 1689816387481
                },
                {
                    "state": "loaded",
                    "time": 1689816388474
                },
                {
                    "state": "loaded",
                    "time": 1689816408911
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://codeforces.com",
            "title": "Status - Codeforces Round 884 (Div. 1 + Div. 2) - Codeforces",
            "update_time": [
                {
                    "time": 1689816238957,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387481,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388474,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408911
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731266
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791301
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851274
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911267
                }
            ],
            "url": "https://codeforces.com/contest/1844/my",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "90BF30CB3B59A8D5DEFC0AAECADA5166",
            "last_update_time": 1689816408912,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238958
                },
                {
                    "state": "loaded",
                    "time": 1689816387482
                },
                {
                    "state": "loaded",
                    "time": 1689816388475
                },
                {
                    "state": "loaded",
                    "time": 1689816408912
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://codeforces.com",
            "title": "Codeforces",
            "update_time": [
                {
                    "time": 1689816238958,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359272,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387482,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388475,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408912
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791307
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851288
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911291
                }
            ],
            "url": "https://codeforces.com/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "111B44741771121BE75C9B606CAF1D82",
            "last_update_time": 1689816408911,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238959
                },
                {
                    "state": "loaded",
                    "time": 1689816387482
                },
                {
                    "state": "loaded",
                    "time": 1689816388474
                },
                {
                    "state": "loaded",
                    "time": 1689816408911
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://codeforces.com",
            "title": "[Tutorial] A way to Practice Competitive Programming : From Rating 1000 to 2400+ - Codeforces",
            "update_time": [
                {
                    "time": 1689816238959,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387482,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388474,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408911
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731281
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791291
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851285
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911292
                }
            ],
            "url": "https://codeforces.com/blog/entry/66909",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "A1A4A3E023A3AAF111B744D9DB7D32A4",
            "last_update_time": 1689816408911,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238959
                },
                {
                    "state": "loaded",
                    "time": 1689816387481
                },
                {
                    "state": "loaded",
                    "time": 1689816388127
                },
                {
                    "state": "loaded",
                    "time": 1689816388474
                },
                {
                    "state": "loaded",
                    "time": 1689816408911
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://codeforces.com",
            "title": "Status - Codeforces Round 884 (Div. 1 + Div. 2) - Codeforces",
            "update_time": [
                {
                    "time": 1689816238959,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387481,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388127,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388474,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408911
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731281
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851283
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911267
                }
            ],
            "url": "https://codeforces.com/contest/1844/my",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "BDF3B5595903D7308758F02ED4CD8E22",
            "last_update_time": 1689816408912,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238959
                },
                {
                    "state": "loaded",
                    "time": 1689816387482
                },
                {
                    "state": "loaded",
                    "time": 1689816388475
                },
                {
                    "state": "loaded",
                    "time": 1689816408912
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://codeforces.com",
            "title": "Codeforces",
            "update_time": [
                {
                    "time": 1689816238959,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387482,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388475,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408912
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731268
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791289
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851274
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911289
                }
            ],
            "url": "https://codeforces.com/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "51856ADAFC9E5D65D318942108B6069C",
            "last_update_time": 1689816408914,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238959
                },
                {
                    "state": "loaded",
                    "time": 1689816387483
                },
                {
                    "state": "loaded",
                    "time": 1689816388475
                },
                {
                    "state": "loaded",
                    "time": 1689816408914
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://codeforces.com",
            "title": "A bit more of general ideas - Codeforces",
            "update_time": [
                {
                    "time": 1689816238959,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387483,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388475,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408914
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911268
                }
            ],
            "url": "https://codeforces.com/blog/entry/104466",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "B989B3911D23BBE2FD7A26F2D90CA310",
            "last_update_time": 1689816408911,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238959
                },
                {
                    "state": "loaded",
                    "time": 1689816387483
                },
                {
                    "state": "loaded",
                    "time": 1689816388475
                },
                {
                    "state": "loaded",
                    "time": 1689816408911
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://codeforces.com",
            "title": "The Ultimate Topic List (with Resources, Problems and Templates) - Codeforces",
            "update_time": [
                {
                    "time": 1689816238959,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299267,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387483,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388475,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408911
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791300
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851288
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911268
                }
            ],
            "url": "https://codeforces.com/blog/entry/95106",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "C42E04D07EE74B2E5BD1B48A96082415",
            "last_update_time": 1689816408912,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238959
                },
                {
                    "state": "loaded",
                    "time": 1689816387483
                },
                {
                    "state": "loaded",
                    "time": 1689816388475
                },
                {
                    "state": "loaded",
                    "time": 1689816408912
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://codeforces.com",
            "title": "General ideas - Codeforces",
            "update_time": [
                {
                    "time": 1689816238959,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387483,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388475,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408912
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731281
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791301
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911284
                }
            ],
            "url": "https://codeforces.com/blog/entry/48417",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "849877AF03B29CE008C662F7C5886EB6",
            "last_update_time": 1689816408912,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238959
                },
                {
                    "state": "loaded",
                    "time": 1689816387483
                },
                {
                    "state": "loaded",
                    "time": 1689816388475
                },
                {
                    "state": "loaded",
                    "time": 1689816408912
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://codeforces.com",
            "title": "[Tutorial] Collection of little techniques - Codeforces",
            "update_time": [
                {
                    "time": 1689816238959,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299267,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387483,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388475,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408912
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731281
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791301
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851277
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911268
                }
            ],
            "url": "https://codeforces.com/blog/entry/100910",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "D123D4ADED992016EBD6C592F60CA79D",
            "last_update_time": 1689816408914,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238964
                },
                {
                    "state": "loaded",
                    "time": 1689816387488
                },
                {
                    "state": "loaded",
                    "time": 1689816388479
                },
                {
                    "state": "loaded",
                    "time": 1689816408914
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "I Bought a \"BROKEN\" Graphics Card on eBay... Can I Fix it?!? - YouTube",
            "update_time": [
                {
                    "time": 1689816238964,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387488,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388479,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408914
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731309
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791302
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851294
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911298
                }
            ],
            "url": "https://www.youtube.com/watch?v=rTN749kONJI",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "094A50F81CAE47A069DD0240A1FA1270",
            "last_update_time": 1689816408921,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238965
                },
                {
                    "state": "loaded",
                    "time": 1689816387490
                },
                {
                    "state": "loaded",
                    "time": 1689816388480
                },
                {
                    "state": "loaded",
                    "time": 1689816408921
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.allrecipes.com",
            "title": "Allrecipes | Recipes, How-Tos, Videos and More",
            "update_time": [
                {
                    "time": 1689816238965,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299267,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387490,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388480,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408921
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731269
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791302
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911270
                }
            ],
            "url": "https://www.allrecipes.com/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "993D9302BBCC5EB714E2F2F9619B44EB",
            "last_update_time": 1689816408914,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238965
                },
                {
                    "state": "loaded",
                    "time": 1689816387493
                },
                {
                    "state": "loaded",
                    "time": 1689816388479
                },
                {
                    "state": "loaded",
                    "time": 1689816408914
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://designcode.io",
            "title": "Alignment, Distribution, & Tidy up Properties - Figma Handbook - Design+Code",
            "update_time": [
                {
                    "time": 1689816238965,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387493,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388479,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408914
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589277
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731274
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791281
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911278
                }
            ],
            "url": "https://designcode.io/figma-handbook-alignment-properties",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "8856923DB49ADE4FCA27D985A3B80DE5",
            "last_update_time": 1689816408916,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238966
                },
                {
                    "state": "loaded",
                    "time": 1689816387496
                },
                {
                    "state": "loaded",
                    "time": 1689816388482
                },
                {
                    "state": "loaded",
                    "time": 1689816408916
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.termius.com",
            "title": "Free SSH client for Windows",
            "update_time": [
                {
                    "time": 1689816238966,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387496,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388482,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408916
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731283
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791280
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851296
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911269
                }
            ],
            "url": "https://www.termius.com/free-ssh-client-for-windows",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "9ABA2EE62EB762427EAD29FCB5EED5AC",
            "last_update_time": 1689816408916,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238966
                },
                {
                    "state": "loaded",
                    "time": 1689816387491
                },
                {
                    "state": "loaded",
                    "time": 1689816388480
                },
                {
                    "state": "loaded",
                    "time": 1689816408916
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://chat.openai.com",
            "title": "Parentheses in Python Print",
            "update_time": [
                {
                    "time": 1689816238966,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359275,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387491,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388480,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408916
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791305
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851292
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911291
                }
            ],
            "url": "https://chat.openai.com/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "4C8A154302BE77F8B873F255ECF0FCC4",
            "last_update_time": 1689816408917,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238967
                },
                {
                    "state": "loaded",
                    "time": 1689816387495
                },
                {
                    "state": "loaded",
                    "time": 1689816388491
                },
                {
                    "state": "loaded",
                    "time": 1689816408917
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "Academia is BROKEN! - Harvard Fake Data Scandal Explained - YouTube",
            "update_time": [
                {
                    "time": 1689816238967,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387495,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388491,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408917
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731309
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791302
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851294
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911298
                }
            ],
            "url": "https://www.youtube.com/watch?v=d2Tm3Yx4HWI",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "EF7BC24613C42F174E9771EEEC8F8021",
            "last_update_time": 1689816408917,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238967
                },
                {
                    "state": "loaded",
                    "time": 1689816387495
                },
                {
                    "state": "loaded",
                    "time": 1689816388482
                },
                {
                    "state": "loaded",
                    "time": 1689816408917
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://docs.google.com",
            "title": "Todo list - Google Docs",
            "update_time": [
                {
                    "time": 1689816238967,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387495,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388482,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408917
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791303
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911282
                }
            ],
            "url": "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "F342CE15DB13BAE5448AB02B14020525",
            "last_update_time": 1689816408916,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238968
                },
                {
                    "state": "loaded",
                    "time": 1689816387497
                },
                {
                    "state": "loaded",
                    "time": 1689816388489
                },
                {
                    "state": "loaded",
                    "time": 1689816408916
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "MEGA FARM from 0$ on FLAT MAP with @FarmingGenius 👉 #1 - YouTube",
            "update_time": [
                {
                    "time": 1689816238968,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387497,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388489,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408916
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589285
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731291
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791295
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911286
                }
            ],
            "url": "https://www.youtube.com/watch?v=5RC9cKkQYGA",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "E3F33E1F3307CD50EFE80F8D1D9FE078",
            "last_update_time": 1689816408915,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238968
                },
                {
                    "state": "loaded",
                    "time": 1689816387495
                },
                {
                    "state": "loaded",
                    "time": 1689816388489
                },
                {
                    "state": "loaded",
                    "time": 1689816408915
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "Abusing the Banking System to get rich on a Pay-to-win Server! - Complex Gaming - YouTube",
            "update_time": [
                {
                    "time": 1689816238968,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299267,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387495,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388489,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408915
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731283
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791283
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851291
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911271
                }
            ],
            "url": "https://www.youtube.com/watch?v=g3X1QXXDXjw",
            "visibility": "hidden"
        },
        {
            "active": true,
            "audible": false,
            "document_id": "F5385D6793A46323DF1E39C3C07B1BA7",
            "last_update_time": 1689816408924,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238968
                },
                {
                    "state": "loaded",
                    "time": 1689816387499
                },
                {
                    "state": "loaded",
                    "time": 1689816388493
                },
                {
                    "state": "loaded",
                    "time": 1689816408924
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://developer.mozilla.org",
            "title": "Array.prototype.forEach() - JavaScript | MDN",
            "update_time": [
                {
                    "time": 1689816238968,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816238968,
                    "visibility": "visible"
                },
                {
                    "time": 1689816240696,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816311194,
                    "visibility": "visible"
                },
                {
                    "time": 1689816313017,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816385208,
                    "visibility": "visible"
                },
                {
                    "time": 1689816386066,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387499,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388493,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408924
                },
                {
                    "visibility": "visible",
                    "time": 1689816419701
                },
                {
                    "visibility": "hidden",
                    "time": 1689816421015
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "visible",
                    "time": 1689816715884
                },
                {
                    "visibility": "visible",
                    "time": 1689816715886
                },
                {
                    "visibility": "hidden",
                    "time": 1689816716621
                },
                {
                    "visibility": "visible",
                    "time": 1689816735134
                },
                {
                    "visibility": "hidden",
                    "time": 1689816736394
                },
                {
                    "visibility": "visible",
                    "time": 1689816736479
                },
                {
                    "visibility": "hidden",
                    "time": 1689816741327
                },
                {
                    "visibility": "visible",
                    "time": 1689816750453
                },
                {
                    "visibility": "hidden",
                    "time": 1689816751171
                },
                {
                    "visibility": "visible",
                    "time": 1689816751869
                },
                {
                    "visibility": "hidden",
                    "time": 1689816754021
                },
                {
                    "visibility": "hidden",
                    "time": 1689816769280
                },
                {
                    "visibility": "visible",
                    "time": 1689816777046
                },
                {
                    "visibility": "hidden",
                    "time": 1689816778295
                },
                {
                    "visibility": "hidden",
                    "time": 1689816829273
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911285
                }
            ],
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "E1A3EACFC96BF4BA9094EB78CE647DEA",
            "last_update_time": 1689816408916,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238968
                },
                {
                    "state": "loaded",
                    "time": 1689816387496
                },
                {
                    "state": "loaded",
                    "time": 1689816388489
                },
                {
                    "state": "loaded",
                    "time": 1689816408916
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) The Race to Save Texas’ Failed Megabridge - YouTube",
            "update_time": [
                {
                    "time": 1689816238968,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387496,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388489,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408916
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791293
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851287
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911287
                }
            ],
            "url": "https://www.youtube.com/watch?v=j9ODgfIaxc4",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "71E9BD71B652FD77542A58904EEDB608",
            "last_update_time": 1689816408919,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238969
                },
                {
                    "state": "loaded",
                    "time": 1689816387498
                },
                {
                    "state": "loaded",
                    "time": 1689816388496
                },
                {
                    "state": "loaded",
                    "time": 1689816408919
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "Can Chess, with Hexagons? - YouTube",
            "update_time": [
                {
                    "time": 1689816238969,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387498,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388496,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408919
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731309
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791302
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851294
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911298
                }
            ],
            "url": "https://www.youtube.com/watch?v=bgR3yESAEVE",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "A1E04D94E6F0BC379AC88006E5BEDCC6",
            "last_update_time": 1689816408916,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238969
                },
                {
                    "state": "loaded",
                    "time": 1689816387497
                },
                {
                    "state": "loaded",
                    "time": 1689816388489
                },
                {
                    "state": "loaded",
                    "time": 1689816408916
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) YouTube",
            "update_time": [
                {
                    "time": 1689816238969,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387497,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388489,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408916
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731269
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791302
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851289
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911292
                }
            ],
            "url": "https://www.youtube.com/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "1D6BCF997CBAF6821E0DA27970DA1226",
            "last_update_time": 1689816408918,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238969
                },
                {
                    "state": "loaded",
                    "time": 1689816387498
                },
                {
                    "state": "loaded",
                    "time": 1689816388489
                },
                {
                    "state": "loaded",
                    "time": 1689816408918
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "My 10 YEAR Indie Game Development Journey - YouTube",
            "update_time": [
                {
                    "time": 1689816238969,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387498,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388489,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408918
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791293
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911276
                }
            ],
            "url": "https://www.youtube.com/watch?v=FStOT4pP2tc",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "139AE7B11EB96D7E559D9949FFA51A23",
            "last_update_time": 1689816408919,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238969
                },
                {
                    "state": "loaded",
                    "time": 1689816387499
                },
                {
                    "state": "loaded",
                    "time": 1689816388491
                },
                {
                    "state": "loaded",
                    "time": 1689816408919
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) Weak Perfect Graph Theorem - YouTube",
            "update_time": [
                {
                    "time": 1689816238969,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387499,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388491,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408919
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589285
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731291
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791295
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911286
                }
            ],
            "url": "https://www.youtube.com/watch?v=Koc63QhxPgk",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "7C64A80D1042F7158A45E9715DE0DAFD",
            "last_update_time": 1689816408918,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238970
                },
                {
                    "state": "loaded",
                    "time": 1689816387498
                },
                {
                    "state": "loaded",
                    "time": 1689816388491
                },
                {
                    "state": "loaded",
                    "time": 1689816408918
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) Sergio Perez Storms Through The Field In Austria! | 2023 Austrian Grand Prix - YouTube",
            "update_time": [
                {
                    "time": 1689816238970,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387498,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388491,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408918
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791293
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851287
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911287
                }
            ],
            "url": "https://www.youtube.com/watch?v=F3TMRCO8eyQ",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "060B6F699C27EAF77EEDCA0968366483",
            "last_update_time": 1689816408919,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238970
                },
                {
                    "state": "loaded",
                    "time": 1689816387498
                },
                {
                    "state": "loaded",
                    "time": 1689816388493
                },
                {
                    "state": "loaded",
                    "time": 1689816408919
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) BRAKE CHECKED BY AI! AI R&D FINALLY CATCHING UP! WE'VE GOT WORK TO DO - F1 23 MY TEAM CAREER Part 17 - YouTube",
            "update_time": [
                {
                    "time": 1689816238970,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387498,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388493,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408919
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731292
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791292
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851300
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911287
                }
            ],
            "url": "https://www.youtube.com/watch?v=QeVJOUFZV3U&list=PL-cVSmXe-NPgNO-cyZ_mie7e2c4Ley20q&index=17",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "C54D30499092A4DE14F5A8928B187CD4",
            "last_update_time": 1689816408920,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238969
                },
                {
                    "state": "loaded",
                    "time": 1689816387501
                },
                {
                    "state": "loaded",
                    "time": 1689816388500
                },
                {
                    "state": "loaded",
                    "time": 1689816408920
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.newegg.ca",
            "title": "6700xt | Newegg.ca",
            "update_time": [
                {
                    "time": 1689816238969,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387501,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388500,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408920
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791307
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911285
                }
            ],
            "url": "https://www.newegg.ca/p/pl?d=6700xt&Order=1",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "63A74EA4CD637C651A9B9EA9228C3C81",
            "last_update_time": 1689816408921,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238969
                },
                {
                    "state": "loaded",
                    "time": 1689816387504
                },
                {
                    "state": "loaded",
                    "time": 1689816388503
                },
                {
                    "state": "loaded",
                    "time": 1689816408921
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.google.com",
            "title": "f1 - Google Search",
            "update_time": [
                {
                    "time": 1689816238969,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387504,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388503,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408921
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731274
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791300
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851288
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911300
                }
            ],
            "url": "https://www.google.com/search?q=f1&rlz=1C1ONGR_enCA1063CA1064&oq=f1&aqs=chrome.0.0i271j46i433i512j69i59j0i433i512j0i131i433i512j69i60j69i61l2.463j0j4&sourceid=chrome&ie=UTF-8",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "D1FFA8731C2F2DD77034799E6A1A354B",
            "last_update_time": 1689816408918,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238970
                },
                {
                    "state": "loaded",
                    "time": 1689816387500
                },
                {
                    "state": "loaded",
                    "time": 1689816388494
                },
                {
                    "state": "loaded",
                    "time": 1689816408918
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.google.ca",
            "title": "Google",
            "update_time": [
                {
                    "time": 1689816238970,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387500,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388494,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408918
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791312
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851291
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911285
                }
            ],
            "url": "https://www.google.ca/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "4E3FDA02AFC2E5AD79AD88E8E30BEDD9",
            "last_update_time": 1689816408918,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238970
                },
                {
                    "state": "loaded",
                    "time": 1689816387503
                },
                {
                    "state": "loaded",
                    "time": 1689816388499
                },
                {
                    "state": "loaded",
                    "time": 1689816408918
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) How Do Games Render So Much Grass? - YouTube",
            "update_time": [
                {
                    "time": 1689816238970,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387503,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388499,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408918
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731293
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791318
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911282
                }
            ],
            "url": "https://www.youtube.com/watch?v=Y0Ko0kvwfgA",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "5E53CC309226F8F4CFEBF15B2D7BF4CD",
            "last_update_time": 1689816408921,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238971
                },
                {
                    "state": "loaded",
                    "time": 1689816387501
                },
                {
                    "state": "loaded",
                    "time": 1689816388493
                },
                {
                    "state": "loaded",
                    "time": 1689816408921
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) AMD RX 7700 & 7800 Benchmark, Nvidia RTX 4060 Ti 16GB Review, Intel i9-14900KS | Broken Silicon 214 - YouTube",
            "update_time": [
                {
                    "time": 1689816238971,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387501,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388493,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408921
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589285
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731291
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791295
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911286
                }
            ],
            "url": "https://www.youtube.com/watch?v=i7jOxAarbo4",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "B3BFA21956CDC6CEAF48A71CAC5D348A",
            "last_update_time": 1689816408924,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238971
                },
                {
                    "state": "loaded",
                    "time": 1689816387505
                },
                {
                    "state": "loaded",
                    "time": 1689816388503
                },
                {
                    "state": "loaded",
                    "time": 1689816408924
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://developer.chrome.com",
            "title": "chrome.runtime - Chrome Developers",
            "update_time": [
                {
                    "time": 1689816238971,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359275,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387505,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388503,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408924
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791297
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911267
                }
            ],
            "url": "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "8B739EFE3E45FF4C3428C04CE837FB6A",
            "last_update_time": 1689816408920,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238971
                },
                {
                    "state": "loaded",
                    "time": 1689816387500
                },
                {
                    "state": "loaded",
                    "time": 1689816388491
                },
                {
                    "state": "loaded",
                    "time": 1689816408920
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) I Think 'F1 World' In The F1 23 Game Is A Flop... - YouTube",
            "update_time": [
                {
                    "time": 1689816238971,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387500,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388491,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408920
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791293
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911276
                }
            ],
            "url": "https://www.youtube.com/watch?v=HRcI7RSm9_o",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "88BA9A4159B22814E2FECF9E6153E9FA",
            "last_update_time": 1689816408920,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238972
                },
                {
                    "state": "loaded",
                    "time": 1689816387500
                },
                {
                    "state": "loaded",
                    "time": 1689816388494
                },
                {
                    "state": "loaded",
                    "time": 1689816408920
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) Download These Handy Tools NOW! - YouTube",
            "update_time": [
                {
                    "time": 1689816238972,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387500,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388494,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408920
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791294
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851287
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911287
                }
            ],
            "url": "https://www.youtube.com/watch?v=0EtgwIajVqs",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "38C465DAD91572A832131051AF104198",
            "last_update_time": 1689816408922,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238972
                },
                {
                    "state": "loaded",
                    "time": 1689816387505
                },
                {
                    "state": "loaded",
                    "time": 1689816388501
                },
                {
                    "state": "loaded",
                    "time": 1689816408922
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) Minecrafts Strangest EXPLOIT - Block Transmutation... - YouTube",
            "update_time": [
                {
                    "time": 1689816238972,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387505,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388501,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408922
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731293
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791318
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911282
                }
            ],
            "url": "https://www.youtube.com/watch?v=MF-KR6A3KyM",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "2B45729E5316AE83DEC8854FFEE248E0",
            "last_update_time": 1689816408922,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238972
                },
                {
                    "state": "loaded",
                    "time": 1689816387500
                },
                {
                    "state": "loaded",
                    "time": 1689816388495
                },
                {
                    "state": "loaded",
                    "time": 1689816408922
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) EXTENDED Race Highlights I 2023 6 Hours of Monza I FIA WEC - YouTube",
            "update_time": [
                {
                    "time": 1689816238972,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387500,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388495,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408922
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731292
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791292
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851300
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911287
                }
            ],
            "url": "https://www.youtube.com/watch?v=LUjR54Hf_dc",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "2BB57CDCBD172D30CCE673F622AEFD9F",
            "last_update_time": 1689816408927,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238973
                },
                {
                    "state": "loaded",
                    "time": 1689816387504
                },
                {
                    "state": "loaded",
                    "time": 1689816388509
                },
                {
                    "state": "loaded",
                    "time": 1689816408927
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.instagram.com",
            "title": "Instagram • Chats",
            "update_time": [
                {
                    "time": 1689816238973,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359272,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387504,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388509,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408927
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731285
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791288
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911274
                }
            ],
            "url": "https://www.instagram.com/direct/t/17843476547117960/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "6280886BD3FB7D78D20744AD35CCD768",
            "last_update_time": 1689816408924,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238973
                },
                {
                    "state": "loaded",
                    "time": 1689816387503
                },
                {
                    "state": "loaded",
                    "time": 1689816388495
                },
                {
                    "state": "loaded",
                    "time": 1689816408924
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) What could Russia learn from a captured Leopard 2 tank? - YouTube",
            "update_time": [
                {
                    "time": 1689816238973,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387503,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388495,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408924
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589285
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731291
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791295
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911286
                }
            ],
            "url": "https://www.youtube.com/watch?v=FLRnk01ffE8",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "BB5F6172FB7785C45DF3BB6F66BED0E1",
            "last_update_time": 1689816408923,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238973
                },
                {
                    "state": "loaded",
                    "time": 1689816387514
                },
                {
                    "state": "loaded",
                    "time": 1689816388493
                },
                {
                    "state": "loaded",
                    "time": 1689816408923
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) Can I get Top 100 on Every Map in the Summer Campaign? - YouTube",
            "update_time": [
                {
                    "time": 1689816238973,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387514,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388493,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408923
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791294
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911276
                }
            ],
            "url": "https://www.youtube.com/watch?v=X29vxhlZIzE",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "F22BDF1FF4E0408E39C26990E20CC63F",
            "last_update_time": 1689816408928,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238974
                },
                {
                    "state": "loaded",
                    "time": 1689816387505
                },
                {
                    "state": "loaded",
                    "time": 1689816388504
                },
                {
                    "state": "loaded",
                    "time": 1689816408928
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.amygoodchild.com",
            "title": "Early Computer Art in the 50’s & 60’s — Amy Goodchild",
            "update_time": [
                {
                    "time": 1689816238974,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359275,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387505,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388504,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408928
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731266
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791299
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911267
                }
            ],
            "url": "https://www.amygoodchild.com/blog/computer-art-50s-and-60s?utm_source=ayjay&utm_medium=email&utm_campaign=art-out-of-time",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "E898819DB3732099DA7B259905D2E134",
            "last_update_time": 1689816408923,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238974
                },
                {
                    "state": "loaded",
                    "time": 1689816387502
                },
                {
                    "state": "loaded",
                    "time": 1689816388496
                },
                {
                    "state": "loaded",
                    "time": 1689816408923
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) How This Tiny Truck Took Down an Army - YouTube",
            "update_time": [
                {
                    "time": 1689816238974,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387502,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388496,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408923
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791294
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851287
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911287
                }
            ],
            "url": "https://www.youtube.com/watch?v=UTEAvb-tikU",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "EE7FCC4D7BB9BD397C78AD7AC65C7F53",
            "last_update_time": 1689816408917,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238974
                },
                {
                    "state": "loaded",
                    "time": 1689816387497
                },
                {
                    "state": "loaded",
                    "time": 1689816388490
                },
                {
                    "state": "loaded",
                    "time": 1689816408917
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "Epic 211-shot badminton rally delights fans in Malaysia - YouTube",
            "update_time": [
                {
                    "time": 1689816238974,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387497,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388490,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408917
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791319
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851303
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911285
                }
            ],
            "url": "https://www.youtube.com/watch?v=tk9guzivxiU",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "CB48207A46CF0D9C4A1E88A8BF207618",
            "last_update_time": 1689816408924,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238974
                },
                {
                    "state": "loaded",
                    "time": 1689816387507
                },
                {
                    "state": "loaded",
                    "time": 1689816388504
                },
                {
                    "state": "loaded",
                    "time": 1689816408924
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "So how DO you build a safe submersible? - DSV Alvin - YouTube",
            "update_time": [
                {
                    "time": 1689816238974,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387507,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388504,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408924
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731293
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791318
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911283
                }
            ],
            "url": "https://www.youtube.com/watch?v=x2ulsZ6aGXY",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "61C5FD9EE7290F18CFC752369E7D98DB",
            "last_update_time": 1689816408931,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238974
                },
                {
                    "state": "loaded",
                    "time": 1689816387506
                },
                {
                    "state": "loaded",
                    "time": 1689816388502
                },
                {
                    "state": "loaded",
                    "time": 1689816408931
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://login.microsoftonline.com",
            "title": "Sign in to your account",
            "update_time": [
                {
                    "time": 1689816238974,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387506,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388502,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408931
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731266
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791299
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911268
                }
            ],
            "url": "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DOEEN_8FpuH_qcIz6Ba3QN-s_mLP5JDageqzo2LrEM3mxWBgGgsz7vph3tcYUj6wnv9FWRhevGot91sFtvHgcBnB1P5-2V4m2QM9LsHT-Cm4svDK4Huyv6onkV38e5iOiEwqf_E86vuNTOZulAJEGfw&response_mode=form_post&nonce=638245343261842304.NTlmYzY0NjctODczYS00OTkzLWE5ZTUtNjVkNjY1Y2QxNWUwNDAyMDczYjktZmQyZi00NjAwLThkNmMtYmExMjUzMGZlYmJh&redirect_uri=https%3A%2F%2Fportal.office.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=c3df525c-1647-474e-aca8-dbf1fd068666&x-client-SKU=ID_NET472&x-client-ver=6.30.1.0&sso_reload=true",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "4B85D4BEC83EFA8C580DE7432BF30460",
            "last_update_time": 1689816408924,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238974
                },
                {
                    "state": "loaded",
                    "time": 1689816387502
                },
                {
                    "state": "loaded",
                    "time": 1689816388497
                },
                {
                    "state": "loaded",
                    "time": 1689816408924
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) How 23 Foods Get To The Grocery Store | Big Business | Insider Business - YouTube",
            "update_time": [
                {
                    "time": 1689816238974,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387502,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388497,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408924
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731292
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791292
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851300
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911287
                }
            ],
            "url": "https://www.youtube.com/watch?v=4ArVvrhhnyI",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "5693FC7BC33D9973F7195B8C92BD8919",
            "last_update_time": 1689816408933,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238974
                },
                {
                    "state": "loaded",
                    "time": 1689816387507
                },
                {
                    "state": "loaded",
                    "time": 1689816388511
                },
                {
                    "state": "loaded",
                    "time": 1689816408933
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.google.com",
            "title": "website wireframe examples - Google Search",
            "update_time": [
                {
                    "time": 1689816238974,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299267,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387507,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388511,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408933
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731277
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791299
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911291
                }
            ],
            "url": "https://www.google.com/search?rlz=1C1ONGR_enCA1063CA1064&q=website+wireframe+examples&tbm=isch&sa=X&ved=2ahUKEwiNw7Kp5YKAAxWmjYkEHdRpBuIQ0pQJegQIDBAB&biw=2560&bih=1232&dpr=1.5#imgrc=jB4157cyh8aIDM",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "7D81830D8BC2003566A5B493105DB9F5",
            "last_update_time": 1689816408932,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238975
                },
                {
                    "state": "loaded",
                    "time": 1689816387505
                },
                {
                    "state": "loaded",
                    "time": 1689816388505
                },
                {
                    "state": "loaded",
                    "time": 1689816408932
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://craftinginterpreters.com",
            "title": "Representing Code · Crafting Interpreters",
            "update_time": [
                {
                    "time": 1689816238975,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387505,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388505,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408932
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791292
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851294
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911292
                }
            ],
            "url": "https://craftinginterpreters.com/representing-code.html",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "82DA4C9644C3D1BC9C9FB1806AFAAC0C",
            "last_update_time": 1689816408931,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238976
                },
                {
                    "state": "loaded",
                    "time": 1689816387507
                },
                {
                    "state": "loaded",
                    "time": 1689816388506
                },
                {
                    "state": "loaded",
                    "time": 1689816408931
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://s3.amazonaws.com",
            "title": "wireframes-martyna.png (1920×2622)",
            "update_time": [
                {
                    "time": 1689816238976,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387507,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388506,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408931
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731268
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791289
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911293
                }
            ],
            "url": "https://s3.amazonaws.com/www-inside-design/uploads/2017/11/wireframes-martyna.png",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "7A4E3C0DCACB48C5EFBD7B0105481022",
            "last_update_time": 1689816408927,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238976
                },
                {
                    "state": "loaded",
                    "time": 1689816387511
                },
                {
                    "state": "loaded",
                    "time": 1689816388505
                },
                {
                    "state": "loaded",
                    "time": 1689816408927
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) Building A Budget NAS with TrueNAS Scale - YouTube",
            "update_time": [
                {
                    "time": 1689816238976,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387511,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388505,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408927
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731293
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791318
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911283
                }
            ],
            "url": "https://www.youtube.com/watch?v=iSpL9LnczVQ",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "B11B1D960211780392A3D68721B25FE7",
            "last_update_time": 1689816408918,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238976
                },
                {
                    "state": "loaded",
                    "time": 1689816387499
                },
                {
                    "state": "loaded",
                    "time": 1689816388492
                },
                {
                    "state": "loaded",
                    "time": 1689816408918
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) Saving the cheapest PC on eBay - YouTube",
            "update_time": [
                {
                    "time": 1689816238976,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387499,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388492,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408918
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791319
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851303
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911285
                }
            ],
            "url": "https://www.youtube.com/watch?v=HFDTAqUhH2o",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "1A29537F38E5D50B6CABFECEFC554805",
            "last_update_time": 1689816408921,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238978
                },
                {
                    "state": "loaded",
                    "time": 1689816387501
                },
                {
                    "state": "loaded",
                    "time": 1689816388494
                },
                {
                    "state": "loaded",
                    "time": 1689816408921
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) Renovating a canoe while running a marathon - YouTube",
            "update_time": [
                {
                    "time": 1689816238978,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387501,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388494,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408921
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791319
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851303
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911285
                }
            ],
            "url": "https://www.youtube.com/watch?v=o8YgqN9cG84",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "D86B00CC49B177CE66B396DC3426986A",
            "last_update_time": 1689816408923,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238979
                },
                {
                    "state": "loaded",
                    "time": 1689816387503
                },
                {
                    "state": "loaded",
                    "time": 1689816388496
                },
                {
                    "state": "loaded",
                    "time": 1689816408923
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) YouTube",
            "update_time": [
                {
                    "time": 1689816238979,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387503,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388496,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408923
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791319
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851303
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911285
                }
            ],
            "url": "https://www.youtube.com/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "7F3EAE7AE2CD3999B84C6953E9149B20",
            "last_update_time": 1689816408925,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238981
                },
                {
                    "state": "loaded",
                    "time": 1689816387505
                },
                {
                    "state": "loaded",
                    "time": 1689816388498
                },
                {
                    "state": "loaded",
                    "time": 1689816408925
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) BEST GPUs to Buy Right Now... Nvidia Prices Plummet! - YouTube",
            "update_time": [
                {
                    "time": 1689816238981,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387505,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388498,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408925
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791319
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851303
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911285
                }
            ],
            "url": "https://www.youtube.com/watch?v=eYceyv7a4tA",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "BF9F9429788AA196A63319B5B490C1F0",
            "last_update_time": 1689816408934,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238984
                },
                {
                    "state": "loaded",
                    "time": 1689816387509
                },
                {
                    "state": "loaded",
                    "time": 1689816388529
                },
                {
                    "state": "loaded",
                    "time": 1689816408934
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://docs.oracle.com",
            "title": "The switch Statement (The Java™ Tutorials > Learning the Java Language > Language Basics)",
            "update_time": [
                {
                    "time": 1689816238984,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299267,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387509,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388529,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408934
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731267
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851274
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911267
                }
            ],
            "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "93078942FB0C9B4AEA6A13B8490DED90",
            "last_update_time": 1689816408934,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238985
                },
                {
                    "state": "loaded",
                    "time": 1689816387509
                },
                {
                    "state": "loaded",
                    "time": 1689816388514
                },
                {
                    "state": "loaded",
                    "time": 1689816408934
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://imageresizer.com",
            "title": "Image Resizer",
            "update_time": [
                {
                    "time": 1689816238985,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387509,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388514,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408934
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731267
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851285
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911294
                }
            ],
            "url": "https://imageresizer.com/resize/download/64b321401a949dc9662ed05e",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "7DA2F27FC5033592DC636C8813AA8C76",
            "last_update_time": 1689816408940,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238986
                },
                {
                    "state": "loaded",
                    "time": 1689816387500
                },
                {
                    "state": "loaded",
                    "time": 1689816388499
                },
                {
                    "state": "loaded",
                    "time": 1689816408940
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) Nvidia RTX 4060 Ti 16GB Sales, AMD RX 7900, Meta exits Intel Leak, Arrow Lake | June Loose Ends - YouTube",
            "update_time": [
                {
                    "time": 1689816238986,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387500,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388499,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408940
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731309
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791303
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851294
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911298
                }
            ],
            "url": "https://www.youtube.com/watch?v=VPOu1mQ8Xho",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "EFA1EBD9E87DAF248604DBBA4FBB0DD6",
            "last_update_time": 1689816408937,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238986
                },
                {
                    "state": "loaded",
                    "time": 1689816387509
                },
                {
                    "state": "loaded",
                    "time": 1689816388519
                },
                {
                    "state": "loaded",
                    "time": 1689816408937
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://drive.google.com",
            "title": "My Drive - Google Drive",
            "update_time": [
                {
                    "time": 1689816238986,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359275,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387509,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388519,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408937
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791320
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911286
                }
            ],
            "url": "https://drive.google.com/drive/u/1/my-drive",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "02903AD5B74F1DA3FAA64C63AB93CBB8",
            "last_update_time": 1689816408936,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238986
                },
                {
                    "state": "loaded",
                    "time": 1689816387512
                },
                {
                    "state": "loaded",
                    "time": 1689816388524
                },
                {
                    "state": "loaded",
                    "time": 1689816408936
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://docs.google.com",
            "title": "Aiden Ma Lesson Resources - Google Docs",
            "update_time": [
                {
                    "time": 1689816238986,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387512,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388524,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408936
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791303
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911282
                }
            ],
            "url": "https://docs.google.com/document/d/1-UtIRRxodethNcMc1PwsmoIovARGDJF0yIX-FGK2c8g/edit",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "A406D7DB8869C49CA83AB85B4F0DCDAA",
            "last_update_time": 1689816408936,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238985
                },
                {
                    "state": "loaded",
                    "time": 1689816387509
                },
                {
                    "state": "loaded",
                    "time": 1689816388519
                },
                {
                    "state": "loaded",
                    "time": 1689816408936
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://drive.google.com",
            "title": "2023 Europe - Google Drive",
            "update_time": [
                {
                    "time": 1689816238985,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387509,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388519,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408936
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791295
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851280
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911275
                }
            ],
            "url": "https://drive.google.com/drive/u/1/folders/1ZDj0PTAt1OtTSe90-qd6mB-hJ6dUpCW7",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "96739723712D3ECC28BA509D4F191CFB",
            "last_update_time": 1689816408937,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238987
                },
                {
                    "state": "loaded",
                    "time": 1689816387512
                },
                {
                    "state": "loaded",
                    "time": 1689816388524
                },
                {
                    "state": "loaded",
                    "time": 1689816408937
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.youtube.com",
            "title": "(656) YouTube",
            "update_time": [
                {
                    "time": 1689816238987,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387512,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388524,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408937
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731266
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791297
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911268
                }
            ],
            "url": "https://www.youtube.com/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "D2C7C4C82520058E7046DC8F19B624B0",
            "last_update_time": 1689816408937,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238986
                },
                {
                    "state": "loaded",
                    "time": 1689816387512
                },
                {
                    "state": "loaded",
                    "time": 1689816388527
                },
                {
                    "state": "loaded",
                    "time": 1689816408937
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.codefactor.io",
            "title": "Plans",
            "update_time": [
                {
                    "time": 1689816238986,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359275,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387512,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388527,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408937
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731267
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791280
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851281
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911267
                }
            ],
            "url": "https://www.codefactor.io/settings/plans#section-features",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "19031719AD4CAA0CB6AFC0348B73C665",
            "last_update_time": 1689816408924,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238986
                },
                {
                    "state": "loaded",
                    "time": 1689816387506
                },
                {
                    "state": "loaded",
                    "time": 1689816388505
                },
                {
                    "state": "loaded",
                    "time": 1689816408924
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.google.com",
            "title": "symbolism of blue in the great gatsby - Google Search",
            "update_time": [
                {
                    "time": 1689816238986,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387506,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388505,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408924
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731274
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791301
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851288
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911300
                }
            ],
            "url": "https://www.google.com/search?q=symbolism+of+blue+in+the+great+gatsby&rlz=1C1ONGR_enCA1063CA1064&oq=symbolism+of+blue+in+the+&aqs=chrome.1.69i57j0i512l2j0i22i30l6j0i390i650.6831j0j7&sourceid=chrome&ie=UTF-8",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "A892F34553BF56949C0365184546DDA3",
            "last_update_time": 1689816408941,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238986
                },
                {
                    "state": "loaded",
                    "time": 1689816387512
                },
                {
                    "state": "loaded",
                    "time": 1689816388526
                },
                {
                    "state": "loaded",
                    "time": 1689816408941
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.chartjs.org",
            "title": "Getting Started | Chart.js",
            "update_time": [
                {
                    "time": 1689816238986,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387512,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388526,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408941
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589277
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731283
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791308
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851280
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911294
                }
            ],
            "url": "https://www.chartjs.org/docs/latest/getting-started/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "56F8DE1EF7B13CD8AA1FE789FBDB20FD",
            "last_update_time": 1689816408940,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238987
                },
                {
                    "state": "loaded",
                    "time": 1689816387512
                },
                {
                    "state": "loaded",
                    "time": 1689816388524
                },
                {
                    "state": "loaded",
                    "time": 1689816408940
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://education.github.com",
            "title": "GitHub Student Developer Pack - GitHub Education",
            "update_time": [
                {
                    "time": 1689816238987,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387512,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388524,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408940
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791294
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911268
                }
            ],
            "url": "https://education.github.com/pack/offers",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "520CA64E818B8FE8CA52E631ADF9EB9A",
            "last_update_time": 1689816408942,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238987
                },
                {
                    "state": "loaded",
                    "time": 1689816387514
                },
                {
                    "state": "loaded",
                    "time": 1689816388527
                },
                {
                    "state": "loaded",
                    "time": 1689816408942
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://stackoverflow.com",
            "title": "javascript - Chart.js change the label for each data point on a chart - Stack Overflow",
            "update_time": [
                {
                    "time": 1689816238987,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387514,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388527,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408942
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791296
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911267
                }
            ],
            "url": "https://stackoverflow.com/questions/48835658/chart-js-change-the-label-for-each-data-point-on-a-chart",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "D7FC445DE6465F27E8A13217C2E825BA",
            "last_update_time": 1689816408940,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238988
                },
                {
                    "state": "loaded",
                    "time": 1689816387511
                },
                {
                    "state": "loaded",
                    "time": 1689816388521
                },
                {
                    "state": "loaded",
                    "time": 1689816408940
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.google.com",
            "title": "bootstrap colors - Google Search",
            "update_time": [
                {
                    "time": 1689816238988,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359275,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387511,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388521,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408940
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791320
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851298
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911286
                }
            ],
            "url": "https://www.google.com/search?q=bootstrap+colors&rlz=1C1ONGR_enCA1063CA1064&oq=bootstrap+colors&aqs=chrome.0.0i512l10.2015j0j7&sourceid=chrome&ie=UTF-8#vhid=f_EQRZ9eWSSozM&vssid=l",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "AF4FAD7DBFDA164B9C5EE9BEADB82C9A",
            "last_update_time": 1689816408934,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238987
                },
                {
                    "state": "loaded",
                    "time": 1689816387509
                },
                {
                    "state": "loaded",
                    "time": 1689816388519
                },
                {
                    "state": "loaded",
                    "time": 1689816408934
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://chat.openai.com",
            "title": "Exceptions: Error Handling Mechanism",
            "update_time": [
                {
                    "time": 1689816238987,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359275,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387509,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388519,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408934
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791305
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851292
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911292
                }
            ],
            "url": "https://chat.openai.com/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "1EFEA8ACAFBC8F7866B0735D8C27E398",
            "last_update_time": 1689816408938,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238987
                },
                {
                    "state": "loaded",
                    "time": 1689816387511
                },
                {
                    "state": "loaded",
                    "time": 1689816388521
                },
                {
                    "state": "loaded",
                    "time": 1689816408938
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.google.com",
            "title": "codefactor for education - Google Search",
            "update_time": [
                {
                    "time": 1689816238987,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387511,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388521,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408938
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791295
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851280
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911275
                }
            ],
            "url": "https://www.google.com/search?q=codefactor+for+education&rlz=1C1ONGR_enCA1063CA1064&oq=codefactor+for+education&aqs=chrome..69i57j69i64.3003j0j7&sourceid=chrome&ie=UTF-8",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "A0560342E60B90158C0AE7FDF62F5D6B",
            "last_update_time": 1689816408942,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238988
                },
                {
                    "state": "loaded",
                    "time": 1689816387514
                },
                {
                    "state": "loaded",
                    "time": 1689816388528
                },
                {
                    "state": "loaded",
                    "time": 1689816408942
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://mdbootstrap.com",
            "title": "+300 Bootstrap 4 Colors - examples & tutorial. Basic & advanced usage - Material Design for Bootstrap",
            "update_time": [
                {
                    "time": 1689816238988,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359275,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387514,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388528,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408942
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731268
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791280
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851274
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911292
                }
            ],
            "url": "https://mdbootstrap.com/docs/b4/jquery/css/colors/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "783951D44783D05A89CB4C8DFC663EAF",
            "last_update_time": 1689816757827,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238988
                },
                {
                    "state": "loaded",
                    "time": 1689816387514
                },
                {
                    "state": "loaded",
                    "time": 1689816388528
                },
                {
                    "state": "loaded",
                    "time": 1689816408939
                },
                {
                    "state": "closed",
                    "time": 1689816757827
                }
            ],
            "muted": false,
            "open": false,
            "origin": "https://www.codefactor.io",
            "title": "Dashboard",
            "update_time": [
                {
                    "time": 1689816238988,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359275,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387514,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388528,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408939
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731267
                },
                {
                    "visibility": "visible",
                    "time": 1689816754852
                },
                {
                    "visibility": "hidden",
                    "time": 1689816757827
                }
            ],
            "url": "https://www.codefactor.io/dashboard",
            "visibility": "visible"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "06BB4ED1E94F982B9FD5BDF119484243",
            "last_update_time": 1689816408942,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238989
                },
                {
                    "state": "loaded",
                    "time": 1689816387514
                },
                {
                    "state": "loaded",
                    "time": 1689816388526
                },
                {
                    "state": "loaded",
                    "time": 1689816408942
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://github.com",
            "title": "Spurious errors are reported when navigating to chrome:// URLs · Issue #118 · GoogleChrome/web-vitals-extension",
            "update_time": [
                {
                    "time": 1689816238989,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387514,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388526,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408942
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791295
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911268
                }
            ],
            "url": "https://github.com/GoogleChrome/web-vitals-extension/issues/118",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "19BDA75A5ED5CCCCD8127FE346E3FF34",
            "last_update_time": 1689816408943,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238990
                },
                {
                    "state": "loaded",
                    "time": 1689816387516
                },
                {
                    "state": "loaded",
                    "time": 1689816388528
                },
                {
                    "state": "loaded",
                    "time": 1689816408943
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://stackoverflow.com",
            "title": "javascript - chrome.runtime.sendMessage throws exception from content script after reloading Chrome Extension - Stack Overflow",
            "update_time": [
                {
                    "time": 1689816238990,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387516,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388528,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408943
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791296
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911267
                }
            ],
            "url": "https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "1E7A329CEE96C6C9228234762ED09AF3",
            "last_update_time": 1689816408928,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238989
                },
                {
                    "state": "loaded",
                    "time": 1689816387508
                },
                {
                    "state": "loaded",
                    "time": 1689816388512
                },
                {
                    "state": "loaded",
                    "time": 1689816408928
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.google.com",
            "title": "google extension randomly stops sending requests - Google Search",
            "update_time": [
                {
                    "time": 1689816238989,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387508,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388512,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408928
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731274
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791301
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851288
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911300
                }
            ],
            "url": "https://www.google.com/search?q=google+extension+randomly+stops+sending+requests&rlz=1C1ONGR_enCA1063CA1064&oq=google+extension+randomly+stops+sending+requests&aqs=chrome..69i57j69i64.5743j0j7&sourceid=chrome&ie=UTF-8",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "5D24AE4A2F07A4B9AB0890A9C66D9B60",
            "last_update_time": 1689816408943,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238989
                },
                {
                    "state": "loaded",
                    "time": 1689816387514
                },
                {
                    "state": "loaded",
                    "time": 1689816388528
                },
                {
                    "state": "loaded",
                    "time": 1689816408943
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.chartjs.org",
            "title": "Tooltip | Chart.js",
            "update_time": [
                {
                    "time": 1689816238989,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387514,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388528,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408943
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589277
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731283
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791308
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851280
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911294
                }
            ],
            "url": "https://www.chartjs.org/docs/latest/configuration/tooltip.html",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "162DA27B42AAE6C9E0D5D9AE7496D135",
            "last_update_time": 1689816408940,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238990
                },
                {
                    "state": "loaded",
                    "time": 1689816387513
                },
                {
                    "state": "loaded",
                    "time": 1689816388523
                },
                {
                    "state": "loaded",
                    "time": 1689816408940
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.google.com",
            "title": "chartjs change label after text - Google Search",
            "update_time": [
                {
                    "time": 1689816238990,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387513,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388523,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408940
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589277
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731286
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791295
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851280
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911275
                }
            ],
            "url": "https://www.google.com/search?q=chartjs+change+label+after+text&rlz=1C1ONGR_enCA1063CA1064&ei=cXi4ZLztC5umptQPzry9yAw&ved=0ahUKEwj86bTe_JuAAxUbk4kEHU5eD8kQ4dUDCA8&uact=5&oq=chartjs+change+label+after+text&gs_lp=Egxnd3Mtd2l6LXNlcnAiH2NoYXJ0anMgY2hhbmdlIGxhYmVsIGFmdGVyIHRleHQyCBAhGKABGMMEMggQIRigARjDBEi1KVDYD1jHKHAJeAGQAQCYAZUBoAHwCaoBBDEyLjK4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIGEAAYBxgewgIHEAAYDRiABMICCBAAGAgYHhgNwgIIEAAYigUYhgPCAgYQABgeGA3CAgUQABiABMICBBAAGB7CAgoQIRigARjDBBgKwgIEECEYFeIDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "464201CB048F47743E47522699A624FA",
            "last_update_time": 1689816408935,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238991
                },
                {
                    "state": "loaded",
                    "time": 1689816387508
                },
                {
                    "state": "loaded",
                    "time": 1689816388513
                },
                {
                    "state": "loaded",
                    "time": 1689816408935
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://mail.google.com",
            "title": "Inbox (17,859) - aidenm888@gmail.com - Gmail",
            "update_time": [
                {
                    "time": 1689816238991,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387508,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388513,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408935
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731277
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791299
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911291
                }
            ],
            "url": "https://mail.google.com/mail/u/1/#inbox",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "C02B44B40A9678977C7DBA126769EC4E",
            "last_update_time": 1689816408931,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238992
                },
                {
                    "state": "loaded",
                    "time": 1689816387510
                },
                {
                    "state": "loaded",
                    "time": 1689816388515
                },
                {
                    "state": "loaded",
                    "time": 1689816408931
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.google.com",
            "title": "test - Google Search",
            "update_time": [
                {
                    "time": 1689816238992,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387510,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388515,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408931
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731274
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791301
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851288
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911300
                }
            ],
            "url": "https://www.google.com/search?q=test&rlz=1C1ONGR_enCA1063CA1064&oq=test&aqs=chrome.0.69i59j46i131i199i433i465i512j0i131i433i512l2j0i131i433i650j69i60j69i61j69i60.575j0j7&sourceid=chrome&ie=UTF-8",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "08A5D0210D20972B4343387F100C3FF3",
            "last_update_time": 1689816408947,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238992
                },
                {
                    "state": "loaded",
                    "time": 1689816387516
                },
                {
                    "state": "loaded",
                    "time": 1689816388531
                },
                {
                    "state": "loaded",
                    "time": 1689816408947
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.chartjs.org",
            "title": "Tooltip | Chart.js",
            "update_time": [
                {
                    "time": 1689816238992,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387516,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388531,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408947
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589277
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731283
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791308
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851280
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911294
                }
            ],
            "url": "https://www.chartjs.org/docs/latest/configuration/tooltip.html",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "3E83DCD997DF6D266522A1A3A4AE89A7",
            "last_update_time": 1689816408943,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238993
                },
                {
                    "state": "loaded",
                    "time": 1689816387514
                },
                {
                    "state": "loaded",
                    "time": 1689816388529
                },
                {
                    "state": "loaded",
                    "time": 1689816408943
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.google.com",
            "title": "Uncaught Error: Extension context invalidated. catch statement not working - Google Search",
            "update_time": [
                {
                    "time": 1689816238993,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359275,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387514,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388529,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408943
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731274
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791302
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851294
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911288
                }
            ],
            "url": "https://www.google.com/search?q=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&rlz=1C1ONGR_enCA1063CA1064&oq=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&aqs=chrome..69i57.4847j0j7&sourceid=chrome&ie=UTF-8",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "9478822B6FD633341416AFC4FFA988C8",
            "last_update_time": 1689816408944,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238994
                },
                {
                    "state": "loaded",
                    "time": 1689816387515
                },
                {
                    "state": "loaded",
                    "time": 1689816388530
                },
                {
                    "state": "loaded",
                    "time": 1689816408944
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://developer.chrome.com",
            "title": "Welcome to Chrome Extensions - Chrome Developers",
            "update_time": [
                {
                    "time": 1689816238994,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299269,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387515,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388530,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816395342,
                    "visibility": "visible"
                },
                {
                    "time": 1689816402485,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408944
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731267
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791291
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851284
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911292
                }
            ],
            "url": "https://developer.chrome.com/docs/extensions/mv3/",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "EAE5C02B1AD63843373B79FB4AC0FE07",
            "last_update_time": 1689816408951,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238994
                },
                {
                    "state": "loaded",
                    "time": 1689816387518
                },
                {
                    "state": "loaded",
                    "time": 1689816388533
                },
                {
                    "state": "loaded",
                    "time": 1689816408951
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.chartjs.org",
            "title": "Position | Chart.js",
            "update_time": [
                {
                    "time": 1689816238994,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359274,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387518,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388533,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408951
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589277
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731283
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791308
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851280
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911294
                }
            ],
            "url": "https://www.chartjs.org/docs/latest/samples/tooltip/position.html",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "5964856AD56CD486C38CA6386EFBF967",
            "last_update_time": 1689816408943,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238995
                },
                {
                    "state": "loaded",
                    "time": 1689816387514
                },
                {
                    "state": "loaded",
                    "time": 1689816388531
                },
                {
                    "state": "loaded",
                    "time": 1689816408943
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://www.google.com",
            "title": "Error: Cannot access contents of the page. Extension manifest must request permission to access the respective host. - Google Search",
            "update_time": [
                {
                    "time": 1689816238995,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387514,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388531,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408943
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731282
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791300
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911269
                }
            ],
            "url": "https://www.google.com/search?q=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&rlz=1C1ONGR_enCA1063CA1064&oq=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&aqs=chrome..69i57j69i64j69i59j69i58.334j0j7&sourceid=chrome&ie=UTF-8",
            "visibility": "hidden"
        },
        {
            "active": false,
            "audible": false,
            "document_id": "BF019C47323A4CB76B3A14914CA70B53",
            "last_update_time": 1689816408940,
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816238996
                },
                {
                    "state": "loaded",
                    "time": 1689816387513
                },
                {
                    "state": "loaded",
                    "time": 1689816388527
                },
                {
                    "state": "loaded",
                    "time": 1689816408940
                }
            ],
            "muted": false,
            "open": true,
            "origin": "https://app.deepsource.com",
            "title": "StealthHydra179/anti-distractor-chromeextension • DeepSource",
            "update_time": [
                {
                    "time": 1689816238996,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816299268,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816359273,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816387513,
                    "visibility": "hidden"
                },
                {
                    "time": 1689816388527,
                    "visibility": "hidden"
                },
                {
                    "visibility": "hidden",
                    "time": 1689816408940
                },
                {
                    "visibility": "hidden",
                    "time": 1689816469271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816529272
                },
                {
                    "visibility": "hidden",
                    "time": 1689816589276
                },
                {
                    "visibility": "hidden",
                    "time": 1689816649278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816731270
                },
                {
                    "visibility": "hidden",
                    "time": 1689816791305
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851296
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911286
                }
            ],
            "url": "https://app.deepsource.com/gh/StealthHydra179/anti-distractor-chromeextension",
            "visibility": "hidden"
        },
        {
            "document_id": "86193D5D10DC16367E6DE3CC779F0390",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=motorsport+manager+road+car+factory&rlz=1C1ONGR_enCA1063CA1064&oq=motorsport+manager+road+ca&aqs=chrome.0.0i512j69i57j0i390i650l3.8463j0j7&sourceid=chrome&ie=UTF-8",
            "title": "motorsport manager road car factory - Google Search",
            "visibility": "hidden",
            "active": true,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689816496996
                },
                {
                    "visibility": "visible",
                    "time": 1689816496996
                },
                {
                    "visibility": "hidden",
                    "time": 1689816503773
                },
                {
                    "visibility": "hidden",
                    "time": 1689816503838
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816496996
                },
                {
                    "state": "closed",
                    "time": 1689816503773
                }
            ],
            "open": false,
            "last_update_time": 1689816503773
        },
        {
            "document_id": "7817D38EF7841F6DC920C8E8628D6698",
            "origin": "https://www.reddit.com",
            "url": "https://www.reddit.com/r/MotorsportManagerPC/comments/9j1t6s/about_the_money_making_buildings/",
            "title": "About the 'money making buildings' : r/MotorsportManagerPC",
            "visibility": "visible",
            "active": false,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689816502688
                },
                {
                    "visibility": "hidden",
                    "time": 1689816502740
                },
                {
                    "visibility": "visible",
                    "time": 1689816538134
                },
                {
                    "visibility": "visible",
                    "time": 1689816538134
                },
                {
                    "visibility": "visible",
                    "time": 1689816562693
                },
                {
                    "visibility": "visible",
                    "time": 1689816562755
                },
                {
                    "visibility": "hidden",
                    "time": 1689816604049
                },
                {
                    "visibility": "hidden",
                    "time": 1689816604049
                },
                {
                    "visibility": "visible",
                    "time": 1689816609660
                },
                {
                    "visibility": "visible",
                    "time": 1689816609660
                },
                {
                    "visibility": "visible",
                    "time": 1689816622698
                },
                {
                    "visibility": "visible",
                    "time": 1689816622745
                },
                {
                    "visibility": "hidden",
                    "time": 1689816640215
                },
                {
                    "visibility": "hidden",
                    "time": 1689816640215
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816502688
                },
                {
                    "state": "loaded",
                    "time": 1689816502740
                },
                {
                    "state": "closed",
                    "time": 1689816640215
                },
                {
                    "state": "closed",
                    "time": 1689816640215
                }
            ],
            "open": false,
            "last_update_time": 1689816640215
        },
        {
            "document_id": "49881832C3D90B44E331AD8A9B17D60B",
            "origin": "https://motorsportmanagerpc.fandom.com",
            "url": "https://motorsportmanagerpc.fandom.com/wiki/Road_Car_Factory",
            "title": "Road Car Factory | Motorsport Manager PC Wiki | Fandom",
            "visibility": "hidden",
            "active": true,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689816507910
                },
                {
                    "visibility": "visible",
                    "time": 1689816507910
                },
                {
                    "visibility": "hidden",
                    "time": 1689816514148
                },
                {
                    "visibility": "hidden",
                    "time": 1689816514319
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816507910
                },
                {
                    "state": "closed",
                    "time": 1689816514148
                }
            ],
            "open": false,
            "last_update_time": 1689816514148
        },
        {
            "document_id": "5678F2888C5C1E1F6A3C6AE333428A7D",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=15%2C000%2C000%2F11&rlz=1C1ONGR_enCA1063CA1064&oq=15%2C000%2C000%2F11&aqs=chrome..69i57j6.2015j0j4&sourceid=chrome&ie=UTF-8",
            "title": "15,000,000/11 - Google Search",
            "visibility": "hidden",
            "active": true,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689816515468
                },
                {
                    "visibility": "visible",
                    "time": 1689816515468
                },
                {
                    "visibility": "hidden",
                    "time": 1689816520145
                },
                {
                    "visibility": "hidden",
                    "time": 1689816520281
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816515468
                },
                {
                    "state": "closed",
                    "time": 1689816520145
                }
            ],
            "open": false,
            "last_update_time": 1689816520145
        },
        {
            "document_id": "6C47A7AAE99A5E4F9264F50729C4510F",
            "origin": "https://motorsportmanagerpc.fandom.com",
            "url": "https://motorsportmanagerpc.fandom.com/wiki/Road_Car_Factory",
            "title": "Road Car Factory | Motorsport Manager PC Wiki | Fandom",
            "visibility": "hidden",
            "active": true,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689816520519
                },
                {
                    "visibility": "visible",
                    "time": 1689816520519
                },
                {
                    "visibility": "hidden",
                    "time": 1689816526104
                },
                {
                    "visibility": "hidden",
                    "time": 1689816526130
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816520519
                },
                {
                    "state": "closed",
                    "time": 1689816526104
                }
            ],
            "open": false,
            "last_update_time": 1689816526104
        },
        {
            "document_id": "EC5101BB91B53464282D20FDFA2A0957",
            "origin": "https://www.google.com",
            "url": "https://www.google.com/search?q=15%2C000%2C000%2F11&rlz=1C1ONGR_enCA1063CA1064&oq=15%2C000%2C000%2F11&aqs=chrome..69i57j6.2015j0j4&sourceid=chrome&ie=UTF-8",
            "title": "15,000,000/11 - Google Search",
            "visibility": "hidden",
            "active": true,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689816526417
                },
                {
                    "visibility": "visible",
                    "time": 1689816526417
                },
                {
                    "visibility": "hidden",
                    "time": 1689816538136
                },
                {
                    "visibility": "hidden",
                    "time": 1689816587279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816647279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816707271
                },
                {
                    "visibility": "hidden",
                    "time": 1689816767275
                },
                {
                    "visibility": "hidden",
                    "time": 1689816851278
                },
                {
                    "visibility": "hidden",
                    "time": 1689816911291
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816526417
                }
            ],
            "open": true,
            "last_update_time": 1689816526417
        },
        {
            "document_id": "E055AAB993B2CD03248C2870A76BCE7B",
            "origin": "https://www.reddit.com",
            "url": "https://www.reddit.com/r/MotorsportManagerPC/comments/9j1t6s/about_the_money_making_buildings/",
            "title": "About the 'money making buildings' : r/MotorsportManagerPC",
            "visibility": "visible",
            "active": true,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689816641927
                },
                {
                    "visibility": "visible",
                    "time": 1689816641927
                },
                {
                    "visibility": "hidden",
                    "time": 1689816641942
                },
                {
                    "visibility": "visible",
                    "time": 1689816641942
                },
                {
                    "visibility": "visible",
                    "time": 1689816701937
                },
                {
                    "visibility": "visible",
                    "time": 1689816701952
                },
                {
                    "visibility": "hidden",
                    "time": 1689816714611
                },
                {
                    "visibility": "hidden",
                    "time": 1689816714611
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816641927
                },
                {
                    "state": "loaded",
                    "time": 1689816641942
                },
                {
                    "state": "closed",
                    "time": 1689816714611
                },
                {
                    "state": "closed",
                    "time": 1689816714611
                }
            ],
            "open": false,
            "last_update_time": 1689816714611
        },
        {
            "document_id": "E9847F1207B695AA7C8672B00A854E73",
            "origin": "https://www.codefactor.io",
            "url": "https://www.codefactor.io/dashboard",
            "title": "Dashboard",
            "visibility": "hidden",
            "active": true,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689816758765
                },
                {
                    "visibility": "visible",
                    "time": 1689816758765
                },
                {
                    "visibility": "hidden",
                    "time": 1689816769519
                },
                {
                    "visibility": "hidden",
                    "time": 1689816769850
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816758765
                },
                {
                    "state": "closed",
                    "time": 1689816769519
                }
            ],
            "open": false,
            "last_update_time": 1689816769519
        },
        {
            "document_id": "8DFC4C1920197759BD8494857DA2A807",
            "origin": "https://www.codefactor.io",
            "url": "https://www.codefactor.io/repository/github/stealthhydra179/anti-distractor-chromeextension/expired",
            "title": "StealthHydra179/anti-distractor-chromeextension - Expired",
            "visibility": "visible",
            "active": true,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689816770294
                },
                {
                    "visibility": "visible",
                    "time": 1689816770294
                },
                {
                    "visibility": "hidden",
                    "time": 1689816772273
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816770294
                },
                {
                    "state": "closed",
                    "time": 1689816772273
                }
            ],
            "open": false,
            "last_update_time": 1689816772273
        },
        {
            "document_id": "F2C0468D9CB0AD463762F5FD2614AEEB",
            "origin": "https://www.codefactor.io",
            "url": "https://www.codefactor.io/dashboard",
            "title": "Dashboard",
            "visibility": "hidden",
            "active": true,
            "audible": false,
            "muted": false,
            "update_time": [
                {
                    "visibility": "hidden",
                    "time": 1689816772855
                },
                {
                    "visibility": "visible",
                    "time": 1689816772855
                },
                {
                    "visibility": "visible",
                    "time": 1689816832855
                },
                {
                    "visibility": "hidden",
                    "time": 1689816834522
                },
                {
                    "visibility": "visible",
                    "time": 1689816836636
                },
                {
                    "visibility": "hidden",
                    "time": 1689816837784
                },
                {
                    "visibility": "hidden",
                    "time": 1689816893279
                },
                {
                    "visibility": "hidden",
                    "time": 1689816953278
                }
            ],
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689816772855
                }
            ],
            "open": true,
            "last_update_time": 1689816772855
        }
    ],
    "specificList": {
        "https://app.deepsource.com": {
            "https://app.deepsource.com/gh/StealthHydra179/anti-distractor-chromeextension": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238996
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387513
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388527
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408940
                    }
                ],
                "origin": "https://app.deepsource.com",
                "title": "StealthHydra179/anti-distractor-chromeextension • DeepSource",
                "total_time": 672288,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672289,
                "total_time_inactive": -1,
                "total_time_loaded": 169943,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238996,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387513,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388527,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408940,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731270,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791305,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851296,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911286,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://app.deepsource.com/gh/StealthHydra179/anti-distractor-chromeextension"
            },
            "total_time": 672288,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672289,
            "total_time_inactive": -1,
            "total_time_loaded": 169943,
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
                        "time": 1689816238966
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387491
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388480
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408916
                    }
                ],
                "origin": "https://chat.openai.com",
                "title": "Parentheses in Python Print",
                "total_time": 672323,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672324,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238966,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387491,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388480,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408916,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791305,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851292,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911291,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://chat.openai.com/"
            },
            "total_time": 672323,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672324,
            "total_time_inactive": -1,
            "total_time_loaded": 169949,
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
                        "time": 1689816238958
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387482
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388475
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408912
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "Codeforces",
                "total_time": 672331,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672332,
                "total_time_inactive": -1,
                "total_time_loaded": 169953,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238958,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387482,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388475,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408912,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469270,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791307,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851288,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911291,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/"
            },
            "https://codeforces.com/blog/entry/100910": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238959
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387483
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388475
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408912
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "[Tutorial] Collection of little techniques - Codeforces",
                "total_time": 672307,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672308,
                "total_time_inactive": -1,
                "total_time_loaded": 169952,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238959,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299267,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387483,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388475,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408912,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731281,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791301,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851277,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911268,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/blog/entry/100910"
            },
            "https://codeforces.com/blog/entry/104466": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238959
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387483
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388475
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408914
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "A bit more of general ideas - Codeforces",
                "total_time": 672307,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672308,
                "total_time_inactive": -1,
                "total_time_loaded": 169954,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238959,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387483,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388475,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408914,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731270,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911268,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/blog/entry/104466"
            },
            "https://codeforces.com/blog/entry/48417": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238959
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387483
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388475
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408912
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "General ideas - Codeforces",
                "total_time": 672323,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672324,
                "total_time_inactive": -1,
                "total_time_loaded": 169952,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238959,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387483,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388475,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408912,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731281,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791301,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911284,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/blog/entry/48417"
            },
            "https://codeforces.com/blog/entry/66909": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238959
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387482
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388474
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408911
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "[Tutorial] A way to Practice Competitive Programming : From Rating 1000 to 2400+ - Codeforces",
                "total_time": 672331,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672332,
                "total_time_inactive": -1,
                "total_time_loaded": 169951,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238959,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387482,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388474,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408911,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731281,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791291,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851285,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911292,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/blog/entry/66909"
            },
            "https://codeforces.com/blog/entry/95106": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238959
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387483
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388475
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408911
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "The Ultimate Topic List (with Resources, Problems and Templates) - Codeforces",
                "total_time": 672307,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672308,
                "total_time_inactive": -1,
                "total_time_loaded": 169951,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238959,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299267,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387483,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388475,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408911,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791300,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851288,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911268,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/blog/entry/95106"
            },
            "https://codeforces.com/contest/1844/my": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238957
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387481
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388474
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408911
                    }
                ],
                "origin": "https://codeforces.com",
                "title": "Status - Codeforces Round 884 (Div. 1 + Div. 2) - Codeforces",
                "total_time": 672308,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672309,
                "total_time_inactive": -1,
                "total_time_loaded": 169953,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238957,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387481,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388474,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408911,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469270,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731266,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791301,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911267,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://codeforces.com/contest/1844/my"
            },
            "total_time": 4706214,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 4706221,
            "total_time_inactive": -1,
            "total_time_loaded": 1189666,
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
                        "time": 1689816238975
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387505
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388505
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408932
                    }
                ],
                "origin": "https://craftinginterpreters.com",
                "title": "Representing Code · Crafting Interpreters",
                "total_time": 672315,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672316,
                "total_time_inactive": -1,
                "total_time_loaded": 169956,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238975,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387505,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388505,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408932,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791292,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851294,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911292,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://craftinginterpreters.com/representing-code.html"
            },
            "total_time": 672315,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672316,
            "total_time_inactive": -1,
            "total_time_loaded": 169956,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://designcode.io": {
            "https://designcode.io/figma-handbook-alignment-properties": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238965
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387493
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388479
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408914
                    }
                ],
                "origin": "https://designcode.io",
                "title": "Alignment, Distribution, & Tidy up Properties - Figma Handbook - Design+Code",
                "total_time": 672311,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672312,
                "total_time_inactive": -1,
                "total_time_loaded": 169948,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238965,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387493,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388479,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408914,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589277,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791281,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911278,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://designcode.io/figma-handbook-alignment-properties"
            },
            "total_time": 672311,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672312,
            "total_time_inactive": -1,
            "total_time_loaded": 169948,
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
                        "time": 1689816238994
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387515
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388530
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408944
                    }
                ],
                "origin": "https://developer.chrome.com",
                "title": "Welcome to Chrome Extensions - Chrome Developers",
                "total_time": 672296,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 665154,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 7142,
                "total_visits": 0,
                "update_time": [
                    {
                        "time": 1689816238994,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387515,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388530,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816395342,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816402485,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408944,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731267,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791291,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911292,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://developer.chrome.com/docs/extensions/mv3/"
            },
            "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238971
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387505
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388503
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408924
                    }
                ],
                "origin": "https://developer.chrome.com",
                "title": "chrome.runtime - Chrome Developers",
                "total_time": 672294,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672295,
                "total_time_inactive": -1,
                "total_time_loaded": 169952,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238971,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387505,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388503,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408924,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791297,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911267,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect"
            },
            "total_time": 1344590,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 1337449,
            "total_time_inactive": -1,
            "total_time_loaded": 339901,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": 7142,
            "total_visits": -1
        },
        "https://developer.mozilla.org": {
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238968
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387499
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388493
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408924
                    }
                ],
                "origin": "https://developer.mozilla.org",
                "title": "Array.prototype.forEach() - JavaScript | MDN",
                "total_time": 672315,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 655629,
                "total_time_inactive": -1,
                "total_time_loaded": 169955,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 16686,
                "total_visits": 9,
                "update_time": [
                    {
                        "time": 1689816238968,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816238968,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816240696,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816311194,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816313017,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816385208,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816386066,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387499,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388493,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408924,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816419701,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816421015,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816715884,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816715886,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816716621,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816735134,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816736394,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816736479,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816741327,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816750453,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816751171,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816751869,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816754021,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816769280,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816777046,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816778295,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816829273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911285,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach"
            },
            "total_time": 672315,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 655629,
            "total_time_inactive": -1,
            "total_time_loaded": 169955,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": 16686,
            "total_visits": 9
        },
        "https://docs.google.com": {
            "https://docs.google.com/document/d/1-UtIRRxodethNcMc1PwsmoIovARGDJF0yIX-FGK2c8g/edit": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238986
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387512
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388524
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408936
                    }
                ],
                "origin": "https://docs.google.com",
                "title": "Aiden Ma Lesson Resources - Google Docs",
                "total_time": 672294,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672295,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238986,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387512,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388524,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408936,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791303,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911282,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://docs.google.com/document/d/1-UtIRRxodethNcMc1PwsmoIovARGDJF0yIX-FGK2c8g/edit"
            },
            "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238967
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387495
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388482
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408917
                    }
                ],
                "origin": "https://docs.google.com",
                "title": "Todo list - Google Docs",
                "total_time": 672313,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672314,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238967,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387495,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388482,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408917,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791303,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911282,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit"
            },
            "total_time": 1344607,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 1344609,
            "total_time_inactive": -1,
            "total_time_loaded": 339898,
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
                        "time": 1689816238984
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387509
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388529
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408934
                    }
                ],
                "origin": "https://docs.oracle.com",
                "title": "The switch Statement (The Java™ Tutorials > Learning the Java Language > Language Basics)",
                "total_time": 672281,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672282,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238984,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299267,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387509,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388529,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408934,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469270,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731267,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911267,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html"
            },
            "total_time": 672281,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672282,
            "total_time_inactive": -1,
            "total_time_loaded": 169949,
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
                        "time": 1689816238985
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387509
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388519
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408936
                    }
                ],
                "origin": "https://drive.google.com",
                "title": "2023 Europe - Google Drive",
                "total_time": 672288,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672289,
                "total_time_inactive": -1,
                "total_time_loaded": 169950,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238985,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387509,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388519,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408936,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791295,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851280,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911275,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://drive.google.com/drive/u/1/folders/1ZDj0PTAt1OtTSe90-qd6mB-hJ6dUpCW7"
            },
            "https://drive.google.com/drive/u/1/my-drive": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238986
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387509
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388519
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408937
                    }
                ],
                "origin": "https://drive.google.com",
                "title": "My Drive - Google Drive",
                "total_time": 672298,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672299,
                "total_time_inactive": -1,
                "total_time_loaded": 169950,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238986,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387509,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388519,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408937,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791320,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911286,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://drive.google.com/drive/u/1/my-drive"
            },
            "total_time": 1344586,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 1344588,
            "total_time_inactive": -1,
            "total_time_loaded": 339900,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://education.github.com": {
            "https://education.github.com/pack/offers": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238987
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387512
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388524
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408940
                    }
                ],
                "origin": "https://education.github.com",
                "title": "GitHub Student Developer Pack - GitHub Education",
                "total_time": 672279,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672280,
                "total_time_inactive": -1,
                "total_time_loaded": 169952,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238987,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387512,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388524,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408940,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469270,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791294,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911268,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://education.github.com/pack/offers"
            },
            "total_time": 672279,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672280,
            "total_time_inactive": -1,
            "total_time_loaded": 169952,
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
                        "time": 1689816238989
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387514
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388526
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408942
                    }
                ],
                "origin": "https://github.com",
                "title": "Spurious errors are reported when navigating to chrome:// URLs · Issue #118 · GoogleChrome/web-vitals-extension",
                "total_time": 672277,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672278,
                "total_time_inactive": -1,
                "total_time_loaded": 169952,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238989,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387514,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388526,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408942,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469270,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791295,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911268,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://github.com/GoogleChrome/web-vitals-extension/issues/118"
            },
            "total_time": 672277,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672278,
            "total_time_inactive": -1,
            "total_time_loaded": 169952,
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
                        "time": 1689816238985
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387509
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388514
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408934
                    }
                ],
                "origin": "https://imageresizer.com",
                "title": "Image Resizer",
                "total_time": 672307,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672308,
                "total_time_inactive": -1,
                "total_time_loaded": 169948,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238985,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387509,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388514,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408934,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731267,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851285,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911294,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://imageresizer.com/resize/download/64b321401a949dc9662ed05e"
            },
            "total_time": 672307,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672308,
            "total_time_inactive": -1,
            "total_time_loaded": 169948,
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
                        "time": 1689816238974
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387506
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388502
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408931
                    }
                ],
                "origin": "https://login.microsoftonline.com",
                "title": "Sign in to your account",
                "total_time": 672292,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672293,
                "total_time_inactive": -1,
                "total_time_loaded": 169956,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238974,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387506,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388502,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408931,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731266,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791299,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911268,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DOEEN_8FpuH_qcIz6Ba3QN-s_mLP5JDageqzo2LrEM3mxWBgGgsz7vph3tcYUj6wnv9FWRhevGot91sFtvHgcBnB1P5-2V4m2QM9LsHT-Cm4svDK4Huyv6onkV38e5iOiEwqf_E86vuNTOZulAJEGfw&response_mode=form_post&nonce=638245343261842304.NTlmYzY0NjctODczYS00OTkzLWE5ZTUtNjVkNjY1Y2QxNWUwNDAyMDczYjktZmQyZi00NjAwLThkNmMtYmExMjUzMGZlYmJh&redirect_uri=https%3A%2F%2Fportal.office.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=c3df525c-1647-474e-aca8-dbf1fd068666&x-client-SKU=ID_NET472&x-client-ver=6.30.1.0&sso_reload=true"
            },
            "total_time": 672292,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672293,
            "total_time_inactive": -1,
            "total_time_loaded": 169956,
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
                        "time": 1689816238991
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387508
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388513
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408935
                    }
                ],
                "origin": "https://mail.google.com",
                "title": "Inbox (17,859) - aidenm888@gmail.com - Gmail",
                "total_time": 672298,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672299,
                "total_time_inactive": -1,
                "total_time_loaded": 169943,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238991,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387508,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388513,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408935,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731277,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791299,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911291,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://mail.google.com/mail/u/1/#inbox"
            },
            "total_time": 672298,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672299,
            "total_time_inactive": -1,
            "total_time_loaded": 169943,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://mdbootstrap.com": {
            "https://mdbootstrap.com/docs/b4/jquery/css/colors/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238988
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387514
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388528
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408942
                    }
                ],
                "origin": "https://mdbootstrap.com",
                "title": "+300 Bootstrap 4 Colors - examples & tutorial. Basic & advanced usage - Material Design for Bootstrap",
                "total_time": 672302,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672303,
                "total_time_inactive": -1,
                "total_time_loaded": 169953,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238988,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387514,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388528,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408942,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791280,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911292,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://mdbootstrap.com/docs/b4/jquery/css/colors/"
            },
            "total_time": 672302,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672303,
            "total_time_inactive": -1,
            "total_time_loaded": 169953,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://motorsportmanagerpc.fandom.com": {
            "https://motorsportmanagerpc.fandom.com/wiki/Road_Car_Factory": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816507910
                    },
                    {
                        "state": "closed",
                        "time": 1689816514148
                    }
                ],
                "origin": "https://motorsportmanagerpc.fandom.com",
                "title": "Road Car Factory | Motorsport Manager PC Wiki | Fandom",
                "total_time": 6407,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 170,
                "total_time_inactive": -1,
                "total_time_loaded": 6237,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 6237,
                "total_visits": 0,
                "update_time": [
                    {
                        "time": 1689816507910,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816507910,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816514148,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816514319,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://motorsportmanagerpc.fandom.com/wiki/Road_Car_Factory"
            },
            "total_time": 6407,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 170,
            "total_time_inactive": -1,
            "total_time_loaded": 6237,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": 6237,
            "total_visits": -1
        },
        "https://s3.amazonaws.com": {
            "https://s3.amazonaws.com/www-inside-design/uploads/2017/11/wireframes-martyna.png": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238976
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387507
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388506
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408931
                    }
                ],
                "origin": "https://s3.amazonaws.com",
                "title": "wireframes-martyna.png (1920×2622)",
                "total_time": 672315,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672316,
                "total_time_inactive": -1,
                "total_time_loaded": 169954,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238976,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387507,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388506,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408931,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791289,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911293,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://s3.amazonaws.com/www-inside-design/uploads/2017/11/wireframes-martyna.png"
            },
            "total_time": 672315,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672316,
            "total_time_inactive": -1,
            "total_time_loaded": 169954,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://stackoverflow.com": {
            "https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238990
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387516
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388528
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408943
                    }
                ],
                "origin": "https://stackoverflow.com",
                "title": "javascript - chrome.runtime.sendMessage throws exception from content script after reloading Chrome Extension - Stack Overflow",
                "total_time": 672275,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672276,
                "total_time_inactive": -1,
                "total_time_loaded": 169952,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238990,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387516,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388528,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408943,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791296,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911267,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023"
            },
            "https://stackoverflow.com/questions/48835658/chart-js-change-the-label-for-each-data-point-on-a-chart": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238987
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387514
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388527
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408942
                    }
                ],
                "origin": "https://stackoverflow.com",
                "title": "javascript - Chart.js change the label for each data point on a chart - Stack Overflow",
                "total_time": 672278,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672279,
                "total_time_inactive": -1,
                "total_time_loaded": 169954,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238987,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387514,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388527,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408942,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791296,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911267,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://stackoverflow.com/questions/48835658/chart-js-change-the-label-for-each-data-point-on-a-chart"
            },
            "total_time": 1344553,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 1344555,
            "total_time_inactive": -1,
            "total_time_loaded": 339906,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://www.allrecipes.com": {
            "https://www.allrecipes.com/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238965
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387490
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388480
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408921
                    }
                ],
                "origin": "https://www.allrecipes.com",
                "title": "Allrecipes | Recipes, How-Tos, Videos and More",
                "total_time": 672303,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672304,
                "total_time_inactive": -1,
                "total_time_loaded": 169955,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238965,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299267,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387490,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388480,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408921,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791302,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911270,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.allrecipes.com/"
            },
            "total_time": 672303,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672304,
            "total_time_inactive": -1,
            "total_time_loaded": 169955,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://www.amygoodchild.com": {
            "https://www.amygoodchild.com/blog/computer-art-50s-and-60s?utm_source=ayjay&utm_medium=email&utm_campaign=art-out-of-time": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238974
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387505
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388504
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408928
                    }
                ],
                "origin": "https://www.amygoodchild.com",
                "title": "Early Computer Art in the 50’s & 60’s — Amy Goodchild",
                "total_time": 672291,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672292,
                "total_time_inactive": -1,
                "total_time_loaded": 169953,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238974,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387505,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388504,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408928,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469270,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731266,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791299,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911267,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.amygoodchild.com/blog/computer-art-50s-and-60s?utm_source=ayjay&utm_medium=email&utm_campaign=art-out-of-time"
            },
            "total_time": 672291,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672292,
            "total_time_inactive": -1,
            "total_time_loaded": 169953,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://www.chartjs.org": {
            "https://www.chartjs.org/docs/latest/configuration/tooltip.html": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238989
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387514
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388528
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408943
                    }
                ],
                "origin": "https://www.chartjs.org",
                "title": "Tooltip | Chart.js",
                "total_time": 672303,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672304,
                "total_time_inactive": -1,
                "total_time_loaded": 169953,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238989,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387514,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388528,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408943,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589277,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731283,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791308,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851280,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911294,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.chartjs.org/docs/latest/configuration/tooltip.html"
            },
            "https://www.chartjs.org/docs/latest/getting-started/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238986
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387512
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388526
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408941
                    }
                ],
                "origin": "https://www.chartjs.org",
                "title": "Getting Started | Chart.js",
                "total_time": 672306,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672307,
                "total_time_inactive": -1,
                "total_time_loaded": 169954,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238986,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387512,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388526,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408941,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589277,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731283,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791308,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851280,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911294,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.chartjs.org/docs/latest/getting-started/"
            },
            "https://www.chartjs.org/docs/latest/samples/tooltip/position.html": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238994
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387518
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388533
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408951
                    }
                ],
                "origin": "https://www.chartjs.org",
                "title": "Position | Chart.js",
                "total_time": 672298,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672299,
                "total_time_inactive": -1,
                "total_time_loaded": 169956,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238994,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387518,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388533,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408951,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589277,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731283,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791308,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851280,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911294,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.chartjs.org/docs/latest/samples/tooltip/position.html"
            },
            "total_time": 2016907,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 2016910,
            "total_time_inactive": -1,
            "total_time_loaded": 509863,
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
                        "time": 1689816238988
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387514
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388528
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408939
                    },
                    {
                        "state": "closed",
                        "time": 1689816757827
                    }
                ],
                "origin": "https://www.codefactor.io",
                "title": "Dashboard",
                "total_time": 518837,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 515863,
                "total_time_inactive": -1,
                "total_time_loaded": 518838,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 2974,
                "total_visits": 0,
                "update_time": [
                    {
                        "time": 1689816238988,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387514,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388528,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408939,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731267,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816754852,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816757827,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.codefactor.io/dashboard"
            },
            "https://www.codefactor.io/repository/github/stealthhydra179/anti-distractor-chromeextension/expired": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816770294
                    },
                    {
                        "state": "closed",
                        "time": 1689816772273
                    }
                ],
                "origin": "https://www.codefactor.io",
                "title": "StealthHydra179/anti-distractor-chromeextension - Expired",
                "total_time": 1977,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": -1,
                "total_time_inactive": -1,
                "total_time_loaded": 1978,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 1978,
                "total_visits": 0,
                "update_time": [
                    {
                        "time": 1689816770294,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816770294,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816772273,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.codefactor.io/repository/github/stealthhydra179/anti-distractor-chromeextension/expired"
            },
            "https://www.codefactor.io/settings/plans#section-features": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238986
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387512
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388527
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408937
                    }
                ],
                "origin": "https://www.codefactor.io",
                "title": "Plans",
                "total_time": 672279,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672280,
                "total_time_inactive": -1,
                "total_time_loaded": 169950,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238986,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387512,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388527,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408937,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731267,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791280,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851281,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911267,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.codefactor.io/settings/plans#section-features"
            },
            "total_time": 1193093,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 1188143,
            "total_time_inactive": -1,
            "total_time_loaded": 690766,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": 4952,
            "total_visits": -1
        },
        "https://www.google.ca": {
            "https://www.google.ca/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238970
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387500
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388494
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408918
                    }
                ],
                "origin": "https://www.google.ca",
                "title": "Google",
                "total_time": 672313,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672314,
                "total_time_inactive": -1,
                "total_time_loaded": 169947,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238970,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387500,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388494,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408918,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791312,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851291,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911285,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.ca/"
            },
            "total_time": 672313,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672314,
            "total_time_inactive": -1,
            "total_time_loaded": 169947,
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
                        "time": 1689816515468
                    },
                    {
                        "state": "closed",
                        "time": 1689816520145
                    }
                ],
                "origin": "https://www.google.com",
                "title": "15,000,000/11 - Google Search",
                "total_time": 4811,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 135,
                "total_time_inactive": -1,
                "total_time_loaded": 4676,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 4676,
                "total_visits": 0,
                "update_time": [
                    {
                        "time": 1689816515468,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816515468,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816520145,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816520281,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=15%2C000%2C000%2F11&rlz=1C1ONGR_enCA1063CA1064&oq=15%2C000%2C000%2F11&aqs=chrome..69i57j6.2015j0j4&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&rlz=1C1ONGR_enCA1063CA1064&oq=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&aqs=chrome..69i57j69i64j69i59j69i58.334j0j7&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238995
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387514
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388531
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408943
                    }
                ],
                "origin": "https://www.google.com",
                "title": "Error: Cannot access contents of the page. Extension manifest must request permission to access the respective host. - Google Search",
                "total_time": 672272,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672273,
                "total_time_inactive": -1,
                "total_time_loaded": 169947,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238995,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387514,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388531,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408943,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791300,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911269,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&rlz=1C1ONGR_enCA1063CA1064&oq=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&aqs=chrome..69i57j69i64j69i59j69i58.334j0j7&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&rlz=1C1ONGR_enCA1063CA1064&oq=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&aqs=chrome..69i57.4847j0j7&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238993
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387514
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388529
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408943
                    }
                ],
                "origin": "https://www.google.com",
                "title": "Uncaught Error: Extension context invalidated. catch statement not working - Google Search",
                "total_time": 672293,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672294,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238993,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387514,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388529,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408943,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469270,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791302,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851294,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911288,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&rlz=1C1ONGR_enCA1063CA1064&oq=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&aqs=chrome..69i57.4847j0j7&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=bootstrap+colors&rlz=1C1ONGR_enCA1063CA1064&oq=bootstrap+colors&aqs=chrome.0.0i512l10.2015j0j7&sourceid=chrome&ie=UTF-8#vhid=f_EQRZ9eWSSozM&vssid=l": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238988
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387511
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388521
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408940
                    }
                ],
                "origin": "https://www.google.com",
                "title": "bootstrap colors - Google Search",
                "total_time": 672296,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672297,
                "total_time_inactive": -1,
                "total_time_loaded": 169951,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238988,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387511,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388521,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408940,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791320,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911286,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=bootstrap+colors&rlz=1C1ONGR_enCA1063CA1064&oq=bootstrap+colors&aqs=chrome.0.0i512l10.2015j0j7&sourceid=chrome&ie=UTF-8#vhid=f_EQRZ9eWSSozM&vssid=l"
            },
            "https://www.google.com/search?q=chartjs+change+label+after+text&rlz=1C1ONGR_enCA1063CA1064&ei=cXi4ZLztC5umptQPzry9yAw&ved=0ahUKEwj86bTe_JuAAxUbk4kEHU5eD8kQ4dUDCA8&uact=5&oq=chartjs+change+label+after+text&gs_lp=Egxnd3Mtd2l6LXNlcnAiH2NoYXJ0anMgY2hhbmdlIGxhYmVsIGFmdGVyIHRleHQyCBAhGKABGMMEMggQIRigARjDBEi1KVDYD1jHKHAJeAGQAQCYAZUBoAHwCaoBBDEyLjK4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIGEAAYBxgewgIHEAAYDRiABMICCBAAGAgYHhgNwgIIEAAYigUYhgPCAgYQABgeGA3CAgUQABiABMICBBAAGB7CAgoQIRigARjDBBgKwgIEECEYFeIDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238990
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387513
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388523
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408940
                    }
                ],
                "origin": "https://www.google.com",
                "title": "chartjs change label after text - Google Search",
                "total_time": 672283,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672284,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238990,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387513,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388523,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408940,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589277,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791295,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851280,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911275,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=chartjs+change+label+after+text&rlz=1C1ONGR_enCA1063CA1064&ei=cXi4ZLztC5umptQPzry9yAw&ved=0ahUKEwj86bTe_JuAAxUbk4kEHU5eD8kQ4dUDCA8&uact=5&oq=chartjs+change+label+after+text&gs_lp=Egxnd3Mtd2l6LXNlcnAiH2NoYXJ0anMgY2hhbmdlIGxhYmVsIGFmdGVyIHRleHQyCBAhGKABGMMEMggQIRigARjDBEi1KVDYD1jHKHAJeAGQAQCYAZUBoAHwCaoBBDEyLjK4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIGEAAYBxgewgIHEAAYDRiABMICCBAAGAgYHhgNwgIIEAAYigUYhgPCAgYQABgeGA3CAgUQABiABMICBBAAGB7CAgoQIRigARjDBBgKwgIEECEYFeIDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp"
            },
            "https://www.google.com/search?q=codefactor+for+education&rlz=1C1ONGR_enCA1063CA1064&oq=codefactor+for+education&aqs=chrome..69i57j69i64.3003j0j7&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238987
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387511
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388521
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408938
                    }
                ],
                "origin": "https://www.google.com",
                "title": "codefactor for education - Google Search",
                "total_time": 672286,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672287,
                "total_time_inactive": -1,
                "total_time_loaded": 169950,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238987,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387511,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388521,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408938,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791295,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851280,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911275,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=codefactor+for+education&rlz=1C1ONGR_enCA1063CA1064&oq=codefactor+for+education&aqs=chrome..69i57j69i64.3003j0j7&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=f1&rlz=1C1ONGR_enCA1063CA1064&oq=f1&aqs=chrome.0.0i271j46i433i512j69i59j0i433i512j0i131i433i512j69i60j69i61l2.463j0j4&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238969
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387504
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388503
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408921
                    }
                ],
                "origin": "https://www.google.com",
                "title": "f1 - Google Search",
                "total_time": 672329,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672330,
                "total_time_inactive": -1,
                "total_time_loaded": 169951,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238969,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387504,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388503,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408921,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791300,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851288,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911300,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=f1&rlz=1C1ONGR_enCA1063CA1064&oq=f1&aqs=chrome.0.0i271j46i433i512j69i59j0i433i512j0i131i433i512j69i60j69i61l2.463j0j4&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=google+extension+randomly+stops+sending+requests&rlz=1C1ONGR_enCA1063CA1064&oq=google+extension+randomly+stops+sending+requests&aqs=chrome..69i57j69i64.5743j0j7&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238989
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387508
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388512
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408928
                    }
                ],
                "origin": "https://www.google.com",
                "title": "google extension randomly stops sending requests - Google Search",
                "total_time": 672309,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672310,
                "total_time_inactive": -1,
                "total_time_loaded": 169938,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238989,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387508,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388512,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408928,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791301,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851288,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911300,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=google+extension+randomly+stops+sending+requests&rlz=1C1ONGR_enCA1063CA1064&oq=google+extension+randomly+stops+sending+requests&aqs=chrome..69i57j69i64.5743j0j7&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=motorsport+manager+road+car+factory&rlz=1C1ONGR_enCA1063CA1064&oq=motorsport+manager+road+ca&aqs=chrome.0.0i512j69i57j0i390i650l3.8463j0j7&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816496996
                    },
                    {
                        "state": "closed",
                        "time": 1689816503773
                    }
                ],
                "origin": "https://www.google.com",
                "title": "motorsport manager road car factory - Google Search",
                "total_time": 6840,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 64,
                "total_time_inactive": -1,
                "total_time_loaded": 6776,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 6776,
                "total_visits": 0,
                "update_time": [
                    {
                        "time": 1689816496996,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816496996,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816503773,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816503838,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=motorsport+manager+road+car+factory&rlz=1C1ONGR_enCA1063CA1064&oq=motorsport+manager+road+ca&aqs=chrome.0.0i512j69i57j0i390i650l3.8463j0j7&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=symbolism+of+blue+in+the+great+gatsby&rlz=1C1ONGR_enCA1063CA1064&oq=symbolism+of+blue+in+the+&aqs=chrome.1.69i57j0i512l2j0i22i30l6j0i390i650.6831j0j7&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238986
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387506
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388505
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408924
                    }
                ],
                "origin": "https://www.google.com",
                "title": "symbolism of blue in the great gatsby - Google Search",
                "total_time": 672312,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672313,
                "total_time_inactive": -1,
                "total_time_loaded": 169937,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238986,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387506,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388505,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408924,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791301,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851288,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911300,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=symbolism+of+blue+in+the+great+gatsby&rlz=1C1ONGR_enCA1063CA1064&oq=symbolism+of+blue+in+the+&aqs=chrome.1.69i57j0i512l2j0i22i30l6j0i390i650.6831j0j7&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?q=test&rlz=1C1ONGR_enCA1063CA1064&oq=test&aqs=chrome.0.69i59j46i131i199i433i465i512j0i131i433i512l2j0i131i433i650j69i60j69i61j69i60.575j0j7&sourceid=chrome&ie=UTF-8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238992
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387510
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388515
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408931
                    }
                ],
                "origin": "https://www.google.com",
                "title": "test - Google Search",
                "total_time": 672306,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672307,
                "total_time_inactive": -1,
                "total_time_loaded": 169938,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238992,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387510,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388515,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408931,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791301,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851288,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911300,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?q=test&rlz=1C1ONGR_enCA1063CA1064&oq=test&aqs=chrome.0.69i59j46i131i199i433i465i512j0i131i433i512l2j0i131i433i650j69i60j69i61j69i60.575j0j7&sourceid=chrome&ie=UTF-8"
            },
            "https://www.google.com/search?rlz=1C1ONGR_enCA1063CA1064&q=website+wireframe+examples&tbm=isch&sa=X&ved=2ahUKEwiNw7Kp5YKAAxWmjYkEHdRpBuIQ0pQJegQIDBAB&biw=2560&bih=1232&dpr=1.5#imgrc=jB4157cyh8aIDM": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238974
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387507
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388511
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408933
                    }
                ],
                "origin": "https://www.google.com",
                "title": "website wireframe examples - Google Search",
                "total_time": 672315,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672316,
                "total_time_inactive": -1,
                "total_time_loaded": 169958,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238974,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299267,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387507,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388511,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408933,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731277,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791299,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911291,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.google.com/search?rlz=1C1ONGR_enCA1063CA1064&q=website+wireframe+examples&tbm=isch&sa=X&ved=2ahUKEwiNw7Kp5YKAAxWmjYkEHdRpBuIQ0pQJegQIDBAB&biw=2560&bih=1232&dpr=1.5#imgrc=jB4157cyh8aIDM"
            },
            "total_time": 6734652,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 6723210,
            "total_time_inactive": -1,
            "total_time_loaded": 1710920,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": 11452,
            "total_visits": -1
        },
        "https://www.instagram.com": {
            "https://www.instagram.com/direct/t/17843476547117960/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238973
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387504
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388509
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408927
                    }
                ],
                "origin": "https://www.instagram.com",
                "title": "Instagram • Chats",
                "total_time": 672299,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672300,
                "total_time_inactive": -1,
                "total_time_loaded": 169953,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238973,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387504,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388509,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408927,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731285,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791288,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911274,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.instagram.com/direct/t/17843476547117960/"
            },
            "total_time": 672299,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672300,
            "total_time_inactive": -1,
            "total_time_loaded": 169953,
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
                        "time": 1689816238969
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387501
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388500
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408920
                    }
                ],
                "origin": "https://www.newegg.ca",
                "title": "6700xt | Newegg.ca",
                "total_time": 672314,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672315,
                "total_time_inactive": -1,
                "total_time_loaded": 169950,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238969,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387501,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388500,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408920,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791307,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911285,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.newegg.ca/p/pl?d=6700xt&Order=1"
            },
            "total_time": 672314,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672315,
            "total_time_inactive": -1,
            "total_time_loaded": 169950,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        },
        "https://www.reddit.com": {
            "https://www.reddit.com/r/MotorsportManagerPC/comments/9j1t6s/about_the_money_making_buildings/": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816502688
                    },
                    {
                        "state": "loaded",
                        "time": 1689816502740
                    },
                    {
                        "state": "closed",
                        "time": 1689816640215
                    },
                    {
                        "state": "closed",
                        "time": 1689816640215
                    }
                ],
                "origin": "https://www.reddit.com",
                "title": "About the 'money making buildings' : r/MotorsportManagerPC",
                "total_time": 137525,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 41056,
                "total_time_inactive": -1,
                "total_time_loaded": 137526,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 96469,
                "total_visits": 1,
                "update_time": [
                    {
                        "time": 1689816502688,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816502740,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816538134,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816538134,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816562693,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816562755,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816604049,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816604049,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816609660,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816609660,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816622698,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816622745,
                        "visibility": "visible"
                    },
                    {
                        "time": 1689816640215,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816640215,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.reddit.com/r/MotorsportManagerPC/comments/9j1t6s/about_the_money_making_buildings/"
            },
            "total_time": 137525,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 41056,
            "total_time_inactive": -1,
            "total_time_loaded": 137526,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": 96469,
            "total_visits": 1
        },
        "https://www.termius.com": {
            "https://www.termius.com/free-ssh-client-for-windows": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238966
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387496
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388482
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408916
                    }
                ],
                "origin": "https://www.termius.com",
                "title": "Free SSH client for Windows",
                "total_time": 672301,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672302,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238966,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387496,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388482,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408916,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529270,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731283,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791280,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851296,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911269,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.termius.com/free-ssh-client-for-windows"
            },
            "total_time": 672301,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 672302,
            "total_time_inactive": -1,
            "total_time_loaded": 169949,
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
                        "time": 1689816238969
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387497
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388489
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408916
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) YouTube",
                "total_time": 672321,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672322,
                "total_time_inactive": -1,
                "total_time_loaded": 169946,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238969,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387497,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388489,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408916,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791302,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851289,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911292,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/"
            },
            "https://www.youtube.com/watch?v=0EtgwIajVqs": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238972
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387500
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388494
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408920
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Download These Handy Tools NOW! - YouTube",
                "total_time": 672313,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672314,
                "total_time_inactive": -1,
                "total_time_loaded": 169947,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238972,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387500,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388494,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408920,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791294,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851287,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911287,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=0EtgwIajVqs"
            },
            "https://www.youtube.com/watch?v=4ArVvrhhnyI": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238974
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387502
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388497
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408924
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) How 23 Foods Get To The Grocery Store | Big Business | Insider Business - YouTube",
                "total_time": 672311,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672312,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238974,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387502,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388497,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408924,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731292,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791292,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851300,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911287,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=4ArVvrhhnyI"
            },
            "https://www.youtube.com/watch?v=5RC9cKkQYGA": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238968
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387497
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388489
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408916
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "MEGA FARM from 0$ on FLAT MAP with @FarmingGenius 👉 #1 - YouTube",
                "total_time": 672316,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672317,
                "total_time_inactive": -1,
                "total_time_loaded": 169947,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238968,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387497,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388489,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408916,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589285,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731291,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791295,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911286,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=5RC9cKkQYGA"
            },
            "https://www.youtube.com/watch?v=F3TMRCO8eyQ": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238970
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387498
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388491
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408918
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Sergio Perez Storms Through The Field In Austria! | 2023 Austrian Grand Prix - YouTube",
                "total_time": 672315,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672316,
                "total_time_inactive": -1,
                "total_time_loaded": 169947,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238970,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387498,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388491,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408918,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791293,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851287,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911287,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=F3TMRCO8eyQ"
            },
            "https://www.youtube.com/watch?v=FLRnk01ffE8": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238973
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387503
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388495
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408924
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) What could Russia learn from a captured Leopard 2 tank? - YouTube",
                "total_time": 672311,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672312,
                "total_time_inactive": -1,
                "total_time_loaded": 169950,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238973,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387503,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388495,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408924,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589285,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731291,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791295,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911286,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=FLRnk01ffE8"
            },
            "https://www.youtube.com/watch?v=FStOT4pP2tc": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238969
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387498
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388489
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408918
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "My 10 YEAR Indie Game Development Journey - YouTube",
                "total_time": 672305,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672306,
                "total_time_inactive": -1,
                "total_time_loaded": 169948,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238969,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387498,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388489,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408918,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791293,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911276,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=FStOT4pP2tc"
            },
            "https://www.youtube.com/watch?v=HFDTAqUhH2o": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238976
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387499
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388492
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408918
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Saving the cheapest PC on eBay - YouTube",
                "total_time": 672307,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672308,
                "total_time_inactive": -1,
                "total_time_loaded": 169941,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238976,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387499,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388492,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408918,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791319,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851303,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911285,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=HFDTAqUhH2o"
            },
            "https://www.youtube.com/watch?v=HRcI7RSm9_o": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238971
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387500
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388491
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408920
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) I Think 'F1 World' In The F1 23 Game Is A Flop... - YouTube",
                "total_time": 672303,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672304,
                "total_time_inactive": -1,
                "total_time_loaded": 169948,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238971,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387500,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388491,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408920,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791293,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911276,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=HRcI7RSm9_o"
            },
            "https://www.youtube.com/watch?v=Koc63QhxPgk": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238969
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387499
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388491
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408919
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Weak Perfect Graph Theorem - YouTube",
                "total_time": 672315,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672316,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238969,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387499,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388491,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408919,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589285,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731291,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791295,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911286,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=Koc63QhxPgk"
            },
            "https://www.youtube.com/watch?v=LUjR54Hf_dc": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238972
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387500
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388495
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408922
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) EXTENDED Race Highlights I 2023 6 Hours of Monza I FIA WEC - YouTube",
                "total_time": 672313,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672314,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238972,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387500,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388495,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408922,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731292,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791292,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851300,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911287,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=LUjR54Hf_dc"
            },
            "https://www.youtube.com/watch?v=MF-KR6A3KyM": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238972
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387505
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388501
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408922
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Minecrafts Strangest EXPLOIT - Block Transmutation... - YouTube",
                "total_time": 672308,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672309,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238972,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387505,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388501,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408922,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731293,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791318,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911282,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=MF-KR6A3KyM"
            },
            "https://www.youtube.com/watch?v=QeVJOUFZV3U&list=PL-cVSmXe-NPgNO-cyZ_mie7e2c4Ley20q&index=17": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238970
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387498
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388493
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408919
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) BRAKE CHECKED BY AI! AI R&D FINALLY CATCHING UP! WE'VE GOT WORK TO DO - F1 23 MY TEAM CAREER Part 17 - YouTube",
                "total_time": 672315,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672316,
                "total_time_inactive": -1,
                "total_time_loaded": 169948,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238970,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387498,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388493,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408919,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731292,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791292,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851300,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911287,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=QeVJOUFZV3U&list=PL-cVSmXe-NPgNO-cyZ_mie7e2c4Ley20q&index=17"
            },
            "https://www.youtube.com/watch?v=UTEAvb-tikU": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238974
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387502
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388496
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408923
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) How This Tiny Truck Took Down an Army - YouTube",
                "total_time": 672311,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672312,
                "total_time_inactive": -1,
                "total_time_loaded": 169948,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238974,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387502,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388496,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408923,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791294,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851287,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911287,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=UTEAvb-tikU"
            },
            "https://www.youtube.com/watch?v=VPOu1mQ8Xho": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238986
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387500
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388499
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408940
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Nvidia RTX 4060 Ti 16GB Sales, AMD RX 7900, Meta exits Intel Leak, Arrow Lake | June Loose Ends - YouTube",
                "total_time": 672310,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672311,
                "total_time_inactive": -1,
                "total_time_loaded": 169953,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238986,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387500,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388499,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408940,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731309,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791303,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851294,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911298,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=VPOu1mQ8Xho"
            },
            "https://www.youtube.com/watch?v=X29vxhlZIzE": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238973
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387514
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388493
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408923
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Can I get Top 100 on Every Map in the Summer Campaign? - YouTube",
                "total_time": 672301,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672302,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238973,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387514,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388493,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408923,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791294,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851282,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911276,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=X29vxhlZIzE"
            },
            "https://www.youtube.com/watch?v=Y0Ko0kvwfgA": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238970
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387503
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388499
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408918
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) How Do Games Render So Much Grass? - YouTube",
                "total_time": 672310,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672311,
                "total_time_inactive": -1,
                "total_time_loaded": 169947,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238970,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387503,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388499,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408918,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731293,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791318,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911282,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=Y0Ko0kvwfgA"
            },
            "https://www.youtube.com/watch?v=bgR3yESAEVE": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238969
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387498
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388496
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408919
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "Can Chess, with Hexagons? - YouTube",
                "total_time": 672327,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672328,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238969,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387498,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388496,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408919,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731309,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791302,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851294,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911298,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=bgR3yESAEVE"
            },
            "https://www.youtube.com/watch?v=d2Tm3Yx4HWI": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238967
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387495
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388491
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408917
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "Academia is BROKEN! - Harvard Fake Data Scandal Explained - YouTube",
                "total_time": 672329,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672330,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238967,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387495,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388491,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408917,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731309,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791302,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851294,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911298,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=d2Tm3Yx4HWI"
            },
            "https://www.youtube.com/watch?v=eYceyv7a4tA": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238981
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387505
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388498
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408925
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) BEST GPUs to Buy Right Now... Nvidia Prices Plummet! - YouTube",
                "total_time": 672302,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672303,
                "total_time_inactive": -1,
                "total_time_loaded": 169943,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238981,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387505,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388498,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408925,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791319,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851303,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911285,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=eYceyv7a4tA"
            },
            "https://www.youtube.com/watch?v=g3X1QXXDXjw": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238968
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387495
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388489
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408915
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "Abusing the Banking System to get rich on a Pay-to-win Server! - Complex Gaming - YouTube",
                "total_time": 672301,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672302,
                "total_time_inactive": -1,
                "total_time_loaded": 169946,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238968,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299267,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387495,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388489,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408915,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589276,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731283,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791283,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851291,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911271,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=g3X1QXXDXjw"
            },
            "https://www.youtube.com/watch?v=i7jOxAarbo4": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238971
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387501
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388493
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408921
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) AMD RX 7700 & 7800 Benchmark, Nvidia RTX 4060 Ti 16GB Review, Intel i9-14900KS | Broken Silicon 214 - YouTube",
                "total_time": 672313,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672314,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238971,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387501,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388493,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408921,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589285,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731291,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791295,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911286,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=i7jOxAarbo4"
            },
            "https://www.youtube.com/watch?v=iSpL9LnczVQ": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238976
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387511
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388505
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408927
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Building A Budget NAS with TrueNAS Scale - YouTube",
                "total_time": 672305,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672306,
                "total_time_inactive": -1,
                "total_time_loaded": 169950,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238976,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387511,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388505,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408927,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731293,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791318,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911283,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=iSpL9LnczVQ"
            },
            "https://www.youtube.com/watch?v=j9ODgfIaxc4": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238968
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387496
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388489
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408916
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) The Race to Save Texas’ Failed Megabridge - YouTube",
                "total_time": 672317,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672318,
                "total_time_inactive": -1,
                "total_time_loaded": 169947,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238968,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387496,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388489,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408916,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589275,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791293,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851287,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911287,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=j9ODgfIaxc4"
            },
            "https://www.youtube.com/watch?v=o8YgqN9cG84": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238978
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387501
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388494
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408921
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "(656) Renovating a canoe while running a marathon - YouTube",
                "total_time": 672305,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672306,
                "total_time_inactive": -1,
                "total_time_loaded": 169942,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238978,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387501,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388494,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408921,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791319,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851303,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911285,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=o8YgqN9cG84"
            },
            "https://www.youtube.com/watch?v=rTN749kONJI": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238964
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387488
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388479
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408914
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "I Bought a \"BROKEN\" Graphics Card on eBay... Can I Fix it?!? - YouTube",
                "total_time": 672332,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672333,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238964,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387488,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388479,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408914,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529271,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731309,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791302,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851294,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911298,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=rTN749kONJI"
            },
            "https://www.youtube.com/watch?v=tk9guzivxiU": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238974
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387497
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388490
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408917
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "Epic 211-shot badminton rally delights fans in Malaysia - YouTube",
                "total_time": 672309,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672310,
                "total_time_inactive": -1,
                "total_time_loaded": 169942,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238974,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299269,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359274,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387497,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388490,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408917,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589284,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649278,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731298,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791319,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851303,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911285,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=tk9guzivxiU"
            },
            "https://www.youtube.com/watch?v=x2ulsZ6aGXY": {
                "loaded_time": [
                    {
                        "state": "loaded",
                        "time": 1689816238974
                    },
                    {
                        "state": "loaded",
                        "time": 1689816387507
                    },
                    {
                        "state": "loaded",
                        "time": 1689816388504
                    },
                    {
                        "state": "loaded",
                        "time": 1689816408924
                    }
                ],
                "origin": "https://www.youtube.com",
                "title": "So how DO you build a safe submersible? - DSV Alvin - YouTube",
                "total_time": 672307,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672308,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1,
                "update_time": [
                    {
                        "time": 1689816238974,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816299268,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816359273,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816387507,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816388504,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816408924,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816469272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816529272,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816589286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816649279,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816731293,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816791318,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816851286,
                        "visibility": "hidden"
                    },
                    {
                        "time": 1689816911283,
                        "visibility": "hidden"
                    }
                ],
                "url": "https://www.youtube.com/watch?v=x2ulsZ6aGXY"
            },
            "total_time": 18824732,
            "total_time_active": -1,
            "total_time_audible": -1,
            "total_time_closed": -1,
            "total_time_hidden": 18824760,
            "total_time_inactive": -1,
            "total_time_loaded": 4758530,
            "total_time_muted": -1,
            "total_time_unmuted": -1,
            "total_time_visible": -1,
            "total_visits": -1
        }
    },
    "sortedSpecificArray": [
        {
            "key": "https://www.reddit.com",
            "value": {
                "https://www.reddit.com/r/MotorsportManagerPC/comments/9j1t6s/about_the_money_making_buildings/": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816502688
                        },
                        {
                            "state": "loaded",
                            "time": 1689816502740
                        },
                        {
                            "state": "closed",
                            "time": 1689816640215
                        },
                        {
                            "state": "closed",
                            "time": 1689816640215
                        }
                    ],
                    "origin": "https://www.reddit.com",
                    "title": "About the 'money making buildings' : r/MotorsportManagerPC",
                    "total_time": 137525,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 41056,
                    "total_time_inactive": -1,
                    "total_time_loaded": 137526,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": 96469,
                    "total_visits": 1,
                    "update_time": [
                        {
                            "time": 1689816502688,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816502740,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816538134,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816538134,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816562693,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816562755,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816604049,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816604049,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816609660,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816609660,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816622698,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816622745,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816640215,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816640215,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.reddit.com/r/MotorsportManagerPC/comments/9j1t6s/about_the_money_making_buildings/"
                },
                "total_time": 137525,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 41056,
                "total_time_inactive": -1,
                "total_time_loaded": 137526,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 96469,
                "total_visits": 1
            }
        },
        {
            "key": "https://developer.mozilla.org",
            "value": {
                "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238968
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387499
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388493
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408924
                        }
                    ],
                    "origin": "https://developer.mozilla.org",
                    "title": "Array.prototype.forEach() - JavaScript | MDN",
                    "total_time": 672315,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 655629,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169955,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": 16686,
                    "total_visits": 9,
                    "update_time": [
                        {
                            "time": 1689816238968,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816238968,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816240696,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816311194,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816313017,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816385208,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816386066,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387499,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388493,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408924,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816419701,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816421015,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816715884,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816715886,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816716621,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816735134,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816736394,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816736479,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816741327,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816750453,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816751171,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816751869,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816754021,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816769280,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816777046,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816778295,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816829273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911285,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach"
                },
                "total_time": 672315,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 655629,
                "total_time_inactive": -1,
                "total_time_loaded": 169955,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 16686,
                "total_visits": 9
            }
        },
        {
            "key": "https://www.google.com",
            "value": {
                "https://www.google.com/search?q=15%2C000%2C000%2F11&rlz=1C1ONGR_enCA1063CA1064&oq=15%2C000%2C000%2F11&aqs=chrome..69i57j6.2015j0j4&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816515468
                        },
                        {
                            "state": "closed",
                            "time": 1689816520145
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "15,000,000/11 - Google Search",
                    "total_time": 4811,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 135,
                    "total_time_inactive": -1,
                    "total_time_loaded": 4676,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": 4676,
                    "total_visits": 0,
                    "update_time": [
                        {
                            "time": 1689816515468,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816515468,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816520145,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816520281,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=15%2C000%2C000%2F11&rlz=1C1ONGR_enCA1063CA1064&oq=15%2C000%2C000%2F11&aqs=chrome..69i57j6.2015j0j4&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&rlz=1C1ONGR_enCA1063CA1064&oq=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&aqs=chrome..69i57j69i64j69i59j69i58.334j0j7&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238995
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387514
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388531
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408943
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "Error: Cannot access contents of the page. Extension manifest must request permission to access the respective host. - Google Search",
                    "total_time": 672272,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672273,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169947,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238995,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387514,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388531,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408943,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791300,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911269,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&rlz=1C1ONGR_enCA1063CA1064&oq=Error%3A+Cannot+access+contents+of+the+page.+Extension+manifest+must+request+permission+to+access+the+respective+host.&aqs=chrome..69i57j69i64j69i59j69i58.334j0j7&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&rlz=1C1ONGR_enCA1063CA1064&oq=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&aqs=chrome..69i57.4847j0j7&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238993
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387514
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388529
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408943
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "Uncaught Error: Extension context invalidated. catch statement not working - Google Search",
                    "total_time": 672293,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672294,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238993,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387514,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388529,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408943,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469270,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791302,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851294,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911288,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&rlz=1C1ONGR_enCA1063CA1064&oq=Uncaught+Error%3A+Extension+context+invalidated.+catch+statement+not+working&aqs=chrome..69i57.4847j0j7&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=bootstrap+colors&rlz=1C1ONGR_enCA1063CA1064&oq=bootstrap+colors&aqs=chrome.0.0i512l10.2015j0j7&sourceid=chrome&ie=UTF-8#vhid=f_EQRZ9eWSSozM&vssid=l": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238988
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387511
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388521
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408940
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "bootstrap colors - Google Search",
                    "total_time": 672296,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672297,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169951,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238988,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387511,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388521,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408940,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791320,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911286,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=bootstrap+colors&rlz=1C1ONGR_enCA1063CA1064&oq=bootstrap+colors&aqs=chrome.0.0i512l10.2015j0j7&sourceid=chrome&ie=UTF-8#vhid=f_EQRZ9eWSSozM&vssid=l"
                },
                "https://www.google.com/search?q=chartjs+change+label+after+text&rlz=1C1ONGR_enCA1063CA1064&ei=cXi4ZLztC5umptQPzry9yAw&ved=0ahUKEwj86bTe_JuAAxUbk4kEHU5eD8kQ4dUDCA8&uact=5&oq=chartjs+change+label+after+text&gs_lp=Egxnd3Mtd2l6LXNlcnAiH2NoYXJ0anMgY2hhbmdlIGxhYmVsIGFmdGVyIHRleHQyCBAhGKABGMMEMggQIRigARjDBEi1KVDYD1jHKHAJeAGQAQCYAZUBoAHwCaoBBDEyLjK4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIGEAAYBxgewgIHEAAYDRiABMICCBAAGAgYHhgNwgIIEAAYigUYhgPCAgYQABgeGA3CAgUQABiABMICBBAAGB7CAgoQIRigARjDBBgKwgIEECEYFeIDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238990
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387513
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388523
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408940
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "chartjs change label after text - Google Search",
                    "total_time": 672283,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672284,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238990,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387513,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388523,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408940,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589277,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791295,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851280,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911275,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=chartjs+change+label+after+text&rlz=1C1ONGR_enCA1063CA1064&ei=cXi4ZLztC5umptQPzry9yAw&ved=0ahUKEwj86bTe_JuAAxUbk4kEHU5eD8kQ4dUDCA8&uact=5&oq=chartjs+change+label+after+text&gs_lp=Egxnd3Mtd2l6LXNlcnAiH2NoYXJ0anMgY2hhbmdlIGxhYmVsIGFmdGVyIHRleHQyCBAhGKABGMMEMggQIRigARjDBEi1KVDYD1jHKHAJeAGQAQCYAZUBoAHwCaoBBDEyLjK4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIGEAAYBxgewgIHEAAYDRiABMICCBAAGAgYHhgNwgIIEAAYigUYhgPCAgYQABgeGA3CAgUQABiABMICBBAAGB7CAgoQIRigARjDBBgKwgIEECEYFeIDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp"
                },
                "https://www.google.com/search?q=codefactor+for+education&rlz=1C1ONGR_enCA1063CA1064&oq=codefactor+for+education&aqs=chrome..69i57j69i64.3003j0j7&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238987
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387511
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388521
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408938
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "codefactor for education - Google Search",
                    "total_time": 672286,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672287,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169950,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238987,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387511,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388521,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408938,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791295,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851280,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911275,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=codefactor+for+education&rlz=1C1ONGR_enCA1063CA1064&oq=codefactor+for+education&aqs=chrome..69i57j69i64.3003j0j7&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=f1&rlz=1C1ONGR_enCA1063CA1064&oq=f1&aqs=chrome.0.0i271j46i433i512j69i59j0i433i512j0i131i433i512j69i60j69i61l2.463j0j4&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238969
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387504
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388503
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408921
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "f1 - Google Search",
                    "total_time": 672329,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672330,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169951,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238969,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387504,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388503,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408921,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791300,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851288,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911300,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=f1&rlz=1C1ONGR_enCA1063CA1064&oq=f1&aqs=chrome.0.0i271j46i433i512j69i59j0i433i512j0i131i433i512j69i60j69i61l2.463j0j4&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=google+extension+randomly+stops+sending+requests&rlz=1C1ONGR_enCA1063CA1064&oq=google+extension+randomly+stops+sending+requests&aqs=chrome..69i57j69i64.5743j0j7&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238989
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387508
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388512
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408928
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "google extension randomly stops sending requests - Google Search",
                    "total_time": 672309,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672310,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169938,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238989,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387508,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388512,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408928,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791301,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851288,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911300,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=google+extension+randomly+stops+sending+requests&rlz=1C1ONGR_enCA1063CA1064&oq=google+extension+randomly+stops+sending+requests&aqs=chrome..69i57j69i64.5743j0j7&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=motorsport+manager+road+car+factory&rlz=1C1ONGR_enCA1063CA1064&oq=motorsport+manager+road+ca&aqs=chrome.0.0i512j69i57j0i390i650l3.8463j0j7&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816496996
                        },
                        {
                            "state": "closed",
                            "time": 1689816503773
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "motorsport manager road car factory - Google Search",
                    "total_time": 6840,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 64,
                    "total_time_inactive": -1,
                    "total_time_loaded": 6776,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": 6776,
                    "total_visits": 0,
                    "update_time": [
                        {
                            "time": 1689816496996,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816496996,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816503773,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816503838,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=motorsport+manager+road+car+factory&rlz=1C1ONGR_enCA1063CA1064&oq=motorsport+manager+road+ca&aqs=chrome.0.0i512j69i57j0i390i650l3.8463j0j7&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=symbolism+of+blue+in+the+great+gatsby&rlz=1C1ONGR_enCA1063CA1064&oq=symbolism+of+blue+in+the+&aqs=chrome.1.69i57j0i512l2j0i22i30l6j0i390i650.6831j0j7&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238986
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387506
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388505
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408924
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "symbolism of blue in the great gatsby - Google Search",
                    "total_time": 672312,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672313,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169937,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238986,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387506,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388505,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408924,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791301,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851288,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911300,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=symbolism+of+blue+in+the+great+gatsby&rlz=1C1ONGR_enCA1063CA1064&oq=symbolism+of+blue+in+the+&aqs=chrome.1.69i57j0i512l2j0i22i30l6j0i390i650.6831j0j7&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?q=test&rlz=1C1ONGR_enCA1063CA1064&oq=test&aqs=chrome.0.69i59j46i131i199i433i465i512j0i131i433i512l2j0i131i433i650j69i60j69i61j69i60.575j0j7&sourceid=chrome&ie=UTF-8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238992
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387510
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388515
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408931
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "test - Google Search",
                    "total_time": 672306,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672307,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169938,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238992,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387510,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388515,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408931,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791301,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851288,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911300,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?q=test&rlz=1C1ONGR_enCA1063CA1064&oq=test&aqs=chrome.0.69i59j46i131i199i433i465i512j0i131i433i512l2j0i131i433i650j69i60j69i61j69i60.575j0j7&sourceid=chrome&ie=UTF-8"
                },
                "https://www.google.com/search?rlz=1C1ONGR_enCA1063CA1064&q=website+wireframe+examples&tbm=isch&sa=X&ved=2ahUKEwiNw7Kp5YKAAxWmjYkEHdRpBuIQ0pQJegQIDBAB&biw=2560&bih=1232&dpr=1.5#imgrc=jB4157cyh8aIDM": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238974
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387507
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388511
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408933
                        }
                    ],
                    "origin": "https://www.google.com",
                    "title": "website wireframe examples - Google Search",
                    "total_time": 672315,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672316,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169958,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238974,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299267,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387507,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388511,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408933,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731277,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791299,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911291,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.com/search?rlz=1C1ONGR_enCA1063CA1064&q=website+wireframe+examples&tbm=isch&sa=X&ved=2ahUKEwiNw7Kp5YKAAxWmjYkEHdRpBuIQ0pQJegQIDBAB&biw=2560&bih=1232&dpr=1.5#imgrc=jB4157cyh8aIDM"
                },
                "total_time": 6734652,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 6723210,
                "total_time_inactive": -1,
                "total_time_loaded": 1710920,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 11452,
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
                            "time": 1689816238994
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387515
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388530
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408944
                        }
                    ],
                    "origin": "https://developer.chrome.com",
                    "title": "Welcome to Chrome Extensions - Chrome Developers",
                    "total_time": 672296,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 665154,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": 7142,
                    "total_visits": 0,
                    "update_time": [
                        {
                            "time": 1689816238994,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387515,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388530,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816395342,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816402485,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408944,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731267,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791291,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911292,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://developer.chrome.com/docs/extensions/mv3/"
                },
                "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238971
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387505
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388503
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408924
                        }
                    ],
                    "origin": "https://developer.chrome.com",
                    "title": "chrome.runtime - Chrome Developers",
                    "total_time": 672294,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672295,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169952,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238971,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387505,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388503,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408924,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791297,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911267,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect"
                },
                "total_time": 1344590,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 1337449,
                "total_time_inactive": -1,
                "total_time_loaded": 339901,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 7142,
                "total_visits": -1
            }
        },
        {
            "key": "https://motorsportmanagerpc.fandom.com",
            "value": {
                "https://motorsportmanagerpc.fandom.com/wiki/Road_Car_Factory": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816507910
                        },
                        {
                            "state": "closed",
                            "time": 1689816514148
                        }
                    ],
                    "origin": "https://motorsportmanagerpc.fandom.com",
                    "title": "Road Car Factory | Motorsport Manager PC Wiki | Fandom",
                    "total_time": 6407,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 170,
                    "total_time_inactive": -1,
                    "total_time_loaded": 6237,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": 6237,
                    "total_visits": 0,
                    "update_time": [
                        {
                            "time": 1689816507910,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816507910,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816514148,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816514319,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://motorsportmanagerpc.fandom.com/wiki/Road_Car_Factory"
                },
                "total_time": 6407,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 170,
                "total_time_inactive": -1,
                "total_time_loaded": 6237,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 6237,
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
                            "time": 1689816238988
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387514
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388528
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408939
                        },
                        {
                            "state": "closed",
                            "time": 1689816757827
                        }
                    ],
                    "origin": "https://www.codefactor.io",
                    "title": "Dashboard",
                    "total_time": 518837,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 515863,
                    "total_time_inactive": -1,
                    "total_time_loaded": 518838,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": 2974,
                    "total_visits": 0,
                    "update_time": [
                        {
                            "time": 1689816238988,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387514,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388528,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408939,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731267,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816754852,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816757827,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.codefactor.io/dashboard"
                },
                "https://www.codefactor.io/repository/github/stealthhydra179/anti-distractor-chromeextension/expired": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816770294
                        },
                        {
                            "state": "closed",
                            "time": 1689816772273
                        }
                    ],
                    "origin": "https://www.codefactor.io",
                    "title": "StealthHydra179/anti-distractor-chromeextension - Expired",
                    "total_time": 1977,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": -1,
                    "total_time_inactive": -1,
                    "total_time_loaded": 1978,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": 1978,
                    "total_visits": 0,
                    "update_time": [
                        {
                            "time": 1689816770294,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816770294,
                            "visibility": "visible"
                        },
                        {
                            "time": 1689816772273,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.codefactor.io/repository/github/stealthhydra179/anti-distractor-chromeextension/expired"
                },
                "https://www.codefactor.io/settings/plans#section-features": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238986
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387512
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388527
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408937
                        }
                    ],
                    "origin": "https://www.codefactor.io",
                    "title": "Plans",
                    "total_time": 672279,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672280,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169950,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238986,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387512,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388527,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408937,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731267,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791280,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851281,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911267,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.codefactor.io/settings/plans#section-features"
                },
                "total_time": 1193093,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 1188143,
                "total_time_inactive": -1,
                "total_time_loaded": 690766,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": 4952,
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
                            "time": 1689816238996
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387513
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388527
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408940
                        }
                    ],
                    "origin": "https://app.deepsource.com",
                    "title": "StealthHydra179/anti-distractor-chromeextension • DeepSource",
                    "total_time": 672288,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672289,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169943,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238996,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387513,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388527,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408940,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731270,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791305,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851296,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911286,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://app.deepsource.com/gh/StealthHydra179/anti-distractor-chromeextension"
                },
                "total_time": 672288,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672289,
                "total_time_inactive": -1,
                "total_time_loaded": 169943,
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
                            "time": 1689816238966
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387491
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388480
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408916
                        }
                    ],
                    "origin": "https://chat.openai.com",
                    "title": "Parentheses in Python Print",
                    "total_time": 672323,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672324,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238966,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387491,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388480,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408916,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791305,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851292,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911291,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://chat.openai.com/"
                },
                "total_time": 672323,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672324,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
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
                            "time": 1689816238958
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387482
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388475
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408912
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "Codeforces",
                    "total_time": 672331,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672332,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169953,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238958,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387482,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388475,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408912,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469270,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791307,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851288,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911291,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/"
                },
                "https://codeforces.com/blog/entry/100910": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238959
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387483
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388475
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408912
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "[Tutorial] Collection of little techniques - Codeforces",
                    "total_time": 672307,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672308,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169952,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238959,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299267,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387483,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388475,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408912,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731281,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791301,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851277,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911268,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/blog/entry/100910"
                },
                "https://codeforces.com/blog/entry/104466": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238959
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387483
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388475
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408914
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "A bit more of general ideas - Codeforces",
                    "total_time": 672307,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672308,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169954,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238959,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387483,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388475,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408914,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731270,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911268,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/blog/entry/104466"
                },
                "https://codeforces.com/blog/entry/48417": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238959
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387483
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388475
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408912
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "General ideas - Codeforces",
                    "total_time": 672323,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672324,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169952,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238959,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387483,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388475,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408912,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731281,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791301,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911284,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/blog/entry/48417"
                },
                "https://codeforces.com/blog/entry/66909": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238959
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387482
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388474
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408911
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "[Tutorial] A way to Practice Competitive Programming : From Rating 1000 to 2400+ - Codeforces",
                    "total_time": 672331,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672332,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169951,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238959,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387482,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388474,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408911,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731281,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791291,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851285,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911292,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/blog/entry/66909"
                },
                "https://codeforces.com/blog/entry/95106": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238959
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387483
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388475
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408911
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "The Ultimate Topic List (with Resources, Problems and Templates) - Codeforces",
                    "total_time": 672307,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672308,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169951,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238959,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299267,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387483,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388475,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408911,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791300,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851288,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911268,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/blog/entry/95106"
                },
                "https://codeforces.com/contest/1844/my": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238957
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387481
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388474
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408911
                        }
                    ],
                    "origin": "https://codeforces.com",
                    "title": "Status - Codeforces Round 884 (Div. 1 + Div. 2) - Codeforces",
                    "total_time": 672308,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672309,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169953,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238957,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387481,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388474,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408911,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469270,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731266,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791301,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911267,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://codeforces.com/contest/1844/my"
                },
                "total_time": 4706214,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 4706221,
                "total_time_inactive": -1,
                "total_time_loaded": 1189666,
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
                            "time": 1689816238975
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387505
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388505
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408932
                        }
                    ],
                    "origin": "https://craftinginterpreters.com",
                    "title": "Representing Code · Crafting Interpreters",
                    "total_time": 672315,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672316,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169956,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238975,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387505,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388505,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408932,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791292,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851294,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911292,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://craftinginterpreters.com/representing-code.html"
                },
                "total_time": 672315,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672316,
                "total_time_inactive": -1,
                "total_time_loaded": 169956,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://designcode.io",
            "value": {
                "https://designcode.io/figma-handbook-alignment-properties": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238965
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387493
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388479
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408914
                        }
                    ],
                    "origin": "https://designcode.io",
                    "title": "Alignment, Distribution, & Tidy up Properties - Figma Handbook - Design+Code",
                    "total_time": 672311,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672312,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169948,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238965,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387493,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388479,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408914,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589277,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791281,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911278,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://designcode.io/figma-handbook-alignment-properties"
                },
                "total_time": 672311,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672312,
                "total_time_inactive": -1,
                "total_time_loaded": 169948,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://docs.google.com",
            "value": {
                "https://docs.google.com/document/d/1-UtIRRxodethNcMc1PwsmoIovARGDJF0yIX-FGK2c8g/edit": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238986
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387512
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388524
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408936
                        }
                    ],
                    "origin": "https://docs.google.com",
                    "title": "Aiden Ma Lesson Resources - Google Docs",
                    "total_time": 672294,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672295,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238986,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387512,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388524,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408936,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791303,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911282,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://docs.google.com/document/d/1-UtIRRxodethNcMc1PwsmoIovARGDJF0yIX-FGK2c8g/edit"
                },
                "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238967
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387495
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388482
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408917
                        }
                    ],
                    "origin": "https://docs.google.com",
                    "title": "Todo list - Google Docs",
                    "total_time": 672313,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672314,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238967,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387495,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388482,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408917,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791303,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911282,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit"
                },
                "total_time": 1344607,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 1344609,
                "total_time_inactive": -1,
                "total_time_loaded": 339898,
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
                            "time": 1689816238984
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387509
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388529
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408934
                        }
                    ],
                    "origin": "https://docs.oracle.com",
                    "title": "The switch Statement (The Java™ Tutorials > Learning the Java Language > Language Basics)",
                    "total_time": 672281,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672282,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238984,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299267,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387509,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388529,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408934,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469270,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731267,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911267,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html"
                },
                "total_time": 672281,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672282,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
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
                            "time": 1689816238985
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387509
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388519
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408936
                        }
                    ],
                    "origin": "https://drive.google.com",
                    "title": "2023 Europe - Google Drive",
                    "total_time": 672288,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672289,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169950,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238985,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387509,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388519,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408936,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791295,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851280,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911275,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://drive.google.com/drive/u/1/folders/1ZDj0PTAt1OtTSe90-qd6mB-hJ6dUpCW7"
                },
                "https://drive.google.com/drive/u/1/my-drive": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238986
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387509
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388519
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408937
                        }
                    ],
                    "origin": "https://drive.google.com",
                    "title": "My Drive - Google Drive",
                    "total_time": 672298,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672299,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169950,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238986,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387509,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388519,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408937,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791320,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911286,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://drive.google.com/drive/u/1/my-drive"
                },
                "total_time": 1344586,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 1344588,
                "total_time_inactive": -1,
                "total_time_loaded": 339900,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://education.github.com",
            "value": {
                "https://education.github.com/pack/offers": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238987
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387512
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388524
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408940
                        }
                    ],
                    "origin": "https://education.github.com",
                    "title": "GitHub Student Developer Pack - GitHub Education",
                    "total_time": 672279,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672280,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169952,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238987,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387512,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388524,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408940,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469270,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791294,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911268,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://education.github.com/pack/offers"
                },
                "total_time": 672279,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672280,
                "total_time_inactive": -1,
                "total_time_loaded": 169952,
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
                            "time": 1689816238989
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387514
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388526
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408942
                        }
                    ],
                    "origin": "https://github.com",
                    "title": "Spurious errors are reported when navigating to chrome:// URLs · Issue #118 · GoogleChrome/web-vitals-extension",
                    "total_time": 672277,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672278,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169952,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238989,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387514,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388526,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408942,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469270,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791295,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911268,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://github.com/GoogleChrome/web-vitals-extension/issues/118"
                },
                "total_time": 672277,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672278,
                "total_time_inactive": -1,
                "total_time_loaded": 169952,
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
                            "time": 1689816238985
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387509
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388514
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408934
                        }
                    ],
                    "origin": "https://imageresizer.com",
                    "title": "Image Resizer",
                    "total_time": 672307,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672308,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169948,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238985,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387509,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388514,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408934,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731267,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851285,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911294,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://imageresizer.com/resize/download/64b321401a949dc9662ed05e"
                },
                "total_time": 672307,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672308,
                "total_time_inactive": -1,
                "total_time_loaded": 169948,
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
                            "time": 1689816238974
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387506
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388502
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408931
                        }
                    ],
                    "origin": "https://login.microsoftonline.com",
                    "title": "Sign in to your account",
                    "total_time": 672292,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672293,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169956,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238974,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387506,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388502,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408931,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731266,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791299,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911268,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DOEEN_8FpuH_qcIz6Ba3QN-s_mLP5JDageqzo2LrEM3mxWBgGgsz7vph3tcYUj6wnv9FWRhevGot91sFtvHgcBnB1P5-2V4m2QM9LsHT-Cm4svDK4Huyv6onkV38e5iOiEwqf_E86vuNTOZulAJEGfw&response_mode=form_post&nonce=638245343261842304.NTlmYzY0NjctODczYS00OTkzLWE5ZTUtNjVkNjY1Y2QxNWUwNDAyMDczYjktZmQyZi00NjAwLThkNmMtYmExMjUzMGZlYmJh&redirect_uri=https%3A%2F%2Fportal.office.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=c3df525c-1647-474e-aca8-dbf1fd068666&x-client-SKU=ID_NET472&x-client-ver=6.30.1.0&sso_reload=true"
                },
                "total_time": 672292,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672293,
                "total_time_inactive": -1,
                "total_time_loaded": 169956,
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
                            "time": 1689816238991
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387508
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388513
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408935
                        }
                    ],
                    "origin": "https://mail.google.com",
                    "title": "Inbox (17,859) - aidenm888@gmail.com - Gmail",
                    "total_time": 672298,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672299,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169943,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238991,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387508,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388513,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408935,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731277,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791299,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911291,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://mail.google.com/mail/u/1/#inbox"
                },
                "total_time": 672298,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672299,
                "total_time_inactive": -1,
                "total_time_loaded": 169943,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://mdbootstrap.com",
            "value": {
                "https://mdbootstrap.com/docs/b4/jquery/css/colors/": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238988
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387514
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388528
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408942
                        }
                    ],
                    "origin": "https://mdbootstrap.com",
                    "title": "+300 Bootstrap 4 Colors - examples & tutorial. Basic & advanced usage - Material Design for Bootstrap",
                    "total_time": 672302,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672303,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169953,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238988,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387514,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388528,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408942,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791280,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911292,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://mdbootstrap.com/docs/b4/jquery/css/colors/"
                },
                "total_time": 672302,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672303,
                "total_time_inactive": -1,
                "total_time_loaded": 169953,
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
                            "time": 1689816238976
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387507
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388506
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408931
                        }
                    ],
                    "origin": "https://s3.amazonaws.com",
                    "title": "wireframes-martyna.png (1920×2622)",
                    "total_time": 672315,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672316,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169954,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238976,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387507,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388506,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408931,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791289,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911293,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://s3.amazonaws.com/www-inside-design/uploads/2017/11/wireframes-martyna.png"
                },
                "total_time": 672315,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672316,
                "total_time_inactive": -1,
                "total_time_loaded": 169954,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://stackoverflow.com",
            "value": {
                "https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238990
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387516
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388528
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408943
                        }
                    ],
                    "origin": "https://stackoverflow.com",
                    "title": "javascript - chrome.runtime.sendMessage throws exception from content script after reloading Chrome Extension - Stack Overflow",
                    "total_time": 672275,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672276,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169952,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238990,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387516,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388528,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408943,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791296,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911267,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023"
                },
                "https://stackoverflow.com/questions/48835658/chart-js-change-the-label-for-each-data-point-on-a-chart": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238987
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387514
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388527
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408942
                        }
                    ],
                    "origin": "https://stackoverflow.com",
                    "title": "javascript - Chart.js change the label for each data point on a chart - Stack Overflow",
                    "total_time": 672278,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672279,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169954,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238987,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387514,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388527,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408942,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791296,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911267,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://stackoverflow.com/questions/48835658/chart-js-change-the-label-for-each-data-point-on-a-chart"
                },
                "total_time": 1344553,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 1344555,
                "total_time_inactive": -1,
                "total_time_loaded": 339906,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://www.allrecipes.com",
            "value": {
                "https://www.allrecipes.com/": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238965
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387490
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388480
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408921
                        }
                    ],
                    "origin": "https://www.allrecipes.com",
                    "title": "Allrecipes | Recipes, How-Tos, Videos and More",
                    "total_time": 672303,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672304,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169955,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238965,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299267,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387490,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388480,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408921,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791302,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911270,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.allrecipes.com/"
                },
                "total_time": 672303,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672304,
                "total_time_inactive": -1,
                "total_time_loaded": 169955,
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
                            "time": 1689816238974
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387505
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388504
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408928
                        }
                    ],
                    "origin": "https://www.amygoodchild.com",
                    "title": "Early Computer Art in the 50’s & 60’s — Amy Goodchild",
                    "total_time": 672291,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672292,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169953,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238974,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387505,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388504,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408928,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469270,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731266,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791299,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911267,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.amygoodchild.com/blog/computer-art-50s-and-60s?utm_source=ayjay&utm_medium=email&utm_campaign=art-out-of-time"
                },
                "total_time": 672291,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672292,
                "total_time_inactive": -1,
                "total_time_loaded": 169953,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        },
        {
            "key": "https://www.chartjs.org",
            "value": {
                "https://www.chartjs.org/docs/latest/configuration/tooltip.html": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238989
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387514
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388528
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408943
                        }
                    ],
                    "origin": "https://www.chartjs.org",
                    "title": "Tooltip | Chart.js",
                    "total_time": 672303,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672304,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169953,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238989,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387514,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388528,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408943,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589277,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731283,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791308,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851280,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911294,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.chartjs.org/docs/latest/configuration/tooltip.html"
                },
                "https://www.chartjs.org/docs/latest/getting-started/": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238986
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387512
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388526
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408941
                        }
                    ],
                    "origin": "https://www.chartjs.org",
                    "title": "Getting Started | Chart.js",
                    "total_time": 672306,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672307,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169954,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238986,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387512,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388526,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408941,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589277,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731283,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791308,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851280,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911294,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.chartjs.org/docs/latest/getting-started/"
                },
                "https://www.chartjs.org/docs/latest/samples/tooltip/position.html": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238994
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387518
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388533
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408951
                        }
                    ],
                    "origin": "https://www.chartjs.org",
                    "title": "Position | Chart.js",
                    "total_time": 672298,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672299,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169956,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238994,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387518,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388533,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408951,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589277,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731283,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791308,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851280,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911294,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.chartjs.org/docs/latest/samples/tooltip/position.html"
                },
                "total_time": 2016907,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 2016910,
                "total_time_inactive": -1,
                "total_time_loaded": 509863,
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
                            "time": 1689816238970
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387500
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388494
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408918
                        }
                    ],
                    "origin": "https://www.google.ca",
                    "title": "Google",
                    "total_time": 672313,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672314,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169947,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238970,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387500,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388494,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408918,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791312,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851291,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911285,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.google.ca/"
                },
                "total_time": 672313,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672314,
                "total_time_inactive": -1,
                "total_time_loaded": 169947,
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
                            "time": 1689816238973
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387504
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388509
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408927
                        }
                    ],
                    "origin": "https://www.instagram.com",
                    "title": "Instagram • Chats",
                    "total_time": 672299,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672300,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169953,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238973,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387504,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388509,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408927,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731285,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791288,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911274,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.instagram.com/direct/t/17843476547117960/"
                },
                "total_time": 672299,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672300,
                "total_time_inactive": -1,
                "total_time_loaded": 169953,
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
                            "time": 1689816238969
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387501
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388500
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408920
                        }
                    ],
                    "origin": "https://www.newegg.ca",
                    "title": "6700xt | Newegg.ca",
                    "total_time": 672314,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672315,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169950,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238969,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387501,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388500,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408920,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791307,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911285,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.newegg.ca/p/pl?d=6700xt&Order=1"
                },
                "total_time": 672314,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672315,
                "total_time_inactive": -1,
                "total_time_loaded": 169950,
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
                            "time": 1689816238966
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387496
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388482
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408916
                        }
                    ],
                    "origin": "https://www.termius.com",
                    "title": "Free SSH client for Windows",
                    "total_time": 672301,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672302,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238966,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387496,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388482,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408916,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529270,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731283,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791280,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851296,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911269,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.termius.com/free-ssh-client-for-windows"
                },
                "total_time": 672301,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 672302,
                "total_time_inactive": -1,
                "total_time_loaded": 169949,
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
                            "time": 1689816238969
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387497
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388489
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408916
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) YouTube",
                    "total_time": 672321,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672322,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169946,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238969,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387497,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388489,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408916,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791302,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851289,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911292,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/"
                },
                "https://www.youtube.com/watch?v=0EtgwIajVqs": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238972
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387500
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388494
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408920
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Download These Handy Tools NOW! - YouTube",
                    "total_time": 672313,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672314,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169947,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238972,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387500,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388494,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408920,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791294,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851287,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911287,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=0EtgwIajVqs"
                },
                "https://www.youtube.com/watch?v=4ArVvrhhnyI": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238974
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387502
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388497
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408924
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) How 23 Foods Get To The Grocery Store | Big Business | Insider Business - YouTube",
                    "total_time": 672311,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672312,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238974,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387502,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388497,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408924,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731292,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791292,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851300,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911287,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=4ArVvrhhnyI"
                },
                "https://www.youtube.com/watch?v=5RC9cKkQYGA": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238968
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387497
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388489
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408916
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "MEGA FARM from 0$ on FLAT MAP with @FarmingGenius 👉 #1 - YouTube",
                    "total_time": 672316,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672317,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169947,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238968,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387497,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388489,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408916,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589285,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731291,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791295,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911286,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=5RC9cKkQYGA"
                },
                "https://www.youtube.com/watch?v=F3TMRCO8eyQ": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238970
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387498
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388491
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408918
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Sergio Perez Storms Through The Field In Austria! | 2023 Austrian Grand Prix - YouTube",
                    "total_time": 672315,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672316,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169947,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238970,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387498,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388491,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408918,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791293,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851287,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911287,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=F3TMRCO8eyQ"
                },
                "https://www.youtube.com/watch?v=FLRnk01ffE8": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238973
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387503
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388495
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408924
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) What could Russia learn from a captured Leopard 2 tank? - YouTube",
                    "total_time": 672311,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672312,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169950,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238973,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387503,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388495,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408924,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589285,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731291,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791295,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911286,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=FLRnk01ffE8"
                },
                "https://www.youtube.com/watch?v=FStOT4pP2tc": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238969
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387498
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388489
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408918
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "My 10 YEAR Indie Game Development Journey - YouTube",
                    "total_time": 672305,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672306,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169948,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238969,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387498,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388489,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408918,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791293,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911276,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=FStOT4pP2tc"
                },
                "https://www.youtube.com/watch?v=HFDTAqUhH2o": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238976
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387499
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388492
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408918
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Saving the cheapest PC on eBay - YouTube",
                    "total_time": 672307,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672308,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169941,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238976,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387499,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388492,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408918,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791319,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851303,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911285,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=HFDTAqUhH2o"
                },
                "https://www.youtube.com/watch?v=HRcI7RSm9_o": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238971
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387500
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388491
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408920
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) I Think 'F1 World' In The F1 23 Game Is A Flop... - YouTube",
                    "total_time": 672303,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672304,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169948,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238971,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387500,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388491,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408920,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791293,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911276,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=HRcI7RSm9_o"
                },
                "https://www.youtube.com/watch?v=Koc63QhxPgk": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238969
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387499
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388491
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408919
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Weak Perfect Graph Theorem - YouTube",
                    "total_time": 672315,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672316,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238969,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387499,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388491,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408919,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589285,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731291,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791295,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911286,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=Koc63QhxPgk"
                },
                "https://www.youtube.com/watch?v=LUjR54Hf_dc": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238972
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387500
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388495
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408922
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) EXTENDED Race Highlights I 2023 6 Hours of Monza I FIA WEC - YouTube",
                    "total_time": 672313,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672314,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238972,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387500,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388495,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408922,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731292,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791292,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851300,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911287,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=LUjR54Hf_dc"
                },
                "https://www.youtube.com/watch?v=MF-KR6A3KyM": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238972
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387505
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388501
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408922
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Minecrafts Strangest EXPLOIT - Block Transmutation... - YouTube",
                    "total_time": 672308,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672309,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238972,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387505,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388501,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408922,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731293,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791318,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911282,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=MF-KR6A3KyM"
                },
                "https://www.youtube.com/watch?v=QeVJOUFZV3U&list=PL-cVSmXe-NPgNO-cyZ_mie7e2c4Ley20q&index=17": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238970
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387498
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388493
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408919
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) BRAKE CHECKED BY AI! AI R&D FINALLY CATCHING UP! WE'VE GOT WORK TO DO - F1 23 MY TEAM CAREER Part 17 - YouTube",
                    "total_time": 672315,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672316,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169948,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238970,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387498,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388493,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408919,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731292,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791292,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851300,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911287,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=QeVJOUFZV3U&list=PL-cVSmXe-NPgNO-cyZ_mie7e2c4Ley20q&index=17"
                },
                "https://www.youtube.com/watch?v=UTEAvb-tikU": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238974
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387502
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388496
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408923
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) How This Tiny Truck Took Down an Army - YouTube",
                    "total_time": 672311,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672312,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169948,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238974,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387502,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388496,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408923,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791294,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851287,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911287,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=UTEAvb-tikU"
                },
                "https://www.youtube.com/watch?v=VPOu1mQ8Xho": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238986
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387500
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388499
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408940
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Nvidia RTX 4060 Ti 16GB Sales, AMD RX 7900, Meta exits Intel Leak, Arrow Lake | June Loose Ends - YouTube",
                    "total_time": 672310,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672311,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169953,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238986,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387500,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388499,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408940,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731309,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791303,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851294,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911298,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=VPOu1mQ8Xho"
                },
                "https://www.youtube.com/watch?v=X29vxhlZIzE": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238973
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387514
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388493
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408923
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Can I get Top 100 on Every Map in the Summer Campaign? - YouTube",
                    "total_time": 672301,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672302,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238973,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387514,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388493,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408923,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791294,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851282,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911276,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=X29vxhlZIzE"
                },
                "https://www.youtube.com/watch?v=Y0Ko0kvwfgA": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238970
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387503
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388499
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408918
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) How Do Games Render So Much Grass? - YouTube",
                    "total_time": 672310,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672311,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169947,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238970,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387503,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388499,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408918,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731293,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791318,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911282,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=Y0Ko0kvwfgA"
                },
                "https://www.youtube.com/watch?v=bgR3yESAEVE": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238969
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387498
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388496
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408919
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "Can Chess, with Hexagons? - YouTube",
                    "total_time": 672327,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672328,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238969,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387498,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388496,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408919,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731309,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791302,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851294,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911298,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=bgR3yESAEVE"
                },
                "https://www.youtube.com/watch?v=d2Tm3Yx4HWI": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238967
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387495
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388491
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408917
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "Academia is BROKEN! - Harvard Fake Data Scandal Explained - YouTube",
                    "total_time": 672329,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672330,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238967,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387495,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388491,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408917,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731309,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791302,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851294,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911298,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=d2Tm3Yx4HWI"
                },
                "https://www.youtube.com/watch?v=eYceyv7a4tA": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238981
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387505
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388498
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408925
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) BEST GPUs to Buy Right Now... Nvidia Prices Plummet! - YouTube",
                    "total_time": 672302,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672303,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169943,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238981,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387505,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388498,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408925,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791319,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851303,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911285,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=eYceyv7a4tA"
                },
                "https://www.youtube.com/watch?v=g3X1QXXDXjw": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238968
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387495
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388489
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408915
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "Abusing the Banking System to get rich on a Pay-to-win Server! - Complex Gaming - YouTube",
                    "total_time": 672301,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672302,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169946,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238968,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299267,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387495,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388489,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408915,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589276,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731283,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791283,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851291,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911271,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=g3X1QXXDXjw"
                },
                "https://www.youtube.com/watch?v=i7jOxAarbo4": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238971
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387501
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388493
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408921
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) AMD RX 7700 & 7800 Benchmark, Nvidia RTX 4060 Ti 16GB Review, Intel i9-14900KS | Broken Silicon 214 - YouTube",
                    "total_time": 672313,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672314,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238971,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387501,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388493,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408921,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589285,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731291,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791295,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911286,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=i7jOxAarbo4"
                },
                "https://www.youtube.com/watch?v=iSpL9LnczVQ": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238976
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387511
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388505
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408927
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Building A Budget NAS with TrueNAS Scale - YouTube",
                    "total_time": 672305,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672306,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169950,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238976,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387511,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388505,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408927,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731293,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791318,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911283,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=iSpL9LnczVQ"
                },
                "https://www.youtube.com/watch?v=j9ODgfIaxc4": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238968
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387496
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388489
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408916
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) The Race to Save Texas’ Failed Megabridge - YouTube",
                    "total_time": 672317,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672318,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169947,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238968,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387496,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388489,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408916,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589275,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791293,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851287,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911287,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=j9ODgfIaxc4"
                },
                "https://www.youtube.com/watch?v=o8YgqN9cG84": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238978
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387501
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388494
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408921
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "(656) Renovating a canoe while running a marathon - YouTube",
                    "total_time": 672305,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672306,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169942,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238978,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387501,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388494,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408921,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791319,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851303,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911285,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=o8YgqN9cG84"
                },
                "https://www.youtube.com/watch?v=rTN749kONJI": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238964
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387488
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388479
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408914
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "I Bought a \"BROKEN\" Graphics Card on eBay... Can I Fix it?!? - YouTube",
                    "total_time": 672332,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672333,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238964,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387488,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388479,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408914,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529271,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731309,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791302,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851294,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911298,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=rTN749kONJI"
                },
                "https://www.youtube.com/watch?v=tk9guzivxiU": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238974
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387497
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388490
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408917
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "Epic 211-shot badminton rally delights fans in Malaysia - YouTube",
                    "total_time": 672309,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672310,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169942,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238974,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299269,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359274,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387497,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388490,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408917,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589284,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649278,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731298,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791319,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851303,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911285,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=tk9guzivxiU"
                },
                "https://www.youtube.com/watch?v=x2ulsZ6aGXY": {
                    "loaded_time": [
                        {
                            "state": "loaded",
                            "time": 1689816238974
                        },
                        {
                            "state": "loaded",
                            "time": 1689816387507
                        },
                        {
                            "state": "loaded",
                            "time": 1689816388504
                        },
                        {
                            "state": "loaded",
                            "time": 1689816408924
                        }
                    ],
                    "origin": "https://www.youtube.com",
                    "title": "So how DO you build a safe submersible? - DSV Alvin - YouTube",
                    "total_time": 672307,
                    "total_time_active": -1,
                    "total_time_audible": -1,
                    "total_time_closed": -1,
                    "total_time_hidden": 672308,
                    "total_time_inactive": -1,
                    "total_time_loaded": 169949,
                    "total_time_muted": -1,
                    "total_time_unmuted": -1,
                    "total_time_visible": -1,
                    "total_visits": -1,
                    "update_time": [
                        {
                            "time": 1689816238974,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816299268,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816359273,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816387507,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816388504,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816408924,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816469272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816529272,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816589286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816649279,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816731293,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816791318,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816851286,
                            "visibility": "hidden"
                        },
                        {
                            "time": 1689816911283,
                            "visibility": "hidden"
                        }
                    ],
                    "url": "https://www.youtube.com/watch?v=x2ulsZ6aGXY"
                },
                "total_time": 18824732,
                "total_time_active": -1,
                "total_time_audible": -1,
                "total_time_closed": -1,
                "total_time_hidden": 18824760,
                "total_time_inactive": -1,
                "total_time_loaded": 4758530,
                "total_time_muted": -1,
                "total_time_unmuted": -1,
                "total_time_visible": -1,
                "total_visits": -1
            }
        }
    ],
    "timeSinceInstall": 535171
}
 */