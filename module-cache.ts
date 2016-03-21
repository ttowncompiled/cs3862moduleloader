import {Browser} from './browser';

export class ModuleCache {
	cache: any = {};

    constructor(public browser: Browser) {}

    get(names: string[]): any {};

    store(name: string, module: any): void => cache[name] = module;
}
