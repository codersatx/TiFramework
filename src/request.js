/**
 * TiFramework Request Object
 * 
 * @param {Object} opts The option object to use with the request
 * @description The following are valid options to pass through:
 * 		opts.timeout 	: int Timeout request
 * 		opts.type		: string GET/POST
 * 		opts.data		: mixed The data to pass
 * 		opts.url		: string The url source to call
 * 		opts.onerror	: funtion A function to execute when there is an XHR error
 */
TiFramework.Request = (function(opts) {
	// Setup the xhr object
	var xhr = Ti.Network.createHTTPClient();

	// Set the timeout or a default if one is not provided
	xhr.timeout = (opts.timeout) ? opts.timeout : 10000;	

	/**
	 * Error handling
	 * @param {Object} e The callback object
	 */
	xhr.onerror = function(e) {
		if(opts.onerror) {
			opts.onerror(e);				
		} else {
			TiFramework.log({
				error: true,
				msg: e
			});
		}
	};


	/**
	 * When XHR request is loaded
	 * @returns {Mixed}
	 */
	xhr.onload = function() {
           TiFramework.log({
               debug: true,
               msg: 'xhr request: ' + opts.url + " --> " + xhr.status
           });
		// If successful
		try 
		{
		    var data = null;
		    if (opts.binary) {
		        data = this.responseData;
               } else if (opts.xml) {
		        data = this.responseXML;
               } else {
                   data = this.responseText;
               }
			if(data == null) {
				TiFramework.log({
					debug: true,
					msg: this
				});
			} else {
				if(opts.callback) {
					// Execute a callback function
					if (opts.json) {
					    try {
					        data = JSON.parse(data);
                           } catch (e1)  {
                               xhr.onerror(e1);
                               return;
                           }
                       }
					opts.callback(data);					
				} else {
					return data;
				}
			}
		}
		// If not successful
		catch(e) {
               xhr.onerror(e);
		};
	};

	// Open the remote connection
	if(opts.type) {
		xhr.open(opts.type, opts.url);	
	} else {
		xhr.open('GET', opts.url);
	}

	if(opts.data) {
		// send the data
		xhr.send(opts.data);	
	} else {
		xhr.send(null);
	}		
});