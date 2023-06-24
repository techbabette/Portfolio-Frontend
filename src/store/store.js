import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import projects from './modules/projects'
import navigationLinks from './modules/navigationLinks'
import adminPanel from './modules/adminPanel'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      users: users,
      projects : projects,
      navigationLinks : navigationLinks,
      adminPanel : adminPanel
    },
    mutations: {
      initializeStore(state){
        if(localStorage.getItem("store")){
          this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem("store"))));
        }
      }
    }
})