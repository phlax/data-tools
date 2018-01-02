
import BaseChecksRunner from 'l10n-tools/checks/runner'


export default class PluginChecks {

    constructor(manager) {
	this.manager = manager;
    }

    get checksRunner () {
	return new BaseChecksRunner();
    }

    getRegexFrom(string) {
	return XRegExp(string)
    }

    getChecks() {
	return this.manager.registry.getPlugins().then(result => {
	    let {plugins} = result;
	    let checks = [];
	    for (let plugin in plugins) {
		let pluginChecks = Object.values(plugins[plugin].checks || {});
		if (pluginChecks.length) {
		    pluginChecks.map(check => {
			check.plugin = plugins[plugin]
			return check;
		    });
		    checks = checks.concat(pluginChecks);
		}
	    }
	    return checks;
	});
    }

    getCustomChecks() {
	return browser.storage.local.get('checks').then(result => {
	    const {checks} = result;
	    return checks
	});
    }

    testCustomCheck(name, source, target) {
	const $this = this
	return this.getCustomChecks().then(checks => {
	    for (let c in checks) {
		if (checks[c].name === name) {
		    return $this.checksRunner.runCheck(checks[c].source, checks[c].target, source, target)
		}
	    }
	});
    }

    testCheck(name, source, target) {
	const $this = this
	return this.getChecks().then(checks => {
	    for (let c in checks) {
		if (checks[c].name === name) {
		    return $this.checksRunner.runCheck(checks[c].source, checks[c].target, source, target)
		}
	    }
	});
    }

    addCustomCheck(name, source, target) {
	return browser.storage.local.get('checks').then(result => {
	    let {checks} = result;
	    const check = {};
	    checks = checks || {};
	    check.name = name;
	    check.source = source;
	    check.target = target;
	    checks[name] = check;
	    return browser.storage.local.set({checks: checks}).then(result => {
		browser.runtime.sendMessage({
		    message: 'checkAdded'});
		return checks;
	    });
	})
    }

    deleteCustomCheck(name) {
	return browser.storage.local.get('checks').then(result => {
	    const {checks} = result;
	    delete checks[name];
	    return browser.storage.local.set({checks: checks}).then(result => {
		browser.runtime.sendMessage({
		    message: 'checkDeleted'});
		return checks;
	    });
	})
    }
}
