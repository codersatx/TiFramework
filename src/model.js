/**
 * Core Model Class
 */
var Model = new Class({
	
	initialize: function(params) {
		// Merge model options with params from instantiated object
		this.params = Object.merge(this.setOptions, params);
		
		// Set the main data object that can be interfaced with directly if needed
		this.dataObject = TiFramework.dataSource.setObject(this.params.object);
	},
	
	Create: function(params) {
		return TiFramework.dataSource.Create(params);
	},
	
	Read: function(params) {
		return TiFramework.dataSource.Read(params);
	},
	
	Update: function(params) {
		TiFramework.dataSource.Update(params);
	},	
	
	Delete: function(params) {
		TiFramework.dataSource.Delete(params);
	}
	
});