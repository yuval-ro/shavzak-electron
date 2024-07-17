import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  createDoc: (collection, doc) => ipcRenderer.invoke('create-doc', collection, doc),
  readDocs: (collection) => ipcRenderer.invoke('read-docs', collection),
  updateDoc: (collection, doc) => ipcRenderer.invoke('update-doc', collection, doc),
  deleteDoc: (collection, doc) => ipcRenderer.invoke('delete-doc', collection, doc)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
