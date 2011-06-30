/**
 * TiFramework - The global framework object
 * @namespace TiFramework namespace
 */
var TiFramework = TF = new Class();

/**
 * Init method to setup framework constants
 * 
 * @param {Object} params
 * @description The following are valid properties of the param object
 * 	params.VERSION				- Version number
 * 	params.APPNAME				- App name
 * 	params.APPDIR				- App directory
 * 	params.CONTROLDIR			- Controller directory
 * 	params.LAYOUTDIR			- Layout directory
 * 	params.DATATYPE				- The data type to use for the models
 * 	params._LOG					- Log true / false
 * 	params.defaultController	- Default controller name
 *  params.windows				- Object of windows to create at startup
 */
TiFramework.init = function(params) {
	// App defaults
	TiFramework.VERSION 	= params.VERSION;
	TiFramework.APPNAME 	= params.APPNAME;
	TiFramework.APPDIR		= params.APPDIR;
	TiFramework.CONTROLDIR	= params.CONTROLDIR;
	TiFramework.LAYOUTDIR	= params.LAYOUTDIR;
	TiFramework.MODELDIR	= params.MODELDIR;
	TiFramework.PLUGINDIR	= params.PLUGINDIR;
	TiFramework.COMDIR		= params.COMDIR;
	TiFramework.DATATYPE	= params.DATATYPE;	
	TiFramework._LOG		= params.Log;
	TiFramework.Mode		= params.Mode;
	TiFramework.defaultController = (params.defaultController) ? params.defaultController : 'Default';
	
	/** 
	 * @namespace TiFramework.App The Default App Namespaces
	 */
	TiFramework.App = TFA = {
		Controllers	: {},
		Layouts		: {},
		Models		: {},
		Components	: {},
		Events		: {},
		UI			: {}
	};
	
	// Setup global windows at startup
	if(params.windows) {
		TiFramework.App.Windows = params.windows;
	}
	
	// Include core framework libraries
	if(params.Mode === 'development') {
		Ti.include(
			'framework/utilities.js',		
			'framework/model.js',
			'framework/layout.js',
			'framework/controller.js',
			'framework/component.js',
			'framework/request.js'
		);	
	}
	
	// Customary Startup message in log
	TiFramework.log({ msg: '*** TiFramework Framework Initialized ***', info: true });
	TiFramework.log({ msg: '*** AUTHOR: Rick Blalock ***', info: true });
	TiFramework.log({ msg: '*** APP Name: ' + params.APPNAME + ' ***', info: true });
	TiFramework.log({ msg: '*** Version: ' + params.VERSION + ' ***', info: true });	
};

/**
 * Recursively include files
 * 
 * @param {String} folder
 */
// FIXME This doesn't work on device.  Don't think there is a way to get it to work either.
TiFramework.recursiveInclude = function(folder) {
	var path 	= TiFramework.APPDIR + '/' + folder,
		file 	= Ti.Filesystem.getFile( Ti.Filesystem.resourcesDirectory + '/' + path ),
		listing = file.getDirectoryListing();
	
	for (var i = 0; i < listing.length; i++) {
		// For things like components, nested folder
		if(listing[i].indexOf('.') == -1) { 
			Ti.include(path + '/' + listing[i] + '/' + listing[i] + '.js');	
		} else if(listing[i].split('.').pop() === 'js') { 
			// normal files (controllers, etc.)
			Ti.include(path + '/' + listing[i]);	
		}
	};
};

/**
 * Include a new object / file
 * 
 * @param {String} type - The type of object this will belong
 * @param {String} name - The name of the object to create
 * @param {Object} params - The params to pass to the object constructor
 * @return {mixed}
 */
TiFramework.loadObject = function(type, name, params) {
	if(TFA[type] == null) {
		// If the type / namespace doesn't exist
	    TF.log({
	    	msg: 'ERROR: Trying to load an object that does not exist in the TFA namespace', 
	    	error: true 
	    });
	    return false;
	} else if(TFA[type][name] == null) {
		// If the name of the type object doesn't exist
		Ti.include(TF.APPDIR + '/' + type.toLowerCase() + '/' + name.toLowerCase() + '.js');
		
		TF.log(type + ' ' + name + ' Loaded');
		
		return new TFA[type][name](params); 
	} else {
		// If the name of the type object has already been loaded / exists
		TF.log(type + ' ' + name + ' Loaded');
		
		return new TFA[type][name](params);
	}
};

/**
 * Sets the app theme by including the styles file from the themes dir
 * 
 * @param {String} theme - Name of the theme directory
 */
TiFramework.setTheme = function(theme) {
	// TODO needs to be fleshed out.
	Ti.include(TiFramework.APPDIR + '/themes/' + theme + '/styles.js');	
};

/**
 * Instantiates a layout object
 * 
 * @param {String} name - Name of layout
 * @param {Object} params - Params object
 * @return {Object} layout
 */
TiFramework.getLayout = function(name, params) {
	var layout = new TFA.Layouts[name](params);
	return layout;
};	

/**
 * Instantiates a model object
 * 
 * @param {String} name - Name of model
 * @param {Object} params - Params object
 * @return {Object} model
 */
TiFramework.getModel = function(name, params) {
	var model = new TFA.Models[name](params);
	return model;
};

/**
 * Gets the style properties
 * 
 * @param {String} name - Name of style object
 * @return {Object} styles
 */
TiFramework.getStyles = function(name) {
	var styles = TFA.Styles[name];
	return styles;
};

/**
 * Log Helper
 * 
 * @author Fred Spencer (unashamedly borrowed from Integrity because Fred is the man)
 * @param {Object} params - Parameters to pass to the log function
 */
TiFramework.log = function(params) { 
	if(TiFramework._LOG == true) {
		if (typeof(params) === 'object' && params !== null) {
			if (params.error) { Ti.API.error(params.msg); } 
			if (params.debug) { Ti.API.debug(params.msg); } 
			if (params.info) { Ti.API.info(params.msg); }

			if (!params.error && !params.debug && !params.info) { Ti.API.info(params); }
		} else if (params === null){
			Ti.API.error(params); // just print the message: API.log(msg);
		} else {
			Ti.API.info(params); // just print the message: API.log(msg);
		}					
	} else {
		return;
	}
};
