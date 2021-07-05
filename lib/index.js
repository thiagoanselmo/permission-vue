import canAccess from './canAccess';
import ErrorPermissionACL from './error';
import ACL from './acl'
import install from './install'
import globalMixin from "./globalMixin";
import localMixin from "./localMixin";

export default {
  canAccess,
  ErrorPermissionACL,
  install,
  ACL,
  globalMixin,
  localMixin
}
