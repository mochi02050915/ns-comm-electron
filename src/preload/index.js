import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', {
      onUpdateCounter: (callback) =>
        ipcRenderer.on('update-counter', (_event, value) => callback(value)),
      getMemoContent: (name) => ipcRenderer.invoke('get-memo-content', name),
      saveMemoContent: (name, content) => ipcRenderer.invoke('save-memo-content', name, content)
    })
    // contextBridge.exposeInMainWorld('electronAPI', {
    //   getMemoContent: (callback) =>
    //     ipcRenderer.invoke('get-memo-content', (_event, value) => callback(value))
    // })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
