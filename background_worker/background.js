let tabList = [];
let specificList = {};
let changedSchema = false;
let installTime;
let timeOnline;
let startUpTime;
let initialized = false;

chrome.scripting
    .getRegisteredContentScripts()
    .then(scripts => console.log("registered content scripts", scripts));
//script on all tabs when extension is created
chrome.runtime.onInstalled.addListener(function() {
    chrome.scripting
        .unregisterContentScripts({ ids: ["session-script"] })
        .then(() => {
            console.log("un-registration complete");
            chrome.storage.local.get("tabList", function(result) {
                if (result.tabList !== [] && !changedSchema && result.tabList !== undefined && result.tabList !== null) {
                    tabList = result.tabList;
                    console.log("tabList loaded from storage: ");
                    console.log(tabList);
                } else {
                    console.log("tabList not loaded from storage");
                }

                chrome.scripting
                    .registerContentScripts([{
                        id: "session-script",
                        js: ["background_worker/injected_content.js"],
                        persistAcrossSessions: false,
                        matches: ["<all_urls>"],
                        runAt: "document_start"
                    }])
                    .then(() => console.log("registration complete"))
                    .catch((err) => console.warn("unexpected error", err));


                installTime = Date.now();
                chrome.storage.local.get("timeOnline", function(result) {
                    if (result.timeOnline) {
                        timeOnline = result.timeOnline;
                        console.log("timeOnline loaded from storage: " + timeOnline);
                    } else {
                        timeOnline = 0;
                    }
                });
                startUpTime = Date.now();
                //set installed time
                chrome.storage.local.set({ installTime: installTime }, function(result) {
                    console.log("installTime set to " + installTime);
                });

                initialized = true;
            });

        });

});

chrome.runtime.onStartup.addListener(function() {
    //same as installed

    chrome.scripting
        .unregisterContentScripts({ ids: ["session-script"] })
        .then(() => {
            console.log("un-registration complete");

            chrome.storage.local.get("tabList", function(result) {
                if (result.tabList !== [] && !changedSchema && result.tabList !== undefined && result.tabList !== null) {
                    tabList = result.tabList;
                    console.log("tabList loaded from storage: ");
                    console.log(tabList);
                } else {
                    console.log("tabList not loaded from storage");
                }
                //update tabList with current tab info
                // chrome.tabs.query({}, function(tabArray) {
                //     tabArray.forEach((tab) => {
                //         chrome.scripting
                //             .executeScript({
                //                 target: { tabId: tab.id },
                //                 files: ["background_worker/injected_content.js"]
                //             })
                //             .then(() => {
                //                 console.log("injected content script into all tabs");
                //             })
                //             .catch((err) => {
                //                 console.log(err);
                //                 console.log(tab.url);
                //             });
                //     });
                // });


                chrome.scripting
                    .registerContentScripts([{
                        id: "session-script",
                        js: ["background_worker/injected_content.js"],
                        persistAcrossSessions: false,
                        matches: ["<all_urls>"],
                        runAt: "document_start"
                    }])
                    .then(() => console.log("registration complete"))
                    .catch((err) => console.warn("unexpected error", err));

            });
        });


    chrome.storage.local.get("installTime", function(result) {
        installTime = result.installTime;
        console.log("installTime loaded from storage: " + installTime);
    });

    chrome.storage.local.get("timeOnline", function(result) {
        if (result.timeOnline) {
            timeOnline = result.timeOnline;
            console.log("timeOnline loaded from storage: " + timeOnline);
        } else {
            timeOnline = 0;
        }
    });
    startUpTime = Date.now();
    initialized = true;
});

chrome.runtime.onSuspend.addListener(function() {
    let sessionOnline = Date.now() - startUpTime;
    timeOnline += sessionOnline;
    chrome.storage.local.set({ timeOnline: timeOnline }, function(result) {
        console.log("timeOnline set to " + timeOnline);
    });
    console.log("unloading");
    chrome.scripting
        .unregisterContentScripts({ ids: ["session-script"] })
        .then(() => console.log("un-registration complete"));
});

