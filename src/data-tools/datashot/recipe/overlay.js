import React from 'react';

import Modal from 'react-modal';


export default class RecipeOverlay extends React.Component {

    constructor(props) {
	super(props);
	this.state = {};
    }

    handleInputChange(evt) {
	this.setState({filename: evt.target.value});
    }

    componentDidMount() {
	this.setState(
	    {rowSelector: this.props.recipe.row.selector,
	     rowAttrs: this.props.recipe.row.attrs,
	     dataSelector: this.props.recipe.data.selector,
	     dataAttrs: this.props.recipe.data.attrs});
    }

    render() {
	const {actionMessage, dataAttrs, dataSelector, rowSelector, rowAttrs} = this.state;
	console.log('rendering');
	console.log(this.props.recipe);
	return (
	    <div className="tables">
	      <Modal isOpen={true}>
		<div>{actionMessage}</div>
		<h2>{this.props.recipe.name}</h2>
		<fieldset>
		  <legend>Rows</legend>
		  <p>
		    Row selector: <input type="text" name="row-selector" value={rowSelector} />
		  </p>
		  <p>
		    Row attributes: <input type="text" name="row-attrs" value={rowAttrs} />
		  </p>
		</fieldset>
		<fieldset>
		  <legend>Data</legend>
		  <p>
		    Data selector: <input type="text" name="row-selector" value={dataSelector} />
		  </p>
		  <p>
		    Data attributes: <input type="text" name="row-attrs" value={dataAttrs} />
		  </p>
		</fieldset>
	      </Modal>
	    </div>
	);
    }
}
