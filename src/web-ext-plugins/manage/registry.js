

export default class PluginRegistry {
    constructor(manager) {
	this.manager = manager;
    }

    addPlugin(sender, request) {
	const $this = this;
	return this.getPlugins().then(function (result) {
	    let {plugins} = result;
	    plugins = plugins || {};
	    plugins[sender.id] = {}
	    plugins[sender.id].id = sender.id;
	    plugins[sender.id].ext = sender;
	    plugins[sender.id].provides = request.provides;
	    plugins[sender.id].name = request.name;
	    plugins[sender.id].icon = request.icon;
	    plugins[sender.id].description = request.description;
	    plugins[sender.id].longDescription = request.longDescription;
	    let checks = request.checks || {};
	    for (let c in checks) {
		checks[c] = {name: c, source: checks[c][0], target: checks[c][1]}
	    }
	    plugins[sender.id].checks = checks;
	    return browser.storage.local.set({plugins: plugins}).then(() => {
		let payLoad = {message: 'pluginAdded', plugin: plugins[sender.id]};
		$this.manager.notifications.notifyPluginAdded(payLoad);
		return browser.runtime.sendMessage(payLoad).then(() => {
		    return {response: 'added: ' + sender.id, plugins: plugins};
		});
	    });
	});
    }

    deregisterPlugin(plugin) {
	const $this = this;
	return this.getPlugins().then(response => {
	    let {plugins} = response || {};
	    if (Object.keys(plugins).indexOf(plugin.id) !== -1) {
		let pluginName = plugins[plugin.id].name;
		delete plugins[plugin.id];
		return browser.storage.local.set({plugins: plugins}).then(() => {
		    $this.manager.notifications.notifyPluginRemoved(
			{message: 'pluginRemoved', name: pluginName})
		    return browser.runtime.sendMessage({message: 'pluginRemoved', pluginName})
		})
	    }
	})
    }

    getPlugin(type) {
	this.getPlugins().then(plugins => {
	    for (let p in plugins) {
		if (plugins[p].type === type) {
		    return plugins[p];
		}
	    }
	})
    }

    getPlugins() {
	return browser.storage.local.get('plugins');
    }
}
