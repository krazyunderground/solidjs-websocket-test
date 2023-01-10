const WebSocket = require("ws")
const quickdb = require("quick.db")
const db = new quickdb.QuickDB()

const wss = new WebSocket.Server({port: 5000})

wss.broadcast = function(data) {
    wss.clients.forEach(client => client.send(data));
};

wss.on("connection", ws => {
    console.log("New client connected")
    ws.on("message", async data => {
        data = data.toString()
        args = data.split(" ")
        command = args.shift()
        switch(command){
            case "get":
                value = await db.get("value")
                ws.send(value)
            break
            case "set":
                await db.set("value", args.join(" "))
                console.log(await db.get("value"))
                ws.send("value set!")
            break
        }
        console.log(data)
        ws.send(data.toUpperCase())
    })

    ws.on("close", () => {
        console.log("Client disconnected")
    })
})

