/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import { expect } from 'chai';
import { ModuleCache, Module } from '../src/module-cache';
import { SupplyCache } from '../src/supply-cache';
import { SystemRegister, Export, Register } from '../src/system-register';

describe('System Register', () => {
  
  var OK: string = 'ok';
  
  it('should supply injected non-promise properties', (done) => {
    var system: SystemRegister = new SystemRegister(null, new SupplyCache());
    system.supply('test', { key: OK });
    system.inject('test').then((mod: any) => {
      if (mod.key == OK) {
        done();
      }
    });
  });
  
  it('should supply injected promises', (done) => {
    var system: SystemRegister = new SystemRegister(null, new SupplyCache());
    system.supply('test', new Promise((resolve, reject) => resolve({ key: OK })));
    system.inject('test').then((mod: any) => {
      if (mod.key == OK) {
        done();
      }
    });
  });
  
  it('should execute the program', (done) => {
    var system: SystemRegister = new SystemRegister(new ModuleCache(null), new SupplyCache());
    system.register('test', [], (exports: Export) => done());
  });
  
  it('should fetch deps for the module from module cache', (done) => {
    var mockFactory: () => ModuleCache = (): ModuleCache => {
      var cache: ModuleCache = new ModuleCache(null);
      cache.get = (names: string[]): Promise<any> => {
        return Promise.resolve(done());
      }
      return cache;
    }
    var system: SystemRegister = new SystemRegister(mockFactory(), new SupplyCache());
    system.register('test', ['dep'], (exports: Export) => { 
      return {
        setters: [],
        execute: () => {}
      }; 
    });
  });
  
  it('should use the dependency setters', (done) => {
    var mockFactory: () => ModuleCache = (): ModuleCache => {
      var cache: ModuleCache = new ModuleCache(null);
      cache.get = (names: string[]): Promise<any> => {
        return Promise.resolve(names);
      }
      return cache;
    }
    var system: SystemRegister = new SystemRegister(mockFactory(), new SupplyCache());
    system.register('test', ['dep'], (exports: Export) => { 
      return {
        setters: [ (mod: Module) => done() ],
        execute: () => {}
      }; 
    });
  });
  
  it('should execute resolved modules', (done) => {
    var system: SystemRegister = new SystemRegister(new ModuleCache(null), new SupplyCache());
    system.register('test', [], (exports: Export) => { 
      return {
        setters: [],
        execute: () => { done(); }
      }; 
    });
  });
  
  it('should store executed modules', (done) => {
    var executed: boolean = false;
    var mockFactory: () => ModuleCache = (): ModuleCache => {
      var cache: ModuleCache = new ModuleCache(null);
      cache.store = (name: string, mod: Module): void => executed ? done() : done(executed);
      return cache;
    }
    var system: SystemRegister = new SystemRegister(mockFactory(), new SupplyCache());
    system.register('test', [], (exports: Export) => { 
      return {
        setters: [],
        execute: () => { executed = true; }
      }; 
    });
  });

});