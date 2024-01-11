const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const server = http.createServer(express);

const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  console.log("A new Client connected!");
  ws.send("Welcome Client");

  ws.on("message", function incoming(data) {
    console.log("received: %s", data);
    ws.send("Message Recieved its: " + data);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

const port = 8000;

server.listen(port, () => console.log(`Server Runing on port ${port}`));
