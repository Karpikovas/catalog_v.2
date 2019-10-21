import Vue from 'vue'
import Router from 'vue-router'
import Employees from './components/Employees'
import Subdivisions from './components/Subdivisions'

import Modal from './components/ModalComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'employees',
      component: Employees
    },
    {
      path: '/subdivisions',
      name: 'subdivisions',
      component: Subdivisions
    },
    {
      path: '/modal',
      name: 'modal',
      component: Modal
    }
  ]
})
