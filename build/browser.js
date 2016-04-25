"use strict";
var Browser = (function () {
    function Browser(xmlHttp, jsEval) {
        this.xmlHttp = xmlHttp;
        this.jsEval = jsEval;
    }
    Browser.prototype.fetch = function (url) {
        var _this = this;
        var xhr = this.xmlHttp();
        return new Promise(function (resolve, reject) {
            xhr.open("GET", url);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    _this.jsEval(xhr.responseText);
                    resolve();
                }
                else {
                    reject(xhr.status);
                }
            };
            xhr.send();
        });
    };
    return Browser;
}());
exports.Browser = Browser;
