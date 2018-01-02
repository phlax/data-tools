

export default class PluginNotifications {

    constructor(manager) {
	this.manager = manager;
    }

    notifyAppDeleted(request, sender) {
	browser.notifications.create({
	    "type": "basic",
	    "title": "L10n app removed",
	    "message": request.data.name + ' (' + request.data.type + ')'
	})
    }

    notifyAppUpdated(request, sender) {
	browser.notifications.create({
	    "type": "basic",
	    "title": "L10n data updated",
	    "message": request.app.name + ' (' + request.app.type + ')'
	})
    }

    notifyAppAdded(request, sender) {
	browser.notifications.create({
	    "type": "basic",
	    "title": "L10n app added",
	    "message": request.data.name + ' (' + request.data.type + ')'
	})
    }

    notifyPluginAdded(request, sender) {
	browser.notifications.create({
	    "type": "basic",
	    "title": "L10n plugin added",
	    "message": request.plugin.name
	})
    }

    notifyPluginRemoved(request, sender) {
	browser.notifications.create({
	    "type": "basic",
	    "title": "L10n plugin removed",
	    "message": request.name
	})
    }

    requestHandlers(request, sender) {
	let notifications = 'notify' + request.message.charAt(0).toUpperCase() + request.message.slice(1);
	if (Object.getOwnPropertyNames(Object.getPrototypeOf(this)).indexOf(notifications) !== -1) {
	    return this[notifications](request, sender);
	}
	return Promise.resolve({})
    }

    addListeners() {
	const $this = this;
	browser.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
	    $this.requestHandlers(request, sender).then(sendResponse);
	});
	browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	    $this.requestHandlers(request, sender).then(sendResponse);
	});
    }
}
