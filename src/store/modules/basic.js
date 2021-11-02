import * as types from "../mutation-types"

// state
export const state = {
  reciteStatus: false
}

// getters
export const getters = {
  reciteStatus: state => state.reciteStatus
}

// mutations
export const mutations = {
  [types.SET_RECITE]: (state, status) => {
    state.reciteStatus = status
  }
}

// actions
export const actions = {
  setReciteStatus({ commit }, status) {
    commit("SET_RECITE", status)
  }
}