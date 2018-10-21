import Vuex from 'vuex'

function getInitialState() {
  return {
  }
}

const createStore = () => {
  return new Vuex.Store({
    state: () => getInitialState(),

    mutations: {
    },

    actions: {
    }
  })
}

export default createStore
