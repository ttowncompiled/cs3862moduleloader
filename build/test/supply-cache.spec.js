"use strict";
var supply_cache_1 = require('../src/supply-cache');
describe('Supply Cache', function () {
    var OK = 'ok';
    it('should supply injected non-promise properties', function (done) {
        var cache = new supply_cache_1.SupplyCache();
        cache.supply('test', { key: OK });
        cache.inject('test').then(function (mod) {
            if (mod.key == OK) {
                done();
            }
        });
    });
    it('should supply injected promises', function (done) {
        var cache = new supply_cache_1.SupplyCache();
        cache.supply('test', new Promise(function (resolve, reject) { return resolve({ key: OK }); }));
        cache.inject('test').then(function (mod) {
            if (mod.key == OK) {
                done();
            }
        });
    });
});
