"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var PermissionEngine=require("permission-engine"),PermissionEngine__default=_interopDefault(PermissionEngine);class ErrorPermissionACL extends Error{constructor(e="",...s){super(e,...s),this.message=e}}const permissionEngine=new PermissionEngine__default;function canAccess(e,s){try{return permissionEngine.canAccess(e,s)}catch(e){throw e instanceof PermissionEngine.ErrorPermissionEngine?new ErrorPermissionACL(e.message):e}}class ACL{constructor(e={}){this._userRoles=e.userRoles||[],this._aclKey="acl"}_checkHasACL(e){try{return this._aclKey in(e.meta||{})}catch(e){throw e}}set userRoles(e){this._userRoles=e}canAccessRoute(e){try{if(this._checkHasACL(e)){var{acl:s}=e.meta,{enable:n=!1,roles:r=[]}=s;return n?canAccess(this._userRoles,r):!0}return!0}catch(e){throw e}}canAccess(e,s=this._userRoles){try{return canAccess(s,e)}catch(e){throw e}}}let __serviceACL=!1;function install(e){var s;__serviceACL||(s=new ACL,e.prototype.$acl=s,__serviceACL=!0)}function globalMixin(e){e.mixin({beforeCreate(){this.$canAccess=canAccess}})}var localMixin={methods:{canAccess:canAccess}},index={canAccess:canAccess,ErrorPermissionACL:ErrorPermissionACL,install:install,Instance:ACL,globalMixin:globalMixin,localMixin:localMixin};module.exports=index;
