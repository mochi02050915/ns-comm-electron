<script setup>
import { ref } from 'vue'
// import { ipcMain } from 'electron'
// const openFolder = () => window.electron.ipcRenderer.send('open-dialog')
const fileName = ref('')
const openFolder = async () => {
  fileName.value = await window.electron.ipcRenderer.invoke('open-dialog')
}
</script>

<template>
  <el-row>You Choosed</el-row>
  <el-row>{{ fileName }}</el-row>
  <el-row>
    <button @click="openFolder">Folder</button>
  </el-row>
</template>
