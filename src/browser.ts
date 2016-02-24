export class Browser {
  fetch(url: string): any {
    var xhr: XMLHttpRequest = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.open("GET", url);
      xhr.onload = () => {
        if (xhr.status == 200) {
          eval(xhr.responseText);
          resolve();
        }
        else{
          reject{xhr.status};
        }
      }
      xhr.send();
    }
  }
}
