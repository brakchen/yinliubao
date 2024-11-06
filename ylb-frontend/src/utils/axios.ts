

import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

interface Params {
    url: string;
    data: object;
  }


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = useUserStore().token;
    config.headers.Authorization = `Bearer ${token}`
    console.log('interceptors request', config)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log('interceptors response', response)
    if (response.status === 200) {
      if (response.data.errno === 0) {
          if(response.config.url && response.config.url.includes('api/users/login')){
            useUserStore().setToken(response.data.token)
          }
       
      } 
      console.log('interceptors response no return data ')
      return response.data;
    }
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
  export const get = ({ url, data }:Params) => {
    return axios.get(url, {
      params: {
        ...data
      }
    })

  }
  
  export const post = ({ url, data }:Params) => {
    const useData = {
      ...data,
    }
    return axios.post("http://localhost:3000/"+url, useData)
  }
