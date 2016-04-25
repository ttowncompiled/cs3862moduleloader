/// <reference-path="../typings/es6-promise/es6-promise.d.ts" />
import {Browser} from './browser';

interface Record {
  promise: Promise<any>;
  resolve: Function;
}

export class ModuleCache {
	cache: any = {};

  constructor(public browser: Browser) {}

  get(names: string[]): Promise<any[]> {
    return Promise.all(names.map((name: string) => {
      if (!(name in this.cache)) {
        var record: Record = {promise: null, resolve: null};
        var fetch: Promise<any> = new Promise<any>((resolve, reject) => {
          this.browser.fetch(name);
          record.resolve = resolve;
        });
        record.promise = fetch;
        this.cache[name] = record;
      }
      return this.cache[name].promise;
    }));
  }

  store(name: string, mod: any): void {
    this.cache[name].resolve(mod);
  }

  factory( public browser: Browser){
    var userBrowser = navigarot.userAgent
    if (userBrowser.search("Chrome"){
    var xhr = <something>;
    var jsEval = <something>;
    var browser = new Browser(xhr, jsEval);
    var mcache = new ModuleCache(browser);
    return new SystemRegister(mcache);
    }
    else if (userBrowser.search("Firefox"){
    var xhr = <something>;
    var jsEval = <something>;
    var browser = new Browser(xhr, jsEval);
    var mcache = new ModuleCache(browser);
    return new SystemRegister(mcache);
    }
    else if (userBrowser.search("MSIE"){
    var ie9eval = (prog: string) => eval('[' + prog + '][0]');

    
    }
    else{
    }
  }
}

class IE9XHR {
    onload: Function;
    xhr: XMLHttpRequest;
    constructor() {
        this.xhr = new XMLHttpRequest();
    }
    open(requestType: string, url: string): any {
        return this.xhr.open(requestType, url)
    }
    send(): any {
        this.xhr.onreadystatechange = this.onload;
        return this.xhr.send();
    }
}
