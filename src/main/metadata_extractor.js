const { spawn } = require('node:child_process')

const albumPatternField = [/^album\s+:/, 'album']
const artistPatternField = [/^artist\s+:/, 'artist']
const titlePatternField = [/^title\s+:/, 'title']
const trackPatternField = [/^track\s+:/, 'track']
const patternFields = [
    albumPatternField,
    artistPatternField,
    titlePatternField, 
    trackPatternField
]

function readMetadata(song, updateCollectionCallback) {
    try {
        const filePath = song.filePath
        const output = spawn('ffprobe', ['-hide_banner', filePath])
        output.stderr.on('data', (data) => {
            const fields = {}
            const info = data.toString()
            const lines = info.split("\n")
            for (let line of lines) {
                const trimmed = line.trim()
                patternFields.map((patternField) => {
                    if (trimmed.match(patternField[0])) {
                        fields[patternField[1]] = extractValue(trimmed)
                    }
                })
            }
            updateCollectionCallback(fields, song)
        })
        
    } catch (error) {
        console.error("Failed to run ffprobe with error: " + error.code)
    }
}


function extractValue(ffprobeMetadataLine) {
    let index = ffprobeMetadataLine.indexOf(':')
    if (index != -1) {
        return ffprobeMetadataLine.substring(index+1, ffprobeMetadataLine.length).trim()
    } else {
        throw new Error("Unable to parse output from ffprobe. Problem line was: " + ffprobeMetadataLine)
    }
}

module.exports = { readMetadata }