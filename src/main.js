import Vue from 'vue'
import App from './App.vue'
import router from "./router/router"
import Axios from "axios";
import store from "./store/store"
import AOS from 'aos'
import 'aos/dist/aos.css'
import AccessLevelDirective from "./directives/AccessLevelDirective.js"
import { Icon } from '@iconify/vue2';

Vue.directive("accessLevel", AccessLevelDirective);

Vue.component("IconifyIcon", Icon);

Vue.config.productionTip = false

router.beforeEach(function (to, from, next) {
  let requestedPageName = to.name;
  if((store.getters.getNavigationLinksForActiveUser.some(link => link.RouteName === requestedPageName))){
    document.title = to.name;
    store.commit("changeCurrentlyActiveRouteName", requestedPageName);
    next();
  }
  else{
    router.push("/");
    console.warn("You're not allowed to see the requested page");
  }
});

if(localStorage.getItem("store")){
  store.commit('initializeStore');
}
else{
  store.dispatch("getProjectsFromApi");
}

// Subscribe to store updates
store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});

const axiosInstance = Axios.create({
  baseURL : "https://zxcwmbjxzc.execute-api.eu-north-1.amazonaws.com/"
})

Vue.prototype.$axios = axiosInstance;

new Vue({
  router,
  store,
  render: h => h(App),
  mounted(){
    AOS.init()
  }
}).$mount('#app')
