import Vue from 'vue'
import Vuex from 'vuex'
import Employee from './store/Employee'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Employee
  }
})
