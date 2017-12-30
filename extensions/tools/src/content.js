import React from 'react';
import ReactDOM from 'react-dom';

import DatashotOverlay from 'data-tools/datashot/overlay';
import DatashotRecipeOverlay from 'data-tools/datashot/recipe/overlay';


function overlayData(results) {
    const overlay = document.createElement('div');
    overlay.id = "overlay";
    document.body.appendChild(overlay);
    ReactDOM.render(
	    <DatashotOverlay
	       data={results}
	       onClose={() => ReactDOM.unmountComponentAtNode(document.getElementById('overlay'))}
	       />,
	document.getElementById('overlay'));
}


function overlayRecipe(recipe) {
    console.log('overlaying recipe!');
    const overlay = document.createElement('div');
    overlay.id = "overlay";
    document.body.appendChild(overlay);
    ReactDOM.render(
	    <DatashotRecipeOverlay
	       recipe={recipe}
	       onClose={() => ReactDOM.unmountComponentAtNode(document.getElementById('overlay'))}
	       />,
	document.getElementById('overlay'));
}


function extractRootData(root, recipe) {
    let resultRoot = {rows: []};
    for (let row of root.querySelectorAll(recipe.row.selector)) {
	let resultData = [];
	for (let data of row.querySelectorAll(recipe.data.selector)) {
	    resultData.push({textContent: data.textContent});
	}
	// need a `if not any(resultData)` implementation here
	resultRoot.rows.push({columns: resultData});
    }
    return resultRoot;
}

function extractData(recipe) {
    const results = [];
    for (let root of document.querySelectorAll(recipe.selector)) {
	results.push(extractRootData(root, recipe))
    }
    return results;
}


browser.runtime.onMessage.addListener((message, sender, response) => {
    console.log('message in content!');
    if (message.message === "tab.extractData") {
	let {recipe} = message;
	for (let root of document.querySelectorAll(recipe.selector)) {
	    root.style.border = "solid red 2px";
	    root.style.cursor = "crosshair"
	    root.addEventListener('click', (evt) => {
		overlayData([extractRootData(root, recipe)]);
	    })
	}

    } else if (message.message === "tab.showData") {
	const {filename} = message;
	browser.storage.local.get("data").then(persistent => {
	    const {data} = persistent;
	    overlayData(JSON.parse(data[filename]));
	});
    } else if (message.message === "tab.showRecipe") {
	const {filename} = message;
	browser.storage.local.get("recipes").then(persistent => {
	    const {recipes} = persistent;
	    overlayRecipe(recipes[message.name]);
	});
    }
});
