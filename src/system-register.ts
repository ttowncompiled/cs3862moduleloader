import {ModuleCache} from './module-cache';

export class SystemRegister {
  constructor(public cache: ModuleCache) {}

  register(name: string, deps: string[], program: Function): void {
    var module: any = {}; //blank object for module

    var exports: Function = (name: string, member: any) => module[name] = member;
    var obj: any = program(exports);

    for(var i in deps) {
      // Call the setter for each dep and load into module object
    }
    // execute(obj) 
    // Store the module in cache
  }
}
