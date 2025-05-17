import { httpServer } from './src/http_server/index.js';
import { initWebSocketServer } from './src/ws_server/index.js';

const HTTP_PORT = 3000;

console.log(`Starting static HTTP server on port ${HTTP_PORT}...`);
httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP server running at http://localhost:${HTTP_PORT}`);
  initWebSocketServer(httpServer);
});
