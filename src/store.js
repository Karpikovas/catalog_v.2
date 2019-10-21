import Vue from 'vue'
import Vuex from 'vuex'
import Employee from './store/Employee'
import Subdivision from './store/Subdivision'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Employee,
    Subdivision
  }
})
