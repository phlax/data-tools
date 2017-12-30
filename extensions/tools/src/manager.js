
function getStoredData() {
    return browser.storage.local.get("data").then(resp => {
	const {data} = resp;
	return data || {};
    })
}


browser.runtime.onMessage.addListener((message, sender, response) => {
    if (message.message === 'save') {
	console.log('saving data!');
	const {data} = message;
	let {filename} = message;
	getStoredData().then(existing => {
	    existing[filename] = data;
	    browser.storage.local.set({data: existing}).then(resp => {
		browser.runtime.sendMessage({message: 'data.saved'});
	    });
	});
    }

    if (message.message.startsWith('tab.')) {
	console.log('relaying message...');
	console.log(message);
	browser.tabs.query({
	    currentWindow: true,
	    active: true
	}).then(tabs => {
	    console.log('emiting to tab...')
	    console.log(tabs)
	    for (let tab of tabs) {
		browser.tabs.sendMessage(tab.id, message);
	    }
	});
    }
});
