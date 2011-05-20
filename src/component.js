/**
 * Core Component Class
 */
var Component = new Class({
	
	initialize: function(params) {
		// Merge component options with params from instantiated object
		this.params = TF.merge(this.setOptions, params);
	}
	
});

/**
 * Core Data Component Class
 */
var DataComponent = new Class({
	
	
	
});