/**
 * System Utilities
 */	
TiFramework.Util = {
	/**
	 * Month / Day / Year format
	 * 
	 * @param {Object} e The Date() object
	 * @returns {Object} Object of date references
	 */	
	dateMDY: (function(e) {
		var d 		= e,
			month 	= (d.getMonth() + 1).toLocaleString(),
			day 	= d.getDate().toLocaleString(),
			year 	= d.getFullYear().toLocaleString(),
			hour	= d.getHours().toLocaleString(),
			min		= (d.getMinutes().toLocaleString() < 10) ? 0 + d.getMinutes().toLocaleString() : d.getMinutes().toLocaleString(),
			time	= (hour >= 12) ? 'PM' : 'AM';
		
		if(hour > 12) {
			hour = hour - 12;
		} else if(hour == 0) {
			hour = 12;
		}
		
		return {
			month: month,
			day: day,
			year: year,
			hour: hour,
			min: min,
			time: time
		};
	}),
	
	/**
	 * Sort an array by object property
	 * @param {Array} arr The arr object to sort
	 * @param {String} prop The property to sort by
	 * @param {String} type The type of sort: asc | desc
	 * @returns {Array}
	 */	
	sortArrByProp: (function(arr, prop, type) {
		var newArr = null;
		
		// TODO Check if it's an array, defined, etc.
		// TODO Need a random type, alphabetical / string sorting type
		
		if(type == 'asc') {
			newArr = arr.sort(function(a, b) { return a[prop] - b[prop]; });
		} else if(type =='desc') {
			newArr = arr.sort(function(a, b) { return b[prop] - a[prop]; });
		} else {
			newArr = arr.sort(function(a, b) { return b[prop] - a[prop]; });
		}
		
		return newArr;
	})

};