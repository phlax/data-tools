
export default class PluginUpdater {
    constructor(manager) {
	this.manager = manager;
    }

    fetchProjects(app) {
	return browser.runtime.sendMessage(
	    app.type,
	    {message: 'fetchProjects',
	     app: app})
    }

    updateApps() {
	return this.manager.apps.getApps().then(apps => {
	    apps = apps || [];
	    let promises = [];
	    for (let app in apps) {
		promises.push(this.fetchProjects(apps[app]));
	    }
	    return Promise.all(promises).then((results) => {
		let newapps = [];
		apps.map((item, key) => {
		    item.projects = results[key];
		    delete item.plugin;
		    newapps.push(item);
		})
		return browser.storage.local.set({apps: newapps})
	    })
	})
    }
}
