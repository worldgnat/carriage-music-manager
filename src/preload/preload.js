const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fileHandling', {
    pickMp3Directory: () => { return ipcRenderer.invoke('pickMp3Directory')},
    getMp3Directory: () => { return ipcRenderer.invoke('getMp3Directory')},
    pickFlacDirectory: () => { return ipcRenderer.invoke('pickFlacDirectory')},
    getFlacDirectory: () => { return ipcRenderer.invoke('getFlacDirectory')}
})

contextBridge.exposeInMainWorld('musicCollection', {
    scanCollection: () => { return ipcRenderer.invoke('scanCollection')}
})