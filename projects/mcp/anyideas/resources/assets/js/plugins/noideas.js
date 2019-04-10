import Vue from 'vue';
// import Loading from '../components/_global/_loading';
// import Loading from '../components/global/_loading.vue'

const NoIdeasComp = {
  // Loading,
  install (Vue, options) {
    // Vue.prototype.$loading = Loading;
    Vue.component('noideas', require('../components/global/_noideas.vue'))
  }

  // install(Vue, options) {
  //   Vue.component(MyComponent.name, MyComponent)
  //   Vue.directive(MyDirective.name, MyDirective)
  // }
}
export default NoIdeasComp
// access using this.$loading