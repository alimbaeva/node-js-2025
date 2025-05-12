import fs from 'fs';
import path from 'path';
import { User } from '../types/userTypes';

const dbFile = path.join(__dirname, '../data/users.json');

export const readUsers = (): User[] => {
  try {
    const data = fs.readFileSync(dbFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const writeUsers = (users: User[]): void => {
  fs.writeFileSync(dbFile, JSON.stringify(users, null, 2));
};
