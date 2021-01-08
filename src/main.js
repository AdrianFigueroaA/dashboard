import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';
import firebase from 'firebase'


Vue.config.productionTip = false
Vue.use(Antd);

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDm3CPT3aPv4u7X15XnQiAVzOb5sKUvqes",
    authDomain: "dashboard-89e40.firebaseapp.com",
    projectId: "dashboard-89e40",
    storageBucket: "dashboard-89e40.appspot.com",
    messagingSenderId: "734643083212",
    appId: "1:734643083212:web:d54e804617fb01d9812f69"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
