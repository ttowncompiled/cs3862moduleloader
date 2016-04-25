/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import { expect } from 'chai';
import { Browser, EvalFunction, XMLFactory, XMLHttp } from '../src/browser';
import { ModuleCache } from '../src/module-cache';

class MockXML implements XMLHttp {
  
  onload: () => void;
  
  open(requestType: string, url: string): void {}
  
  get responseText(): string {
    return 'done()';
  }
  
  send(): void {
    this.onload();
  }
  
  get status(): number {
    return 200;
  }
}

var mockFactory: XMLFactory = (): MockXML => new MockXML();

describe('Module Cache', () => {
  
  it('should fetch uncached modules', (done) => {
    var jsEval: EvalFunction = (js: string) => eval(js);
    var browser: Browser = new Browser(mockFactory, jsEval);
    var cache: ModuleCache = new ModuleCache(browser);
    cache.get(['test']);
  });
  
  it('should store new modules', (done) => {
    var browser: Browser = new Browser(mockFactory, eval);
    var cache: ModuleCache = new ModuleCache(browser);
    cache.get(['test']).then((mods: any[]) => done());
    cache.store('test', {});
  });
  
  it('should handle empty input', (done) => {
    var browser: Browser = new Browser(mockFactory, eval);
    var cache: ModuleCache = new ModuleCache(browser);
    cache.get([]).then((mods: any[]) => done());
  });
  
});