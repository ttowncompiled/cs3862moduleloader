/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import { expect } from 'chai';
import { SupplyCache } from '../src/supply-cache';

describe('Supply Cache', () => {
  
  var OK: string = 'ok';
  
  it('should supply injected non-promise properties', (done) => {
    var cache: SupplyCache = new SupplyCache();
    cache.supply('test', { key: OK });
    cache.inject('test').then((mod: any) => {
      if (mod.key == OK) {
        done();
      }
    });
  });
  
  it('should supply injected promises', (done) => {
    var cache: SupplyCache = new SupplyCache();
    cache.supply('test', new Promise((resolve, reject) => resolve({ key: OK })));
    cache.inject('test').then((mod: any) => {
      if (mod.key == OK) {
        done();
      }
    });
  });
  
});