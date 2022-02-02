import Config from "./Config"
import Server from "./server"

const server = new Server()
console.log(Config.host)
server.start().catch(console.error)
