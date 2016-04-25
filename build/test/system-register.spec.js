"use strict";
var module_cache_1 = require('../src/module-cache');
var supply_cache_1 = require('../src/supply-cache');
var system_register_1 = require('../src/system-register');
describe('System Register', function () {
    var OK = 'ok';
    it('should supply injected non-promise properties', function (done) {
        var system = new system_register_1.SystemRegister(null, new supply_cache_1.SupplyCache());
        system.supply('test', { key: OK });
        system.inject('test').then(function (mod) {
            if (mod.key == OK) {
                done();
            }
        });
    });
    it('should supply injected promises', function (done) {
        var system = new system_register_1.SystemRegister(null, new supply_cache_1.SupplyCache());
        system.supply('test', new Promise(function (resolve, reject) { return resolve({ key: OK }); }));
        system.inject('test').then(function (mod) {
            if (mod.key == OK) {
                done();
            }
        });
    });
    it('should execute the program', function (done) {
        var system = new system_register_1.SystemRegister(new module_cache_1.ModuleCache(null), new supply_cache_1.SupplyCache());
        system.register('test', [], function (exports) { return done(); });
    });
    it('should fetch deps for the module from module cache', function (done) {
        var mockFactory = function () {
            var cache = new module_cache_1.ModuleCache(null);
            cache.get = function (names) {
                return Promise.resolve(done());
            };
            return cache;
        };
        var system = new system_register_1.SystemRegister(mockFactory(), new supply_cache_1.SupplyCache());
        system.register('test', ['dep'], function (exports) {
            return {
                setters: [],
                execute: function () { }
            };
        });
    });
    it('should use the dependency setters', function (done) {
        var mockFactory = function () {
            var cache = new module_cache_1.ModuleCache(null);
            cache.get = function (names) {
                return Promise.resolve(names);
            };
            return cache;
        };
        var system = new system_register_1.SystemRegister(mockFactory(), new supply_cache_1.SupplyCache());
        system.register('test', ['dep'], function (exports) {
            return {
                setters: [function (mod) { return done(); }],
                execute: function () { }
            };
        });
    });
    it('should execute resolved modules', function (done) {
        var system = new system_register_1.SystemRegister(new module_cache_1.ModuleCache(null), new supply_cache_1.SupplyCache());
        system.register('test', [], function (exports) {
            return {
                setters: [],
                execute: function () { done(); }
            };
        });
    });
    it('should store executed modules', function (done) {
        var executed = false;
        var mockFactory = function () {
            var cache = new module_cache_1.ModuleCache(null);
            cache.store = function (name, mod) { return executed ? done() : done(executed); };
            return cache;
        };
        var system = new system_register_1.SystemRegister(mockFactory(), new supply_cache_1.SupplyCache());
        system.register('test', [], function (exports) {
            return {
                setters: [],
                execute: function () { executed = true; }
            };
        });
    });
});
