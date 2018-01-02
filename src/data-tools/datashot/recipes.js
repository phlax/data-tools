import React from 'react';
import ReactDOM from 'react-dom';

import DatashotStorage from './storage';


export default class DatashotRecipes extends React.Component {

    constructor(props) {
	super(props);
	this.state = {recipes: []};
    }

    updateRecipesList() {
	this.props.manager.datashot.storage.getRecipes().then(recipes => {
	    this.setState({recipes: Object.keys(recipes)});
	});
    }

    componentDidMount() {
	const $this = this;
	this.updateRecipesList();
	browser.runtime.onMessage.addListener(resp => {
	    const {message} = resp;
	    if (message === "recipes.saved") {
		this.updateRecipesList();
	    }
	});
    }

    handleOpenRecipe(evt) {
	evt.preventDefault();
	browser.runtime.sendMessage({message: 'tab.showRecipe', name: evt.target.name});
    }

    render() {
	const {recipes} = this.state;
	return (
	    <div>
	      <h3>Extraction recipes</h3>
	      <ul>
		{recipes.map((item, key) => {
		    return (
			<li><a href="#" name={item} onClick={this.handleOpenRecipe.bind(this)}>{item}</a></li>
		    );
		})
		}
	      </ul>
	     </div>
	);
    }
}
