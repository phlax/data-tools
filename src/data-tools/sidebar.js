import React from 'react';
import ReactDOM from 'react-dom';

import DatashotSidebarWidget from './datashot/sidebar';

import DataPluginManager from 'data-tools/plugins/manage/manager';


class DataSidebar extends React.Component {

    get manager () {
	return new DataPluginManager();
    }

    render() {
	return (
	    <div>
	      <DatashotSidebarWidget manager={this.manager} />
	    </div>
	);
    }
}
ReactDOM.render(<DataSidebar />, document.getElementById('app'));
