import Vue from 'vue';
// import Loading from '../components/_global/_loading';
// import Loading from '../components/global/_loading.vue'

const LoadingComp = {
  // Loading,
  install (Vue, options) {
    // Vue.prototype.$loading = Loading;
    Vue.component('loading', require('../components/global/_loading.vue'))
  }

  // install(Vue, options) {
  //   Vue.component(MyComponent.name, MyComponent)
  //   Vue.directive(MyDirective.name, MyDirective)
  // }
}
export default LoadingComp
// access using this.$loading