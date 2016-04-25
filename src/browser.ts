/// <reference-path="../typings/es6-promise/es6-promise.d.ts" />
export type EvalFunction = (js: string) => void;
export type XMLFactory = () => XMLHttp;

export interface XMLHttp {
  onload: () => void;
  open: (requestType: string, url: string) => void;
  responseText: string;
  send: () => void;
  status: number;
}

export class Browser {
  
  constructor(public xmlHttp: XMLFactory, public jsEval: EvalFunction) {}
  
  fetch(url: string): Promise<any> {
    var xhr: XMLHttp = this.xmlHttp();
    return new Promise<any>((resolve, reject) => {
      xhr.open("GET", url);
      xhr.onload = () => {
        if (xhr.status == 200) {
          this.jsEval(xhr.responseText);
          resolve();
        }
        else{
          reject(xhr.status);
        }
      }
      xhr.send();
    });
  }
}
