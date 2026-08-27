const { app, BrowserWindow, ipcMain } = require('electron')
const { preload } = require('react-dom')
const path = require('node:path')
const fs = require('node:fs')
const { dialog } = require('electron')
const AppSettings = require('./settings.js')()
const MusicCollection = require('./music_collection.js')()

console.log(__dirname)
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
}

app.whenReady().then(() => {
  createHandlers()
  createWindow()
})

function createHandlers() {
  ipcMain.handle('pickMp3Directory', pickMp3Directory)
  ipcMain.handle('getMp3Directory', AppSettings.getMp3Directory)
  ipcMain.handle('pickFlacDirectory', pickFlacDirectory)
  ipcMain.handle('getFlacDirectory', AppSettings.getFlacDirectory)
  ipcMain.handle('scanCollection', () => { MusicCollection.scanCollection(AppSettings) })
}

function pickDirectory(directorySetter) {
  const directory = dialog.showOpenDialogSync({ properties: ['openDirectory']})
  if (directory != undefined) {
    directorySetter(directory[0])
  }
}

function pickMp3Directory() {
  pickDirectory(AppSettings.setMp3Directory)
}

function pickFlacDirectory() {
  pickDirectory(AppSettings.setFlacDirectory)
}