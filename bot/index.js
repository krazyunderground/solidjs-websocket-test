const Discord = require("discord.js")
const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],   
    intents: [
        Discord.GatewayIntentBits.MessageContent
    ]
})

const {WebSocket} = require("ws")
const ws = new WebSocket("ws://localhost:5000")

client.on("messageCreate", async (message) => {
    if(message.content.toLowerCase().startsWith(">")) {
        if(message.content.toLowerCase() === ">value"){
            curvalue = await currentValue()
            message.reply(`The current value is ${curvalue}`)
        }
    }
})

function currentValue(){
    return new Promise((resolve, reject) => {
        var value = ""
        ws.send("get")
        ws.once('message', data => {
            value = data.toString()
            resolve(value)
        })
    })
    
}

client.login("")