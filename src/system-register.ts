import {ModuleCache} from './module-cache';

class SystemRegister {
  constructor(cache: ModuleCache) {}

  register(name: string, deps: string[], program: Function): void {
    var module: any = {};
    var exports: Function = function(name: string, member: any) => module[name]       = member;
    var obj: any = program(exports);
  }
}
