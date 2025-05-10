import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../data/usersData';

export const getAllUsers = (res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify(users));
};

export const getUserById = (id: string, res: ServerResponse) => {
  if (!uuidValidate(id)) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: 'User not found'}));
  }
  res.writeHead(200);
  res.end(JSON.stringify(users));
}

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      if(
        typeof data.username !== 'string' ||
        typeof data.age !== 'number' ||
        !Array.isArray(data.hobbies)
      ) {
        res.statusCode = 400;
        res.end(JSON.stringify({
          message: 'Missing or invalid required fields'
        }));
        return;
      }

      const newUser = {
        id: uuidv4(),
        username: data.username,
        age: data.age,
        hobbies: data.hobbies,
      }

      users.push(newUser);

      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({
        message: 'Internal Server Error',
      }));
    }
  });
}