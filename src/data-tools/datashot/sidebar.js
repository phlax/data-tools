import React from 'react';
import ReactDOM from 'react-dom';

import DataTable from '../tabulated/data';
import DatashotSelector from './selector';
import DatashotList from './list';
import DatashotRecipes from './recipes';


export default class DatashotSidebarWidget extends React.Component {

    render() {
	return (
	    <div>
	      <DatashotSelector manager={this.props.manager} />
	      <DatashotList manager={this.props.manager} />
	      <DatashotRecipes manager={this.props.manager} />
	    </div>
	);
    }
}
