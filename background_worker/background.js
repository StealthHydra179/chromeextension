let tabList = [];
let specificList = {};
let changedSchema = false;
let installTime;
let timeOnline;
let startUpTime = Date.now();
let initialized = false;


function reset() {
    initialized = false;

    tabList = [];
    chrome.storage.local.set({ "tabList": tabList }, function() {
        console.log("tabList saved to storage: ");
        console.log(tabList);
    });
    updateStorage();
    generateSpecifics();


    chrome.tabs.query({}, function(tabArray) {
        reloadTabs(tabArray).then(r => console.log("reloaded tabs"));
    });


}

async function reloadTabs(tabArray) {
    for (const tab of tabArray) {
        if (tab.url.includes("chrome-extension://")) {
            continue;
        }
        await chrome.tabs.discard(tab.id);
        console.log("reloaded, " + tab.id);
    }

    initialized = true;

    await chrome.runtime.sendMessage("reload");
}

//script on all tabs when extension is created
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.get("tabList", function(result) {
        if (result.tabList !== [] && !changedSchema && result.tabList !== undefined && result.tabList !== null) {
            tabList = result.tabList;
            console.log("tabList loaded from storage: ");
            console.log(tabList);
        } else {
            console.log("tabList not loaded from storage");
        }

        chrome.tabs.query({}, function(tabArray) {
            tabArray.forEach((tab) => {
                chrome.tabs.reload(tab.id, { bypassCache: false }, function() {
                    console.log("reloaded tab " + tab.id);
                });
            });
        });

        chrome.storage.local.get("timeOnline", function(result) {
            console.log(result);
            if (result.timeOnline !== undefined) {
                timeOnline = result.timeOnline;
                console.log("timeOnline loaded from storage: " + timeOnline);
            } else {
                timeOnline = 0;
                console.log("time online failed to load");
            }
        });
        startUpTime = Date.now();
        //set installed time
        chrome.storage.local.get("installTime", function(result) {
            if (result.installTime) {
                installTime = result.installTime;
                console.log("installTime loaded from storage: " + installTime);
            } else {
                installTime = Date.now();
                chrome.storage.local.set({ "installTime": installTime }, function() {
                    console.log("installTime saved to storage: " + installTime);
                });
            }
        });
        initialized = true;
    });
});

