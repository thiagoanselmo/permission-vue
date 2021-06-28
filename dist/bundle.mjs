import PermissionEngine,{ErrorPermissionEngine}from"permission-engine";class ErrorPermissionACL extends Error{constructor(s="",...e){super(s,...e),this.message=s}}const permissionEngine=new PermissionEngine;function canAccess(s,e){try{return permissionEngine.canAccess(s,e)}catch(s){throw s instanceof ErrorPermissionEngine?new ErrorPermissionACL(s.message):s}}class ACL{constructor(s={}){this._userRoles=s.userRoles||[],this._aclKey="acl"}checkHasACL(s){try{return this._aclKey in(s.meta||{})}catch(s){throw s}}set userRoles(s){this._userRoles=s}canAccessRoute(s,e=this._userRoles){try{if(this.checkHasACL(s)){var{acl:r}=s.meta,{enable:n=!1,roles:c=[]}=r;return n?canAccess(e,c):!0}return!0}catch(s){throw s}}canAccess(s,e=this._userRoles){try{return canAccess(e,s)}catch(s){throw s}}}let __serviceACL=!1;function install(s){var e;__serviceACL||(e=new ACL,s.prototype.$acl=e,__serviceACL=!0)}function globalMixin(s){s.mixin({beforeCreate(){this.$canAccess=canAccess}})}var localMixin={methods:{canAccess:canAccess}},index={canAccess:canAccess,ErrorPermissionACL:ErrorPermissionACL,install:install,Instance:ACL,globalMixin:globalMixin,localMixin:localMixin};export default index;
