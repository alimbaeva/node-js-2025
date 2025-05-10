import { IncomingMessage, ServerResponse } from 'http';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController';

export const userRouter = (req: IncomingMessage, res: ServerResponse) => {
  const urlParts = req.url?.split('/').filter(Boolean);

  if (!urlParts || urlParts[0] !== 'api' || urlParts[1] !== 'users') {
    res.statusCode = 404;
    res.end(JSON.stringify({message: 'Route not found'}));
    return;
  }

  const userId = urlParts[2];

  if(!urlParts) return;

  switch (req.method) {
    case 'GET': 
      if (!userId) getAllUsers(res);
      if (userId) getUserById(urlParts[2], res);
      break;
    case 'POST':
      if (!userId) createUser(req, res);
      break;
    case 'PUT':
      if (userId) updateUser(req, res, userId);
      break;
    case 'DELETE':
      if (userId) deleteUser(res, userId);
      break;
    default:
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Endpoint not found' }));
  }
}