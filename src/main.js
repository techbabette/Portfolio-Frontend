import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import LandingPage from "./components/pages/Landing.vue";
import ProjectsPage from "./components/pages/Projects.vue";
import LoginPage from "./components/pages/Login.vue";
import RegisterPage from "./components/pages/Register.vue";
import AdminPage from "./components/pages/Admin.vue";
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
    path : "/login", component: LoginPage, name : "Login"
  },
  {
    path : "/register", component: RegisterPage, name : "Register"
  },
  {
    path : "/admin", component: AdminPage, name : "Admin panel"
  }
]

Vue.config.productionTip = false

const router = new VueRouter({
  routes
})


router.beforeEach(function (to, from, next) {
  document.title = to.name;
  if((store.getters.getNavigationLinksForActiveUser.some(link => link.Route === to.path))){
    store.commit("changeCurrentlyActiveRoute", to.path);
    next();
  }
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
  if(mutation.type === "changeCurrentlyActiveRoute") return;
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
		this.$store.commit('initializeStore');
  }
}).$mount('#app')
