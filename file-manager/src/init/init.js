import { homedir } from 'os';
import { argv } from 'process';

export function getUsername() {
  let username = 'User';
  argv.forEach(arg => {
    if (arg.startsWith('--username=')) {
      username = arg.split('=')[1];
    }
  });
  return username;
}

export function getHomeDirectory() {
  return homedir();
}
