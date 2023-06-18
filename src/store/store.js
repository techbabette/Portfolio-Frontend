import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import navigationLinks from './modules/navigationLinks'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      users: users,
      navigationLinks : navigationLinks
    }
})