const { parseFile } = require('music-metadata')

function readMetadata(song, addToCollectionCallback) {
    const filePath = song.filePath
    parseFile(filePath)
        .then((metadata) => {
            const fields = {
                'artist': metadata.common.artist,
                'album': metadata.common.album,
                'title': metadata.common.title,
                'track': metadata.common.track,
            }
            addToCollectionCallback(fields, song)
        })
        .catch((error) => {
            console.error("Failed to parse song: ${filePath}")
            console.error(error)
        })
}

module.exports = { readMetadata }