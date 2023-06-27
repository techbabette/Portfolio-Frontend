import Vue from 'vue'
import App from './App.vue'
import router from "./router/router"
import Axios from "axios";
import store from "./store/store"
import AOS from 'aos'
import 'aos/dist/aos.css'
import AccessLevelDirective from "./directives/AccessLevelDirective.js"

Vue.directive("accessLevel", AccessLevelDirective);

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
  console.log(mutation);
	localStorage.setItem('store', JSON.stringify(state));
});

const axiosInstance = Axios.create({
  baseURL : "http://localhost:3000"
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
