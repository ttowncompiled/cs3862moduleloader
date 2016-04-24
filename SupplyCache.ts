class SupplyCache{
	cache : any = {};

	supply(key: string, prep : any) : void{
		if(typeof prep == "promise"){
			this.cache[key] = prep;
		}else{
			this.cache[key] = new Promise((resolve, reject) => {
			resolve(prep);
			});
		}
	}
	inject(key:string) : Promise<any> => this.cache[key];
}