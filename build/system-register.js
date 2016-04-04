var SystemRegister = (function () {
    function SystemRegister(cache) {
        this.cache = cache;
    }
    SystemRegister.prototype.register = function (name, deps, program) {
        var _this = this;
        var module = {};
        var exports = function (name, member) { return module[name] = member; };
        var obj = program(exports);
        this.cache.get(deps).then(function (modules) {
            for (var i = 0; i < modules.length; i++) {
                obj.setters[i](modules[i]);
            }
            obj.execute();
            _this.cache.store(name, module);
        });
    };
    return SystemRegister;
})();
exports.SystemRegister = SystemRegister;
