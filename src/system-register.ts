import { ModuleCache } from './module-cache';
import { SupplyCache } from './supply-cache';

export class SystemRegister {
  
  constructor(public cache: ModuleCache, public scache: SupplyCache) {}
  
  inject(key: string): Promise<any> {
    return this.scache.inject(key);
  }

  register(name: string, deps: string[], program: Function): void {
    var mod: any = {};

    var exports: Function = (name: string, member: any) => mod[name] = member;
    var obj: any = program(exports);

    this.cache.get(deps).then((modules: any[]) => {
      for(var i = 0; i < modules.length; i++) {
        obj.setters[i](modules[i]);
      }
      obj.execute();
      this.cache.store(name, mod);
    });
  }
  
  supply(key: string, prop: any): void {
    return this.scache.supply(key, prop);
  }
}
