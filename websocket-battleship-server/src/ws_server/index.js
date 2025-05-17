import { WebSocketServer } from 'ws';
import { handleMessage } from './messageHandler.js';

export const initWebSocketServer = (httpServer) => {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', (ws) => {
    console.log('Client connected');

  console.log('Клиент подключен');

  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      handleMessage(ws, parsedMessage);
    } catch (error) {
      console.error('Ошибка при разборе сообщения:', error);
    }
  });

  ws.on('close', () => {
    console.log('Клиент отключен');
  });
  });

  return wss;
};
