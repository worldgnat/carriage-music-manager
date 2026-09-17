const fs = require('node:fs')
const os = require('os')
const path = require('node:path')


function AppSettings() {
    const settingsDirectory = path.join(os.homedir(), '.musiccollector')
    const settingsFile =  path.join(settingsDirectory, 'settings.json')
    const settings = readSettings()

    function readSettings() {
        const emptySettings = {
            'musicSources': []
        }
        try {
            const fileExists = fs.existsSync(settingsFile)
            if(fileExists) {
                const settingsFileContents = fs.readFileSync(settingsFile, 'utf-8')
                return JSON.parse(settingsFileContents)
            } else {
                return emptySettings
            }
        } catch (err) {
            return emptySettings
        }
    }
    
    function saveSettings() {
        if (!fs.existsSync(settingsDirectory)) {
            fs.mkdir(settingsDirectory, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Created settings directory.")
                }
            })
        }

        fs.writeFileSync(settingsFile, JSON.stringify(settings), err => {
                if (err) {
                    console.log(err)
                }
            })
    }
    function getSettingsDirectory() {
        return settingsDirectory
    }
    return {
        getMusicSources: () => {
            return settings.musicSources;
        },
        addMusicSource: (sourceDirectory) => {
            settings.musicSources.push(sourceDirectory)
            saveSettings()
        },
        removeMusicSource: (sourceDirectory) => {
            const index = settings.musicSources.indexOf(sourceDirectory)
            if (index > -1) {
                settings.musicSources.splice(index, 1)
            } else {
                console.log("Error: Unable to find music source directory to be removed: " + sourceDirectory)
            }
            saveSettings()
        },
        getSettingsDirectory: getSettingsDirectory

    }
}



module.exports = AppSettings