const { app, BrowserWindow, ipcMain } = require('electron')
const { preload } = require('react-dom')
const path = require('node:path')
const fs = require('node:fs')
const { dialog } = require('electron')
const AppSettings = require('./settings.js')()

const directory_max_depth = 10

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
  ipcMain.handle('pickMp3Directory', () => {
    return pickMp3Directory()
    })
  ipcMain.handle('getMp3Directory', () => {
    return AppSettings.getMp3Directory()
  })
}

function pickMp3Directory() {
  const directory = dialog.showOpenDialogSync({ properties: ['openDirectory']})
  if (directory != undefined) {
    AppSettings.setMp3Directory(directory)
  }
}

function scanDirectory(directory, depth = 1) {
  if (depth >= directory_max_depth) {
    console.error("Tried to scan too deep. Not all directories were scanned.")
    return []
  }
  
  const songs = []
  const result = fs.readdirSync(directory, {'withFileTypes': true})
  for (const file of result) {
    if (file.isDirectory()) {
      const filePath = path.join(file.parentPath, file.name)
      const newSongs = scanDirectory(filePath, depth++)
      songs.push(...newSongs)
    } else {
      songs.push({'file': file.name, 'path': file.parentPath})
    }
  }
  return songs
}

function printSongs(songs) {
  for (const song of songs) {
    console.log(song.file + " -- " + song.path)
  }
}