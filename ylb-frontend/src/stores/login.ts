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
    async login(credentials: { phone: string; password: string }) {
      try {
        const response = await axios.post('/api/users/login', credentials)
        const { token } = response.data
        this.setToken(token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error) {
        throw error
      }
    },
    logout() {
      this.clearToken()
      delete axios.defaults.headers.common['Authorization']
    }
  }
})
