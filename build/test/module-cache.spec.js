"use strict";
var browser_1 = require('../src/browser');
var module_cache_1 = require('../src/module-cache');
var MockXML = (function () {
    function MockXML() {
    }
    MockXML.prototype.open = function (requestType, url) { };
    Object.defineProperty(MockXML.prototype, "responseText", {
        get: function () {
            return 'done()';
        },
        enumerable: true,
        configurable: true
    });
    MockXML.prototype.send = function () {
        this.onload();
    };
    Object.defineProperty(MockXML.prototype, "status", {
        get: function () {
            return 200;
        },
        enumerable: true,
        configurable: true
    });
    return MockXML;
}());
var mockFactory = function () { return new MockXML(); };
describe('Module Cache', function () {
    it('should fetch uncached modules', function (done) {
        var jsEval = function (js) { return eval(js); };
        var browser = new browser_1.Browser(mockFactory, jsEval);
        var cache = new module_cache_1.ModuleCache(browser);
        cache.get(['test']);
    });
    it('should store new modules', function (done) {
        var browser = new browser_1.Browser(mockFactory, eval);
        var cache = new module_cache_1.ModuleCache(browser);
        cache.get(['test']).then(function (mods) { return done(); });
        cache.store('test', {});
    });
    it('should handle empty input', function (done) {
        var browser = new browser_1.Browser(mockFactory, eval);
        var cache = new module_cache_1.ModuleCache(browser);
        cache.get([]).then(function (mods) { return done(); });
    });
});
