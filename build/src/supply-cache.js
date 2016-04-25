"use strict";
var SupplyCache = (function () {
    function SupplyCache() {
        this.cache = {};
    }
    SupplyCache.prototype.supply = function (key, prop) {
        this.cache[key] = Promise.resolve(prop);
    };
    SupplyCache.prototype.inject = function (key) {
        return this.cache[key];
    };
    return SupplyCache;
}());
exports.SupplyCache = SupplyCache;
