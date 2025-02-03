<script setup>
// import Versions from './components/Versions.vue'
import { RouterView } from 'vue-router'

const folder = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <el-row>
    <el-col :span="5">
      <el-menu router="true">
        <!-- <el-menu-item index="1" @click="folder"> -->
        <el-menu-item index="1" route="/folder">
          <span>Folder</span>
        </el-menu-item>
        <el-menu-item index="2" route="/image">
          <span>Image</span>
        </el-menu-item>
        <el-menu-item index="3" route="/counter">
          <span>Counter</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="19">
      <main>
        <RouterView />
      </main>
    </el-col>
  </el-row>

  <!-- <Versions /> -->
</template>
