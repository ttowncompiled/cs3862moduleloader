/// <reference-path="../typings/es6-promise/es6-promise.d.ts" />
export class SupplyCache {
	
	cache: any = {};

	supply(key: string, prop: any): void {
		if (typeof prop == "promise") {
			this.cache[key] = prop;
		} else {
			this.cache[key] = new Promise((resolve, reject) => {
				resolve(prop);
			});
		}
	}
	
	inject(key:string): Promise<any> {
		return this.cache[key];
	}
}
