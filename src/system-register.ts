import {ModuleCache} from './module-cache';

class SystemRegister {
  constructor(cache: ModuleCache) {}

  register(name: string, deps: string[], program: Function): void {
    var module: any = {}; //blank object for module
    var moduleModify: Function = function(prop: string, export: any): void {}

    var exports: Function = function(name: string, member: any) => module[name]       = member;
    var obj: any = program(exports);

    for(var i in deps) {
      // Call the setter for each dep and load into module object
    }
    // execute(obj) 
    // Store the module in cache
  }
}
