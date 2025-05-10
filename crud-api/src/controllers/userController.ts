import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { users } from '../types/userTypes';

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