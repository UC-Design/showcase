import Vue from 'vue';

let capitalise = function capitaliseFunc(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export default {
  capitalise,
  install (Vue, options) {
    Vue.prototype.$capitalise = capitalise;
  }
}





