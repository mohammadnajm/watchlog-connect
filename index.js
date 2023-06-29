const WebSocket = require('ws');

const serverURL = 'ws://127.0.0.1:3774'; // Replace with your server URL
let ws = null; // WebSocket instance
let reconnectInterval = 1000; // Initial reconnect interval
let reconnectTimeoutId = null; // Reconnect timeout ID

class SocketCli {
    constructor() {
        this.connect();
    }

    connect() {
        ws = new WebSocket(serverURL);

        ws.on('open', () => {
            reconnectInterval = 1000;
            reconnectTimeoutId = null;

        });

        ws.on('close', () => {
            this.reconnect();
        });

        ws.on('error', (error) => {
            this.reconnect();
        });
    }

    increment(metric = null, count = 1) {
        if (typeof metric === 'string' && typeof count === 'number' && count > 0) {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ method: 'increment', metric, count }));
            } else {
                console.log("Data cannot be sent to the watchlog agent")
            }
        }
    }
    decrement(metric = null, count = 1) {
        if (typeof metric === 'string' && typeof count === 'number' && count > 0) {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ method: 'decrement', metric, count }));
            } else {
                console.log("Data cannot be sent to the watchlog agent")
            }
        }
    }
    distribution(metric = null, count) {
        if (typeof metric === 'string' && typeof count === 'number') {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ method: 'distribution', metric, count }));
            } else {
                console.log("Data cannot be sent to the watchlog agent")
            }
        }
    }
    gauge(metric = null, count) {
        if (typeof metric === 'string' && typeof count === 'number') {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ method: 'gauge', metric, count }));
            } else {
                console.log("Data cannot be sent to the watchlog agent")
            }
        }
    }
    percentage(metric = null, count) {
        if (typeof metric === 'string' && typeof count === 'number' && count > 0 && count <= 100) {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ method: 'percentage', metric, count }));
            } else {
                console.log("Data cannot be sent to the watchlog agent")
            }
        }
    }
    systembyte(metric = null, count) {
        if (typeof metric === 'string' && typeof count === 'number' && count > 0) {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ method: 'systembyte', metric, count }));
            } else {
                console.log("Data cannot be sent to the watchlog agent")
            }
        }
    }
    reconnect() {
        if (!reconnectTimeoutId && ws.readyState !== WebSocket.OPEN) {
            console.log(`Reconnecting in ${reconnectInterval / 1000} seconds...`);
            reconnectTimeoutId = setTimeout(() => {
                reconnectTimeoutId = null;
                this.connect();
            }, reconnectInterval);
        }
    }

}

module.exports = new SocketCli();
