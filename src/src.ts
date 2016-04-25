import { SystemRegister } from './system-register';
import { ModuleCache } from './module-cache';
import { SupplyCache } from './supply-cache';
import { Browser, EvalFunction, XMLFactory, XMLHttp } from './browser';

class IE9XHR implements XMLHttp {
    onload: () => void;
    xhr: XMLHttpRequest;
    
    constructor() {
        this.xhr = new XMLHttpRequest();
    }
    
    open(requestType: string, url: string): any {
        return this.xhr.open(requestType, url)
    }
    
    get responseText(): string {
      return this.xhr.responseText;
    }
    
    send(): void {
        this.xhr.onreadystatechange = this.onload;
        this.xhr.send();
    }
    
    get status(): number {
      return this.xhr.status;
    }
}

function factory(): SystemRegister {
  if (navigator.appCodeName == 'Mozilla' || navigator.appCodeName == 'Chrome'){
    var xmlFactory: XMLFactory = <any>XMLHttpRequest;
    var jsEval: EvalFunction = eval;
    var browser: Browser = new Browser(xmlFactory, jsEval);
    var cache: ModuleCache = new ModuleCache(browser);
    var supply: SupplyCache = new SupplyCache();
    return new SystemRegister(cache, supply);
  } else if (navigator.appCodeName == "MSIE") {
    var xmlFactory: XMLFactory = <any>XMLHttpRequest;
    var ie9eval: EvalFunction = (js: string) => eval('[' + js + '][0]');
    var browser: Browser = new Browser(xmlFactory, jsEval);
    var cache: ModuleCache = new ModuleCache(browser);
    var supply: SupplyCache = new SupplyCache();
    return new SystemRegister(cache, supply);
  }
  return null;
}

var System: any = factory();