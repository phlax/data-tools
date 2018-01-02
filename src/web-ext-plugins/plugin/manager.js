

export default class L10nPluginManager {

    constructor (plugin) {
	this.plugin = plugin;
    }

    fetch(endpoint) {
	const params = {};
	params.message = 'fetch';
	params.endpoint = endpoint;
	return this.plugin.handler.sendMessage(params);
    }

    registerPlugin() {
	return this.plugin.handler.sendMessage(
	    {message: 'addPlugin',
	     name: this.plugin.pluginName,
	     icon: this.plugin.pluginIcon,
	     description: this.plugin.pluginDescription,
	     longDescription: this.plugin.longDescription,
	     checks: this.plugin.checks,
	     provides: this.plugin.provides});
    }
}
