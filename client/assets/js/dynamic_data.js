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

    // for (let i = 0; i < times.length; i++) {
    //     times[i] = Math.floor(times[i] / totalTimeUsed * 100)
    // }

    console.log("Colors: ", colors)
    console.log("Times: ", times)

    new Chart(pieChart, {
        type: 'doughnut', data: {
            labels: labels,
            datasets: [{
                backgroundColor: colors,
                hoverBackgroundColor: colors,
                data: times,
                borderWidth: [1, 1, 1, 1, 1]
            }]
        }, options: {
            maintainAspectRatio: false,
            cutout: 100,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
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
    /*
    <li class="list-group-item d-flex bg-transparent justify-content-between align-items-center border-top">T-Shirts <span class="badge bg-danger rounded-pill">10</span>
							</li>
							<li class="list-group-item d-flex bg-transparent justify-content-between align-items-center">Shoes <span class="badge bg-primary rounded-pill">65</span>
							</li>
							<li class="list-group-item d-flex bg-transparent justify-content-between align-items-center">Pants <span class="badge bg-warning text-dark rounded-pill">14</span>
							</li>
     */

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

/*example data
{
    "https://account.termius.com": {
        "https://account.termius.com/": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535398
                }
            ],
            "origin": "https://account.termius.com",
            "title": "Termius",
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
                    "time": 1689120535398,
                    "visibility": "hidden"
                }
            ],
            "url": "https://account.termius.com/"
        }
    },
    "https://chat.openai.com": {
        "https://chat.openai.com/?model=text-davinci-002-render-sha": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535394
                }
            ],
            "origin": "https://chat.openai.com",
            "title": "ChatGPT",
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
                    "time": 1689120535394,
                    "visibility": "hidden"
                }
            ],
            "url": "https://chat.openai.com/?model=text-davinci-002-render-sha"
        }
    },
    "https://dash.fredthedoggy.me": {
        "https://dash.fredthedoggy.me/server/2303629f": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535412
                }
            ],
            "origin": "https://dash.fredthedoggy.me",
            "title": "Fredthedoggy Summer SMP | Console",
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
                    "time": 1689120535412,
                    "visibility": "hidden"
                }
            ],
            "url": "https://dash.fredthedoggy.me/server/2303629f"
        }
    },
    "https://developer.chrome.com": {
        "https://developer.chrome.com/docs/extensions/reference/runtime/": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535400
                }
            ],
            "origin": "https://developer.chrome.com",
            "title": "chrome.runtime - Chrome Developers",
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
                    "time": 1689120535400,
                    "visibility": "hidden"
                }
            ],
            "url": "https://developer.chrome.com/docs/extensions/reference/runtime/"
        },
        "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535405
                }
            ],
            "origin": "https://developer.chrome.com",
            "title": "chrome.runtime - Chrome Developers",
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
                    "time": 1689120535405,
                    "visibility": "hidden"
                }
            ],
            "url": "https://developer.chrome.com/docs/extensions/reference/runtime/#event-onConnect"
        }
    },
    "https://docs.google.com": {
        "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535400
                }
            ],
            "origin": "https://docs.google.com",
            "title": "Todo list - Google Docs",
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
                    "time": 1689120535400,
                    "visibility": "hidden"
                }
            ],
            "url": "https://docs.google.com/document/d/1cIj83CXmAN6R2vEJyHzsJVnEJUJrzPhzvKMHrzlnNZ0/edit"
        }
    },
    "https://login.microsoftonline.com": {
        "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DOEEN_8FpuH_qcIz6Ba3QN-s_mLP5JDageqzo2LrEM3mxWBgGgsz7vph3tcYUj6wnv9FWRhevGot91sFtvHgcBnB1P5-2V4m2QM9LsHT-Cm4svDK4Huyv6onkV38e5iOiEwqf_E86vuNTOZulAJEGfw&response_mode=form_post&nonce=638245343261842304.NTlmYzY0NjctODczYS00OTkzLWE5ZTUtNjVkNjY1Y2QxNWUwNDAyMDczYjktZmQyZi00NjAwLThkNmMtYmExMjUzMGZlYmJh&redirect_uri=https%3A%2F%2Fportal.office.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=c3df525c-1647-474e-aca8-dbf1fd068666&x-client-SKU=ID_NET472&x-client-ver=6.30.1.0&sso_reload=true": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535406
                }
            ],
            "origin": "https://login.microsoftonline.com",
            "title": "Sign in to your account",
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
                    "time": 1689120535406,
                    "visibility": "hidden"
                }
            ],
            "url": "https://login.microsoftonline.com/common/oauth2/authorize?client_id=00000006-0000-0ff1-ce00-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DOEEN_8FpuH_qcIz6Ba3QN-s_mLP5JDageqzo2LrEM3mxWBgGgsz7vph3tcYUj6wnv9FWRhevGot91sFtvHgcBnB1P5-2V4m2QM9LsHT-Cm4svDK4Huyv6onkV38e5iOiEwqf_E86vuNTOZulAJEGfw&response_mode=form_post&nonce=638245343261842304.NTlmYzY0NjctODczYS00OTkzLWE5ZTUtNjVkNjY1Y2QxNWUwNDAyMDczYjktZmQyZi00NjAwLThkNmMtYmExMjUzMGZlYmJh&redirect_uri=https%3A%2F%2Fportal.office.com%2Flanding&ui_locales=en-US&mkt=en-US&client-request-id=c3df525c-1647-474e-aca8-dbf1fd068666&x-client-SKU=ID_NET472&x-client-ver=6.30.1.0&sso_reload=true"
        }
    },
    "https://mail.google.com": {
        "https://mail.google.com/mail/u/1/#inbox": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535410
                }
            ],
            "origin": "https://mail.google.com",
            "title": "Inbox (17,765) - aidenm888@gmail.com - Gmail",
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
                    "time": 1689120535410,
                    "visibility": "hidden"
                }
            ],
            "url": "https://mail.google.com/mail/u/1/#inbox"
        }
    },
    "https://stackoverflow.com": {
        "https://stackoverflow.com/questions/48107746/chrome-extension-message-not-sending-response-undefined": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535410
                }
            ],
            "origin": "https://stackoverflow.com",
            "title": "javascript - Chrome Extension message not sending response (undefined) - Stack Overflow",
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
                    "time": 1689120535410,
                    "visibility": "hidden"
                }
            ],
            "url": "https://stackoverflow.com/questions/48107746/chrome-extension-message-not-sending-response-undefined"
        }
    },
    "https://www.figma.com": {
        "https://www.figma.com/file/qs5dHUU5GnlizPLtUmjtLU/Untitled?type=design&node-id=1-2&mode=design&t=aLjigvxqCWXz8t4r-0": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535399
                }
            ],
            "origin": "https://www.figma.com",
            "title": "Untitled – Figma",
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
                    "time": 1689120535399,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.figma.com/file/qs5dHUU5GnlizPLtUmjtLU/Untitled?type=design&node-id=1-2&mode=design&t=aLjigvxqCWXz8t4r-0"
        }
    },
    "https://www.instagram.com": {
        "https://www.instagram.com/direct/t/121245089267066/": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535407
                }
            ],
            "origin": "https://www.instagram.com",
            "title": "Instagram • Chats",
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
                    "time": 1689120535407,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.instagram.com/direct/t/121245089267066/"
        }
    },
    "https://www.youtube.com": {
        "https://www.youtube.com/": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535401
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) YouTube",
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
                    "time": 1689120535401,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/"
        },
        "https://www.youtube.com/watch?v=-VArcrXvte0": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535404
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) Castelnaud - A Stunning New French Map for Farming Simulator 22 - YouTube",
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
                    "time": 1689120535404,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=-VArcrXvte0"
        },
        "https://www.youtube.com/watch?v=0aEcWTxnLUI": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535406
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "$1M Invested to Start a Laundromat (Was It Worth It?) - YouTube",
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
                    "time": 1689120535406,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=0aEcWTxnLUI"
        },
        "https://www.youtube.com/watch?v=2WKKt6y0vg4": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535402
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) I tried adding 10 YouTube comments to my game - YouTube",
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
                    "time": 1689120535402,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=2WKKt6y0vg4"
        },
        "https://www.youtube.com/watch?v=4ArVvrhhnyI": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535408
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "How 23 Foods Get To The Grocery Store | Big Business | Insider Business - YouTube",
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
                    "time": 1689120535408,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=4ArVvrhhnyI"
        },
        "https://www.youtube.com/watch?v=5RC9cKkQYGA": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535403
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "MEGA FARM from 0$ on FLAT MAP with @FarmingGenius 👉 #1 - YouTube",
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
                    "time": 1689120535403,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=5RC9cKkQYGA"
        },
        "https://www.youtube.com/watch?v=Er4tZGtxbhE": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535403
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) Hitting MAX PRESTIGE in Hypixel SkyBlock - YouTube",
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
                    "time": 1689120535403,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=Er4tZGtxbhE"
        },
        "https://www.youtube.com/watch?v=FStOT4pP2tc": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535403
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) My 10 YEAR Indie Game Development Journey - YouTube",
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
                    "time": 1689120535403,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=FStOT4pP2tc"
        },
        "https://www.youtube.com/watch?v=KHWOwYb1HLk": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535406
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "Qualifying Highlights | 2023 British Grand Prix - YouTube",
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
                    "time": 1689120535406,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=KHWOwYb1HLk"
        },
        "https://www.youtube.com/watch?v=P9pWFhtTMzA": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535412
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) Dubai Complete Travel Guide - UAE Bucket List - YouTube",
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
                    "time": 1689120535412,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=P9pWFhtTMzA"
        },
        "https://www.youtube.com/watch?v=YtkIWDE36qU": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535406
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "The absurd circle division pattern (updated) | Moser's circle problem - YouTube",
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
                    "time": 1689120535406,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=YtkIWDE36qU"
        },
        "https://www.youtube.com/watch?v=_QYj9fWmF_0": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535403
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) Trackmania's Hardest Fullspeed Map has a Sequel... - YouTube",
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
                    "time": 1689120535403,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=_QYj9fWmF_0"
        },
        "https://www.youtube.com/watch?v=bgR3yESAEVE": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535404
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(552) Can Chess, with Hexagons? - YouTube",
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
                    "time": 1689120535404,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=bgR3yESAEVE"
        },
        "https://www.youtube.com/watch?v=fL89gyZJr2w": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535406
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "I Saved $40 at the Grocery Store Buying Steak.. Let Me Show You How! - YouTube",
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
                    "time": 1689120535406,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=fL89gyZJr2w"
        },
        "https://www.youtube.com/watch?v=fq6jDxJk1LM": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535406
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "The Business Strategies Behind Starbucks, Costco, Chick-fil-A and More | WSJ The Economics Of - YouTube",
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
                    "time": 1689120535406,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=fq6jDxJk1LM"
        },
        "https://www.youtube.com/watch?v=g3X1QXXDXjw": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535404
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) Duping on a Pay-to-win Server using banks - Complex Gaming - YouTube",
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
                    "time": 1689120535404,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=g3X1QXXDXjw"
        },
        "https://www.youtube.com/watch?v=gisdyTBMNyQ": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535403
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(552) I thought this rotating house was impossible. - YouTube",
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
                    "time": 1689120535403,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=gisdyTBMNyQ"
        },
        "https://www.youtube.com/watch?v=h1ughnk4XVc": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535406
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "McLaren’s dramatic F1 2023 turnaround explained - YouTube",
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
                    "time": 1689120535406,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=h1ughnk4XVc"
        },
        "https://www.youtube.com/watch?v=hfn4HTfA0VA": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535406
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "New Cut for A07 - YouTube",
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
                    "time": 1689120535406,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=hfn4HTfA0VA"
        },
        "https://www.youtube.com/watch?v=k9etof3RqlA": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535402
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) AI designed this. The future of CAD. - YouTube",
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
                    "time": 1689120535402,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=k9etof3RqlA"
        },
        "https://www.youtube.com/watch?v=kxZEMk4PlVs": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535406
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "BEGINNING DEVELOPMENT OF CHARLYBINSK - Workers and Resources Realistic Gameplay - 05 - YouTube",
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
                    "time": 1689120535406,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=kxZEMk4PlVs"
        },
        "https://www.youtube.com/watch?v=lUbEmPIP_sw": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535401
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(552) HELLO DEBT, MY OLD FRIEND - Workers and Resources Realistic Gameplay - 06 - YouTube",
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
                    "time": 1689120535401,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=lUbEmPIP_sw"
        },
        "https://www.youtube.com/watch?v=o2qi9SlrX_U": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535401
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) FINALLY REVEALING OUR NURBURGRING RACE CAR!!! - IT LOOKS AWESOME! - YouTube",
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
                    "time": 1689120535401,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=o2qi9SlrX_U"
        },
        "https://www.youtube.com/watch?v=oKPrFgytcVI": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535406
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "Mechanical Mastery Minecraft Modpack EP1 Tier 1 AUTOMATION of EMC - YouTube",
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
                    "time": 1689120535406,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=oKPrFgytcVI"
        },
        "https://www.youtube.com/watch?v=uVOFckoMdIU": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535404
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) Engineering Minecraft's Fastest Shulker Farm - YouTube",
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
                    "time": 1689120535404,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=uVOFckoMdIU"
        },
        "https://www.youtube.com/watch?v=vvU3Dn_8sFI": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535404
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "Time Until Superintelligence: 1-2 Years, or 20? Something Doesn't Add Up - YouTube",
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
                    "time": 1689120535404,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=vvU3Dn_8sFI"
        },
        "https://www.youtube.com/watch?v=wUqOnOrRMi4": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535403
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "(561) 5 Things We Learned From The British Grand Prix - YouTube",
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
                    "time": 1689120535403,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=wUqOnOrRMi4"
        },
        "https://www.youtube.com/watch?v=yLGRkxbMh9o": {
            "loaded_time": [
                {
                    "state": "loaded",
                    "time": 1689120535406
                }
            ],
            "origin": "https://www.youtube.com",
            "title": "How Army Cooks Are Trained To Feed 800 Soldiers In The Field | Boot Camp | Insider Business - YouTube",
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
                    "time": 1689120535406,
                    "visibility": "hidden"
                }
            ],
            "url": "https://www.youtube.com/watch?v=yLGRkxbMh9o"
        }
    }
}
*/