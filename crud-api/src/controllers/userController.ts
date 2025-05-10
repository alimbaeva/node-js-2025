import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { readUsers, writeUsers } from '../utils/usersStorage';

export const getAllUsers = (res: ServerResponse) => {
  const users = readUsers();
  res.writeHead(200, { 'Content-Type': 'application/json'});
  res.end(JSON.stringify(users));
};

export const getUserById = (id: string, res: ServerResponse) => {
  const users = readUsers();
  if (!uuidValidate(id)) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: 'User not found'}));
  }
  res.writeHead(200);
  res.end(JSON.stringify(users));
}

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  const users = readUsers();
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
      writeUsers(users);

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

export const updateUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  const users = readUsers();
  if (!uuidValidate(userId)) {
    res.statusCode = 400;
    res.end(JSON.stringify({
      message: 'Invalid user id'
    }));
    return;
  }

  const index = users.findIndex((user) => user.id === userId);
  if(index === -1) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'User not found'}));
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const {username, age, hobbies } = JSON.parse(body);
      if (!username || typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
        res.statusCode = 400;
        res.end(JSON.stringify({
          message: 'Missing or invalid required fields'
        }));
        return;
      }

      const updateUser = {
        ...users[index],
        username,
        age,
        hobbies
      }
      users[index] = updateUser;
      writeUsers(users);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(updateUser));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({
        message: 'Internal Server Error'
      }));
    }
    req.on('error', (err) => {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Server error', error: err.message }));
    });
  })
}

export const deleteUser = (res: ServerResponse, userId: string) => {
  const users = readUsers();
  if (!uuidValidate(userId)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      message: 'Invalid userid format'
    }));
    return;
  }

   const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }
  users.splice(userIndex, 1);
  writeUsers(users);

  res.statusCode = 204;
  res.end();
}