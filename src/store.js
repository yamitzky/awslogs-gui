import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import { sync } from 'vuex-router-sync'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.API_BASE_URL

const store = new Vuex.Store({
  state: {
    groups: [],
    streams: {},
    logs: {}
  },
  mutations: {
    updateGroups (state, groups) {
      state.groups = groups
    },
    updateStreams (state, { group, streams }) {
      state.streams = { ...state.streams, [group]: streams }
    },
    updateLogs (state, { group, logs }) {
      state.logs = { ...state.logs, [group]: logs }
    }
  },
  actions: {
    async fetchGroups ({ commit }) {
      const { data: { groups } } = await axios.get('/groups')
      commit('updateGroups', groups)
    },
    async fetchStreams ({ commit }, group) {
      const { data: { streams } } = await axios.get('/streams', { params: { log_group_name: group } })
      commit('updateStreams', { group, streams })
    },
    async fetchLogs ({ commit }, group) {
      const { data: { logs } } = await axios.get('/logs', { params: { log_group_name: group } })
      commit('updateLogs', { group, logs })
    }
  }
})

sync(store, router)

export default store
