//script on all tabs when extension is created
chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.query(
        queryInfo = {},
        callback = function(tabArray) {
            tabArray.forEach(tab => {
                chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    files: ['background_worker/injected_content.js']
                }).then(() => {
                    // console.log("injected content script into all tabs")
                }).catch(err => console.log(err))
            })
        }
    )
})


//when new tab is created
chrome.tabs.onCreated.addListener(function(tab) {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['background_worker/injected_content.js']
    }).then(() => {
        // console.log("injected content script into new tab")
    }).catch(err => console.log(err))
})

//when tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['background_worker/injected_content.js']
        }).then(() => {
            // console.log("injected content script into updated tab")
        }).catch(err => console.log(err))
    }
})

//chrome:// tabs don't work


let tabList = []
//content: tab, state, time

//get current state of the tabs and store it in tabList
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // console.log("tab: " + sender + "\nmessage: " + request.message)
    // console.log(sender);

    if (request.message.state === "loaded") {
        tabList = tabList.filter(tab => tab.document_id !== sender.documentId)
        tabList.push({
            "document_id": sender.documentId, 
            "document_url": sender.origin,
            "visibility": "hidden", 
            "last_update_time": 0
        })
    }
    if (request.message.state === "closed") {
        tabList = tabList.filter(tab => tab.document_id !== sender.documentId)
    }
    if (request.message.state === "visible") {
        tabList.forEach(tab => {
            if (tab.document_id === sender.documentId && request.message.update_time >= tab.last_update_time) {
                tab.visibility = "visible"
                tab.last_update_time = request.message.update_time
            }
        })
    }
    if (request.message.state === "hidden") {
        tabList.forEach(tab => {
            if (tab.document_id === sender.documentId && request.message.update_time >= tab.last_update_time) {
                tab.visibility = "hidden"
                tab.last_update_time = request.message.update_time
            }
        })
    }
    console.log(tabList)
    console.log(request.message)

    updateHistory();
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
function updateHistory() {

}