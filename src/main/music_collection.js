const fs = require('node:fs')
const path = require('node:path')
const { readMetadata } = require('./metadata_extractor.js')
const MusicConverter = require('./music_converter.js')()
const { getFileExtension }  = require('./file_extension_tools.js')

const supported_extensions = ['.mp3', '.m4a', '.flac', '.ogg', '.wav']
const directory_max_depth = 10

function MusicCollection(appSettings) {
  const settings = appSettings
  const collectionFile = path.join(settings.getSettingsDirectory(), "music_collection.json")
  const collection = readCollection()
  var updateCollectionCallback;

  function setUpdateCollectionCallback(callback) {
    updateCollectionCallback = callback
  }

  function scanCollection(appSettings) {
    for (let source of appSettings.getMusicSources()) {
      const songs = scanDirectory(source)
      songs.map((song) => {
        if (!collection[songId(song)]) {
          readMetadata(song, addToCollection)
        }
      })
    }
    updateCollectionCallback(collection)
  }

  function readCollection() {
    const emptyCollection = {}
            try {
                const fileExists = fs.existsSync(collectionFile)
                if(fileExists) {
                    const collectionFileContents = fs.readFileSync(collectionFile, 'utf-8')
                    console.log(collectionFileContents)
                    return JSON.parse(collectionFileContents)
                } else {
                    return emptyCollection
                }
            } catch (err) {
              console.error("Error reading collection file.")
              console.error(err)
              return emptyCollection
            }
  }

  function saveCollection() {
    fs.writeFile(collectionFile, JSON.stringify(collection), (error) => {
        if (error) {
          console.error("Failed to write collection file.")
          console.error(error)
        }
      })
  }

  function addToCollection(metadataFields, song) {
    const songData = {
            'artist': metadataFields.artist,
            'album': metadataFields.album,
            'title': metadataFields.title,
            'track': metadataFields.track,
            'path': song.filePath,
            'format': song.format,
            'fileName': song.fileName
          }
    collection[songId(song)] = songData
    updateCollectionCallback(collection)
  }

  function songId(song) {
    return song.filePath + song.modifiedTime
  }

  function convertCollection(collection) {
    MusicConverter.transcodeAll(collection)
  }
  
  function getCollection() {
    return collection
  }
    
  return {
      scanCollection: scanCollection,
      getCollection: getCollection,
      convertCollection: convertCollection,
      setUpdateCollectionCallback: setUpdateCollectionCallback,
      saveCollection: saveCollection
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
    const filePath = path.join(file.parentPath, file.name)
    if (file.isDirectory()) {
      const newSongs = scanDirectory(filePath, depth++)
      songs.push(...newSongs)
    } else {
      if (isSupportedFormat(file.name)) {
        const modified = fs.statSync(filePath).mtime;
        songs.push({
          'fileName': file.name, 
          'filePath': filePath, 
          'format': getFileExtension(filePath), 
          'modifiedTime': modified
        })
      }
    }
  }
  return songs
}

function isSupportedFormat(fileName) {
  const extension = getFileExtension(fileName)
  return (supported_extensions.includes(extension))
}

module.exports = MusicCollection