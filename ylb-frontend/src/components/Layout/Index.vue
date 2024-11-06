<template>
    <block>
      <Header />
      <el-container>
        <Aside />
        <div class="main-container">
          <el-main>
            <RouterView />
          </el-main>
          <Footer />
        </div>
      </el-container>
    </block>
  </template>

<script setup lang="ts">
import Header from './Header.vue'
import Aside from './Aside.vue'
import Footer from './Footer.vue'

</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  width: 100%;
}
.el-main {
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}
:deep().el-breadcrumb {
  margin-bottom: 10px;
}
:deep().el-table {
  flex: 1;
}
:deep().el-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
}

</style>