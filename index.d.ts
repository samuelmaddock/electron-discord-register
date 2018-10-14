declare namespace DiscordRegister {
  function discordRegister(appId: string, command?: string): Promise<void>
  export default discordRegister
  export = discordRegister
}

export = DiscordRegister
