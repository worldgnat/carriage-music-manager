const { spawnSync } = require('node:child_process')
const { openSync, closeSync, readFileSync, unlinkSync } = require('node:fs')
const { tmpdir } = require ('os')
const { join } = require('node:path')

const MAX_ALIGN_OFFSET = 120
const MAX_BIT_ERROR = 2

function generateFingerprint(filePath) {
    const outPath = join(tmpdir(), `cli-${process.pid}-${Date.now()}.out`);
    const fd = openSync(outPath, 'w')
    try { 
        spawnSync('fpcalc', ['-raw', filePath], 
            {stdio: ['ignore', fd, 'inherit'],
            })
    } finally {
        closeSync(fd);
    }
    const output = readFileSync(outPath, 'utf8')
    const secondLine = output.split('\n')[1]
    const equalSignIndex = secondLine.indexOf("=")
    const fingerprintString = "[" + 
        secondLine.slice(equalSignIndex+1, secondLine.length)
        + "]"
    return JSON.parse(fingerprintString)
}

/*
Fingerprint comparison code adapted from pyAcoustID: https://github.com/beetbox/pyacoustid 
*/
function compareFingerprints(songA, songB) {
    const numCounts = songA.length + songB.length +1
    const counts = new Array(numCounts).fill(0.0)

    for (let i = 0; i < songA.length; i++) {
        const jBegin = Math.max(0, i - MAX_ALIGN_OFFSET)
        const jEnd = Math.min(songB.length, i + MAX_ALIGN_OFFSET)
        for (let j = jBegin; j < jEnd; j++) {
            const bitError = popCount(songA[i] ^ songB[j])
            if (bitError <= MAX_BIT_ERROR) {
                const offset = i - j + songB.length
                counts[offset] += 1

            }
        }
    }
    const topCount = Math.max(...counts)
    return topCount / Math.min(songA.length, songB.length)
}

function popCount(number) {
    return binaryRepresentation(number).split("1").length-1
}

function binaryRepresentation(number) {
    return (number >>> 0).toString(2);
}

module.exports = {
    compareFingerprints: compareFingerprints,
    generateFingerprint: generateFingerprint
}