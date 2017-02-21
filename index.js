const path = require('path');
const assert = require('assert').ok;

var needleswap = function(modules){

	module.constructor.prototype.require = function(requirePath){
		var self = this;
		assert(path, "No path provided");
		assert(typeof requirePath == "string", "Provided path must be a string");

		if(modules[requirePath]) return modules[requirePath];

		return self.constructor._load(requirePath,self);
	};

};

needleswap.clear = function(){
	module.constructor.prototype.require = function(requirePath){
		var self = this;
		assert(path, "No path provided");
		assert(typeof requirePath == "string", "Provided path must be a string");
                return self.constructor._load(requirePath,self);
        };
};

needleswap.clearCache = function(items){
	if(!items) return needleswap.clearEntireCache();
	if(!Array.isArray(items)) items = [items];

	items.forEach(item =>{
		delete require.cache[require.resolve(item)];
	});
};

needleswap.clearEntireCache = function(){
	Object.keys(require.cache).forEach(cachedItem =>{
		delete require.cache[require.resolve(cachedItem)];
	});
}

module.exports = needleswap;
