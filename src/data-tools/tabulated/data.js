import React from 'react';
import ReactDOM from 'react-dom';

import DataTableRow from './row';


export default class DataTable extends React.Component {

    constructor(props) {
	super(props);
	this.state = {};
    }

    render() {
	const {data} = this.props;
	let {rows} = data;
	rows = rows.slice(0, 5);
	const colspan = Math.max(...Object.values(rows).map(r => r.columns.length));
	return (
	    <table className="data-table">
	      {rows.map((item, key) => {
		  return <DataTableRow index={key} data={item} />;
	      })
	      }
	      <tr><td className="data-all-toggle" colSpan={colspan}><button>Show more</button></td></tr>
	    </table>
	);
    }
}
