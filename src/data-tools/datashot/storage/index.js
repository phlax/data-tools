

export default class DatashotStorage {

    getStoredData() {
	return browser.storage.local.get("data").then(persistent => {
	    let {data} = persistent;
	    return data || {};
	})
    }

    getRecipes() {
	return browser.storage.local.get("recipes").then(persistent => {
	    let {recipes} = persistent;
	    return recipes || {};
	})
    }

    setRecipes(recipes) {
	return browser.storage.local.set({recipes})
    }
}
