
function getFileExtension(fileName) {
    const dotIndex = fileName.lastIndexOf('.')
    if (dotIndex != -1) 
        return fileName.substring(dotIndex, fileName.length)
    else 
        return ""
}

function substituteExtension(fileName, newExtension) {
    const dotIndex = fileName.lastIndexOf('.')
    if (dotIndex != -1) {
        return fileName.substring(0, dotIndex) + newExtension
    } else {
        return fileName
    }
}

module.exports = {
    getFileExtension,
    substituteExtension
}