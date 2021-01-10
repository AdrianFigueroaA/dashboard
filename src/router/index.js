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
    component: () => import(/* webpackChunkName: "admincrud" */ '../views/AdminCrud.vue'),
    alias: ["/administrador", "/crud", "/admin"],
    meta: {
      autentificado: true,
   },
  },
  {
    path: "*",
    name: 'NotFound',
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
