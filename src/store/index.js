import { createStore } from 'vuex'

export default createStore({
  state: {
    myExc: []
  },
  getters: {
    getMyExc (state) {
      return state.myExc
    }
  },
  mutations: {
    addExc (state, payload) {
      return state.myExc.push(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
