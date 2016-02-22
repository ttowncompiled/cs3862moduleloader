import {Browser} from './browser';
export class ModuleCache {
    constructor(browser: Browser) { var dictionary = {}; }
    get(names: string[]) => dictionary[names];
    store(name: string, module: any): dictionary[name] = module;
}