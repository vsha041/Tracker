var menuItem = {
	"id": "addHours",
	"title": "Add Hours",
	"contexts" : ["selection"]
};

window.chrome.contextMenus.create(menuItem);
window.chrome.contextMenus.onClicked.addListener(function(clickData) {
	if (clickData.menuItemId === "addHours" && clickData.selectionText) {
		var intRegex = /^\d+$/;
		if (intRegex.test(clickData.selectionText)) {
			window.chrome.storage.sync.get('total',
				function (items) {
					var newTotal = 0;
					if (items.total) {
						newTotal += parseInt(items.total);
					}

					newTotal += parseInt(clickData.selectionText);
					window.chrome.storage.sync.set({ 'total': newTotal });
				});
		}
	}
});

window.chrome.storage.onChanged.addListener(function (changes) {
	window.chrome.browserAction.setBadgeText({ "text": changes.total.newValue.toString() });
});
