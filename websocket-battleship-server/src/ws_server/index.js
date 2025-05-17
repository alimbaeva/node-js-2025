import { WebSocketServer } from 'ws';
import { httpServer } from "../http_server/index";

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());

    ws.send(`Echo: ${message}`);
  });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
});
