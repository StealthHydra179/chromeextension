console.log("hi")
//get speciic data from the database
chrome.runtime.sendMessage({ message: "requestData" }, (response) => {
    console.log(response)


    //update the website

    //unique websites visited
    document.getElementById("websites_visited_row_1").innerHTML = Object.keys(response).length


    //unique webpages visited (miltiply by total visited or smth?)
    let webpageCount = 0
    for (let website in response) {
        webpageCount += Object.keys(response[website]).length
    }
    document.getElementById("webpages_visited_row_1").innerHTML = webpageCount


    //Average Time Per Day Over The Last 7 Days


    //total time used
    let totalTime = 0
    for (let website in response) {
        for (let webpage in response[website]) {
            if (response[website][webpage]["total_time"] <= -1) {
                continue
            }
            totalTime += response[website][webpage]["total_time"]
        }
    }
    document.getElementById("total_time_used_row_1").innerHTML = totalTime
})


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