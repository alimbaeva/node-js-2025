import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById } from '../controllers/userController';

export const userRouter = (req: IncomingMessage, res: ServerResponse) => {
  const urlParts = req.url?.split('/').filter(Boolean);

  if(!urlParts) return;

  if(req.method === 'GET' && urlParts.length === 2 && urlParts[1] === 'users') {
    getAllUsers(res);
  } else if (req.method === 'GET' && urlParts.length === 3 && urlParts[1] === 'users') {
    getUserById(urlParts[2], res);
  }
}