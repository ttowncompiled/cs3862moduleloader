"use strict";
var system_register_1 = require('./system-register');
var module_cache_1 = require('./module-cache');
var supply_cache_1 = require('./supply-cache');
var browser_1 = require('./browser');
var IE9XHR = (function () {
    function IE9XHR() {
        this.xhr = new XMLHttpRequest();
    }
    IE9XHR.prototype.open = function (requestType, url) {
        return this.xhr.open(requestType, url);
    };
    Object.defineProperty(IE9XHR.prototype, "responseText", {
        get: function () {
            return this.xhr.responseText;
        },
        enumerable: true,
        configurable: true
    });
    IE9XHR.prototype.send = function () {
        this.xhr.onreadystatechange = this.onload;
        this.xhr.send();
    };
    Object.defineProperty(IE9XHR.prototype, "status", {
        get: function () {
            return this.xhr.status;
        },
        enumerable: true,
        configurable: true
    });
    return IE9XHR;
}());
function factory() {
    if (navigator.appCodeName == 'Mozilla' || navigator.appCodeName == 'Chrome') {
        var xmlFactory = XMLHttpRequest;
        var jsEval = eval;
        var browser = new browser_1.Browser(xmlFactory, jsEval);
        var cache = new module_cache_1.ModuleCache(browser);
        var supply = new supply_cache_1.SupplyCache();
        return new system_register_1.SystemRegister(cache, supply);
    }
    else if (navigator.appCodeName == "MSIE") {
        var xmlFactory = XMLHttpRequest;
        var ie9eval = function (js) { return eval('[' + js + '][0]'); };
        var browser = new browser_1.Browser(xmlFactory, jsEval);
        var cache = new module_cache_1.ModuleCache(browser);
        var supply = new supply_cache_1.SupplyCache();
        return new system_register_1.SystemRegister(cache, supply);
    }
    return null;
}
var System = factory();
