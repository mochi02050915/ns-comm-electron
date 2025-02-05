<script setup>
import { ref, onBeforeMount } from 'vue'

const mode = ref('list')
const memoList = ref([])
const selectedMemo = ref('')
const textArea = ref('')

const getMemoList = async () => {
  memoList.value = await window.electron.ipcRenderer.invoke('get-memo-list')
}
const getMemoContent = async () => {
  textArea.value = await window.electronAPI.getMemoContent(selectedMemo.value)
}
const saveMemoContent = async () => {
  await window.electronAPI.saveMemoContent(selectedMemo.value, textArea.value)
}

const onSave = () => {
  saveMemoContent()
  mode.value = 'list'
  selectedMemo.value = ''
  textArea.value = ''
  getMemoList()
}
const onCancel = () => {
  mode.value = 'list'
  selectedMemo.value = ''
  textArea.value = ''
}
const onCreate = () => {
  mode.value = 'create'
}
const onSelect = () => {
  mode.value = 'edit'
  if (selectedMemo.value) getMemoContent()
}

onBeforeMount(() => {
  getMemoList()
})
</script>

<template>
  <div v-if="mode === 'list'">
    <el-row>
      <el-select v-model="selectedMemo" placeholder="Memo List" @change="onSelect()">
        <el-option v-for="memo in memoList" :key="memo" :label="memo" :value="memo"></el-option>
      </el-select>
    </el-row>
    <el-row>
      <el-button type="primary" @click="onCreate()">Create</el-button>
    </el-row>
  </div>
  <div v-else>
    <el-row>
      <el-input
        v-model="selectedMemo"
        style="width: 240px"
        placeholder="Text Name"
        :readonly="!(mode === 'create')"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="textArea"
        style="width: 600px"
        maxlength="1000"
        show-word-limit
        :rows="2"
        type="textarea"
        placeholder="Please input"
      />
    </el-row>
    <el-row>
      <el-button type="primary" @click="onSave()">Save</el-button>
      <el-button type="danger" @click="onCancel()">Cancel</el-button>
    </el-row>
  </div>
</template>
