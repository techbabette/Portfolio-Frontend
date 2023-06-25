import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import LandingPage from "./components/pages/Landing.vue";
import ProjectsPage from "./components/pages/Projects.vue";
import ProjectPage from "./components/pages/Project.vue";
import LoginPage from "./components/pages/Login.vue";
import RegisterPage from "./components/pages/Register.vue";
import AdminPage from "./components/pages/Admin.vue";
import TextArrayTestPage from "./components/pages/TextArray.vue"
import Axios from "axios";
import store from "./store/store"
import AOS from 'aos'
import 'aos/dist/aos.css'
import AccessLevelDirective from "./directives/AccessLevelDirective.js"

Vue.directive("accessLevel", AccessLevelDirective);

const routes = [
  {
    path : "/", component: LandingPage, name : "Home page"
  },
  {
    path : "/projects", component: ProjectsPage, name : "My projects"
  },
  {
    path : "/project/:id", component: ProjectPage, name : "Project"
  },
  {
    path : "/login", component: LoginPage, name : "Login"
  },
  {
    path : "/register", component: RegisterPage, name : "Register"
  },
  {
    path : "/admin", component: AdminPage, name : "Admin panel"
  },
  {
    path : "/tArray", component: TextArrayTestPage, name : "Text array test page"
  }
]

Vue.config.productionTip = false

const router = new VueRouter({
  routes
})


router.beforeEach(function (to, from, next) {
  let requestedPageName = to.name;
  if((store.getters.getNavigationLinksForActiveUser.some(link => link.RouteName === requestedPageName))){
    document.title = to.name;
    store.commit("changeCurrentlyActiveRoute", to.path);
    next();
  }
  else{
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

Vue.use(VueRouter);

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
