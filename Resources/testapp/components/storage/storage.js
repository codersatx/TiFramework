/**
 * TiStorage Component
 */	
TiFramework.App.Components.TiStorage = new Class({
	Extends: DataComponent,
	
	connection	: new TiStorage(),	// The instantiated library
	database	: null,				// The database object
	collections	: {},				// Collections in the database object
	
	initialize: function(params) {
		this.params = params;
		
		// Assign the db object
		if(this.params.database) {
			this.database = this.connection.use(this.params.database);
		}
		
		// Assigned the collections to an object literal
		if(params.collections) {
			for (var i = this.params.collections.length - 1; i >= 0; i--){
				this.collections[this.params.collections[i]] = this.database.collection(this.params.collections[i]);
			}
		}
		
	},
	
	setObject: function(src) {
		if(src == null) {
			return this.collections;
		} else if(typeof src == 'string') {
			return this.collections[src];	
		} else {
			TF.log({ 
				msg: 'TFA.Components.TiStorage: A collection object is required for this model.', 
				type: 'error' 
			});
			
			return null;
		}
	},
	
	Read: function(params) {
		if(params.type == 'list') {
			return this.collections[params.collection].find();	
		}
	},
	
	Delete: function(params) {
		this.collections[params.collection].remove(params.id);
	}
	
});