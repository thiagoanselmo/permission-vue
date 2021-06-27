import Instance from './instance';

let __serviceACL = false;

export default function install(Vue) {

  if (__serviceACL) return;

  const acl = new Instance();
  Vue.prototype.$acl = acl;

  __serviceACL = true;
}