chrome.runtime.onStartup.addListener(function() {
    //same as installed
    chrome.storage.local.get("tabList", function(result) {
        if (result.tabList !== [] && !changedSchema && result.tabList !== undefined && result.tabList !== null) {
            tabList = result.tabList;
            console.log("tabList loaded from storage: ");
            console.log(tabList);
        } else {
            console.log("tabList not loaded from storage");
        }

        chrome.tabs.query({}, function(tabArray) {
            tabArray.forEach((tab) => {
                chrome.tabs.reload(tab.id, { bypassCache: false }, function() {
                    console.log("reloaded tab " + tab.id);
                });
            });
        });
        initialized = true;
    });

    chrome.storage.local.get("installTime", function(result) {
        installTime = result.installTime;
        console.log("installTime loaded from storage: " + installTime);
    });

    chrome.storage.local.get("timeOnline", function(result) {
        if (result.timeOnline !== undefinedresult.timeOnline) {
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
    chrome.storage.local.set({ "timeOnline": timeOnline + (Date.now() - startUpTime) }, function(result) {
        console.log("timeOnline set to " + timeOnline);
    });


    chrome.storage.local.set({ "installTime": installTime }, function() {
        console.log("installTime saved to storage: " + installTime);
    });
    console.log("unloading");
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

        chrome.tabs.query({}, function(tabArray) {
            tabArray.forEach((tab) => {
                chrome.tabs.reload(tab.id, { bypassCache: false }, function() {
                    console.log("reloaded tab " + tab.id);
                });
            });
        });
        initialized = true;
    });

    chrome.storage.local.get("installTime", function(result) {
        installTime = result.installTime;
        console.log("installTime loaded from storage: " + installTime);
    });

    chrome.storage.local.get("timeOnline", function(result) {
        if (result.timeOnline !== undefined) {
            timeOnline = result.timeOnline;
            console.log("timeOnline loaded from storage: " + timeOnline);
        } else {
            timeOnline = 0;
        }
    });
    startUpTime = Date.now();

    initialized = true;
});


//chrome:// tabs don't work

function updateFavicon(tab, sender) {
    if (tab.favicon === undefined && sender.tab.favIconUrl !== undefined) {
        tab.favicon = sender.tab.favIconUrl;
    }
}

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
                initialized = true;
            }
        });

        chrome.storage.local.get("installTime", function(result) {
            installTime = result.installTime;
            console.log("installTime loaded from storage: " + installTime);
        });

        chrome.storage.local.get("timeOnline", function(result) {
            if (result.timeOnline !== undefined) {
                timeOnline = result.timeOnline;
                console.log("timeOnline loaded from storage: " + timeOnline);
            } else {
                timeOnline = 0;
                console.log("timeonline not loaded");
            }
        });
        startUpTime = Date.now();
    } else {
        if (request.message === "reloadTabs") {
            reset();

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
                        updateFavicon(tab, sender);
                    }
                });
                if (!tabExists) {
                    tabList.push({
                        documentId: sender.documentId,
                        origin: sender.origin,
                        url: sender.url,
                        title: sender.tab.title,
                        visibility: "hidden",
                        active: false,
                        audible: sender.tab.audible,
                        muted: sender.tab.mutedInfo.muted,
                        update_time: [{ visibility: "hidden", time: request.message.update_time }],
                        loaded_time: [{ state: "loaded", time: request.message.update_time }],
                        active_time: [{ active: false, time: request.message.update_time }],
                        open: true,
                        last_update_time: request.message.update_time,
                        favicon: sender.tab.favIconUrl,
                        tabId: sender.tab.id
                    });
                }
            }
            if (request.message.state === "closed") {
                let tabExists = false;
                tabList.forEach((tab) => {
                    if (tab.documentId === sender.documentId) {
                        tabExists = true;
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
                        active: false,
                        audible: sender.tab.audible,
                        muted: sender.tab.mutedInfo.muted,
                        update_time: [{ visibility: "hidden", time: request.message.update_time }],
                        loaded_time: [{ state: "loaded", time: request.message.update_time }],
                        active_time: [{ active: false, time: request.message.update_time }],
                        open: true,
                        last_update_time: request.message.update_time,
                        favicon: sender.tab.favIconUrl,
                        tabId: sender.tab.id
                    });
                }


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
                        tab.last_update_time = request.message.update_time;

                        updateFavicon(tab, sender);
                    }
                });
            }
            if (request.message.state === "visible") {
                let tabExists = false;
                tabList.forEach((tab) => {
                    if (tab.documentId === sender.documentId) {
                        tabExists = true;
                    }
                });
                if (!tabExists) {
                    tabList.push({
                        documentId: sender.documentId,
                        origin: sender.origin,
                        url: sender.url,
                        title: sender.tab.title,
                        visibility: "hidden",
                        active: false,
                        audible: sender.tab.audible,
                        muted: sender.tab.mutedInfo.muted,
                        update_time: [{ visibility: "hidden", time: request.message.update_time }],
                        loaded_time: [{ state: "loaded", time: request.message.update_time }],
                        active_time: [{ active: false, time: request.message.update_time }],
                        open: true,
                        last_update_time: request.message.update_time,
                        favicon: sender.tab.favIconUrl,
                        tabId: sender.tab.id
                    });
                }


                // console.log("ifvisible")
                tabList.forEach((tab) => {
                    if (tab.documentId === sender.documentId) {
                        tab.visibility = "visible";
                        tab.update_time.push({
                            visibility: "visible",
                            time: request.message.update_time
                        });
                        tab.last_update_time = request.message.update_time;
                        updateFavicon(tab, sender);
                    }
                });
            }
            if (request.message.state === "hidden") {
                let tabExists = false;
                tabList.forEach((tab) => {
                    if (tab.documentId === sender.documentId) {
                        tabExists = true;
                    }
                });
                if (!tabExists) {
                    tabList.push({
                        documentId: sender.documentId,
                        origin: sender.origin,
                        url: sender.url,
                        title: sender.tab.title,
                        visibility: "hidden",
                        active: false,
                        audible: sender.tab.audible,
                        muted: sender.tab.mutedInfo.muted,
                        update_time: [{ visibility: "hidden", time: request.message.update_time }],
                        loaded_time: [{ state: "loaded", time: request.message.update_time }],
                        active_time: [{ active: false, time: request.message.update_time }],
                        open: true,
                        last_update_time: request.message.update_time,
                        favicon: sender.tab.favIconUrl,
                        tabId: sender.tab.id
                    });
                }


                // console.log("ifhidden")
                tabList.forEach((tab) => {
                    if (tab.documentId === sender.documentId) {
                        tab.visibility = "hidden";
                        tab.update_time.push({
                            visibility: "hidden",
                            time: request.message.update_time
                        });
                        tab.last_update_time = request.message.update_time;
                        updateFavicon(tab, sender);
                    }
                });
            }
            if (request.message.state === "active") {
                let tabExists = false;
                tabList.forEach((tab) => {
                    if (tab.documentId === sender.documentId) {
                        tabExists = true;
                    }
                });
                if (!tabExists) {
                    tabList.push({
                        documentId: sender.documentId,
                        origin: sender.origin,
                        url: sender.url,
                        title: sender.tab.title,
                        visibility: "hidden",
                        active: false,
                        audible: sender.tab.audible,
                        muted: sender.tab.mutedInfo.muted,
                        update_time: [{ visibility: "hidden", time: request.message.update_time }],
                        loaded_time: [{ state: "loaded", time: request.message.update_time }],
                        active_time: [{ active: false, time: request.message.update_time }],
                        open: true,
                        last_update_time: request.message.update_time,
                        favicon: sender.tab.favIconUrl,
                        tabId: sender.tab.id
                    });
                }


                // console.log("ifactive")
                tabList.forEach((tab) => {
                    if (tab.documentId === sender.documentId && tab.active === false) {
                        tab.active = true;
                        tab.active_time.push({
                            active: true,
                            time: request.message.update_time
                        });
                        tab.last_update_time = request.message.update_time;
                        updateFavicon(tab, sender);

                        if (tab.url === sender.url) {
                            if (tab.title !== sender.tab.title) {
                                tab.title = sender.tab.title;
                                tab.update_time.push({
                                    title: sender.tab.title,
                                    time: request.message.update_time
                                });
                            }
                            if (tab.origin !== sender.origin) {
                                tab.origin = sender.origin;
                                tab.update_time.push({
                                    origin: sender.origin,
                                    time: request.message.update_time
                                });
                            }
                        }
                    }
                });
            }
            if (request.message.state === "inactive") {
                let tabExists = false;
                tabList.forEach((tab) => {
                    if (tab.documentId === sender.documentId) {
                        tabExists = true;
                    }
                });
                if (!tabExists) {
                    tabList.push({
                        documentId: sender.documentId,
                        origin: sender.origin,
                        url: sender.url,
                        title: sender.tab.title,
                        visibility: "hidden",
                        active: false,
                        audible: sender.tab.audible,
                        muted: sender.tab.mutedInfo.muted,
                        update_time: [{ visibility: "hidden", time: request.message.update_time }],
                        loaded_time: [{ state: "loaded", time: request.message.update_time }],
                        active_time: [{ active: false, time: request.message.update_time }],
                        open: true,
                        last_update_time: request.message.update_time,
                        favicon: sender.tab.favIconUrl,
                        tabId: sender.tab.id
                    });
                }


                // console.log("ifinactive")
                tabList.forEach((tab) => {
                    if (tab.documentId === sender.documentId && tab.active === true) {
                        tab.active = false;
                        tab.active_time.push({
                            active: false,
                            time: request.message.update_time
                        });
                        tab.last_update_time = request.message.update_time;
                        updateFavicon(tab, sender);

                        if (tab.url === sender.url) {
                            if (tab.title !== sender.tab.title) {
                                tab.title = sender.tab.title;
                                tab.update_time.push({
                                    title: sender.tab.title,
                                    time: request.message.update_time
                                });
                            }
                            if (tab.origin !== sender.origin) {
                                tab.origin = sender.origin;
                                tab.update_time.push({
                                    origin: sender.origin,
                                    time: request.message.update_time
                                });
                            }
                        }
                    }
                });
            }

            updateStorage();
            generateSpecifics();
        }
    }
});


