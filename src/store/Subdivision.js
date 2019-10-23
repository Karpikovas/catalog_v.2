import axios from 'axios'

export default {
    state: {
        subdivisions: [],
        posts: [],
        isLoading: false
    },
    mutations: {
        newSubdivision: (state, payload) => {
            state.subdivisions.push(payload)
        },

        getSubdivisions: (state, payload) => {
            state.subdivisions = payload
        },

        getPosts: (state, payload) => {
            state.posts = payload
        },

        updateSubdivision: (state, payload) => {
            let targetIndex = state.subdivisions.findIndex(object => object.id === payload.id)
            state.subdivisions.splice(targetIndex, 1, payload);
        },
        deleteSubdivision: (state, payload) => {
            state.subdivisions = state.subdivisions.filter((item) => {
                return item.id !== payload
            })
        },
        updateLoad: (state, payload) => {
            state.isLoading = payload
        }
    },
    actions: {
        addNewSubdivision ({commit}, payload) {

            commit('updateLoad', true)

            let data = {
                name: payload.name,
                description: payload.description
            }
            let JData = JSON.stringify(data)

            axios.post('http://musiclibrary/subdivisions/sub/add', JData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    data.id = response.data.data[0]
                    commit('newSubdivision', data)
                    commit('updateLoad', false)
                })
        },

        getSubdivisions ({commit}) {
            commit('updateLoad', true)

            axios.get('http://musiclibrary/subdivisions')
                .then(response => {
                    commit('getSubdivisions', response.data.data.subdivisions)
                    commit('getPosts', response.data.data.posts)
                    commit('updateLoad', false)
                })
        },
        updateSubdivision ({commit}, payload) {
            commit('updateLoad', true)

            let data = {
                name: payload.name,
                description: payload.description
            }

            axios.post(`http://musiclibrary/subdivisions/sub/${payload.id}/update`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    commit('updateSubdivision', payload)
                    commit('updateLoad', false)
                })
        },
        deleteSubdivision({commit}, payload) {
            commit('updateLoad', true)
            axios.post(`http://musiclibrary/subdivisions/sub/${payload}/delete`)
                .then(response => {

                    commit('deleteSubdivision', payload)
                    commit('updateLoad', false)

                })
        }
    },
    getters: {
        subdivisions (state) {
            return state.subdivisions
        },
        posts (state) {
            return state.posts
        },
        isLoadingSubdivisions (state) {
            return state.isLoading
        }
    }
}
