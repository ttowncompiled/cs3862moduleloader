import {ModuleCache} from './module-cache';

export class SystemRegister {
  constructor(public cache: ModuleCache) {}

  register(name: string, deps: string[], program: Function): void {
    var module: any = {}; //blank object for module

    var exports: Function = (name: string, member: any) => module[name] = member;
    var obj: any = program(exports);

    this.cache.get(deps).then( (modules: any[]) => {
      for(var i = 0; i < modules.length; i++) {
        obj.setters[i](modules[i]);
      }
      obj.execute();
      this.cache.store(name, module);
    });
  }
}
