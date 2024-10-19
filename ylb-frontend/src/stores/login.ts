import { createStore } from 'vuex'
import axios from 'axios'

interface State {
  token: string;
}

interface LoginCredentials {
  phone: string;
  password: string;
}

export default createStore<State>({
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token
      localStorage.setItem('token', token)
    },
    clearToken(state) {
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    login({ commit }, credentials: LoginCredentials) {
      return new Promise<void>((resolve, reject) => {
        axios.post('/api/users/login', credentials)
          .then(response => {
            const { token } = response.data
            commit('setToken', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout({ commit }) {
      commit('clearToken')
      delete axios.defaults.headers.common['Authorization']
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token
  }
})
