"use strict";
var SupplyCache = (function () {
    function SupplyCache() {
        this.cache = {};
    }
    SupplyCache.prototype.supply = function (key, prop) {
        if (typeof prop == "promise") {
            this.cache[key] = prop;
        }
        else {
            this.cache[key] = new Promise(function (resolve, reject) {
                resolve(prop);
            });
        }
    };
    SupplyCache.prototype.inject = function (key) {
        return this.cache[key];
    };
    return SupplyCache;
}());
exports.SupplyCache = SupplyCache;
