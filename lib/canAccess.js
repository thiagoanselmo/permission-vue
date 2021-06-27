import PermissionEngine, { ErrorPermissionEngine } from 'permission-engine';
import ErrorPermissionACL from './error';

const permissionEngine = new PermissionEngine();

/**
 * @description Method to verify access
 * @param {string[]} userRoles - User roles
 * @param {object[] | string[]} roles - Roles to verify access
 */
export default function canAccess(userRoles, roles) {
   try {
     return permissionEngine.canAccess(userRoles, roles);
   } catch (ex) {
     if (ex instanceof ErrorPermissionEngine) throw new ErrorPermissionACL(ex.message);
     else throw ex;
   }
}