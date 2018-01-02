

export default class PluginHandler {

    constructor(manager) {
	this.manager = manager;
    }

    requestHandler(request, sender) {
	let handler = 'handle' + request.message.charAt(0).toUpperCase() + request.message.slice(1);
	if (Object.getOwnPropertyNames(Object.getPrototypeOf(this.manager)).indexOf(handler) !== -1) {
	    return this.manager[handler](request, sender);
	}
    }

    addListeners() {
	const $this = this;
	browser.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
	    $this.requestHandler(request, sender).then(sendResponse);
	    return true;
	});

	browser.management.onUninstalled.addListener(info => {
	    $this.manager.registry.deregisterPlugin(info);
	});

    }
}
