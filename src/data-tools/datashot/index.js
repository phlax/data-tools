
import DatashotStorage from './storage';


export default class PluginDatashot {

    constructor() {
	this.storage = new DatashotStorage();
	this.createDefaultRecipes();
    }

    get defaultRecipes() {
	return [
	    {name: "Simple table",
	     row: {
		 attrs: [],
		 selector: '> tr'},
	     data: {
		 selector: '> td',
		 attrs: ['textContent']}
	    },
	    {name: "Simple list",
	     row: {
		 attrs: ['textContent'],
		 selector: '> li'},
	     data: {
		 selector: '',
		 attrs: ['']}
	    }
	]
    }

    createDefaultRecipes() {
	const $this = this;
	this.storage.getRecipes().then(recipes => {
	    let updateRecipes = false;
	    for (let recipe of $this.defaultRecipes) {
		if (!(recipe.name in recipes)) {
		    recipes[recipe.name] = recipe;
		    updateRecipes = true;
		}
	    }
	    if (updateRecipes) {
		this.storage.setRecipes(recipes);
	    }
	})
    }
}
