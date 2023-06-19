import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import navigationLinks from './modules/navigationLinks'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      users: users,
      navigationLinks : navigationLinks
    },
    mutations: {
      initializeStore(state){
        if(localStorage.getItem("store")){
          this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem("store"))));
        }
      }
    }
})