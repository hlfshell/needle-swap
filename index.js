const path = require('path');
const assert = require('assert').ok;

var needleswap = function(modules){

	needleswap.modules = modules;

	module.constructor.prototype.require = function(requirePath){
		var self = this;
		assert(requirePath, "No path provided");
		assert(typeof requirePath == "string", "Provided path must be a string");

		if(needleswap.modules[requirePath]) return modules[requirePath];

		return self.constructor._load(requirePath,self);
	};

	return needleswap;

};

needleswap.clear = function(){
	needleswap.modules = {};

	return needleswap;
};

needleswap.clearCache = function(items){
	if(!items) return needleswap.clearEntireCache();
	if(!Array.isArray(items)) items = [items];

	items.forEach(item =>{
		delete require.cache[require.resolve(item)];
	});

	return needleswap;
};

needleswap.clearEntireCache = function(){
	Object.keys(require.cache).forEach(cachedItem =>{
		delete require.cache[require.resolve(cachedItem)];
	});

	return needleswap;
}

module.exports = needleswap;
