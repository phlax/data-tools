
import PluginManager from 'web-ext-plugins/manage/manager';
import PluginDatashot from '../../datashot'


export default class DataPluginManager extends PluginManager {

    constructor() {
	super();
	this.datashot = new PluginDatashot(this);
    }
}
