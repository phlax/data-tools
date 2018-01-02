import React from 'react';
import ReactDOM from 'react-dom';


export default class DatashotSelector extends React.Component {

    constructor(props) {
	super(props);
	this.state = {data: []};
    }

    get recipe() {
	// Simple table -> JSON
	return {
	    row: {
		selector: 'tr'},
	    data: {
		selector: 'td',
		attrs: ['textContent']}};
    }

    downloadData(data) {
	const blob = window.URL.createObjectURL(new Blob([data], {type: 'application/json'}));
	return browser.downloads.download({url: blob});
    }

    componentDidMount() {
	const $this = this;
	// move this to manager ?
	browser.runtime.onMessage.addListener(resp => {
	    const {message} = resp;
	    if (message === 'download') {
		const {data} = resp;
		$this.downloadData(data);
	    }
	});
    }

    handleInputChange(evt) {
	this.setState({selector: evt.target.value});
    }

    handleExtract(evt) {
	const $this = this;
	const {selector} = this.state;
	const message = {};
	const recipe = this.recipe;
	recipe.selector = selector;
	message.recipe = JSON.stringify(recipe);
	browser.runtime.sendMessage({message: 'tab.extractData', recipe: recipe});
    }

    render() {
	const {data} = this.state;
	return (
	    <fieldset>
	      <p>
		<input placeholder="Enter selector" onChange={this.handleInputChange.bind(this)} />
	      </p>
	      <p>
		<button onClick={this.handleExtract.bind(this)}>Extract</button>
	      </p>
	    </fieldset>
	);
    }
}
