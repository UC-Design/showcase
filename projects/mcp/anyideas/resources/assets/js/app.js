window.axios = require('axios')
// window.axios.defaults.baseURL = 'https://anyideas.herokuapp.com'

import Vue from 'vue';
import Vuex from 'vuex';
import router from './routes.js';
// import VueCookie from 'vue-cookie';
import ud_store from './store';
import VueClipboard from 'vue-clipboard2'
// import './components/global/_globals'
import App from './App.vue';
import vSelect from 'vue-select'
import InputTag from 'vue-input-tag'

import storePlugin from './storePlugin'
import LoadingComp from './plugins/loading.js'
import NoIdeasComp from './plugins/noideas.js'

import VueAnime from './plugins/vue-anime';
import capitalise from './plugins/capitalise';
require('typeface-pt-sans')

Vue.use( Vuex )
// Vue.use( VueCookie )
Vue.use( storePlugin )
Vue.use( LoadingComp, { componentName: "loading" } )
Vue.use( NoIdeasComp, { componentName: "noideas" } )
Vue.use( VueAnime );
Vue.use( capitalise );
Vue.use( VueClipboard );

Vue.component('input-tag', InputTag)
Vue.component('v-select', vSelect)

// global components
// <loading/>

// global plugins (add 'this.$' to use in Vue)
// ud_store
// anime
// capitalise

/**
 * @deprecated 03/11/18
router.beforeEach((to, from, next) => {
    // if (to.name !== 'ideas' || to.name !== 'about') {
    //     window.scrollTo(0, 0);
    // }

    console.log('to.path => ', to.name)

    console.log('window.checkAuth => ', window.checkAuth);
    console.log(' ud_store.state.data.user_data => ', ud_store.state.data.user_data);
    // console.log(' ud_store.state.data.user_data => ', ud_store.state.data.user_data.id);

    // check if user has logged out 
    // if (window.checkAuth === undefined) {
    //     console.log('undefined auth')
    //     ud_store.commit('SET_USER_DATA', 'guest');
    //     ud_store.commit('SET_USER_LOGGED_IN', false);
    // } else {
    //     console.log('defined auth')
    //     ud_store.commit('SET_USER_DATA', window.checkAuth);
    //     ud_store.commit('SET_USER_LOGGED_IN', true);
    // }

    // push category parmas to store for use on category page
    if (to.name === 'category') {
        ud_store.commit('SET_CATEGORY_ID', to.params.id );
    }

    if (to.fullPath !== "/login/guest") {
        // if path is NOT /login/guest
        if (typeof ud_store.state.data.user_data !== undefined) {
            console.log('user_data !== undefined => ', ud_store.state)
        }
        if (ud_store.state.data.loggedIn === false) {
            console.log('loggedIn === false => ', ud_store.state)
        }
        
        next();
    } else {
        // alert('welcome to the login page');
        next();
    }

});
 */

router.beforeEach((to, from, next) => {
    let user = ud_store.state.data.user_data,
        window_auth = window.checkAuth

    if (typeof window_auth !== 'undefined' && user === null) {
        ud_store.commit('SET_USER_DATA', window_auth)
        ud_store.commit('SET_USER_LOGGED_IN', true)
    }

    // This only seems to fire on load which is interesting...
    if (to.name === 'login') {
        let state_user = ud_store.state.data.user_data
        if (state_user !== null) {
            router.push({ name: 'index' })
        }
    }

    // push category parmas to store for use on category page
    if (to.name === 'category') {
        ud_store.commit('SET_CATEGORY_ID', to.params.id );
    }

    next();
})

const app = new Vue({
    el: '#app',
    components: { App },
    router,
    ud_store,
    data: {
        user_data_app: 'placeholder user_data_app string',
        // store_data: ud_store.state.data.user_data
    },
    methods: {
        getUserAuth: function() {
            return ud_store.state.data.user_data
        }
    },
    mounted() {
        // console.log("anime => ", anime);
    },
    computed: {
        store_data() {
            return ud_store.getters.getUserData
        }
    }
});