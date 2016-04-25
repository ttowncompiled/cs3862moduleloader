/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import { expect } from 'chai';
import { Browser, EvalFunction, XMLFactory, XMLHttp } from '../src/browser';

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

describe('Browser', () => {
  
  it('should fetch new modules', (done) => {
    var mockFactory: XMLFactory = (): MockXML => new MockXML();
    var jsEval: EvalFunction = (js: string) => eval(js);
    var browser: Browser = new Browser(mockFactory, jsEval);
    browser.fetch('test');
  });
  
});