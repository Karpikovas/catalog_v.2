import axios from 'axios'

export default {
    state: {
        subdivisions: [],
        inProgress: false
    },
    mutations: {
        newSubdivision: (state, payload) => {
            state.subdivisions.push(payload)
        },

        getSubdivisions: (state, payload) => {
            state.subdivisions = payload
        },

        updateSubdivision: (state, payload) => {
            let targetIndex = state.subdivisions.findIndex(object => object.id === payload.id)
            state.subdivisions.splice(targetIndex, 1, payload);
        }
    },
    actions: {
        addNewSubdivision ({commit}, payload) {
            commit('newSubdivision', payload)
        },

        getSubdivisions ({commit}) {
            axios.get('http://musiclibrary/subdivisions')
                .then(response => {
                    console.log(response)
                    commit('getSubdivisions', response.data.data.subdivisions)
                })
        },
        updateSubdivision ({commit}, payload) {
            commit('updateSubdivision', payload)
        },
    },
    getters: {
        subdivisions (state) {
            return state.subdivisions
        }
    }
}
