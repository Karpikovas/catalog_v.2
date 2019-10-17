import axios from 'axios'

export default {
    state: {
        employees: [],
        inProgress: false
    },
    mutations: {
        newEmployee: (state, payload) => {
            state.employees.push(payload)
        },

        getEmployees: (state, payload) => {
            state.employees = payload
        },

        updateEmployee: (state, payload) => {
            let targetIndex = state.employees.findIndex(object => object.id === payload.id)
            state.employees.splice(targetIndex, 1, payload);
        }
    },
    actions: {
        addNewEmployee ({commit}, payload) {
            commit('newEmployee', payload)
        },

        getEmployees ({commit}) {
            axios.get('http://musiclibrary/employees')
                .then(response => {
                    commit('getEmployees', response.data.data)
                })
        },
        updateEmployee ({commit}, payload) {
            commit('updateEmployee', payload)
        },
    },
    getters: {
        employees (state) {
            return state.employees
        }
    }
}