<script setup>
import { ref } from 'vue'

const imageUrl = ref('')
const fileInput = ref(null)

const handleFileChange = async (_e) => {
  const file = _e.target.files[0]
  const reader = new FileReader()
  reader.onload = (event) => {
    imageUrl.value = event.target.result
  }
  reader.readAsDataURL(file)
}
const selectImage = () => {
  if (fileInput.value) fileInput.value.click()
}
</script>

<template>
  <el-row>
    <el-button @click="selectImage">画像を選択</el-button>
    <input ref="fileInput" type="file" style="display: none" @change="handleFileChange" />
  </el-row>
  <el-row>
    <el-image style="width: 100px; height: 100px" :src="imageUrl" />
  </el-row>
</template>
