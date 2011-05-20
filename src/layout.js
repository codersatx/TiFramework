/**
 * Core Layout Class
 */
var Layout = new Class({
	
	initialize: function(params) {
		// Merge options with params from instantiated object
		this.params = TF.merge(this.setOptions, params);
		
		// Set the model object for this layout
		if(typeof this.params.model == 'string') {
			this.model = TF.getModel(this.params.model);
			
			// Register this layout with the model
			if(this.model && this.params.registerObserver) {
				this.model.registerObserver(this);	
			}
		}
		
		// Set the styles object shortcut for this layout
		if(typeof this.params.styles == 'string') {
			this.styles = TF.getStyles(this.params.styles);
		}
	}
	
});