chrome.runtime.onSuspendCanceled.addListener(function() {
    startUpTime = Date.now();
    console.log("loading");
    //run the startup code


    //same as installed
    chrome.storage.local.get("tabList", function(result) {
        if (result.tabList !== [] && !changedSchema && result.tabList !== undefined && result.tabList !== null) {
            tabList = result.tabList;
            console.log("tabList loaded from storage: ");
            console.log(tabList);
        } else {
            console.log("tabList not loaded from storage");
        }
        //update tabList with current tab info
        // chrome.tabs.query({}, function(tabArray) {
        //     tabArray.forEach((tab) => {
        //         chrome.scripting
        //             .executeScript({
        //                 target: { tabId: tab.id },
        //                 files: ["background_worker/injected_content.js"]
        //             })
        //             .then(() => {
        //                 console.log("injected content script into all tabs");
        //             })
        //             .catch((err) => {
        //                 console.log(err);
        //                 console.log(tab.url);
        //             });
        //     });
        // });

        chrome.scripting
            .registerContentScripts([{
                id: "session-script",
                js: ["background_worker/injected_content.js"],
                persistAcrossSessions: false,
                matches: ["<all_urls>"],
                runAt: "document_start"
            }])
            .then(() => console.log("registration complete"))
            .catch((err) => console.warn("unexpected error", err));

    });

    chrome.storage.local.get("installTime", function(result) {
        installTime = result.installTime;
        console.log("installTime loaded from storage: " + installTime);
    });

    chrome.storage.local.get("timeOnline", function(result) {
        if (result.timeOnline) {
            timeOnline = result.timeOnline;
            console.log("timeOnline loaded from storage: " + timeOnline);
        } else {
            timeOnline = 0;
        }
    });
    startUpTime = Date.now();

    initialized = true;
});


//when new tab is created
chrome.tabs.onCreated.addListener(function(tab) {
    chrome.scripting
        .executeScript({
            target: { tabId: tab.id },
            files: ["background_worker/injected_content.js"]
        })
        .then(() => {
            // console.log("injected content script into new tab")
        })
        .catch((err) => console.log(err));
});

//when tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        chrome.scripting
            .executeScript({
                target: { tabId: tab.id },
                files: ["background_worker/injected_content.js"]
            })
            .then(() => {
                // console.log("injected content script into updated tab")
            })
            .catch((err) => console.log(err));
    }
});

//chrome:// tabs don't work

