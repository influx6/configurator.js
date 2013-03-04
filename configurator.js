/* generates a set of configuration to be loaded up 
from file or from an object passed into it
*/

var ts = require('tsk').ToolStack,
	util = ts.Utility,
	helpers = ts.Helpers.HashMaps,
	fs = require('fs'),
	path = require('path'),
	_c = this.Configurator =  {};

_c.configurations = {};
_c.settings = {};

_c.load = function Load(title,file){
	return helpers.add.call(this.configurations,title,require(file));
};

_c.configuration = function Configuration(title,object){
	if(!util.isObject(object)) return false;
	return helpers.add.call(this.configurations,title,object);
};

_c.set = function(key,value){
	return helpers.add.call(this.settings,key,{ state: true, val: value });
};

_c.get = function(key){
	return helpers.fetch.call(this.settings,key);
};

_c.enable = function(key){
	helpers.fetch.call(this.settings,key).state = true;
};

_c.disable = function(key){
	helpers.fetch.call(this.settings,key).state = false;
};

_c.enabled = function(key){
	return (helpers.fetch.call(this.settings,key).state === true);
};

_c.disabled = function(key){
	return (helpers.fetch.call(this.settings,key).state === false);
};

_c.use = function(title){
	return helpers.fetch.call(this.configurations,title);
};

_c.extends = function(){
	var c = {};
	util.extends(c,_c);

	c.settings = util.clone(_c.settings);
	c.configurations = util.clone(_c.configurations);

	return c;
};
		
module.exports = _c;
