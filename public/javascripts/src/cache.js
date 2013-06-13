var CacheInterface = {
  cache: function (name, item) {},
  getByName: function (name) {},
};

Kane.Cache = function (settings) {
  _.extend(this, settings);

  this.store = {};
};

Kane.Cache.prototype = Object.create(CacheInterface);

Kane.Cache.prototype.cache = function (name, item) {
  this.store[name] = item; 
};

Kane.Cache.prototype.getByName = function (name) {
  return this.store[name];
};