//get current state of the tabs and store it in tabList
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message!" + request.message);
    if (!initialized) {
        console.log("Not Initialized");
        sendResponse("Not Initialized");
        chrome.storage.local.get("tabList", function(result) {
            if (result.tabList !== [] && !changedSchema && result.tabList !== undefined && result.tabList !== null) {
                tabList = result.tabList;
                console.log("tabList loaded from storage: ");
                console.log(tabList);

                initialized = true;
                updateStorage();
                generateSpecifics();
            } else {
                console.log("tabList not loaded from storage");
            }
            //update tabList with current tab info
            chrome.tabs.query({}, function(tabArray) {
                tabArray.forEach((tab) => {
                    chrome.scripting
                        .executeScript({
                            target: { tabId: tab.id },
                            files: ["background_worker/injected_content.js"]
                        })
                        .then(() => {
                            console.log("injected content script into all tabs");
                        })
                        .catch((err) => {
                            console.log(err);
                            console.log(tab.url);
                        });
                });
            });
        });

        chrome.storage.local.get("installTime", function(result) {
            installTime = result.installTime;
            console.log("installTime loaded from storage: " + installTime);
        });

        chrome.storage.local.get("timeOnline", function(result) {
            if (result.timeOnline) {
                timeOnline = result.timeOnline;
                console.log("timeOnline loaded from storage: " + timeOnline);
            } else {
                timeOnline = 0;
            }
        });
        startUpTime = Date.now();
    } else {
        if (request.message === "requestData") {
            console.log("requestData received");
            chrome.storage.local.get("specificList", function(result) {
                specificList = result.specificList;
                updateStorage();
                generateSpecifics();

                let sortedSpecificArray = [];
                for (const [key, value] of Object.entries(specificList)) {
                    sortedSpecificArray.push({ key: key, value: value });
                }

                sortedSpecificArray.sort(function(a, b) {
                    return b.value.total_time_visible - a.value.total_time_visible;
                });

                let sortedTabList = [];

                tabList.forEach((tab) => {
                    sortedTabList.push(tab);
                });

                sortedTabList.sort(function(a, b) {
                    return b.total_time_visible - a.total_time_visible;
                });
                console.log("sortedTabList: ", sortedTabList);
                let sentData = {
                    tabList: tabList,
                    sortedTabList: sortedTabList,
                    specificList: specificList,
                    sortedSpecificArray: sortedSpecificArray,

                    timeSinceInstall: Date.now() - installTime,
                    timeOnline: timeOnline + (Date.now() - startUpTime)
                };
                sendResponse(sentData);
                console.log("sentData sent");
                console.log(sentData);
            });

            return true;
        }
        //why is this run like 55 times?
        // console.log(request.message.state, sender.url);
        if (request.message.state === "loaded") {
            //if object exists, update it
            //if object doesn't exist, add it
            let tabExists = false;
            tabList.forEach((tab) => {
                if (tab.documentId === sender.documentId) {
                    tabExists = true;
                    tab.visibility = "hidden";
                    tab.update_time.push({
                        visibility: "hidden",
                        time: request.message.update_time
                    });
                    tab.loaded_time.push({
                        state: "loaded",
                        time: request.message.update_time
                    });
                    tab.open = true;
                    tab.last_update_time = request.message.update_time;
                }
            });
            if (!tabExists) {
                tabList.push({
                    documentId: sender.documentId,
                    origin: sender.origin,
                    url: sender.url,
                    // "document_url": sender.origin,
                    title: sender.tab.title,
                    visibility: "hidden",
                    active: sender.tab.active,
                    audible: sender.tab.audible,
                    muted: sender.tab.mutedInfo.muted,
                    update_time: [{ visibility: "hidden", time: request.message.update_time }],
                    loaded_time: [{ state: "loaded", time: request.message.update_time }],
                    active_time: [{ active: false, time: request.message.update_time }],
                    open: true,
                    last_update_time: request.message.update_time,
                    favicon: sender.tab.favIconUrl
                });
            }
        }
        if (request.message.state === "closed") {
            //update tabList
            tabList.forEach((tab) => {
                if (tab.documentId === sender.documentId) {
                    tab.open = false;
                    tab.last_update_time = request.message.update_time;
                    tab.update_time.push({
                        visibility: "hidden",
                        time: request.message.update_time
                    });
                    tab.loaded_time.push({
                        state: "closed",
                        time: request.message.update_time
                    });
                    tab.open = false;
                }
            });
        }
        if (request.message.state === "visible") {
            // console.log("ifvisible")
            tabList.forEach((tab) => {
                if (tab.documentId === sender.documentId) {
                    //&& request.message.update_time >= tab.last_update_time
                    // console.log("visible")
                    tab.visibility = "visible";
                    tab.update_time.push({
                        visibility: "visible",
                        time: request.message.update_time
                    });
                }
            });
        }
        if (request.message.state === "hidden") {
            // console.log("ifhidden")
            tabList.forEach((tab) => {
                if (tab.documentId === sender.documentId) {
                    // && request.message.update_time >= tab.last_update_time
                    // console.log("hidden")
                    tab.visibility = "hidden";
                    tab.update_time.push({
                        visibility: "hidden",
                        time: request.message.update_time
                    });
                }
            });
        }
        if (request.message.state === "active") {
            // console.log("ifactive")
            tabList.forEach((tab) => {
                if (tab.documentId === sender.documentId) {
                    // && request.message.update_time >= tab.last_update_time
                    // console.log("active")
                    tab.active = true;
                    tab.active_time.push({
                        active: true,
                        time: request.message.update_time
                    });
                }
            });
        }
        if (request.message.state === "inactive") {
            // console.log("ifinactive")
            tabList.forEach((tab) => {
                if (tab.documentId === sender.documentId) {
                    // && request.message.update_time >= tab.last_update_time
                    // console.log("inactive")
                    tab.active = false;
                    tab.active_time.push({
                        active: false,
                        time: request.message.update_time
                    });
                }
            });
        }
        // console.log(tabList)
        // console.log(request.message)

        updateStorage();
        generateSpecifics();
        /*
          example sender object:
              documentId: "7DF44B79F740FEDBB3300A015FCA347D"
              documentLifecycle: "active"
              frameId: 0
              id: "ofakeomadjpnbfnabflblfgfcbcjdfpf"
              origin: "https://parks.canada.ca"
              tab: {active: true, audible: false, autoDiscardable: true, discarded: false, favIconUrl: 'https://www.canada.ca/etc/designs/canada/wet-boew/assets/favicon.ico', …}
              url: "https://parks.canada.ca/pn-np/on/bruce/activ/camping"

          example tab object:
              active: true
              audible: false
              autoDiscardable: true
              discarded: false
              favIconUrl: "https://www.canada.ca/etc/designs/canada/wet-boew/assets/favicon.ico"
              groupId: -1
              height: 653
              highlighted: true
              id: 1421766072
              incognito: false
              index: 14
              mutedInfo: {muted: false}
              pinned: false
              selected: true
              status: "complete"
              title: "Camping and overnight accommodations - Bruce Peninsula National Park"
              url: "https://parks.canada.ca/pn-np/on/bruce/activ/camping"
              width: 1278
              windowId: 1421766057
          */
    }
});


