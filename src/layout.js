/**
 * Core Layout Class
 */
var Layout = new Class({
	
	initialize: function(params) {
		// Merge options with params from instantiated object
		this.params = Object.merge(this.setOptions, params);
		
		// Set the model object for this layout
		if(this.params && typeof this.params.model == 'string') {
			this.model = TF.getModel(this.params.model);
		}
		
		// Set the styles object shortcut for this layout
		if(this.params && typeof this.params.styles == 'string') {
			this.styles = TF.getStyles(this.params.styles);
		}
	}
	
});