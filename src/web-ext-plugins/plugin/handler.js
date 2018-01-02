

export default class L10nPluginHandler {
    managerId = 'l10n@mozilla.com'

    constructor (plugin) {
	this.plugin = plugin;
    }

    addListeners() {
	browser.runtime.onMessageExternal.addListener(this.plugin.handle.bind(this.plugin))
    }

    sendMessage(message) {
	return browser.runtime.sendMessage(
	    this.managerId,
	    message)
    }
}
