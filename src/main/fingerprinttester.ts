const audioFingerprint = require('./audio_fingerprint')
const fingerprint = audioFingerprint.generateFingerprint('/home/petdav/Downloads/TheBritons.mp3')
const fingperprint2 = audioFingerprint.generateFingerprint('/home/petdav/Downloads/Sauropod Spotting.mp3')

const similarity = audioFingerprint.compareFingerprints(fingerprint, fingperprint2)
console.log(`Fingerprint lengths: ${fingerprint.length} , ${fingperprint2.length}`)
console.log(`Similarity: ${similarity}`)