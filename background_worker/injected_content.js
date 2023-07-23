let injected = "test";

//https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        // console.log("hidden")
        try {
            chrome.runtime.sendMessage({
                message: {
                    state: "hidden",
                    update_time: Date.now(),
                },
            });
        } catch (err) {}
    } else {
        // console.log("visible")
        try {
            chrome.runtime.sendMessage({
                message: {
                    state: "visible",
                    update_time: Date.now(),
                },
            });
        } catch (err) {}
    }
});

//on page close?
window.addEventListener("beforeunload", function () {
    try {
        chrome.runtime.sendMessage({
            message: {
                state: "hidden",
                update_time: Date.now(),
            },
        });
    } catch (err) {}

    try {
        chrome.runtime.sendMessage({
            message: {
                state: "closed",
                update_time: Date.now(),
            },
        });
    } catch (err) {}
});

addEventListener("focus", function () {
    // console.log("focused")
    try {
        chrome.runtime.sendMessage({
            message: {
                state: "active",
                update_time: Date.now(),
            },
        });
    } catch (err) {}
});

addEventListener("blur", function () {
    // console.log("blurred")
    try {
        chrome.runtime.sendMessage({
            message: {
                state: "inactive",
                update_time: Date.now(),
            },
        });
    } catch (err) {}
});

//on page load
try {
    chrome.runtime.sendMessage({
        message: {
            state: "loaded",
            update_time: Date.now(),
        },
    });
} catch (err) {}
// console.log("loaded") //change to extension loaded and add a extension unload part as well

if (!document.hidden) {
    // console.log("visible")
    try {
        chrome.runtime.sendMessage({
            message: {
                state: "visible",
                update_time: Date.now(),
            },
        });
    } catch (err) {}
} else {
    // console.log("hidden")
    try {
        chrome.runtime.sendMessage({
            message: {
                state: "hidden",
                update_time: Date.now(),
            },
        });
    } catch (err) {}
}

if (document.hasFocus()) {
    // console.log("focused")
    try {
        chrome.runtime.sendMessage({
            message: {
                state: "active",
                update_time: Date.now(),
            },
        });
    } catch (err) {}
}

//every minute, poll the tab for its visiblity state
setInterval(function () {
    if (document.hidden) {
        // console.log("hidden")
        try {
            chrome.runtime.sendMessage({
                message: {
                    state: "hidden",
                    update_time: Date.now(),
                },
            });
        } catch (err) {}
    } else {
        // console.log("visible")
        try {
            chrome.runtime.sendMessage({
                message: {
                    state: "visible",
                    update_time: Date.now(),
                },
            });
        } catch (err) {}
    }

    // active is not sent in order to maintain higher accuracy
}, 60000);