import { defineStore } from 'pinia'
import axios from 'axios'

interface UserState {
  token: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token') || ''
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    clearToken() {
      this.token = ''
      localStorage.removeItem('token')
    },
    logout() {
      this.clearToken()
      delete axios.defaults.headers.common['Authorization']
    }
  }
})


