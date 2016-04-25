import { ModuleCache, Module } from './module-cache';
import { SupplyCache } from './supply-cache';

export type Export = (name: string, member: any) => void;
export type Program = (exports: Export) => Register;
export interface Register {
  setters: Setter[];
  execute: () => void;
}
export type Setter = (mod: Module) => void;

export class SystemRegister {
  
  constructor(public cache: ModuleCache, public scache: SupplyCache) {}
  
  inject(key: string): Promise<any> {
    return this.scache.inject(key);
  }

  register(name: string, deps: string[], program: Program): void {
    var mod: any = {};

    var exports: Export = (name: string, member: any) => mod[name] = member;
    var obj: Register = program(exports);

    this.cache.get(deps).then((modules: Module[]) => {
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
