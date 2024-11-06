<template>
  <el-text class="mx-1" size="large">注册</el-text>
  <el-form :model="registerForm" status-icon :rules="rules" label-width="100px" class="login-form">
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="registerForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">登录</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { register } from '@/apis/user';

interface RegisterForm {
  phone: string;
  password: string;
}

const registerForm = reactive<RegisterForm>({
  phone: '',
  password: ''
})

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
// todo 暂时不校验
// const rules = reactive<FormRules>({
//   phone: [{ validator: validatePhone, trigger: 'blur' }],
//   password: [{ validator: validatePass, trigger: 'blur' }]
// })
const router = useRouter()
const submitForm = () => {
  const {
    phone,
    password
  } = registerForm
  register({ phone, password }).then((res) => {
    console.log('res: ', res)
    const { errno, errmsg } = res || {}
    if(errno === 0){
      ElMessage.success('注册成功')
      router.push({
          name: 'Login'
        })
    }else{
      ElMessage.error(errmsg || '注册失败')
    }
    }).catch((error) => {
      ElMessage.error((error as Error).message || '注册异常')
    })
}

const resetForm = () => {
  registerForm.phone = ''
  registerForm.password = ''
}
</script>
