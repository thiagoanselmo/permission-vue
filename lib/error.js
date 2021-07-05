/**
 * @description Error custom class
 * @class
 */
export default class ErrorPermissionACL extends Error {
  constructor(message = "", ...args) {
    super(message, ...args);
    this.message = message;
  }
}