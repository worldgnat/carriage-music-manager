const fs = require('node:fs')
const os = require('os')
const path = require('node:path')
const settings_directory = path.join(os.homedir(), '.musiccollector')
const settings_file =  path.join(settings_directory, 'settings.json')

function AppSettings() {
    const settings = readSettings()

    function readSettings() {
        const emptySettings = { 
            'mp3_directory': undefined,
            'flac_directory': undefined
        }
        try {
            if(fs.existsSync(settings_file)) {
                const settingsFileContents = fs.readFileSync(settings_file)
                return JSON.parse(settingsFileContents)
            } else {
                return emptySettings
            }
        } catch (err) {
            return emptySettings
        }
    }
    
    function saveSettings() {
        if (!fs.existsSync(settings_directory)) {
            fs.mkdir(settings_directory, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Created settings directory.")
                }
            })
        }

        fs.writeFileSync(settings_file, JSON.stringify(settings), err => {
                if (err) {
                    console.log(err)
                }
            })
    }
    return {
        getMp3Directory: function() {
            return settings.mp3_directory
        },

        setMp3Directory: function(directory) {
            settings.mp3_directory = directory
            saveSettings()
        },
        getFlacDirectory: function() {
            return settings.flac_directory
        },
        setFlacDirectory: function(directory) {
            settings.flac_directory = directory
            saveSettings()
        }
    }
}

module.exports = AppSettings