
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
router.beforeEach((to, from, next) => {
    const needAuth = to.meta.needAuth
    console.log('needAuth: ', needAuth)
    if(needAuth){
        console.log('localStorage.getItem(token): ', localStorage.getItem('token')) 
      if(localStorage.getItem('token')){
          next()
      }else{
          // 没有token，跳转登录页
          next({
              name:"Login",
              query:{
                redirect:to.path
              }
          });
      }
    }
      next()
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
