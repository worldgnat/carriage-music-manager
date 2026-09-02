const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('fileHandling', {
    getMusicSources: () => { return ipcRenderer.invoke('getMusicSources')},
    addMusicSource: () => { return ipcRenderer.invoke('addMusicSource')},
    removeMusicSource: (sourceDirectory) => { return ipcRenderer.invoke('removeMusicSource', sourceDirectory)},
})

contextBridge.exposeInMainWorld('musicCollection', {
    scanCollection: () => { return ipcRenderer.invoke('scanCollection')},
    getCollection: () => { return ipcRenderer.invoke('getCollection')},
    convertCollection: () => { ipcRenderer.invoke('convertCollection')}
})