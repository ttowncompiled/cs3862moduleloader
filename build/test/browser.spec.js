"use strict";
var browser_1 = require('../src/browser');
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
describe('Browser', function () {
    it('should fetch new modules', function (done) {
        var mockFactory = function () { return new MockXML(); };
        var jsEval = function (js) { return eval(js); };
        var browser = new browser_1.Browser(mockFactory, jsEval);
        browser.fetch('test');
    });
});
