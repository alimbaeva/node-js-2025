import http from 'http';
import dotenv from 'dotenv' ;
import { userRouter } from './routes/userRoutes';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer((request, response) => {
  if (request.url?.startsWith('/api/users')) {
    userRouter(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify({ message: 'Route not found'}));
  }
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
