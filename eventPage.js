window.chrome.storage.onChanged.addListener(function (changes) {
	window.chrome.browserAction.setBadgeText({ "text": changes.total.newValue.toString() });
});
