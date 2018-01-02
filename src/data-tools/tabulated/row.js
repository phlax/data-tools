import React from 'react';
import ReactDOM from 'react-dom';


export default class DataTableRow extends React.Component {

    constructor(props) {
	super(props);
	this.state = {};
    }

    render() {
	const {data} = this.props;
	const {columns} = data;
	return (
	    <tr>
	      {columns.map((item, key) => {
		  return (
		      <td>
			  {item.textContent}
		      </td>);
	      })
	      }
	    </tr>
	);
    }
}
