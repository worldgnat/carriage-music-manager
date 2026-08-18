const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fileHandling', {
    pickMp3Directory: () => { return ipcRenderer.invoke('pickMp3Directory')},
    getMp3Directory: () => { return ipcRenderer.invoke('getMp3Directory')}
})