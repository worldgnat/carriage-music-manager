const { getFileExtension, substituteExtension } = require('../../src/main/file_extension_tools')

test('getFileExtension returns extension if one exists', () => {
    const testFileName = "file.ext"
    const expectedExtension = ".ext"
    
    const result = getFileExtension(testFileName)

    expect(result).toStrictEqual(expectedExtension)
})

test('getFileExtension returns empty string when given file with no extension', () => {
    const testFileName = "file"
    const expectedResult = ""

    const result = getFileExtension(testFileName)

    expect(result).toStrictEqual(expectedResult)
})

test('substituteExtension replaces extension if there is one', () => {
    const filename = "testfile.m4a"
    const expectedFilename = "testfile.mp3"

    const result = substituteExtension(filename, ".mp3")

    expect(result).toStrictEqual(expectedFilename)
})

test('substituteExtension returns givenFileName if it has no extension', () => {
    const fileName = "testFilename"

    const result = substituteExtension(fileName, ".mp3")

    expect(result).toStrictEqual(fileName)
})