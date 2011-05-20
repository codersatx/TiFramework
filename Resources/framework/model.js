/**
 * Core Model Class
 */
var Model = new Class({
	
	initialize: function(params) {
		// Merge model options with params from instantiated object
		this.params = TF.merge(this.setOptions, params);
		
		this.observer = null;
		
		// Set the main data object that can be interfaced with directly if needed
		this.dataObject = TiFramework.dataSource.setObject(this.params.object);
	},
	
	registerObserver: function(observer) {
		this.observer = observer;
	},
	
	Create: function(params) {
		TiFramework.dataSource.Create(params);
		
		if(this.observer && typeof this.observer.Create == 'function') {
			this.observer.Create(params);
		}
	},
	
	Read: function(params) {
		TiFramework.dataSource.Read(params);
		
		if(this.observer && typeof this.observer.Read == 'function') {
			this.observer.Read(params);
		}
		
		return TiFramework.dataSource.Read(params);
	},
	
	Update: function(params) {
		TiFramework.dataSource.Update(params);
		
		if(this.observer && typeof this.observer.Update == 'function') {
			this.observer.Update(params);
		}
	},	
	
	Delete: function(params) {
		TiFramework.dataSource.Delete(params);
		
		if(this.observer && typeof this.observer.Delete == 'function') {
			this.observer.Delete(params);
		}
	}
	
});