async function checkMissing(tabList) {
    let deadTabs = [];
    //for each tab in tablist
    for (let i = 0; i < tabList.length; i++) {
        //send message to tab
        try {

            let response = await chrome.tabs.sendMessage(tabList[i].tabId, { message: "check_alive" });
            if (response === undefined) {
                // try to send message again
                response = await chrome.tabs.sendMessage(tabList[i].tabId, { message: "check_alive" });
            }

            //if no response, tab is dead
            if (response === undefined) {
                deadTabs.push(tabList[i].tabId);
            }
        } catch (e) {
            deadTabs.push(tabList[i].tabId);
        }
    }
    return deadTabs;

}


//update history
function updateStorage() {
    if (initialized) {

        checkMissing(tabList).then(r => {
            let deadTabIds = r;
            tabList.forEach((tab) => {
                if (deadTabIds.includes(tab.tabId)) {
                    tab.open = false;
                    tab.active = false;
                    tab.loaded_time.push({
                        state: "closed",
                        time: Date.now()
                    });

                    tab.update_time.push({
                        visibility: "hidden",
                        time: Date.now()
                    });
                }
            });
        });
    }

    chrome.storage.local.set({ "tabList": tabList }, function() {
        // console.log(tabList)
    });
}

function generateSpecifics() {

    calculateSpecifics();

    function calculateSpecifics() {
        specificList = {};

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
                    total_time_active: -1,
                    total_time_inactive: -1,
                    total_time_audible: -1,
                    total_time_muted: -1,
                    total_time_unmuted: -1,
                    total_time_loaded: -1,
                    total_time_closed: -1,
                    update_time: [],
                    loaded_time: [],
                    visit_history: [],
                    active_time: [],
                    favicon: "",
                    last_update_time: tab.last_update_time
                };

                if (tab.favicon !== undefined) {
                    specificList[tab.origin][tab.documentId].favicon = tab.favicon;
                }

                //update total_visible and hidden time
                let currentLoopState = tab.update_time[0].visibility;
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
                tab.active_time.forEach((update) => {
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
                    specificList[tab.origin][tab.documentId].total_time_visible + specificList[tab.origin][tab.documentId].total_time_hidden;
                //pass through update and loaded time
                specificList[tab.origin][tab.documentId].update_time = tab.update_time;
                specificList[tab.origin][tab.documentId].loaded_time = tab.loaded_time;
                specificList[tab.origin][tab.documentId].visit_history = visitTimes;
                specificList[tab.origin][tab.documentId].last_update_time = tab.last_update_time;

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
            let last_update_time = 0;

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
                if (page.last_update_time > last_update_time) {
                    last_update_time = page.last_update_time;
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
            specificList[key]["last_update_time"] = last_update_time;
        }

        saveSpecifics();
    }

    function saveSpecifics() {
        chrome.storage.local.set({ "specificList": specificList }, function() {
        });
    }
}
