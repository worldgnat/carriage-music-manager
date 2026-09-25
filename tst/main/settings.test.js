const AppSettingsFunction = require('../../src/main/settings')
const fs = require('node:fs')
const os = require('os')
jest.mock('node:fs')
jest.mock('os')

const mockHomeDirectory = '/home/testuser'
const mockMusicSources = ['testPath1', 'testPath2']
const mockSettingsContents = {'musicSources': mockMusicSources}
const mockSettingsFileContents = JSON.stringify(mockSettingsContents)

function setupNormalSettingsFile() {
    fs.existsSync.mockReturnValue(true)
    fs.readFileSync.mockReturnValue(mockSettingsFileContents)
}

beforeEach(() => {
    os.homedir.mockReturnValue(mockHomeDirectory)
})

test('initializing settings reads settings file if it exists', () => {
    setupNormalSettingsFile()

    const result = AppSettingsFunction().getMusicSources()
    
    expect(result).toStrictEqual(mockMusicSources)
    expect(fs.existsSync.mock.calls).toHaveLength(1)
    expect(fs.readFileSync.mock.calls).toHaveLength(1)
})

test('addMusicSource saves additional music sources to file', () => {
    const mockUpdatedMusicSources = ['testPath1', 'testPath2', 'testMusicSource']
    const mockUpdatedSettingsContents = {'musicSources': mockUpdatedMusicSources}
    const mockUpdatedSettingsFileContents = JSON.stringify(mockUpdatedSettingsContents)
    const musicSource = 'testMusicSource'
    setupNormalSettingsFile()

    AppSettingsFunction().addMusicSource(musicSource) 

    expect(fs.writeFileSync.mock.calls).toHaveLength(1)
    expect(fs.writeFileSync.mock.calls[0][1]).toStrictEqual(mockUpdatedSettingsFileContents)
})

test('addMusicSource creates settings directory if it doesn\'t exist', () => {
    fs.existsSync.mockReturnValue(false)
    
    AppSettingsFunction().addMusicSource("test")

    expect(fs.mkdir.mock.calls).toHaveLength(1)
})