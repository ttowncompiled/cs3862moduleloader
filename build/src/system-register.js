"use strict";
var SystemRegister = (function () {
    function SystemRegister(cache, scache) {
        this.cache = cache;
        this.scache = scache;
    }
    SystemRegister.prototype.inject = function (key) {
        return this.scache.inject(key);
    };
    SystemRegister.prototype.register = function (name, deps, program) {
        var _this = this;
        var mod = {};
        var exports = function (name, member) { return mod[name] = member; };
        var obj = program(exports);
        this.cache.get(deps).then(function (modules) {
            for (var i = 0; i < modules.length; i++) {
                obj.setters[i](modules[i]);
            }
            obj.execute();
            _this.cache.store(name, mod);
        });
    };
    SystemRegister.prototype.supply = function (key, prop) {
        return this.scache.supply(key, prop);
    };
    return SystemRegister;
}());
exports.SystemRegister = SystemRegister;
