export class Browser {
  constructor() {}
  
  fetch(url: string): void {
    var xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => {
      if (xhr.status == 200) {
        eval(xhr.responseText);
      }
    }
    xhr.send();
  }
}