//update history
function updateStorage() {
    // if tab hasn't sent update in past 5 minutes, it is definitely closed
    for (let i = 0; i < tabList.length; i++) {
        if (Date.now() - tabList[i].last_update_time > 300000) {
            tabList[i].open = false;
            tabList[i].active = false;
            tabList[i].loaded_time.push({
                state: "closed",
                time: Date.now()
            });

            tabList[i].update_time.push({
                visibility: "hidden",
                time: Date.now()
            });
        }
    }

    chrome.storage.local.set({ "tabList": tabList }, function() {
        // console.log(tabList)
    });
}

function generateSpecifics() {
    // chrome.storage.local.get("specificList", function (result) {
    //     if (result.specificList !== undefined && changedSchema === false) {
    //         specificList = result.specificList;
    //     }
    //
    // });

    calculateSpecifics();

    function calculateSpecifics() {
        specificList = {};
        //until redo logic to check if alr exists
        //tablist is the input
        //specificList is the output

        //specific list is a dictionary of dictionaries
        /* the first dict is "url" (sorted by the origns of the tabs)
            the second key is "page" (sorted by the individual pages)

            */

        //for each tab in tablist

        // console.log("Calculating specifics...")
        let index = 0;
        tabList.forEach((tab) => {
            //if the origin is not in the specific list, add it
            if (specificList[tab.origin] === undefined) {
                specificList[tab.origin] = {};
            }
            //if the url is not in the specific list, add it
            if (specificList[tab.origin][tab.documentId] === undefined) {
                specificList[tab.origin][tab.documentId] = {
                    title: tab.title,
                    url: tab.url,
                    documentId: tab.documentId,
                    origin: tab.origin,
                    total_time: -1,
                    total_visits: 0,
                    total_time_visible: -1,
                    total_time_hidden: -1,
                    total_time_active: -1, //not currently implemented
                    total_time_inactive: -1, //not currently implemented
                    total_time_audible: -1, //not currently implemented
                    total_time_muted: -1, //not currently implemented
                    total_time_unmuted: -1, //not currently implemented
                    total_time_loaded: -1,
                    total_time_closed: -1,
                    update_time: [],
                    loaded_time: [],
                    visit_hisotry: []
                };

                //update total_visible and hidden time
                let currentLoopState = tab.update_time[0].visibility;
                if (currentLoopState === "visible") {
                    specificList[tab.origin][tab.documentId].total_visits++;
                }
                let currentLoopTime = tab.update_time[0].time;
                let first = true;
                tab.update_time.forEach((update) => {
                    if (first) {
                        first = false;
                        return;
                    }

                    if (currentLoopState === "hidden" && update.visibility === "visible") {
                        // console.log("hidden to visible")
                        specificList[tab.origin][tab.documentId].total_time_hidden += update.time - currentLoopTime;
                    } else if (currentLoopState === "visible" && update.visibility === "hidden") {
                        // console.log("visible to hidden")
                        specificList[tab.origin][tab.documentId].total_time_visible += update.time - currentLoopTime;
                    } else if (currentLoopState === "visible" && update.visibility === "visible") {
                        // console.log("visible to visible")
                        specificList[tab.origin][tab.documentId].total_time_visible += update.time - currentLoopTime;
                    } else if (currentLoopState === "hidden" && update.visibility === "hidden") {
                        // console.log("hidden to hidden")
                        specificList[tab.origin][tab.documentId].total_time_hidden += update.time - currentLoopTime;
                    } else {
                        console.log("error in visibility loop", currentLoopState, update.visibility);
                    }

                    currentLoopTime = update.time;
                    currentLoopState = update.visibility;
                });
                if (currentLoopState === "visible") {
                    specificList[tab.origin][tab.documentId].total_time_visible += Date.now() - currentLoopTime;
                } else if (currentLoopState === "hidden") {
                    specificList[tab.origin][tab.documentId].total_time_hidden += Date.now() - currentLoopTime;
                }

                //update visit times by using active

                let visitTimes = [];
                tab.update_time.forEach((update) => {
                    if (update.active) {
                        specificList[tab.origin][tab.documentId].total_visits++;
                        visitTimes.push(update.time);
                    }
                });


                //update total_loaded and closed time
                currentLoopState = tab.loaded_time[0].state;
                currentLoopTime = tab.loaded_time[0].time;
                first = true;
                tab.loaded_time.forEach((update) => {
                    if (first) {
                        first = false;
                        return;
                    }

                    if (currentLoopState === "closed" && update.state === "loaded") {
                        // console.log("loaded to closed")
                        specificList[tab.origin][tab.documentId].total_time_closed += update.time - currentLoopTime;
                    } else if (currentLoopState === "loaded" && update.state === "closed") {
                        // console.log("closed to loaded")
                        specificList[tab.origin][tab.documentId].total_time_loaded += update.time - currentLoopTime;
                    } else if (currentLoopState === "loaded" && update.state === "loaded") {
                        // console.log("loaded to loaded")
                        specificList[tab.origin][tab.documentId].total_time_loaded += update.time - currentLoopTime;
                    } else if (currentLoopState === "closed" && update.state === "closed") {
                        // console.log("closed to closed")
                        specificList[tab.origin][tab.documentId].total_time_closed += update.time - currentLoopTime;
                    } else {
                        console.log(currentLoopState + " to " + update.state + " not implemented");
                    }
                    currentLoopTime = update.time;
                    currentLoopState = update.state;
                });
                if (currentLoopState === "loaded") {
                    specificList[tab.origin][tab.documentId].total_time_loaded += Date.now() - currentLoopTime;
                } else if (currentLoopState === "closed") {
                    specificList[tab.origin][tab.documentId].total_time_closed += Date.now() - currentLoopTime;
                }

                //update total_time
                specificList[tab.origin][tab.documentId].total_time =
                    specificList[tab.origin][tab.documentId].total_time_visible +
                    specificList[tab.origin][tab.documentId].total_time_hidden;
                //pass through update and loaded time
                specificList[tab.origin][tab.documentId].update_time = tab.update_time;
                specificList[tab.origin][tab.documentId].loaded_time = tab.loaded_time;
                specificList[tab.origin][tab.documentId].visit_hisotry = visitTimes;

                tabList[index].total_time = specificList[tab.origin][tab.documentId].total_time;
                tabList[index].total_visits = specificList[tab.origin][tab.documentId].total_visits;
                tabList[index].total_time_visible = specificList[tab.origin][tab.documentId].total_time_visible;
                tabList[index].total_time_hidden = specificList[tab.origin][tab.documentId].total_time_hidden;
                tabList[index].total_time_loaded = specificList[tab.origin][tab.documentId].total_time_loaded;
                tabList[index].total_time_closed = specificList[tab.origin][tab.documentId].total_time_closed;
                tabList[index].total_time_active = specificList[tab.origin][tab.documentId].total_time_active;
                tabList[index].total_time_inactive = specificList[tab.origin][tab.documentId].total_time_inactive;
                tabList[index].total_time_audible = specificList[tab.origin][tab.documentId].total_time_audible;
                tabList[index].total_time_muted = specificList[tab.origin][tab.documentId].total_time_muted;
                tabList[index].total_time_unmuted = specificList[tab.origin][tab.documentId].total_time_unmuted;
                tabList[index].visit_history = specificList[tab.origin][tab.documentId].visit_history;
            }
            index++;
        });

        for (const [key, origin] of Object.entries(specificList)) {
            // console.log("run", key)
            let total_time = -1;
            let total_visits = -1;
            let total_time_visible = -1;
            let total_time_hidden = -1;
            let total_time_loaded = -1;
            let total_time_closed = -1;
            let total_time_active = -1;
            let total_time_inactive = -1;
            let total_time_audible = -1;
            let total_time_muted = -1;
            let total_time_unmuted = -1;

            //for each key value pair in origin
            for (const [pkey, page] of Object.entries(specificList[key])) {
                if (page.total_time > 0) {
                    if (total_time === -1) {
                        total_time = page.total_time;
                    } else {
                        total_time += page.total_time;
                    }
                }
                if (page.total_visits > 0) {
                    if (total_visits === -1) {
                        total_visits = page.total_visits;
                    } else {
                        total_visits += page.total_visits;
                    }
                }
                if (page.total_time_visible > 0) {
                    if (total_time_visible === -1) {
                        total_time_visible = page.total_time_visible;
                    } else {
                        total_time_visible += page.total_time_visible;
                    }
                }
                if (page.total_time_hidden > 0) {
                    if (total_time_hidden === -1) {
                        total_time_hidden = page.total_time_hidden;
                    } else {
                        total_time_hidden += page.total_time_hidden;
                    }
                }
                if (page.total_time_loaded > 0) {
                    if (total_time_loaded === -1) {
                        total_time_loaded = page.total_time_loaded;
                    } else {
                        total_time_loaded += page.total_time_loaded;
                    }
                }
                if (page.total_time_closed > 0) {
                    if (total_time_closed === -1) {
                        total_time_closed = page.total_time_closed;
                    } else {
                        total_time_closed += page.total_time_closed;
                    }
                }
                if (page.total_time_active > 0) {
                    if (total_time_active === -1) {
                        total_time_active = page.total_time_active;
                    } else {
                        total_time_active += page.total_time_active;
                    }
                }
                if (page.total_time_inactive > 0) {
                    if (total_time_inactive === -1) {
                        total_time_inactive = page.total_time_inactive;
                    } else {
                        total_time_inactive += page.total_time_inactive;
                    }
                }
                if (page.total_time_audible > 0) {
                    if (total_time_audible === -1) {
                        total_time_audible = page.total_time_audible;
                    } else {
                        total_time_audible += page.total_time_audible;
                    }
                }
                if (page.total_time_muted > 0) {
                    if (total_time_muted === -1) {
                        total_time_muted = page.total_time_muted;
                    } else {
                        total_time_muted += page.total_time_muted;
                    }
                }
                if (page.total_time_unmuted > 0) {
                    if (total_time_unmuted === -1) {
                        total_time_unmuted = page.total_time_unmuted;
                    } else {
                        total_time_unmuted += page.total_time_unmuted;
                    }
                }
            } //)

            specificList[key]["total_time"] = total_time;
            specificList[key]["total_visits"] = total_visits;
            specificList[key]["total_time_visible"] = total_time_visible;
            specificList[key]["total_time_hidden"] = total_time_hidden;
            specificList[key]["total_time_loaded"] = total_time_loaded;
            specificList[key]["total_time_closed"] = total_time_closed;
            specificList[key]["total_time_active"] = total_time_active;
            specificList[key]["total_time_inactive"] = total_time_inactive;
            specificList[key]["total_time_audible"] = total_time_audible;
            specificList[key]["total_time_muted"] = total_time_muted;
            specificList[key]["total_time_unmuted"] = total_time_unmuted;
            // console.log(specificList[key])
            // console.log("specifics calculated.");
        }

        saveSpecifics();
    }

    function saveSpecifics() {
        chrome.storage.local.set({ specificList: specificList }, function() {
            // console.log(specificList)
        });
    }
}
