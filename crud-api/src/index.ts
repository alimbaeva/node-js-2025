import http from 'http';
import dotenv from 'dotenv' ;
import { userRouter } from './routes/userRoutes';

dotenv.config();

export const createServer = () => {
  return http.createServer((request, response) => {
    if (request.url?.startsWith('/api/users')) {
      userRouter(request, response);
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Route not found' }));
    }
  });
};

if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
