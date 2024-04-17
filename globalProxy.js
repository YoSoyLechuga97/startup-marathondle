const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function globalProxy(httpServer) {
    //Create websocket object
    const wss = new WebSocketServer({ noServer: true });

    //Handle protocol upgrade from HTTP to WebSocket
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

    //Keep track of all the connections so we can forward messages
    let connections = [];

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws };
        connections.push(connection);

        //Forward messages to everyone except the sender
        ws.on('message', function message(data) {
            connections.forEach((c) => {
                if (c.id !== connection.id) {//Not the sender
                    c.ws.send(data);
                }
            });
        });
    
        // Remove the closed connection so we don't try to forward anymore
        ws.on('close', () => {
            const pos = connections.findIndex((o, i) => o.id === connection.id);
    
            if (pos >= 0) {
            connections.splice(pos, 1);
            }
        });

        //Respond to messages by marking the conneciton alive
        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    //Keep active connections alive
    setInterval(() => {
        connections.forEach((c) => {
            //Kill connections that don't respond to most recent ping
            if(!c.alive) {
                c.ws.terminate();
            } else {
                c.alive = false;
                c.ws.ping();
            }
        });
    }, 10000)
}

module.exports = { globalProxy };