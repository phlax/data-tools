import React from 'react';
import ReactDOM from 'react-dom';


export default class DatashotList extends React.Component {

    constructor(props) {
	super(props);
	this.state = {data: []};
    }

    updateDataList() {
	    this.props.manager.datashot.storage.getStoredData().then(data => {
		this.setState({data: Object.keys(data)});
	});
    }

    componentDidMount() {
	const $this = this;
	this.updateDataList();
	browser.runtime.onMessage.addListener(resp => {
	    const {message} = resp;
	    if (message === "data.saved") {
		this.updateDataList();
	    }
	});
    }

    handleOpenData(evt) {
	evt.preventDefault();
	browser.runtime.sendMessage({message: 'tab.showData', filename: evt.target.name});
    }

    render() {
	const {data} = this.state;
	return (
	    <div>
	      <h3>Saved data</h3>
	      <ul>
		{data.map((item, key) => {
		    return (
			<li><a href="#" name={item} onClick={this.handleOpenData.bind(this)}>{item}</a></li>
		    );
		})
		}
	     </ul>
           </div>
	);
    }
}
