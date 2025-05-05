import { cwd } from 'process';
import path from 'path';
import fs from 'fs';

export function cat(filePath) {
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(cwd(), filePath);

  const readable = fs.createReadStream(fullPath, 'utf-8');

  readable.on('data', chunk => {
    process.stdout.write(chunk);
  });

  readable.on('error', () => {
    console.log('Operation failed');
  });
}
