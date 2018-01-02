import React from 'react';

import Modal from 'react-modal';

import DataTable from '../tabulated/data';


export default class DatashotOverlay extends React.Component {

    constructor(props) {
	super(props);
	this.state = {};
    }

    onDownload(caller) {
	const $this = this;
	const {filename} = this.state;
	if (!filename) {
	    this.setState({actionMessage: "You need to enter a filename"})
	}
	browser.runtime.sendMessage({message: 'download', data: JSON.stringify(this.props.data)}).then(result => {
	    $this.setState({actionMessage: "Downloaded!"});
	});
    }

    onOpen(caller) {
	const $this = this;
	browser.runtime.sendMessage({message: 'open', data: JSON.stringify(this.props.data)}).then(result => {
	    $this.setState({actionMessage: "Opened!"});
	});
    }

    onSave(caller) {
	const $this = this;
	const {filename} = this.state;
	if (!filename) {
	    this.setState({actionMessage: "You need to enter a filename"})
	    return;
	}
	browser.runtime.sendMessage({message: 'save', data: JSON.stringify(this.props.data), filename: filename}).then(result => {
	    $this.setState({actionMessage: "Saved!"});
	});
    }


    handleInputChange(evt) {
	this.setState({filename: evt.target.value})
    }

    render() {
	const {actionMessage} = this.state;
	return (
	    <div className="tables">
	      <Modal isOpen={true}>
		<div>{actionMessage}</div>
		{this.props.data.map((item, key) => {
		    return (
			<div className="table-wrapper">
			  <div className="data-actions">
			    <input type="text" onChange={this.handleInputChange.bind(this)} />
			    <button onClick={this.onSave.bind(this)}>Save</button>
			    <button onClick={this.onOpen.bind(this)}>Open</button>
			    <button onClick={this.onDownload.bind(this)}>Download</button>
			    <button onClick={this.props.onClose}>Dismiss</button>
			  </div>
			  <DataTable data={item} />
			</div>
		    );
		})
		}
	      </Modal>
	    </div>
	);
    }
}
