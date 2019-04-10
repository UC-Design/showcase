//vue-anime.js
import anime from 'animejs';

export default {
  anime,
  install (Vue, options) {
    Vue.prototype.$animie_js = anime;
  }
}

// access using this.$animie_js