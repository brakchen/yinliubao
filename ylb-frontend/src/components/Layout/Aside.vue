<template>
    <el-aside width="200px">
      <el-menu
        router
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <el-sub-menu index="1">
          <template #title>Aside11</template>
          <el-menu-item index="/aside111">Aside11.1</el-menu-item>
          <el-menu-item index="/aside112">Aside11.2</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>Aside12</template>
          <el-menu-item index="/aside121">Aside12.1</el-menu-item>
          <el-menu-item index="/aside122">Aside12.2</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const defaultActive = ref('/aside111')
  
  const handleOpen = () => {}
  const handleClose = () => {}
  const handleSelect = (v: string) => {
    defaultActive.value = v
  }
  </script>
  
  <style scoped>
  .el-aside {
    height: calc(100vh - 60px);
  }
  </style>