<script setup>
import { ref, watch } from 'vue'
const count = ref(0)
window.electronAPI.onUpdateCounter((value) => {
  count.value += value
})

watch(count, async () => {
  if (count.value >= 3) window.electron.ipcRenderer.send('start-flash')
  else window.electron.ipcRenderer.send('stop-flash')
})
</script>

<template>
  <el-row> Count: {{ count }} </el-row>
</template>
