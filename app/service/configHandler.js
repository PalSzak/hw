const fs = require('fs-extra')

const DEFAULT_CONFIG_FILE_PATH = './configuration/config.json'

async function readConfigFile (filePath = DEFAULT_CONFIG_FILE_PATH) {
  return fs.readJson(filePath)
    .then((config) => {
      return Promise.resolve(Object.assign(global.DEFAULT_CONFIG, config))
    }).catch((e) => {
      console.error(`
Error during configuration reading.

Do you provide valid config.json?
For further information pease check README.md`)
      return Promise.reject(e)
    })
}

module.exports = readConfigFile
