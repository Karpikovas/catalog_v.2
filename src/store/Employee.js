import axios from 'axios'

export default {
    state: {
        employees: []
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
        },

        deleteEmployee: (state, payload) => {
            state.employees = state.employee.filter((item) => {
                return item.id !== payload
            })
        }
    },
    actions: {
        addNewEmployee ({commit}, payload) {


            let data = {
                surname: payload.fullName.split(' ')[0],
                name: payload.fullName.split(' ')[1],
                patronymic: payload.fullName.split(' ')[2],
                birthday: payload.birthday,
                salary: payload.salary,
                rate: payload.rate,
                subdivision: payload.subdivision,
                post: payload.post,
            }

            let file = payload.file


            let JData = JSON.stringify(data)

            axios.post('http://musiclibrary/employees/add', JData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {

                    let id = response.data.data[0]

                    if (file) {
                        let formData = new FormData()

                        formData.append('path', file)
                        axios.post(`http://musiclibrary/employees/${id}/photo/update`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                            .then(response => {
                                commit('newEmployee', data)
                            })
                            .catch(response => {
                                console.log(response)
                            })
                    } else {
                        commit('newEmployee', data)
                    }
                })

        },

        getEmployees ({commit}) {
            axios.get('http://musiclibrary/employees')
                .then(response => {
                    commit('getEmployees', response.data.data)
                })
        },

        updateEmployee ({commit}, payload) {

            let data =  {
                id: payload.id,
                surname: payload.fullName.split(' ')[0],
                name: payload.fullName.split(' ')[1],
                patronymic: payload.fullName.split(' ')[2],
                birthday: payload.birthday,
                salary: payload.salary,
                rate: payload.rate,
                subdivision: payload.subdivision,
                post: payload.post,
            }

            let file = payload.file

            let promises = []
            if (file) {
                let formData = new FormData()

                formData.append('path', file)
                promises.push(axios.post(`http://musiclibrary/employees/${data.id}/photo/update`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }))
            }



            promises.push(axios.post(`http://musiclibrary/employees/${ data.id }/update`, data))


            axios.all(promises)
                .then(response => {
                    commit('updateEmployee', data)
                })

        },

        deleteEmployee({commit}, payload) {
            axios.post(`http://musiclibrary/employees/${payload}/delete`)
                .then(response => {



                })
        }
    },
    getters: {
        employees (state) {
            return state.employees
        }
    }
}