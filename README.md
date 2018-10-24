# electron-discord-register [![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/electron-discord-register.svg
[npm-url]: https://npmjs.org/package/electron-discord-register

Register an application protocol to launch your Electron app with Discord—without native modules.

This module can be used to add support for Discord's Rich Presence [Ask to Join](https://discordapp.com/developers/docs/rich-presence/how-to#ask-to-join) and [Spectate](https://discordapp.com/developers/docs/rich-presence/how-to#spectating) features.

Equivalent to calling `Discord_Register()` or `Discord_Initialize()` with the `autoRegister` parameter using the [Discord SDK](https://discordapp.com/developers/docs/rich-presence/how-to#initialization).

_Currently only supports **Windows** and **macOS**._

## Install
```
npm install electron-discord-register
```

## Usage
```js
// CommonJS
const discordRegister = require('electron-discord-register')

// ES module
import discordRegister from 'electron-discord-register'

// Use your Discord application ID
const DISCORD_APP_ID = '418562325121990661'

// Call on application startup in main or renderer process
discordRegister(DISCORD_APP_ID)
```

## License
MIT
