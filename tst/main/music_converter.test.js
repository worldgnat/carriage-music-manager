const MusicConverter = require('../../src/main/music_converter.js')
const { execFile } = require('node:child_process')
const { getFileExtension, substituteExtension } = require('../../src/main/file_extension_tools.js')

jest.mock('node:child_process')
jest.mock('../../src/main/file_extension_tools.js')

beforeEach(() => {
    execFile.mockClear()
})

test('transcodeFile calls execFile', () => {
    const inputFile = 'testFile.m4a'
    const outputFile = 'outputFile.mp3'

    MusicConverter().transcodeFile(inputFile, outputFile)

    expect(execFile.mock.calls).toHaveLength(1)
})

test('transcodeAll runs on all non-mp3 files given', () => {
    const musicCollection = [
        {'file': 'file.m4a', 'path': 'filepath'},
        {'file': 'anotherfile.aac', 'path': 'anotherpath'}
    ]
    getFileExtension.mockReturnValue('file.m4a')
    substituteExtension.mockReturnValue('file.mp3')

    MusicConverter().transcodeAll(musicCollection)

    expect(execFile.mock.calls).toHaveLength(2)
})

test('transcodeAll ignores mp3 files', () => {
    const mp3File = "file.mp3"
    const musicCollection = [{'file': mp3File, 'path': 'filepath'}]
    getFileExtension.mockReturnValue(".mp3")
    substituteExtension.mockReturnValue('file.out')

    MusicConverter().transcodeAll(musicCollection)

    expect(execFile.mock.calls).toHaveLength(0)
})


