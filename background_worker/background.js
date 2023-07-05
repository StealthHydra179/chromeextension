let tabList = []
let changedSchema = false

//script on all tabs when extension is created
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get("tabList", function (result) {
        if (result.tabList && !changedSchema) {
            tabList = result.tabList
            console.log("tabList loaded from storage: ")
            console.log(tabList)
        } else {
            console.log("tabList not loaded from storage")
        }
        //update tabList with current tab info
        chrome.tabs.query(
            queryInfo = {},
            callback = function (tabArray) {
                tabArray.forEach(tab => {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['background_worker/injected_content.js']
                    }).then(() => {
                        console.log("injected content script into all tabs")
                    }).catch(err => {
                        console.log(err)
                        console.log(tab.url)
                    })
                })
            }
        )
    })
})

chrome.runtime.onStartup.addListener(function () {
    //same as installed
    chrome.storage.local.get("tabList", function (result) {
        if (result.tabList && !changedSchema) {
            tabList = result.tabList
            console.log("tabList loaded from storage: ")
            console.log(tabList)
        } else {
            console.log("tabList not loaded from storage")
        }
        //update tabList with current tab info
        chrome.tabs.query(
            queryInfo = {},
            callback = function (tabArray) {
                tabArray.forEach(tab => {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['background_worker/injected_content.js']
                    }).then(() => {
                        console.log("injected content script into all tabs")
                    }).catch(err => {
                        console.log(err)
                        console.log(tab.url)
                    })
                })
            }
        )
    })
})

chrome.runtime.onSuspend.addListener(function () {

})

//when new tab is created
chrome.tabs.onCreated.addListener(function (tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['background_worker/injected_content.js']
    }).then(() => {
        // console.log("injected content script into new tab")
    }).catch(err => console.log(err))
})

//when tab is updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['background_worker/injected_content.js']
        }).then(() => {
            // console.log("injected content script into updated tab")
        }).catch(err => console.log(err))
    }
})

//chrome:// tabs don't work

//get current state of the tabs and store it in tabList
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message.state === "loaded") {
        //if object exists, update it
        //if object doesn't exist, add it
        let tabExists = false
        tabList.forEach(tab => {
            if (tab.document_id === sender.documentId) {
                tabExists = true
                tab.visibility = "hidden"
                tab.update_time.push({ "visibility": "hidden", "time": request.message.update_time })
                tab.loaded_time.push({ "state": "loaded", "time": request.message.update_time })
                tab.open = true
            }
        }
        )
        if (!tabExists) {
            tabList.push({
                "document_id": sender.documentId,
                "origin": sender.origin,
                "url": sender.url,
                // "document_url": sender.origin,
                "title": sender.tab.title,
                "visibility": "hidden",
                "active": sender.tab.active,
                "audible": sender.tab.audible,
                "muted": sender.tab.mutedInfo.muted,
                "update_time": [{ "visibility": "hidden", "time": request.message.update_time }],
                "loaded_time": [{ "state": "loaded", "time": request.message.update_time }],
                "open": true
            })
        }
    }
    if (request.message.state === "closed") {
        //update tabList
        tabList.forEach(tab => {
            if (tab.document_id === sender.documentId) {
                tab.open = false
                tab.last_update_time = request.message.update_time
                tab.update_time.push({ "visibility": "hidden", "time": request.message.update_time })
                tab.loaded_time.push({ "state": "closed", "time": request.message.update_time })
            }
        })
    }

    if (request.message.state === "visible") {
        tabList.forEach(tab => {
            if (tab.document_id === sender.documentId && request.message.update_time >= tab.last_update_time) {
                tab.visibility = "visible"
                tab.update_time.push({ "visibility": "visible", "time": request.message.update_time })
            }
        })
    }
    if (request.message.state === "hidden") {
        tabList.forEach(tab => {
            if (tab.document_id === sender.documentId && request.message.update_time >= tab.last_update_time) {
                tab.visibility = "hidden"
                tab.update_time.push({ "visibility": "hidden", "time": request.message.update_time })
            }
        })
    }
    console.log(tabList)
    console.log(request.message)

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
})


//update history
function updateStorage() {
    chrome.storage.local.set({ "tabList": tabList }, function () {
        console.log(tabList)
    })
}

function generateSpecifics() {
    let specificList = {}
    chrome.storage.local.get("specificList", function (result) {
        if (result.specificList !== undefined) {
            specificList = result.specificList
        }
        calculateSpecifics()
    })

    function calculateSpecifics() {
        //tablist is the input
        //specificList is the output

        //specific list is a dictionary of dictionaries
        /* the first key is "url" (sorted by the origns of the tabs)
        the second key is "page" (sorted by the individual pages)

        */
        
        saveSpecifics()
    }
    
    function saveSpecifics() {
        chrome.storage.local.set({ "specificList": specificList }, function () {
            console.log(specificList)
        })
    }
}


