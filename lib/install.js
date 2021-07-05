import ACL from './acl';

let __serviceACL = false;

export default function install(Vue) {

  if (__serviceACL) return;

  const acl = new ACL();
  Vue.prototype.$acl = acl;

  __serviceACL = true;
}
