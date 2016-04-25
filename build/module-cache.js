"use strict";
var ModuleCache = (function () {
    function ModuleCache(browser) {
        this.browser = browser;
        this.cache = {};
    }
    ModuleCache.prototype.get = function (names) {
        var _this = this;
        return Promise.all(names.map(function (name) {
            if (!(name in _this.cache)) {
                var record = { promise: null, resolve: null };
                var fetch = new Promise(function (resolve, reject) {
                    _this.browser.fetch(name);
                    record.resolve = resolve;
                });
                record.promise = fetch;
                _this.cache[name] = record;
            }
            return _this.cache[name].promise;
        }));
    };
    ModuleCache.prototype.store = function (name, mod) {
        this.cache[name].resolve(mod);
    };
    return ModuleCache;
}());
exports.ModuleCache = ModuleCache;
