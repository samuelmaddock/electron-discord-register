const app = require('electron').app
const discordRegister = require('./')

const appId = 'appid'

discordRegister(appId)
  .then(() => {
    console.log(`Registered Discord app '${appId}'`)
    app.quit()
  })
  .catch(err => {
    console.error(err)
    app.quit()
  })
