import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from "firebase";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    alias: ["/inicio", "/home", "/portada", "/"],
  },
 
  {
    path: '/admincrud',
    name: 'AdminCrud',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admincrud" */ '../views/AdminCrud.vue'),
    alias: ["/administrador", "/crud", "/admin"],
    meta: {
      autentificado: true,
   },
  },
  {
    path: "*",
    name: 'NotFound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser;
  let autorizacion = to.matched.some((record) => record.meta.autentificado);

  if (!autorizacion && usuario) {
    next();
  } else if (autorizacion && !usuario) {
    next("AdminCrud");
  } else {

   }
   next();
});


export default router
