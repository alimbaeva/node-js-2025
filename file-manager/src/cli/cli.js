import readline from 'readline';
import { chdir } from 'process';
import { getUsername, getHomeDirectory } from '../init/init.js';
import { goUp } from '../commands/goUp.js';
import { add } from '../commands/add.js';
import { mkdir } from '../commands/mkdir.js';
import { cat } from '../commands/readCat.js';
import { changeDirectory } from '../commands/changeDirectory.js';
import { listDirectory } from '../commands/listDirectory.js';
import { showCurrentDirectory } from '../commands/showCurrentDirectory.js';
import { exitProgram } from '../init/exitHandler.js';

const username = getUsername();

console.log(`Welcome to the File Manager, ${username}!`);

const homeDir = getHomeDirectory();
chdir(homeDir);
showCurrentDirectory();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

rl.on('line', async (line) => {
  const input = line.trim();
  const [command, ...args] = input.split(' ');

  try {
    switch (command) {
      case '.exit':
        exitProgram(username);
        break;

      case 'up':
        goUp();
        break;

      case 'cd':
        if (args.length === 0) {
          console.log('Invalid input');
        } else {
          changeDirectory(args[0]);
        }
        break;

      case 'ls':
        listDirectory();
        break;

      case 'cat':
        if (args.length === 0) {
            console.log('Invalid input');
        } else {
            cat(args[0]);
        }
        break;

      case 'add':
        if (args.length === 0) {
          console.log('Invalid input');
        } else {
          add(args[0]);
        }
        break;

      case 'mkdir':
        if (args.length === 0) {
          console.log('Invalid input');
        } else {
          const dirName = args.join(' ');
          mkdir(dirName);
        }
        break;

      default:
        console.log('Invalid input');
    }
  } catch (err) {
    console.log('Operation failed');
  } finally {
    showCurrentDirectory();
    rl.prompt();
  }
});

rl.on('SIGINT', () => {
  exitProgram(username);
});
