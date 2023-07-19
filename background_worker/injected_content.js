//https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        // console.log("hidden")
        chrome.runtime.sendMessage({
            message: {
                "state": "hidden",
                "update_time": Date.now()
            }
        }).then(r => console.log(r)).catch(e => console.log(e))
    } else {
        // console.log("visible")
        chrome.runtime.sendMessage({
            message: {
                "state": "visible",
                "update_time": Date.now()
            }
        }).then(r => console.log(r)).catch(e => console.log(e))
    }
})


//on page close?
window.addEventListener("beforeunload", function () {
    chrome.runtime.sendMessage({
        message: {
            "state": "closed",
            "update_time": Date.now()
        }
    }).then(r => console.log(r)).catch(e => console.log(e))
})

//on page load
chrome.runtime.sendMessage({
    message: {
        "state": "loaded",
        "update_time": Date.now()
    }
}).then(r => console.log(r)).catch(e => console.log(e))
// console.log("loaded") //change to extension loaded and add a extension unload part as well

if (!document.hidden) {
    // console.log("visible")
    chrome.runtime.sendMessage({
        message: {
            "state": "visible",
            "update_time": Date.now()
        }
    }).then(r => console.log(r)).catch(e => console.log(e))
}

//every minute, poll the tab for its visiblity state
setInterval(function () {
    if (document.hidden) {
        // console.log("hidden")
        chrome.runtime.sendMessage({
            message: {
                "state": "hidden",
                "update_time": Date.now()
            }
        }).then(r => console.log(r)).catch(e => console.log(e))
    } else {
        // console.log("visible")
        chrome.runtime.sendMessage({
            message: {
                "state": "visible",
                "update_time": Date.now()
            }
        }).then(r => console.log(r)).catch(e => console.log(e))
    }
}, 60000);

