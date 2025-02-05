<script setup>
import { ref } from 'vue'
const fileName = ref('')
const openFolder = async () => {
  fileName.value = await window.electron.ipcRenderer.invoke('open-dialog')
}
</script>

<template>
  <el-row v-if="!!fileName">フルパス見えてますよ(^^)</el-row>
  <el-row>{{ fileName }}</el-row>
  <el-row>
    <button @click="openFolder">Folder</button>
  </el-row>
</template>
