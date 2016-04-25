/// <reference-path="../typings/es6-promise/es6-promise.d.ts" />
import { Browser } from './browser';

export interface Cache {
  [key: string]: Record;
}

export interface Module {
  [property: string]: Property;
}

export type Property = any;

export interface Record {
  promise: Promise<Module>;
  resolve: (mod: Module) => void;
}

export class ModuleCache {
  cache: Cache = {};

  constructor(public browser: Browser) {}

  get(names: string[]): Promise<Module[]> {
    if (names.length == 0) {
      return Promise.resolve([]);
    }
    return Promise.all(names.map((name: string) => {
      if (!(name in this.cache)) {
        var record: Record = { promise: null, resolve: null };
        var fetch: Promise<Module> = new Promise<Module>((resolve, reject) => {
          this.browser.fetch(name);
          record.resolve = resolve;
        });
        record.promise = fetch;
        this.cache[name] = record;
      }
      return this.cache[name].promise;
    }));
  }

  store(name: string, mod: Module): void {
    this.cache[name].resolve(mod);
  }
}
