var Browser = (function () {
    function Browser() {
    }
    Browser.prototype.fetch = function (url) {
        var xhr = new XMLHttpRequest();
        return new Promise(function (resolve, reject) {
            xhr.open("GET", url);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    eval(xhr.responseText);
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
})();
exports.Browser = Browser;
