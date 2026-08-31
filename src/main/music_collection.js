const fs = require('node:fs')
const path = require('node:path')

const supported_extensions = ['.mp3', '.m4a', '.flac', '.ogg', '.wav']
const directory_max_depth = 10

function MusicCollection() {

    function scanCollection(appSettings) {
      const collection = []
      for (let source of appSettings.getMusicSources()) {
        const songs = scanDirectory(source)
        collection.push(...songs)
      }
      return collection
    }
    return {
        scanCollection: scanCollection
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
      if (isSupportedFormat(file.name))
        songs.push({'file': file.name, 'path': file.parentPath})
    }
  }
  return songs
}

function isSupportedFormat(fileName) {
  const extension = getFileExtension(fileName)
  return (supported_extensions.includes(extension))
}

function getFileExtension(fileName) {
  const dotIndex = fileName.lastIndexOf('.')
  if (dotIndex != -1) 
    return fileName.substring(dotIndex, fileName.length)
  else 
    return ""
}

module.exports = MusicCollection