//# sourceURL=injected_content.js
validExtentionContext = true;
console.log("injected_content.js loaded");
//https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
document.addEventListener("visibilitychange", function() {
    if (!validExtentionContext) {
        return;
    }
    if (document.hidden) {
        // console.log("hidden")
        try {
            chrome.runtime.sendMessage({
                message: {
                    state: "hidden",
                    update_time: Date.now()
                }
            });
        } catch (err) {
            // validExtentionContext = false;
        }
    } else {
        // console.log("visible")
        try {
            chrome.runtime.sendMessage({
                message: {
                    state: "visible",
                    update_time: Date.now()
                }
            });
        } catch (err) {
            // validExtentionContext = false;
        }
    }
});

//on page close?
window.addEventListener("beforeunload", function() {
    if (!validExtentionContext) {
        return;
    }
    try {
        chrome.runtime.sendMessage({
            message: {
                state: "hidden",
                update_time: Date.now()
            }
        });
    } catch (err) {
        // validExtentionContext = false;
    }

    try {
        chrome.runtime.sendMessage({
            message: {
                state: "closed",
                update_time: Date.now()
            }
        });
    } catch (err) {
        // validExtentionContext = false;
    }
});


addEventListener("focus", function() {
    if (!validExtentionContext) {
        return;
    }
    // console.log("focused")
    try {
        chrome.runtime.sendMessage({
            message: {
                state: "active",
                update_time: Date.now()
            }
        });
    } catch (err) {
        validExtentionContext = false;
    }
});

addEventListener("blur", function() {
    if (!validExtentionContext) {
        return;
    }
    // console.log("blurred")
    try {
        chrome.runtime.sendMessage({
            message: {
                state: "inactive",
                update_time: Date.now()
            }
        });
    } catch (err) {
        validExtentionContext = false;
    }
});

//on page load
try {
    chrome.runtime.sendMessage({
        message: {
            state: "loaded",
            update_time: Date.now()
        }
    });
} catch (err) {
    // validExtentionContext = false;
}
// console.log("loaded") //change to extension loaded and add a extension unload part as well

if (!document.hidden) {
    // console.log("visible")
    try {
        chrome.runtime.sendMessage({
            message: {
                state: "visible",
                update_time: Date.now()
            }
        });
    } catch (err) {
        // validExtentionContext = false;
    }
} else {
    // console.log("hidden")
    try {
        chrome.runtime.sendMessage({
            message: {
                state: "hidden",
                update_time: Date.now()
            }
        });
    } catch (err) {
        // validExtentionContext = false;
    }
}

//every minute, poll the tab for its visiblity state
setInterval(function() {
    if (!validExtentionContext) {
        return;
    }
    if (document.hidden) {
        // console.log("hidden")
        try {
            chrome.runtime.sendMessage({
                message: {
                    state: "hidden",
                    update_time: Date.now()
                }
            });
        } catch (err) {
            // validExtentionContext = false;
        }
    } else {
        // console.log("visible")
        try {
            chrome.runtime.sendMessage({
                message: {
                    state: "visible",
                    update_time: Date.now()
                }
            });
        } catch (err) {
            // validExtentionContext = false;
        }
    }

    // active is not sent in order to maintain higher accuracy
}, 60000);
