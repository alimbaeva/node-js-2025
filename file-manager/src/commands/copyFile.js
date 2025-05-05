import { cwd } from 'process';
import path from 'path';
import fs from 'fs';

export function copyFile(source, destination) {
const sourcePath = path.resolve(cwd(), source);
let destPath = path.resolve(cwd(), destination);

try {
  if (fs.existsSync(destPath) && fs.statSync(destPath).isDirectory()) {
    destPath = path.join(destPath, path.basename(source));
  }

  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);

  readStream.on('error', (err) => {
    console.error(err);
    console.log('Operation failed');
  });
  writeStream.on('error', (err) => {
    console.error(err);
    console.log('Operation failed');
  });
} catch (err) {
  console.error(err);
  console.log('Operation failed');
}
}
