export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const users: User[] = [{
    id: '1',
    username: 'Asel',
    age: 25,
    hobbies: ["reading", "coding"]
}];
