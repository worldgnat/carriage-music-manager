const { app, BrowserWindow, ipcMain } = require('electron')
const { preload } = require('react-dom')
const path = require('node:path')
const fs = require('node:fs')
const { dialog } = require('electron')
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const AppSettings = require('./settings.js')()
const MusicCollection = require('./music_collection.js')()

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  MusicCollection.setUpdateCollectionCallback((collection) => win.webContents.send('update-collection', collection))
}

app.whenReady().then(() => {
  createHandlers()
  createWindow()
  installExtension(REACT_DEVELOPER_TOOLS, { loadExtensionOptions: { allowFileAccess: true } })
        .then((ext) => console.log(`Added Extension:  ${ext.name}`))
        .catch((err) => console.log('An error occurred: ', err));
})

function createHandlers() {
  ipcMain.handle('getMusicSources', AppSettings.getMusicSources)
  ipcMain.handle('addMusicSource', addMusicSource)
  ipcMain.handle('removeMusicSource', (event, sourceDirectory) => { removeMusicSource(sourceDirectory) })
  ipcMain.handle('scanCollection', () => { return MusicCollection.scanCollection(AppSettings) })
  ipcMain.handle('getCollection', () => { return MusicCollection.getCollection()})
  ipcMain.handle('convertCollection', () => { 
    MusicCollection.convertCollection(MusicCollection.scanCollection(AppSettings))
  })
}

function addMusicSource() {
  pickDirectory(AppSettings.addMusicSource)
}

function removeMusicSource(sourceDirectory) {
  AppSettings.removeMusicSource(sourceDirectory)
}

function pickDirectory(directorySetter) {
  const directory = dialog.showOpenDialogSync({ properties: ['openDirectory']})
  if (directory != undefined) {
    directorySetter(directory[0])
  }
}
