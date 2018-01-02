
import PluginRegistry from './registry'
import PluginDelegate from './delegate'
import PluginUpdater from './updater'
import PluginApps from './apps'
import PluginHandler from './handler'
import PluginNotifications from './notifications'


export default class PluginManager {

    constructor() {
	this.registry = new PluginRegistry(this);
	this.delegate = new PluginDelegate(this);
	this.updater = new PluginUpdater(this);
	this.apps = new PluginApps(this);
	this.notifications = new PluginNotifications(this);
	this.handler = new PluginHandler(this);
    }

    setup() {
	this.handler.addListeners();
	this.notifications.addListeners();
    }

    handleAddPlugin(request, sender) {
	return this.registry.addPlugin(sender, request)
    }

    getRequestHeaders() {
	let headers = new Headers()
	headers.append('X-Requested-With', 'XMLHttpRequest');
	return headers;
    }

    handleFetch(request, sender) {
	const payload = {
	    method: 'GET',
	    headers: this.getRequestHeaders()}
	return window.fetch(request.endpoint, payload).then(response => {
	    if(response.ok) {
		return response.json();
	    }
	    throw new Error('Network response was not ok.');
	}).then(blob => {
	    return Promise.resolve(blob);
	}).catch(err => {
	    console.log('errored still sadly')
	    console.log(err)
	});
    }

    handleFetchMT(request, sender) {
	return this.delegate.fetchMT(request.data, sender);
    }

    handleGetApps(request, sender) {
	return this.apps.getApps();
    }

    handleMatchRepo(request, sender) {
	return this.delegate.matchRepo(request.url);
    }

    handleRunChecks(request, sender) {
	return this.delegate.runChecks(request.data);
    }

    updateAllData() {
	return this.updater.updateApps();
    }
}
