import canAccess from './canAccess';

/**
 * @description Instance class to ACL
 * @class
 */
export default class ACL {
  constructor(params = {}) {
    const self = this;
    self._userRoles = params.userRoles || [];
    self._aclKey = 'acl';
  }

  /**
   * @description Check has acl in route
   * @param {object} route - Route<Vue Router>
   * @return {boolean} - true has acl or false not acl
   * @private
   */
  checkHasACL(route) {
    const self = this;
    try {
      return self._aclKey in (route.meta || {});
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Setter user permissions
   * @param {string[]} roles - User roles
   */
  set userRoles(roles) {
    const self = this;
    self._userRoles = roles;
  }

  /**
   * @description Verify if user can access route
   * @param {object} to - Route<Vue Router>
   * @param {string[]} userRoles - User roles
   */
  canAccessRoute(to, userRoles = this._userRoles) {
    const self = this;
    try {
      if (self.checkHasACL(to)) {
        const {acl} = to.meta;
        const {enable = false, roles = []} = acl;

        if (enable) return canAccess(userRoles, roles);
        return true;
      }
      return true;

    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Method to verify access
   * @param {object[] | string[]} roles - Roles to verify access
   * @param {string[]} userRoles - User roles
   */
  canAccess(roles, userRoles = this._userRoles) {
    try {
      return canAccess(userRoles, roles);
    } catch (ex) {
      throw ex;
    }
  }
}