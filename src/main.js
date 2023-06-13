import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import LandingPage from "./components/pages/Landing.vue";

const routes = [
  {
    path : "/", component: LandingPage, name : "Home page"
  }
]

Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
