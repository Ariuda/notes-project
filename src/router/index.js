import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import Register from '../views/Register.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },


  /*
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(*//* webpackChunkName: "about" */ /*'../views/About.vue')*/
  /*}*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.state.signedIn;

  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    if (isAuthenticated === 1) {
      next();
    } else {
      next({name : 'Signin'})
    }
  } else {
    next();
  }

  /*if(to.name !== 'Signin' && isAuthenticated !== 1) {
    next({ name: 'Signin' })
  } else {
    next()
  }*/
})

export default router
