const { execFile } = require('node:child_process')
const path = require('node:path')
const { getFileExtension, substituteExtension } = require('./file_extension_tools.js')

const encoderArguments = ['-c:v', 'copy', '-c:a', 'libmp3lame']
const qualitySetting = 0

function getEncodingArguments(inputFile, outputFile) {
    return ['-i', inputFile].concat(encoderArguments).concat('-q:a', qualitySetting).concat(outputFile)
}

function MusicConverter() {
    function transcodeFile(inputFile, outputFile) {
        const encodingArguments = getEncodingArguments(inputFile, outputFile)
        execFile('ffmpeg', encodingArguments, (err, output, stderr) => {
            if (err) {
                console.error("Can't do it, boss: ", err)
            } else {
                console.log("Output: \n", output)
            }
        })
    }

    function transcodeAll(songsListing) {
        for (const song of songsListing) {
            const fileName = song.file
            const songPath = song.path

            if (getFileExtension(fileName) !== ".mp3") {
                const newFile = substituteExtension(fileName, ".mp3")
                const inputPath = path.join(songPath, fileName)
                const outputPath = path.join(songPath, newFile)
                transcodeFile(inputPath, outputPath)
            }
        }
    }

    return {
        transcodeFile: transcodeFile,
        transcodeAll: transcodeAll
    }
}

module.exports = MusicConverter