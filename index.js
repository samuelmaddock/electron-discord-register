const os = require('os')
const app = require('electron').app

function discordRegisterWin32(appId, command) {
    return new Promise((resolve, reject) => {
        // Producer/consumer callback to avoid callback hell
        let pending = 0
        function createHandler() {
            pending++
            return (err) => {
                if (err) {
                    reject(err)
                    return
                }
                pending--
                if (pending === 0) {
                    resolve()
                }
            }
        }

        const Registry = require('winreg')

        const exeFilePath = app.getPath('exe')
        const openCommand = command || exeFilePath
        
        const protocolName = `discord-${appId}`
        const protocolDescription = `URL:Run game ${appId} protocol`
        const keyName = `\\Software\\Classes\\${protocolName}`
        
        let reg = new Registry({ hive: Registry.HKCU, key: keyName })
        reg.set(Registry.DEFAULT_VALUE, Registry.REG_SZ, protocolDescription, createHandler())
        reg.set('URL Protocol', Registry.REG_SZ, Registry.DEFAULT_VALUE, createHandler())
        
        reg = new Registry({ hive: Registry.HKCU, key: `${keyName}\\DefaultIcon` })
        reg.set(Registry.DEFAULT_VALUE, Registry.REG_SZ, exeFilePath, createHandler())
        
        reg = new Registry({ hive: Registry.HKCU, key: `${keyName}\\shell\\open\\command` })
        reg.set(Registry.DEFAULT_VALUE, Registry.REG_SZ, openCommand, createHandler())
    })
    
}

function discordRegisterDarwin(appId, command) {
    return new Promise((resolve, reject) => {
        const success = app.setAsDefaultProtocolClient(`discord-${appId}`)
        if (success) {
            resolve()
        } else {
            reject()
        }
    })
}

function discordRegister(appId, command) {
    switch (os.platform()) {
        case 'win32':
            return discordRegisterWin32(appId, command)
        case 'darwin':
            return discordRegisterDarwin(appId, command)
        default:
            return Promise.reject(`electron-discord-register: Unsupported OS platform '${os.platform()}'`)
    }
}

module.exports = discordRegister
module.exports.default = discordRegister
