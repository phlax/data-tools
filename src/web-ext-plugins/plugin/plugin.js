
import L10nPluginManager from './manager'
import L10nPluginHandler from './handler'


export default class L10nPlugin {

    constructor () {
	this.manager = new L10nPluginManager(this);
	this.handler = new L10nPluginHandler(this);
	this.icon = '';
	this.description = '';
    }

    get checks () {
	return {};
    }

    get pluginIcon() {
	return browser.extension.getURL(this.icon);
    }

    get pluginDescription() {
	if (this.description) {
	    return this.description;
	} else {
	    return browser.runtime.getManifest().description;
	}
    }

    get pluginName() {
	if (this.name) {
	    return this.name;
	} else {
	    return browser.runtime.getManifest().name;
	}
    }

    setup() {
	this.manager.registerPlugin().then(() => {
	    this.handler.addListeners();
	});
    }
}
