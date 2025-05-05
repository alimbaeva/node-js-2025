import { cwd } from 'process';
import path from 'path';
import fs from 'fs';

export function moveFile(sourcePath, destDir) {
  const src = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.resolve(cwd(), sourcePath);

  const destDirectory = path.isAbsolute(destDir)
    ? destDir
    : path.resolve(cwd(), destDir);

  const fileName = path.basename(src);
  const destPath = path.resolve(destDirectory, fileName);

  const readable = fs.createReadStream(src);
  const writable = fs.createWriteStream(destPath);

  readable.pipe(writable);

  readable.on('error', () => {
    console.log('Operation failed');
  });

  writable.on('finish', () => {
    fs.unlink(src, (err) => {
      if (err) {
        console.log('Operation failed');
      }
    });
  });

  writable.on('error', () => {
    console.log('Operation failed');
  });
}
