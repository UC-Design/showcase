import store from './store'
export default {
  store,
  install (Vue, options) {
    Vue.prototype.$ud_store = store
  }
}