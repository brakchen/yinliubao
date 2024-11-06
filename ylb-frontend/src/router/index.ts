import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta:{
      needAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      needAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{
      needAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
