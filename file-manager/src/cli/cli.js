import readline from 'readline';
import { homedir } from 'os';
import { argv } from 'process';
import path from 'path';

let username = 'User';

argv.forEach(arg => {
  if (arg.startsWith('--username=')) {
    username = arg.split('=')[1];
  }
});

console.log(`Welcome to the File Manager, ${username}!`);

let currentDir = process.cwd();
console.log(`You are currently in ${currentDir}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();

  switch (input) {
    case '.exit':
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      rl.close();
      break;
    default:
      console.log(`Received: ${input}`);
      rl.prompt();
      break;
  }
}).on('close', () => {
  process.exit(0);
});

rl.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});
