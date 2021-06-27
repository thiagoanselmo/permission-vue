import canAccess from './canAccess';

export default function (Vue) {
  Vue.mixin({
    beforeCreate() {
      this.$canAccess = canAccess;
    }
  });
}