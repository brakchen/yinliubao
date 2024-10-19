<template>
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="login-form">
    <el-form-item label="手机号" prop="phone">
      <el-input v-model.number="loginForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '../stores/user'

interface LoginForm {
  phone: string;
  password: string;
}

export default defineComponent({
  name: 'Login',
  setup() {
    const userStore = useUserStore()
    const loginForm = reactive<LoginForm>({
      phone: '',
      password: ''
    })

    const loginFormRef = ref<FormInstance>()

    const validatePhone = (rule: any, value: string, callback: any) => {
      if (!value) {
        return callback(new Error('请输入手机号'))
      }
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入有效的手机号'))
      } else {
        callback()
      }
    }

    const validatePass = (rule: any, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(\d)\1{2,}).{6,}$/.test(value)) {
        callback(new Error('密码必须包含大小写字母和数字，且长度不少于6位'))
      } else {
        callback()
      }
    }

    const rules = reactive<FormRules>({
      phone: [{ validator: validatePhone, trigger: 'blur' }],
      password: [{ validator: validatePass, trigger: 'blur' }]
    })

    const submitForm = (formName: string) => {
      if (!loginFormRef.value) return
      loginFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
          try {
            await userStore.login(loginForm)
            ElMessage.success('登录成功')
            // 跳转到首页或其他页面
          } catch (error) {
            ElMessage.error((error as Error).message || '登录失败')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    const resetForm = (formName: string) => {
      if (!loginFormRef.value) return
      loginFormRef.value.resetFields()
    }

    return {
      loginForm,
      loginFormRef,
      rules,
      submitForm,
      resetForm
    }
  }
})
</script>
