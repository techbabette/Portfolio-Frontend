import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from "../components/pages/Landing.vue";
import ProjectsPage from "../components/pages/Projects.vue";
import ProjectPage from "../components/pages/Project.vue";
import LoginPage from "../components/pages/Login.vue";
import RegisterPage from "../components/pages/Register.vue";
import AdminPage from "../components/pages/Admin.vue";
import ManageProjectsPage from "../components/pages/ManageProjects.vue"
import ManageUsersPage from "../components/pages/ManageUsers.vue"

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
      path : "/projects/manage/:id", component: ManageProjectsPage, name : "Manage projects"
    },
    {
      path : "/users/manage/:id", component: ManageUsersPage, name : "Manage users"
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
  
Vue.use(Router);
  
const router = new Router({
    routes
})


export default router