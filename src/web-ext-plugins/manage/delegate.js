

export default class PluginDelegate {

    constructor(manager) {
	this.manager = manager;
    }

    fetchMT(data, originalSender) {
	return this.manager.registry.getPlugins().then(function (result) {
	    let {plugins} = result;
	    let promises = [];
	    for (let plugin in plugins) {
		if (plugins[plugin].provides.indexOf('l10n.translation.machine') !== -1) {
		    promises.push(
			browser.runtime.sendMessage(
			    plugin,
			    {message: 'fetchMT',
			     data: data,
			     sender: originalSender,
			     plugin: plugins[plugin]}))
		}
	    }
	    return Promise.all(promises).then((results) => {
		// wrong!
		if (results) {
		    return results[0];
		}
	    })
	})
    }

    matchRepo(url) {
	return this.manager.apps.getApps().then(apps => {
	    for (let app in apps) {
		// this is wrong!
		return browser.runtime.sendMessage(
		    apps[app].type,
		    {message: 'matchRepo',
		     url: url,
		     app: apps[app]})
	    }
	});
    }

    runChecks(data) {
	return this.manager.registry.getPlugins().then(function (result) {
	    let {plugins} = result;
	    let promises = [];
	    for (let plugin in plugins) {
		if (plugins[plugin].provides.indexOf('l10n.checks') !== -1) {
		    promises.push(
			browser.runtime.sendMessage(
			    plugin,
			    {message: 'runChecks',
			     data: data,
			     plugin: plugins[plugin]}))
		}
	    }
	    return Promise.all(promises).then((results) => {
		// wrong!
		return results[0];
	    })
	})
    }
}
