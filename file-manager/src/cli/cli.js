import readline from 'readline';
import { chdir } from 'process';
import { getUsername, getHomeDirectory } from '../init/init.js';
import { goUp } from '../commands/goUp.js';
import { add } from '../commands/add.js';
import { mkdir } from '../commands/mkdir.js';
import { copyFile } from '../commands/copyFile.js';
import { moveFile } from '../commands/moveFile.js';
import { removeFile } from '../commands/removeFile.js';
import { compressFile } from '../commands/compressFile.js';
import { decompressFile } from '../commands/decompressFile.js';
import { hash } from '../commands/hash.js';
import { rename } from '../commands/rename.js';
import { cat } from '../commands/readCat.js';
import { changeDirectory } from '../commands/changeDirectory.js';
import { listDirectory } from '../commands/listDirectory.js';
import { showCurrentDirectory } from '../commands/showCurrentDirectory.js';
import { exitProgram } from '../init/exitHandler.js';
import os from 'os';

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

      case 'rn':
        if (args.length < 2) {
          console.log('Invalid input');
        } else {
          rename(args[0], args[1]);
        }
        break;

      case 'mv':
        if (args.length < 2) {
          console.log('Invalid input');
        } else {
          moveFile(args[0], args[1]);
        }
        break;

      case 'cp':
        if (args.length < 2) {
          console.log('Invalid input');
        } else {
          copyFile(args[0], args[1]);
        }
        break;

      case 'rm':
        console.log('DEBUG args:', args);
        if (args.length === 0) {
          console.log('Invalid input');
        } else {
          console.log('Calling removeFile with:', args[0]);
          removeFile(args[0]);
        }
        break;

      case 'compress':
        if (args.length < 2) {
          console.log('Invalid input');
        } else {
          compressFile(args[0], args[1]);
        }
        break;

      case 'decompress':
        if (args.length < 2) {
          console.log('Invalid input');
        } else {
          decompressFile(args[0], args[1]);
        }
        break;

      case 'hash':
        if (args.length === 0) {
          console.log('Invalid input');
        } else {
          hash(args[0]);
        }
        break;

      case 'os':
        switch (args[0]) {
          case '--EOL':
            console.log('End-of-Line:', os.EOL);
            break;
          case '--cpus':
            const cpus = os.cpus();
            cpus.forEach((cpu, index) => {
              console.log(`CPU ${index + 1}: Model - ${cpu.model}, Clock speed - ${cpu.speed / 1000} GHz`);
            });
            break;
          case '--homedir':
            console.log('Home Directory:', os.homedir());
            break;
          case '--username':
            console.log('Username:', os.userInfo().username);
            break;
          case '--architecture':
            console.log('Architecture:', os.arch());
            break;
          default:
            console.log('Invalid input');
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
