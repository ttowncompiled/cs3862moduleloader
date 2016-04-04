/// <reference-path="../typings/es6-promise/es6-promise.d.ts" />
export class Browser {
  fetch(url: string): Promise<any> {
    var xhr: XMLHttpRequest = new XMLHttpRequest();
    return new Promise<any>((resolve, reject) => {
      xhr.open("GET", url);
      xhr.onload = () => {
        if (xhr.status == 200) {
          eval(xhr.responseText);
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
