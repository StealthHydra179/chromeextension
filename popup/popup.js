// onclick of the button in the html file
document.getElementById('open_in_new_tab').addEventListener('click', function () {
    chrome.tabs.create({url: 'client/index.html'});
})