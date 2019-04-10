import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use( VueRouter )

const routes = [
  {
    path: '/',
    name: 'index',
    component: Vue.component( 'Index', require( './views/Index.vue' ) ),
  },
  {
    path: '/login/guest',
    name: 'login',
    component: Vue.component( 'Login', require( './views/Login.vue' ) )
  },
  {
    path: '/register',
    name: 'register',
    component: Vue.component( 'Register', require( './views/Register.vue' ) )
  },
  {
    path: '/add-new-idea',
    name: 'add-new-idea',
    component: Vue.component( 'AddNewIdea', require( './views/AddNewIdea.vue' ) ),
    meta: { requiresAuth: true }
  },
  {
    path: '/idea/:id',
    name: 'idea',
    redirect: '/idea/:id/description',
    component: Vue.component( 'IndividualIdea', require( './views/IndividualIdea.vue' ) ),
    children: [
      {
        name: 'description',
        path: 'description',
        component: Vue.component( 'Description', require( './components/idea/Description.vue' ) )
      },
      {
        name: 'timeline',
        path: 'timeline',
        component: Vue.component( 'Timeline', require( './components/idea/Timeline.vue' ) )
      }
      // {
      //   name: 'discussion',
      //   path: 'discussion',
      //   component: Vue.component( 'Discussion', require( './components/idea/Discussion.vue' ) )
      // },
      // {
      //   name: 'updates',
      //   path: 'updates',
      //   component: Vue.component( 'Updates', require( './components/idea/Updates.vue' ) )
      // }
    ]
  },
  {
    path: '/categories',
    name: 'categories',
    component: Vue.component( 'CategoriesPage', require( './views/CategoriesPage.vue' ) )
  },
  {
    path: '/category/:id',
    name: 'category',
    component: Vue.component( 'IndividualCategory', require( './views/IndividualCategory.vue' ) )
  },
  {
    path: '/user/:id',
    name: 'user',
    redirect: '/user/:id/ideas',
    component: Vue.component( 'UserPage', require( './views/UserPage.vue' ) ),
    meta: { requiresAuth: true },
    children: [
      {
        name: 'ideas',
        path: 'ideas',
        component: Vue.component( 'Ideas', require( './components/user/Ideas.vue' ) )
      },
      {
        name: 'about',
        path: 'about',
        component: Vue.component( 'About', require( './components/user/About.vue' ) )
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    props: true,
    component: Vue.component( 'SearchResults', require( './views/SearchResults.vue' ) )
  },
];
// routes here
const router = new VueRouter({
  mode: 'history', routes
});

export default router;