import axios from 'axios'
import Cookies from 'js-cookie'
import * as types from '../mutation-types'

// state
const state = {
  user: null,
  token: Cookies.get('token')
}

// getters
const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}

// mutations
const mutations = {
  [types.SAVE_TOKEN] (state, token) {
    state.token = true
    Cookies.set('token', true)
  },

  [types.FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },

  [types.FETCH_USER_FAILURE] (state) {
    state.token = null
    Cookies.remove('token')
  },

  [types.LOGOUT] (state) {
    state.user = null
    state.token = null

    Cookies.remove('token')
  },

  [types.UPDATE_USER] (state, { user }) {
    state.user = user
  }
}

// actions
const actions = {
  saveToken ({ commit }, payload) {
    commit(types.SAVE_TOKEN, payload)
  },

  async fetchUser ({ commit }) {
    try {
      const { data } = await axios.get('/api/user')
      commit(types.FETCH_USER_SUCCESS, { user: data })
    } catch (e) {
     commit(types.FETCH_USER_FAILURE)
    }
  },

  updateUser ({ commit }, payload) {
    commit(types.UPDATE_USER, payload)
  },

  async logout ({ commit }) {
    try {
      const { data } = await axios.post("/logout")
      console.log(data)
      await this.reset()
    } catch (e) { }
    commit(types.LOGOUT)
  },

  async fetchOauthUrl (ctx, { provider }) {
    const { data } = await axios.post(`/api/oauth/${provider}`)

    return data.url
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
