/**
 * Core Controller Class
 */
var Controller = new Class({
	
	initialize: function(params) {
		// Merge controller options with params from instantiated object
		this.params = TF.merge(this.setOptions, params);
		
		// Set the model object for this layout
		if(typeof this.params.model == 'string') {
			this.model = TF.getModel(this.params.model);
			
			// Register this controller as an observer of model events
			if(this.params.registerObserver) {
				this.model.registerObserver(this);	
			}
		}
		
		// If instantiated object assigns a window use it
		this.window = (this.params && this.params.window) ? this.params.window : null;
		
		// Set the layout object for this controller and setup an observer for the model
		if(typeof this.params.layout == 'string') {
			this.layout = TF.getLayout(this.params.layout);
		}
		
		// By default use 'display()' for any controller that is for display
		if(typeof this.display == 'function') {
			if(this.window == null) {
				this.window = Ti.UI.createWindow();
			}	
			
			this.display();	
		// Or use a user defined method
		} else if(typeof this[params.method] == 'function') {
			this[params.method]();
		} else { // If no method, just continue
			TF.log({ msg: 'No controller method used', debug: true });
		}
	},

	close: function() {
		if(this.window) { 
			this.window.close();
		}
		if(this.window !== null) {
			this.window = null;
		}
	}
	
});