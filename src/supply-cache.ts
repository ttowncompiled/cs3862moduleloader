/// <reference-path="../typings/es6-promise/es6-promise.d.ts" />
export class SupplyCache {
	
	cache: any = {};

	supply(key: string, prop: any): void {
		this.cache[key] = Promise.resolve(prop);
	}
	
	inject(key:string): Promise<any> {
		return this.cache[key];
	}
}
