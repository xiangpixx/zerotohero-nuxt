let localStorage = process.browser ? localStorage : false

export const state = {
  savedCollocations: localStorage ? JSON.parse(localStorage.getItem('zthSavedCollocations')) : {} || {}
}
export const mutations = {
  ADD_SAVED_COLLOCATION(state, options) {
    let CollocationToSave = {
      term: options.term,
      line: options.line
    }
    if (!state.savedCollocations[options.l2]) {
      state.savedCollocations[options.l2] = []
    }
    if (
      !state.savedCollocations[options.l2].find(Collocation => deepEqual(Collocation, CollocationToSave))
    ) {
      let savedCollocations = Object.assign({}, state.savedCollocations)
      savedCollocations[options.l2].push(CollocationToSave)
      localStorage.setItem('zthSavedCollocations', JSON.stringify(savedCollocations))
      Vue.set(state, 'savedCollocations', savedCollocations)
    }
  },
  REMOVE_SAVED_COLLOCATION(state, options) {
    let CollocationToRemove = {
      term: options.term,
      line: options.line
    }
    let cols = state.savedCollocations[options.l2]
    if (cols) {
      const index = cols.findIndex(
        Collocation => Collocation.term === CollocationToRemove.term && Collocation.line === CollocationToRemove.line
      )
      if (index !== -1) {
        cols.splice(index, 1)
        let savedCollocations = Object.assign({}, state.savedCollocations)
        savedCollocations[options.l2] = cols
        localStorage.setItem('zthSavedCollocations', JSON.stringify(savedCollocations))
        Vue.set(state, 'savedCollocations', savedCollocations)
      }
    }
  },
  REMOVE_ALL_SAVED_COLLOCATIONS(state, options) {
    if (state.savedCollocations[options.l2]) {
      let savedCollocations = Object.assign({}, state.savedCollocations)
      savedCollocations[options.l2] = []
      localStorage.setItem('zthSavedCollocations', JSON.stringify(savedCollocations))
      Vue.set(state, 'savedCollocations', savedCollocations)
    }
  }
}
export const actions = {
  add({ commit, dispatch }, options) {
    commit('ADD_SAVED_COLLOCATION', options)
  },
  remove({ commit, dispatch }, options) {
    commit('REMOVE_SAVED_COLLOCATION', options)
  },
  removeAll({ commit, dispatch }, options) {
    commit('REMOVE_ALL_SAVED_COLLOCATIONS', options)
  }
}
export const getters = {
  has: state => options => {
    let collocationToTest = {
      term: options.term,
      line: options.line
    }
    if (state.savedCollocations[options.l2]) {
      let savedCollocation = false
      savedCollocation = state.savedCollocations[options.l2].find(
        collocation => deepEqual(collocation, collocationToTest)
      )
      return savedCollocation
    }
  }
}
