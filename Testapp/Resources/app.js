(function() {
	// Pull in the core system files
	Ti.include('framework/core.js');
	
	// Global app namespace and init options
	TiFramework.init({
		VERSION: 	'0.1',
		APPNAME: 	'TiFramework Tests',	
		APPDIR: 	'testapp',		
		CONTROLDIR: 'controllers',
		LAYOUTDIR: 	'layouts',
		MODELDIR: 	'models',
		PLUGINDIR: 	'plugins',
		COMDIR: 	'components',
		DATATYPE:	'TiStorage',
		Log: 		true,
		defaultController: 'List'		
	});
	
	// Set default theme
	TiFramework.setTheme('default');
	
	// Include dependancies
	TiFramework.recursiveInclude(TiFramework.PLUGINDIR);
	TiFramework.recursiveInclude(TiFramework.COMDIR);
	TiFramework.recursiveInclude(TiFramework.CONTROLDIR);
	TiFramework.recursiveInclude(TiFramework.LAYOUTDIR);
	TiFramework.recursiveInclude(TiFramework.MODELDIR);
	
	/** Kick off the app **/
	
	// Set the data source if assigned
	if(TiFramework.DATATYPE) {
		TiFramework.dataSource = new TFA.Components[TiFramework.DATATYPE]({
			database: 'test',
			collections: ['tasks', 'users', 'settings']
		});
	}
	
	// Temp. tests
	var test = new TFA.Controller.Test({ open: true });	
})();