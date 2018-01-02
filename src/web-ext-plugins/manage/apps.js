

export default class PluginApps {
    constructor(manager) {
	this.manager = manager;
    }

    deleteApp(app) {
	const $this = this;
	return browser.storage.local.get('apps').then(result => {
	    let {apps} = result;
	    const newapps = [];
	    apps = apps || [];
	    for (let a in apps) {
		if (apps[a].type === app.type && apps[a].url === app.url && apps[a].name === app.name) {

		} else {
		    newapps.push(apps[a]);
		}
	    }
	    return browser.storage.local.set({apps: newapps}).then(() => {
		return $this.manager.updater.updateApps().then(() => {
		    browser.runtime.sendMessage({
			message: 'appDeleted',
			data: app,
		    });
		    return apps;
		})
	    });
	})
    }

    addApp(type, name, url) {
	const $this =this;
	return browser.storage.local.get('apps').then(result => {
	    let {apps} = result;
	    apps = apps || [];
	    const app = {};
	    app.url = url;
	    app.type = type;
	    app.name = name;
	    app.updated = Date.now();
	    apps.push(app);
	    return browser.storage.local.set({apps: apps}).then(() => {
		return $this.manager.updater.updateApps().then(result => {
		    browser.runtime.sendMessage({
			message: 'appAdded',
			data: app,
		    })
		    return apps;
		})
	    });
	});
    }

    saveApp(app) {
	return browser.storage.local.get('apps').then(result => {
	    let {apps} = result;
	    const newapps = [];
	    apps = apps || [];
	    for (let a in apps) {
		if (apps[a].type === app.type && apps[a].url === app.url && apps[a].name === app.name) {
		    app.updated = Date.now();
		    newapps.push(app);
		} else {
		    newapps.push(apps[a]);
		}
	    }
	    return browser.storage.local.set({apps: newapps})
	})
    }

    updateApp(app) {
	const $this = this;
	return this.getApps().then(apps => {
	    let promises = [];
	    const updated = [];
	    for (let a in apps) {
		if (apps[a].type === app.type && apps[a].url === app.url && apps[a].name === app.name) {
		    updated.push(apps[a]);
		    promises.push(
			browser.runtime.sendMessage(
			    apps[a].type,
			    {message: 'updateApp',
			     app: {name: app.name, url: app.url, type: app.type}}))
		}
	    }
	    return Promise.all(promises).then((results) => {
		const morepromises = []
		for (let r in results) {
		    let toupdate = updated[r];
		    toupdate.projects = results[r];
		    morepromises.push($this.saveApp(toupdate))
		}
		return Promise.all(morepromises).then((results) => {
		    return browser.runtime.sendMessage({
			message: 'appUpdated',
			app: app,
		    });
		})
	    })
	})
    }

    getApps() {
	return this.manager.registry.getPlugins().then(r1 => {
	    let {plugins} = r1;
	    return browser.storage.local.get('apps').then(r2 => {
		let {apps} = r2;
		for (let app in apps) {
		    apps[app].plugin = plugins[apps[app].type];
		}
		return apps;
	    });
	});
    }

    getRecommendedApps() {
	return this.getApps().then(apps => {
	    const urls = apps.map(x => x.url);
	    return this.manager.registry.getPlugins().then(r1 => {
		let {plugins} = r1;
		const promises = []
		for (let p in plugins) {
		    if (plugins[p].provides.indexOf('l10n.web.app') !== -1) {
			promises.push(browser.runtime.sendMessage(
			    plugins[p].id,
			    {message: 'getRecommended'}).then(result => {
				result.plugin = plugins[p];
				return result;
			    }))
		    }
		}

		return Promise.all(promises).then(results => {
		    let toreturn = []
		    results.map((result, key) => {
			let {plugin, recommended} = result;
			for (let r in recommended) {
			    if (urls.indexOf(recommended[r].url) === -1) {
				recommended[r].type = plugin.id;
				recommended[r].plugin = plugin;
				toreturn = toreturn.concat(recommended[r]);
			    }
			}
		    })
		    return toreturn;
		})
	    })
	});

    }
}
