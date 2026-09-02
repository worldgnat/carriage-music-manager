const { spawnSync} = require('node:child_process')

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


function readMetadata(fileName) {
    try {
        const output = spawnSync('ffprobe', ['-hide_banner', fileName], {encoding: 'utf8'})
        const fields = {}
        const lines = output.stderr.split("\n")
        for (let line of lines) {
            const trimmed = line.trim()
            patternFields.map((patternField) => {
                if (trimmed.match(patternField[0])) {
                    fields[patternField[1]] = extractValue(trimmed)
                }
            }) 
        }
        return fields
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